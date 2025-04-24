# Parjanya’s Portfolio & Blog

A minimalist, poetic digital garden crafted with the T3 Stack — blending introspective writing with expressive design.

## ✨ Features

- **Notion-Powered Blog**: Fetches content dynamically from a Notion database.
- **Dynamic Routing**: Next.js App Router with dynamic slugs for blog posts.
- **Responsive Design**: TailwindCSS with Satoshi font for clean typography.
- **Animations**: Subtle animations using Framer Motion.
- **Glassmorphism Touches**: Modern UI elements with glass-like effects.
- **Dark Theme**: Consistent dark mode across the site.
- **Blog Enhancements**:
  - Cover images stored locally in `/public/images/blog/[slug].ext`.
  - Title, excerpt, word count, read time, and shareable hero section.
  - View count tracking with Prisma and tRPC.
  - Like system with localStorage memory.
  - Anonymous comments with rate limiting, honeypot, and spam filtering.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **API Layer**: [tRPC](https://trpc.io/)
- **CMS**: [Notion](https://www.notion.so/) (via API)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- pnpm (preferred) or npm/yarn
- Notion API integration with a database for blog posts
- Prisma-compatible database (e.g., SQLite, PostgreSQL)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Jrap-bit/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL="your_database_url"
   NOTION_API_KEY="your_notion_api_key"
   NOTION_DATABASE_ID="your_notion_database_id"
   ```

4. **Generate Prisma Client**:

   ```bash
   pnpm prisma generate
   ```

5. **Run the development server**:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🧩 Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable UI components.
- `/lib`: Utility functions and helpers.
- `/public`: Static assets including images.
- `/server`: tRPC routers and context.
- `/styles`: Global styles and Tailwind configuration.

## 📝 Customization

- **Blog Posts**: Managed via Notion. Each post should have properties: Title, Slug, Cover, Date, Excerpt.
- **Cover Images**: Stored locally in `/public/images/blog/` with filenames matching the slug.
- **Comments**: Anonymous comments with optional name, 1000-character limit, and spam protection.
- **Likes**: Users can like posts; likes are stored in the database and tracked via localStorage to prevent multiple likes from the same user.

## 📦 Deployment

The site is ready for deployment on platforms like [Vercel](https://vercel.com/):

1. **Push to GitHub**:

   Ensure your code is committed and pushed to a GitHub repository.

2. **Import to Vercel**:

   - Log in to Vercel and import your GitHub repository.
   - Set the environment variables in the Vercel dashboard.
   - Deploy the project.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).