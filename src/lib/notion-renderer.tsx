import React from "react";

function renderAnnotatedText(text: any, idx: number) {
  const segments = text.plain_text.split("\n");

  return segments.map((line:any, lineIdx:any) => {
    let content: React.ReactNode = line;

    if (text.annotations.code) {
      content = (
        <code className="bg-gray-800 text-cyan-300 px-1 rounded">
          {content}
        </code>
      );
    }
    if (text.annotations.bold) {
      content = <strong>{content}</strong>;
    }
    if (text.annotations.italic) {
      content = <em>{content}</em>;
    }
    if (text.annotations.strikethrough) {
      content = <del>{content}</del>;
    }
    if (text.annotations.underline) {
      content = <u>{content}</u>;
    }

    return (
      <React.Fragment key={`${idx}-${lineIdx}`}>
        {content}
        {lineIdx !== segments.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export function renderBlocks(blocks: any[]) {
  return blocks.map((block) => {
    const { id, type } = block;

    switch (type) {
      case "paragraph":
        return (
          <p key={id}>
            {block.paragraph.rich_text.map(renderAnnotatedText)}
          </p>
        );

      case "heading_1":
        return (
          <h1 key={id} className="text-3xl font-bold mt-8">
            {block.heading_1.rich_text.map(renderAnnotatedText)}
          </h1>
        );

      case "heading_2":
        return (
          <h2 key={id} className="text-2xl font-semibold mt-6">
            {block.heading_2.rich_text.map(renderAnnotatedText)}
          </h2>
        );

      case "bulleted_list_item":
        return (
          <li key={id} className="list-disc ml-5">
            {block.bulleted_list_item.rich_text.map(renderAnnotatedText)}
          </li>
        );

      case "quote":
        return (
          <blockquote
            key={id}
            className="border-l-4 border-gray-300 pl-4 italic text-neutral-300"
          >
            {block.quote.rich_text.map(renderAnnotatedText)}
          </blockquote>
        );

      case "callout":
        return (
          <div
            key={id}
            className="bg-yellow-100/5 border-l-4 border-yellow-400 p-4 text-white rounded-md mb-4"
          >
            <div className="flex items-center mb-2">
              {block.callout.icon?.emoji && (
                <span className="text-xl mr-2">{block.callout.icon.emoji}</span>
              )}
              <span className="font-semibold">
                {block.callout.rich_text[0]?.plain_text}
              </span>
            </div>
            {block.callout.rich_text[1] && (
              <p className="text-sm text-neutral-300">
                {block.callout.rich_text[1]?.plain_text}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  });
}