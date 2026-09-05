# Anton Trantin — Still building.

A single-page personal website with a progressively enhanced timeline. Static content, one portrait, and no database, analytics, contact forms, or remote content feeds.

## Development

Requires Node.js 22.13 or later. Run `npm install`, then `npm run dev`. Build with `npm run build` (static export in `dist/client`).

## Repository layout

- `app/page.tsx`: biography, approved public metrics, and social links.
- `app/globals.css`: visual system and responsive layouts.
- `app/timeline-motion.tsx`: optional scroll drawing and chapter entrances; text remains visible without JavaScript or animations.
- `app/layout.tsx`: page metadata.
- `site/`: the reviewed, deployable static export. No Node.js process is needed on the host.

## Deployment

Production is served by the existing nginx configuration from `/var/www/trantin.com_static` on the `trantin` SSH host. Only the new static release is served; legacy files and historical URLs are removed from this web root after a timestamped backup outside the public directory.

Make all changes and builds locally. Refresh `site/` from the reviewed `dist/client/` export, commit, and push. The server checkout is `/var/www/trantin.com_landing-src` and is a read/deploy target only.

Before every deployment, inspect the server checkout for changes, obtain a fast-forward-only update, and back up the existing web root. Stage the public files from `site/` (`index.html`, `404.html`, `index.rsc`, `_next/`, `portrait.png`, `favicon.svg`), then sync the reviewed release with deletion of obsolete files and delayed updates. Do not publish build manifests or dotfiles. The deletion scope is this web root only. Never edit tracked source on the server. Verify the live HTML and assets after deployment.

The local Cheburashka experiment is separate and is not included in this release.

## Content provenance

Biography and metrics were supplied and approved by Anton. The 600M+ installs are cumulative since 2020 through today; 5M DAU, ten products, and the five-person in-house team describe the current business. The current business's identity must remain absent from all source, assets, and metadata.

Portrait source: `https://trantin.com/wp-content/uploads/elementor/thumbs/oooo.plus_90-osnq84ncz5zfaggp2jt232bsttzqzpuhftvu0zl7ic.png`.
