import React from "react";

export function renderBlocks(blocks: any[]) {
  return blocks.map((block) => {
    const { id, type } = block;

    switch (type) {
      case "paragraph":
  return (
    <p key={block.id}>
      {block.paragraph.rich_text.flatMap((text:any, textIdx:any) =>
        text.plain_text.split("\n").map((line:any, lineIdx:any, arr:any) => (
          <React.Fragment key={`${textIdx}-${lineIdx}`}>
            {line}
            {lineIdx !== arr.length - 1 && <br />}
          </React.Fragment>
        ))
      )}
    </p>
  );
      case "heading_1":
        return <h1 key={id} className="text-3xl font-bold mt-8">{block.heading_1.rich_text[0]?.plain_text}</h1>;
      case "heading_2":
        return <h2 key={id} className="text-2xl font-semibold mt-6">{block.heading_2.rich_text[0]?.plain_text}</h2>;
      case "bulleted_list_item":
        return <li key={id} className="list-disc ml-5">{block.bulleted_list_item.rich_text[0]?.plain_text}</li>;
      default:
        return null;
    }
  });
}