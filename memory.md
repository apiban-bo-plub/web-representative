# Workspace Memory: Apiban Bo Plup Portal Next.js Conversion

## Project Description
Conversion of a 14MB standalone HTML bundle of the **Apiban Bo Plup** Thai wellness portal into a Next.js App Router project using Vanilla CSS to preserve style tokens and custom web fonts.

## User Context
- **Name**: Sorawit
- **Preferences**: Direct, expert suggestions; challenge opinions if a better approach is available. Keep memory.md updated.

## Key Decisions
- **Vanilla CSS**: Kept the design system css styles (`style_0.css` and `style_1.css`) as-is to preserve typography and spacing tokens.
- **Routing**: Restructuring compiled JSX files into Next.js dynamic routing: `/` (home), `/heritage` (about), `/apothecary` (products), and `/shop` (storefront).
- **Custom ImageSlot**: Replacing the complex vanilla JS web component `<image-slot>` with a Next.js/React component `ImageSlot.js` that maps placeholder IDs to static images.

## Completed Tasks
- Unpacked standalone HTML bundle to get original JSX, styles, images, and fonts.
- Initialized Next.js App Router project and moved files to root.
- Installed `lucide-react` to replace global lucide script calls.
- Copied 30 font files and configured `public/fonts` directory.
- Copied primary images (`heroImg`, `motifSvg`) to `public/images/`.
- Generated and set up on-brand AI images for page sections and storefront in `public/images/`.
- Configured stylesheets in `src/styles/` with clean assets path mapping.
- Implemented `ImageSlot.js` React component in `src/components/`.
- Restored React components and page routes (`/`, `/heritage`, `/apothecary`, `/shop`).
- Removed the mobile/desktop view toggle switch from all pages per user request.
- Built and validated successfully using Turbopack compilation (`npm run build`).

## Active Tasks
- None. Project successfully compiled and validated. Ready for deployment.
