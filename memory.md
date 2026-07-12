# Workspace Memory: Apiban Bo Plup Portal Next.js Conversion

## Project Description
Conversion of a 14MB standalone HTML bundle of the **Apiban Bo Plup** Thai wellness portal into a Next.js App Router project using Vanilla CSS to preserve style tokens and custom web fonts.

## User Context
- **Name**: Sorawit
- **Preferences**: Direct, expert suggestions; challenge opinions if a better approach is available. Keep memory.md updated. Only deploy to production (Vercel, etc.) when explicitly told to do so by the user.

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
- Initialized local Git repository, configured `.gitignore` to omit heavy/temporary assets, and successfully pushed the codebase to the organization repository [web-representative](https://github.com/apiban-bo-plub/web-representative.git) on the `main` branch.
- Deployed the project to Vercel production at [apiban-blond.vercel.app](https://apiban-blond.vercel.app).
- Implemented English and Thai i18n language context, JSON dictionaries, and dynamic selectors on all nav headers.
- Removed the "Search" link from all navigation headers per user request.
- Changed the Thai header font to "Charm" (Calligraphic Script) to match the handwritten "Red Book" manuscript branding.
- Fixed the language selector dropdown in the mobile navigation drawer to align to the left side, preventing it from clipping off-screen.
- Redesigned the Heritage page with an alternating timeline layout, scroll-driven entry reveals, and a details accordion for the ancient Red Book excerpts.
- Redesigned the Apothecary page with an interactive sensory profile tab-switcher, custom spec comparisons, and a 3-step daily ritual sequence.
- Redesigned the Shop page with a modern sliding cart drawer (supporting items list, quantity updates, removal, subtotal, and checkout actions), and clean grid card sizing.
- Built and validated successfully using Turbopack compilation (`npm run build`).
- Redesigned the **Heritage** page (`/heritage`) with scroll reveal animations, a museum timeline connector path, and a details accordion for Red Book manuscript excerpts.
- Redesigned the **Apothecary** page (`/apothecary`) with sensory tabs (Thepprasit vs Phetmongkol), active botanical matrices, and a ritual application step-by-step guide.
- Redesigned the **Shop** storefront page (`/shop`) with premium product cards, a fully functional sliding Cart Drawer (with item quantity adjustment), and an integrated checkout workflow displaying custom receipt tickets upon success.
- Created and integrated [pages.css](file:///Users/sorawitsakarin/Documents/apiban/src/styles/pages.css) to add responsive container queries, refined padding/margins, image hover transitions, and visual Polish to all three routes.
- Refactored the Shop storefront page (`src/app/shop/page.js`) to utilize the premium classes from `pages.css` and `redesign.css`.
- Fixed a Next.js build-breaking ReferenceError in the Shop storefront by importing `ImageSlot`.
- Integrated actual product photography (`phetmongkol.jpg`, `thepprasit.jpg`, etc.) directly into the `ProductVisual` packaging slot of the storefront.
- Enhanced the **Heritage** page layout to use parchment textures, ledger-style tables, and gold-framed cards.
- Implemented **Ambient Atmosphere Shift** on the Apothecary page to change layout tone based on warm/cool selection.
- Created the **Sensory Botanical Matrix** with hand-drawn SVG sketches and detailed ingredient profiles.
- Integrated a pulsing CSS **Respiration Guide Circle** breathing trainer inside the Apothecary ritual section.
- Designed minimalist Aesop/Le Labo product cards with a visual media overlay and "Quick Add" buttons.
- Added a **Sensory Profile Matrix** of visual progress bars to the Product Detail pages.
- Customized the successful checkout page to render a jagged-edged ticket with a vintage red-ink Apothecary stamp.
- Removed the cart feature, cart drawer, and retail checkout flows from the Shop page per user request, replacing it with direct B2C links (Shopee & Line).
- Added a "Home" link to the Shop page navigation header to allow easy navigation back to the primary landing page.
- Reduced the Shop page hero title font size from `68px` to `48px` max (using responsive clamp sizing) to improve visual hierarchy and page layout balance.
- Staged and renamed all 28 raw photo uploads inside `public/images/` subfolders (`products`, `red-book`, `store`, and `event`) to descriptive, human-readable names.
- Mapped all newly renamed photos dynamically across components (`ImageSlot.js`, Shop storefront pages, timelines, and gallery slides) for an authentic, premium brand presentation.
- Created a standalone video test page route (`/video-test`) to embed the requested YouTube Shorts video.
- Implemented a CSS crop/scale wrapper hack (scaling the iframe to `1.22` with `overflow: hidden` on the outer container) alongside a transparent pointer-events overlay to completely hide YouTube's native title, creator header, seek bar, and bottom branding logo.
- Integrated programmatic player controls (Play/Pause on video click, corner Sound Toggle) via the YouTube API `postMessage` protocol with clean visual feedback alerts.
- Restored the `/video-test` page to the dynamic Hero section cross-fade sequence. The background video sits in a fixed layer that scales up and fades out (100% to 0% opacity) as the user scrolls, while the homepage Hero section slides up from below the fold, fading in from 0% to 100% opacity in absolute sync.
- Redesigned the Pillars section to render within a styled full-width background block. Implemented a light warm sand background (`var(--makara-200)`) with subtle horizontal borders for the light page layout on the homepage, and a deep charcoal background (`#0d0f0e`) for the dark layout on the video test page.
- Optimized text contrast and legibility inside the Pillars section: explicitly set titles to dark brown (`var(--text-strong)`) on the homepage, and override them to bright white (`var(--text-on-dark-strong)`) and body copy to high-contrast warm cream (`var(--text-on-dark)`) on the dark video test page.
- Optimized web performance and Core Web Vitals (specifically Largest Contentful Paint / LCP) by refactoring image elements to use the Next.js `Image` component (`next/image`).
- Set the homepage Hero background (`/images/hero.jpg`) to load with `priority={true}` (preloading in HTML head), serving it instantly on page entry.
- Updated the global [ImageSlot.js](file:///Users/sorawitsakarin/Documents/apiban/src/components/ImageSlot.js) component to render secondary images using optimized Next images with automatic lazy loading (`loading="lazy"`), relative layout sizing, and overflow clipping.
- Built and validated successfully using Turbopack compilation (`npm run build`).

## Active Tasks
- None. All current user requests (i18n dropdown, mobile drawer tweaks, shop page cart removal, photo renaming/mapping, video embed crop overlays, scroll-driven parallax cross-fades, scroll-responsive navbar animations, Pillars background, text legibility refinements, and LCP Next.js Image load optimizations) are fully complete and validated.
