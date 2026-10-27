# Alexandre Tavares — ASCII village portfolio

An interactive ASCII village with an articulated dragon, nine walking project
characters and English portfolio content. The home fills one screen; navigation
opens Projects, About, Experience, DATA&DEV and Contact. Characters open details
in accessible dialogs. The animation supports pausing and reduced motion.

## Build and deployment

Requires Node.js 20 or newer. No npm dependencies are needed.

```sh
npm run build
```

The output is `dist/`, ready for static hosting. The existing Cloudflare Pages
project uses the `main` branch, build command `npm run build`, root directory
left empty, and build output directory `dist`. Keep the existing domain binding.
Pushes to the production branch trigger a deployment automatically.

For a local preview, serve `dist/` with any static HTTP server, for example
`python -m http.server 8765 --directory dist`.

## Editing

- `src/content.js`: biography, experience, skills, projects and services.
- `src/layout.html`: page structure, education, contacts and navigation.
- `src/portfolio.css`: layout, red/wine palette and medieval typography.
- `src/portfolio.js`: rendering, routes, project characters and dialogs.
- `src/dragon.js` and `src/village.js`: ASCII geometry and movement.
- `src/build.mjs`: prerenders content and generates the shared dragon portrait
  and dragon-head favicon from the same geometry as the village dragon.

Font files and SIL Open Font Licenses are in `src/fonts`. Fonts are served
locally. The build publishes only browser assets, not source templates, résumé
files, preview screenshots or the standalone development copy.

The earlier portfolio remains available through Git history and Cloudflare's
deployment history. Roll back a production deployment from the existing Pages
project if necessary.
