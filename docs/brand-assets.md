# Marii Brand Assets

Primary asset source:
- `public/brand/marii-logo-pack/`

Programmatic paths:
- `lib/brand-assets.ts`

Recommended usage:
- `brandAssets.logoLight` for light surfaces
- `brandAssets.logoDark` for dark surfaces
- `brandAssets.iconDark` for white icon-on-brand surfaces
- `brandAssets.iconLight` for black icon-on-light surfaces
- `brandAssets.favicon32` and `brandAssets.appleTouchIcon` for metadata

Notes:
- Keep all new logo references going through `lib/brand-assets.ts`.
- Do not invent new logo filenames in feature work unless the brand pack changes.
