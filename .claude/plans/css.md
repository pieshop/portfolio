# CSS Reduction Plan — Replace with Radix Props

## Context

The CSS files still carry Bootstrap-era utility classes and inline-style-like CSS rules
(padding, margin, color, font-size, flex layout) that duplicate what Radix UI Themes
handles via component props. Goal: delete those rules and move the values into Radix
props or inline `style` on the relevant components. Keep only CSS that Radix genuinely
cannot express (hover states, pseudo-elements, `grid-column`, the aspect-ratio hack,
complex responsive navbar, custom shadows, font-face definitions, CSS custom properties).

---

## Files Changed

```
www/src/css/grid.css
www/src/css/ui.css
www/src/css/typography.css             (one rule only)
www/src/components/Items.tsx
www/src/components/CategoryItem.tsx
www/src/components/CategoryItemImage.tsx
www/src/components/item/ItemAwards.tsx
www/src/components/item/ItemImagePlaceholder.tsx
www/src/containers/Loader.tsx
www/src/containers/NavBar.tsx
www/src/containers/About.tsx
www/src/containers/Item.tsx
```

---

## CSS Rules to Delete → Component Replacements

### grid.css

| Rule deleted | Replacement in component |
|---|---|
| `.main_region { margin-top: 20px }` | `Items.tsx` Box: add `mt="5"` · `About.tsx` motion.div: add `style={{ marginTop: 'var(--space-5)' }}` · `Item.tsx` outer div: same |
| `.entry-spacer { height: 20px }` | `CategoryItem.tsx`: remove `<div className="entry-spacer" />`, add `mb="5"` to outer `<Box>` |

After these two deletions **grid.css only contains the `.media-col--*` rules**.

---

### ui.css

| Rule deleted | Replacement |
|---|---|
| `.loading { position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(255,255,255,0.75); z-index:1000 }` | `Loader.tsx` Flex: remove `className="loading"`, add `style={{ position:'fixed', inset:0, backgroundColor:'rgba(255,255,255,0.75)', zIndex:1000 }}` |
| `header {}` entire block | `NavBar.tsx`: remove `<div className="year_drop">` wrapper — `<Flex gap="2">` already provides spacing. `About.tsx`: remove `className="page-header"`, add `mb="5"` to its Box. |
| `.item__thumbnail img { box-shadow: 0 0 0 }` | Delete — zero-value, no effect |
| `.item__thumbnail.dark { background-color: #666666 }` | Delete — unused variant |
| `.item__thumbnail--placeholder { … }` | Delete — unused |
| `.thumb` — remove `position:relative` and `background-color` (keep `height:0; padding-bottom:100%`) | `CategoryItemImage.tsx`: add `style={{ backgroundColor:'var(--grey-light)' }}` to the `.thumb` div |
| `.thumb__placeholder { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background-color:… }` | `CategoryItemImage.tsx`: replace `<div className="thumb__placeholder">` with `<Flex style={{ position:'absolute', inset:0 }} align="center" justify="center">` |
| `footer { height:var(--footer-height); line-height:60px; width:100% }` entire rule | Delete — Footer uses Radix Flex py for spacing. Also delete `--footer-height` from theme.css. |
| `.img-fluid { max-width:100%; height:auto }` | `CategoryItemImage.tsx` + `About.tsx` img: add `style={{ maxWidth:'100%', height:'auto' }}`, remove className |
| `.img-thumbnail { max-width:100%; height:auto; border:1px solid var(--grey-dark) }` | `CategoryItemImage.tsx` img: merge border into same style object, remove className |
| `.item__awards { border:0 }` | `ItemAwards.tsx`: remove `className="item__awards"`. Radix Card needs no border reset. Keep the `.item__awards .icon-star` hover rule. |
| `.award { padding-bottom:10px }` | Delete — no element uses this className |
| `.aboutme { .page-header { margin } }` | `About.tsx`: remove `<div className="aboutme">` wrapper |
| `.item__media--placeholder { position:relative; background-color:var(--grey-light); overflow:hidden }` | `ItemImagePlaceholder.tsx`: add `style={{ position:'relative', backgroundColor:'var(--grey-light)', overflow:'hidden' }}`, remove className |
| `.spinner-container { position:absolute; inset:0; display:flex; align-items:center; justify-content:center }` | `ItemImagePlaceholder.tsx`: replace `<div className="spinner-container">` with `<Flex style={{ position:'absolute', inset:0 }} align="center" justify="center">` |
| `.item__caption` top-level properties only: `margin-top:20px; font-family:…; padding-bottom:8px` | `CategoryItem.tsx`: convert `<div className="item__caption text-center">` to `<Box className="item__caption" mt="5" pb="2" style={{ textAlign:'center' }}>`. Keep all nested `dl/dt/dd` sub-rules in CSS. |

### typography.css

| Rule deleted | Replacement |
|---|---|
| `.text-center { text-align:center }` | Remove `text-center` className everywhere. `CategoryItem.tsx`: merged into Box style above. `CategoryItemImage.tsx` thumb div: add to its style. `About.tsx`: already had inline `style={{ textAlign:'center' }}`. |

---

## Dead classNames to Remove from Components (no CSS exists)

| Component | className to remove |
|---|---|
| `CategoryItem.tsx` | `className="item__container"` on outer Box |
| `CategoryItem.tsx` | `className="dl-vertical"` on `<dl>` |

---

## CSS Rules to KEEP (with justification)

| Rule | Why kept |
|---|---|
| `.site-nav*` entire block | Responsive navbar: pseudo-elements for hamburger, `display:none`/`.is-open` toggle, media queries — not expressible as Radix props |
| `.list__item--subtle_shadow` | Custom `box-shadow` + border — no Radix prop for custom shadows |
| `.item__thumbnail img:hover { opacity:0.5 }` | Hover pseudo-class — no Radix prop equivalent |
| `.thumb { height:0; padding-bottom:100% }` | Aspect-ratio CSS hack — must stay |
| `.item__thumbnail { position:relative }` | Keeps component JSX clean |
| `.item__decoration`, `.decoration`, `.decoration__left/right` | Sprite background positioning + border-top |
| `.item__caption` nested `dl/dt/dd` rules | Styling semantic HTML elements with no Radix equivalent |
| `.media-col--*` | `grid-column` values not expressible via Radix Grid props |
| `.seperator` | Custom 4px separator with double-border — different from Radix `<Separator>` |
| `.rt-DropdownMenuContent` | Radix theme panel background override |
| `.site-nav .rt-Button` | Radix Button size override for navbar |
| Responsive `html { font-size }` media queries | Global typography scaling |
| All `typography.css` except `.text-center` | Icon font-face + icon classes |
| All `theme.css` | CSS custom properties + Radix theme config |

---

## Verification

1. `npm run dev` — app loads without visual regressions
2. Category grid: thumbnails show grey placeholder, correct aspect ratio, fade-in on load
3. Item detail page: lazy-load spinner centred, image fades in correctly
4. Loader overlay: full-screen semi-transparent white, spinner centred
5. Footer: sticks to bottom on short pages
6. Navbar: hamburger toggles on mobile, year dropdown and filter button still work
7. About page: heading centred, profile image scales to container width
8. Award stars render in category tiles and change colour on hover
