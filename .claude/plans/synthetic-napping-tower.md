# Bootstrap → Radix UI Themes Conversion Plan

## Context
The portfolio components were written with Bootstrap 3/4 class names (`col-xs-6`, `navbar-dark`, `card`, `btn`, etc.) but Bootstrap CSS is not imported — so the layout is completely broken. The upgrade already installed Radix UI Themes (`@radix-ui/themes`). This plan converts all TSX components to use Radix Themes primitives and adds minimal custom CSS in `main.css` where Radix has no equivalent (navbar, img utilities, media grid columns).

---

## Radix Component Mapping

| Bootstrap pattern | Radix replacement |
|---|---|
| `<div className="row">` | `<Grid columns=... gap=...>` |
| `<div className="col-*">` | Grid handles it; children are grid items |
| `<div className="card"><div className="card-body">` | `<Card>` with `<Box p="4">` inside |
| `<div className="d-flex justify-content-between">` | `<Flex justify="between">` |
| `<button className="btn btn-primary">` | `<Button variant="solid">` |
| `<button className="btn btn-info btn-sm">` | `<Button size="1" color="cyan" variant="soft">` |
| `<button className="btn btn-success btn-sm">` | `<Button size="1" color="green" variant="soft">` |
| `<h3 className="text-muted">` | `<Text color="gray">` or `<Heading color="gray">` |
| Bootstrap modal | `<Dialog.Root>` + `<Dialog.Content>` |
| Bootstrap dropdown | `<DropdownMenu.Root>` + `<DropdownMenu.Content>` |
| `<span className="text-muted">` | `<Text color="gray">` |
| `className="text-center"` | `align="center"` prop on Text/Heading, or `<Flex justify="center">` |
| `<li className="list-group-item">` | `<Box py="2">` + `<Separator size="4">` |
| `container-fluid` | `<Box width="100%">` or remove |
| `mb-3 / mr-2 / p-1` | `mb="4"`, `mr="2"`, `p="1"` props |

**No Radix equivalent → custom CSS in `main.css`:**
- Navbar dark bar layout (`site-nav`, responsive collapse)
- `img-fluid` / `img-thumbnail`
- Media list column layout (dynamic column spans by image type)
- `nav-pills` footer nav

---

## File-by-File Changes

### 1. `src/App.tsx`
Remove Bootstrap `container-fluid`; use Radix `Box`.

```tsx
// Before
<div className="container-fluid">

// After
<Box px={{ initial: '3', md: '5' }}>
```

---

### 2. `src/components/Header.tsx`
`page-header` + `text-muted` → Radix `Box`, `Heading`, `Text`.

```tsx
// Before
<div className="page-header text-center">
  <h1>Stephen Hamilton <small className="text-muted">Interactive Developer</small></h1>
</div>

// After
<Box py="4" style={{ textAlign: 'center' }}>
  <Heading size="7" as="h1">
    Stephen Hamilton{' '}
    <Text size="5" color="gray" weight="regular">Interactive Developer</Text>
  </Heading>
</Box>
```

---

### 3. `src/containers/NavBar.tsx`
The existing NavBar is a standard nav bar with a year dropdown on desktop, and a hamburger that reveals everything on mobile. This can be built with Radix **primitives** plus Themes components:

- **Answer:** Yes. Use Radix **primitives** for `NavigationMenu` (main link list) and `DropdownMenu` (year selector), and Radix **Themes** for layout/controls (`Flex`, `Button`). Keep a small amount of custom CSS for the bar styling and mobile collapse panel since Radix does not provide a responsive navbar layout.

- **Desktop:** `NavigationMenu` for the link list (ARIA + keyboard), `DropdownMenu` for the year selector, `Button` for the filter toggle.
- **Mobile:** keep the existing `collapsed` state and use custom CSS for the hamburger + collapsible panel; render the same `NavigationMenu` list + year dropdown + filter button stacked vertically inside the expanded panel.

Use **Radix `NavigationMenu`** (primitive) for the link list — gives proper ARIA roles and keyboard navigation. Wrap in a `<nav className="site-nav">` for the dark bar CSS. Collapse is still driven by React state. Dropdown → Radix `DropdownMenu` (§5). Filter → Radix `Button`.

`NavigationMenu` is unstyled; install via: `npm install @radix-ui/react-navigation-menu`

```tsx
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Button, Flex } from '@radix-ui/themes';

// Before
<nav className="navbar navbar-expand-md navbar-dark bg-dark bg-light">
  <button className="navbar-toggler ..."><span className="navbar-toggler-icon" /></button>
  <div className={'navbar-collapse ' + navClass}>
    <ul className="navbar-nav mr-auto"> ... </ul>
    <form className="form-inline">
      {drop_is_active && <Dropdown ... />}
      {drop_is_active && <button className="btn btn-sm btn-primary filter">}
    </form>
  </div>
</nav>

// After
<nav className="site-nav">
  <button
    className="site-nav__toggler"
    type="button"
    onClick={toggleCollapse}
    aria-controls="site-nav-collapse"
    aria-expanded={!collapsed}
    aria-label="Toggle navigation"
  >
    <span className="site-nav__toggler-icon" />
  </button>

  <div
    id="site-nav-collapse"
    className={'site-nav__collapse' + (collapsed ? '' : ' is-open')}
  >
    <NavigationMenu.Root className="site-nav__menu">
      <NavigationMenu.List className="site-nav__list">
        {availableCategories.map((o) => (
          <NavigationMenu.Item key={o.category_name}>
            <NavBarLink ... />  {/* NavBarLink uses NavigationMenu.Link — see §4 */}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>

    <Flex align="center" gap="2">
      {drop_is_active && <Dropdown ... />}
      {drop_is_active && (
        <Button size="1" variant="solid" onClick={handleFilterToggleClick}>
          {filter_text}
        </Button>
      )}
    </Flex>
  </div>
</nav>
```

**CSS additions to `main.css`:**
```css
.site-nav {
  background-color: #343a40;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5rem 1rem;
  min-height: 56px;
}

.site-nav__toggler {
  background: none;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  display: none; /* hidden on md+ */
}

.site-nav__toggler-icon {
  display: inline-block;
  width: 22px;
  height: 2px;
  background: rgba(255,255,255,0.7);
  position: relative;
}
.site-nav__toggler-icon::before,
.site-nav__toggler-icon::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 2px;
  background: rgba(255,255,255,0.7);
  left: 0;
}
.site-nav__toggler-icon::before { top: -6px; }
.site-nav__toggler-icon::after  { top:  6px; }

.site-nav__collapse {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* Mobile collapse */
@media screen and (max-width: 767px) {
  .site-nav__toggler { display: block; }
  .site-nav__collapse {
    display: none;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 0.5rem;
  }
  .site-nav__collapse.is-open { display: flex; }
}

/* Nav link colours */
.site-nav a.nav-link { color: rgba(255,255,255,0.75); text-decoration: none; padding: 0.5rem 0.75rem; }
.site-nav a.nav-link:hover,
.site-nav a.nav-link.active { color: #fff; }
.site-nav a.nav-link.disabled { color: rgba(255,255,255,0.35); pointer-events: none; }
```

---

### 4. `src/components/NavBarLink.tsx`
Wrap the React Router `<Link>` with `NavigationMenu.Link` using `asChild` — this merges the Radix accessibility props onto the React Router link without an extra DOM node.

```tsx
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

// Before
<li className="nav-item">
  <Link to={goto} className={`nav-link ${clz}${isActivePath ? ' active' : ''}`}>
    {category_label}
  </Link>
</li>

// After (the <li> wrapper is now NavigationMenu.Item in NavBar)
<NavigationMenu.Link asChild active={isActivePath}>
  <Link
    to={goto}
    className={`site-nav__link${clz ? ' disabled' : ''}${isActivePath ? ' active' : ''}`}
    data-id={category_name}
    onClick={linkClick}
  >
    {category_label}
  </Link>
</NavigationMenu.Link>
```

---

### 5. `src/components/Dropdown.tsx` + `src/components/DropdownLink.tsx`
Replace Bootstrap dropdown with Radix `DropdownMenu`.

```tsx
// Before (Dropdown.tsx)
<div className={'dropdown year_drop text-center ' + dropClass}>
  <button className="btn btn-sm btn-info dropdown-toggle" onClick={toggleHide}>
    {year_label}
  </button>
  <div className={'dropdown-menu ' + dropClass}>
    <Link className="dropdown-item" ...>All Years</Link>
    <div className="dropdown-divider" />
    {yearLinks.map(...)}
  </div>
</div>

// After (Dropdown.tsx) — DropdownMenu manages open/close state internally
import { DropdownMenu, Button } from '@radix-ui/themes';

const Dropdown: React.FC<DropdownProps> = ({ category_id, year_id, yearItems }) => {
  const year_label = year_id === constants.ALL_YEARS ? 'All Years' : year_id;
  const yearLinks = yearItems.map((year) => ({ year, to: '/' + category_id + '/' + year }));

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button size="1" color="cyan" variant="soft">
          {year_label} <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="center">
        <DropdownMenu.Item asChild>
          <Link to={'/' + category_id + '/' + constants.ALL_YEARS}>All Years</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        {yearLinks.map((data) => (
          <DropdownMenu.Item key={data.year} asChild>
            <Link to={data.to}>{data.year}</Link>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
// DropdownLink.tsx becomes unused and can be deleted.
```

---

### 6. `src/components/Items.tsx`
`<ul className="list list-unstyled">` + `<div className="row">` → Radix `Grid`.

```tsx
// Before
<ul className="list list-unstyled">
  <div className="category_region">
    <div className="row">
      {items.map((data) => <CategoryItem ... />)}
    </div>
  </div>
</ul>

// After
<Box className="main_region">
  <Grid
    columns={{ initial: '2', md: '3', lg: '4', xl: '6' }}
    gap="3"
    className="category_region"
  >
    {items.map((data) => <CategoryItem ... />)}
  </Grid>
</Box>
```

---

### 7. `src/components/CategoryItem.tsx`
Remove Bootstrap column classes (`col-xs-6` etc.) — the parent Grid handles layout. Keep custom CSS classes (`item__container`, `list__item--subtle_shadow`, etc.).

```tsx
// Before
<div className="item__container col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
  <li className="list__item--subtle_shadow">

// After
<Box className="item__container">
  <Box className="list__item--subtle_shadow">
```

---

### 8. `src/components/Footer.tsx`
`nav nav-pills nav-fill` → `<Flex>` with CSS; `row justify-content-center` → `<Flex justify="center">`.

```tsx
// Before
<footer className="footer">
  <div className="container-fluid">
    <div className="seperator" />
    <ul className="nav nav-pills nav-fill"> ... </ul>
    <div className="seperator" />
    <div className="row justify-content-center">
      <div className="col-xs-2 text-center">
        <span className="text-muted credit">© {year} Stephen Hamilton</span>
      </div>
    </div>
  </div>
</footer>

// After
<footer>
  <div className="seperator" />
  <Flex as="ul" justify="center" gap="4" style={{ listStyle: 'none', padding: 0 }}>
    {/* nav-item links unchanged */}
  </Flex>
  <div className="seperator" />
  <Flex justify="center">
    <Text size="1" color="gray" className="credit">© {year} Stephen Hamilton</Text>
  </Flex>
</footer>
```

**CSS additions to `main.css`:**
```css
/* Footer nav link colours */
footer a.nav-link { color: var(--font-dark); text-decoration: none; }
footer a.nav-link:hover { color: #000; }

/* img utilities (replaces Bootstrap img-fluid / img-thumbnail) */
.img-fluid { max-width: 100%; height: auto; }
.img-thumbnail {
  max-width: 100%;
  height: auto;
  border: 1px solid var(--grey-dark);
}
```

---

### 9. `src/containers/About.tsx`
`row/col` → `<Flex>/<Box>`; `card/card-body/card-title` → `<Card>`; `card-deck` → `<Grid columns="2" gap="4">`; `list-group` → `<Box>` with `<Separator>`; colour utilities → Radix props.

```tsx
// Before
<div className="card">
  <div className="card-body">
    <h3 className="card-title">Technologies</h3>
    <p className="card-text mb-2 text-muted">Below is a selection...</p>
  </div>
  <div className="card-deck">
    <div className="card card-inverse bg-info mb-3 text-center">
      <div className="card-body">
        <h3 className="card-title text-white">SDKs, Frameworks, Libraries</h3>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item list-group-item-info text-left">React, Redux...</li>
      </ul>
    </div>
  </div>
</div>

// After
<Card>
  <Box p="4">
    <Heading size="4">Technologies</Heading>
    <Text color="gray" mb="2" as="p">Below is a selection...</Text>
  </Box>
  <Grid columns="2" gap="4" p="4">
    <Card style={{ backgroundColor: 'var(--blue-light)' }}>
      <Box p="3">
        <Heading size="4" align="center">SDKs, Frameworks, Libraries</Heading>
      </Box>
      <Separator size="4" />
      <Box p="2"><Text>React, Redux...</Text></Box>
      <Separator size="4" />
      <Box p="2"><Text>JSX, SASS...</Text></Box>
    </Card>
  </Grid>
</Card>
```

Profile image: remove Bootstrap float classes, use inline `style={{ float: 'left', marginLeft: '1rem', paddingRight: '2rem' }}`.

---

### 10. `src/components/item/ItemOverview.tsx`
`card` → `<Card>`; header section → coloured `<Box>` inside Card; buttons → `<Button>`; `d-flex` → `<Flex>`; `text-right` → `<Text align="right">`.

```tsx
// Before
<div className="card mb-3">
  <div className="card-body card-inverse bg-primary text-white">
    <h3 className="card-title text-center">{client_label} : {title}</h3>
  </div>
  ...
  <div className="d-flex w-100 justify-content-start">
    <Link className="btn btn-sm btn-info mr-2" ...>View archive</Link>
    <a className="btn btn-sm btn-success mr-2" ...>{link.label}</a>
  </div>
  ...
  <p className="text-right"><a ...>{affiliation}</a> {year}</p>
</div>

// After
<Card mb="4" className="item__overview">
  <Box p="4" style={{ backgroundColor: 'var(--accent-9)', borderRadius: 'var(--radius-3) var(--radius-3) 0 0' }}>
    <Heading size="5" align="center" style={{ color: 'white' }}>
      {client_label} : {title}
    </Heading>
  </Box>
  ...
  <Flex gap="2" p="4">
    {has_archive && <Button size="1" color="cyan" variant="soft" asChild>
      <Link to={linkTo}>View archive</Link>
    </Button>}
    {links.map((link) => (
      <Button key={link.label} size="1" color="green" variant="soft" asChild>
        <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
      </Button>
    ))}
  </Flex>
  ...
  <Text align="right" as="p" p="4">
    <a href={affiliation_url}>{affiliation}</a> {year}
  </Text>
</Card>
```

---

### 11. `src/components/item/ItemDetails.tsx`
`card` → `<Card>`; `list-group-item` → `<Box>` + `<Separator>`; `d-flex justify-content-between` → `<Flex justify="between">`.

```tsx
// Before
<ul className="list-group list-group-flush">
  <li className="list-group-item flex-column align-items-start">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">Client</h5>
      <span>{client_label}</span>
    </div>
  </li>
</ul>

// After
<Box>
  <Separator size="4" />
  <Flex justify="between" align="center" px="4" py="2">
    <Text weight="bold">Client</Text>
    <Text>{client_label}</Text>
  </Flex>
  <Separator size="4" />
  <Flex justify="between" align="center" px="4" py="2">
    <Text weight="bold">Tech</Text>
    <Text>{technologies}</Text>
  </Flex>
  ...
</Box>
```

---

### 12. `src/components/item/ItemAwards.tsx` + `ItemAward.tsx`
`card-deck` → `<Grid>`; award cards → `<Card>`; buttons → `<Button>`.

```tsx
// ItemAwards.tsx — Before
<div className="card-deck w-100">
  {awards.map((data, i) => <ItemAward key={i} ... />)}
</div>

// After
<Grid columns={{ initial: '1', md: '2' }} gap="3" width="100%">
  {awards.map((data, i) => <ItemAward key={i} ... />)}
</Grid>

// ItemAward.tsx — Before
<div className="card card-inverse bg-success mb-3">
  <div className="card-body">
    <button className="btn btn-xs btn-primary js-pdf-award mb-2">pdf</button>
    <a className="btn btn-xs btn-primary">link</a>
  </div>
</div>

// After
<Card mb="3" style={{ backgroundColor: 'var(--green-3)' }}>
  <Box p="4">
    <Flex direction="column" gap="2">
      <Heading size="3">{award_name}</Heading>
      {pdf !== '' && <Button size="1" onClick={handlePDFClick}>pdf</Button>}
      {link !== '' && <Button size="1" asChild><a href={link} target="_blank">link</a></Button>}
    </Flex>
  </Box>
  <Box p="4">
    <Text><strong>{award_result}</strong>{hasAwardCategory && <Text color="gray"> : {award_category}</Text>}</Text>
  </Box>
</Card>
```

---

### 13. `src/components/item/ItemAwardModal.tsx`
Replace Bootstrap modal with Radix `Dialog`. The `open` prop and `onClose` callback map directly.

```tsx
// Before
<div className="modal fade show" style={{ display: 'block' }}>
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h3 className="modal-title">{award_name}</h3>
        <button onClick={onClose} className="close">&times;</button>
      </div>
      <div className="modal-body">...</div>
    </div>
  </div>
</div>

// After
import { Dialog } from '@radix-ui/themes';

const ItemAwardModal: React.FC<ItemAwardModalProps> = ({ open, pdf, award_name, award_result, onClose }) => (
  <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
    <Dialog.Content maxWidth="800px">
      <Flex justify="between" align="center" mb="3">
        <Dialog.Title>{award_name}</Dialog.Title>
        <Dialog.Close>
          <IconButton variant="ghost" aria-label="Close"><Cross2Icon /></IconButton>
        </Dialog.Close>
      </Flex>
      <Heading size="4" mb="3">{award_result}</Heading>
      <embed src={pdf + '#view=FitH'} width="100%" height="600" type="application/pdf" />
    </Dialog.Content>
  </Dialog.Root>
);
```

`ItemAwardModalPortal.tsx` becomes a thin wrapper with no changes needed (it just renders ItemAwardModal via a portal).

---

### 14. `src/components/item/ItemMediaList.tsx`
The `getStyle()` function currently returns Bootstrap column class strings. Replace with CSS custom classes defined in `main.css`, keeping the same function signature.

```tsx
// Before
const getStyle = (data: MediaInfo): string => {
  if (is_single_item) return 'col-xs-12 col-xl-12 text-center';
  if (image_type === IMAGE_DESKTOP) return 'col-xs-12 col-xl-6 text-center';
  ...
};

// After
const getStyle = (data: MediaInfo): string => {
  const { image_type, is_single_item } = data;
  if (is_single_item) return 'media-col--full';
  if (image_type === fileTypes.IMAGE_DESKTOP) return 'media-col--half';
  if (image_type === fileTypes.IMAGE_OLM)  return 'media-col--third';
  if (image_type === fileTypes.IMAGE_SMARTPHONE) return 'media-col--quarter';
  return 'media-col--full';
};

// row → Grid
<Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="3" className="item__media">
  {desktop.map(renderItem)}
  ...
</Grid>
```

**CSS additions to `main.css`:**
```css
.media-col--full   { grid-column: 1 / -1; text-align: center; }
.media-col--half   { grid-column: span 1; text-align: center; }
.media-col--third  { grid-column: span 1; text-align: center; }
.media-col--quarter{ grid-column: span 1; text-align: center; }

@media (min-width: 1200px) {
  .media-col--half  { grid-column: span 1; }    /* 2-col grid → 1 of 2 */
  .media-col--third { grid-column: span 1; }    /* 3-col grid → 1 of 3 */
}
```

---

### 15. `src/components/CategoryItemImage.tsx` + image components
Remove `img-fluid img-thumbnail` Bootstrap classes; add `.img-fluid` and `.img-thumbnail` to `main.css` (done in §8). No structural change needed.

---

## Summary of `main.css` additions

New sections to append:

```css
/* ---- Navbar ---- */
.site-nav { ... }          /* dark flex bar */
.site-nav__toggler { ... } /* hamburger */
.site-nav__collapse { ... } /* collapsible region */
.site-nav a.nav-link { ... }

/* ---- Footer nav ---- */
footer a.nav-link { ... }

/* ---- Image utilities ---- */
.img-fluid { max-width: 100%; height: auto; }
.img-thumbnail { max-width: 100%; height: auto; border: 1px solid var(--grey-dark); }

/* ---- Media list columns ---- */
.media-col--full / half / third / quarter
```

---

## Files Changed

| File | Change type |
|---|---|
| `src/App.tsx` | Bootstrap div → Radix `Box` |
| `src/components/Header.tsx` | `page-header` → Radix `Box`/`Heading`/`Text` |
| `src/containers/NavBar.tsx` | Bootstrap nav → `site-nav` CSS + Radix `Flex`/`Button` |
| `src/components/NavBarLink.tsx` | Minor: class cleanup |
| `src/components/Dropdown.tsx` | Bootstrap dropdown → Radix `DropdownMenu` |
| `src/components/DropdownLink.tsx` | **Deleted** (absorbed into Dropdown) |
| `src/components/Items.tsx` | `row/ul` → Radix `Grid` |
| `src/components/CategoryItem.tsx` | Remove column classes; `div/li` → `Box` |
| `src/components/Footer.tsx` | Bootstrap nav/row → Radix `Flex`/`Text` |
| `src/containers/About.tsx` | Bootstrap grid/cards → Radix `Grid`/`Card`/`Text` |
| `src/components/item/ItemOverview.tsx` | Bootstrap card/btn → Radix `Card`/`Button` |
| `src/components/item/ItemDetails.tsx` | `list-group` → `Box`/`Separator`/`Flex` |
| `src/components/item/ItemAwards.tsx` | `card-deck` → Radix `Grid` |
| `src/components/item/ItemAward.tsx` | Bootstrap card/btn → Radix `Card`/`Button` |
| `src/components/item/ItemAwardModal.tsx` | Bootstrap modal → Radix `Dialog` |
| `src/components/item/ItemMediaList.tsx` | `row/col-*` → Radix `Grid` + CSS custom column classes |
| `src/components/CategoryItemImage.tsx` | Remove Bootstrap img classes (now in main.css) |
| `src/css/main.css` | Add navbar, footer nav, img utilities, media columns |

**Not changed:** `ItemImageDesktop`, `ItemImageOLM`, `ItemImageSmartphone`, `ItemPDF`, `ItemVIDEO`, `ItemImagePlaceholder`, `ArchiveItemIframe`, `ArchiveItemMediaList`, `Loader`, `CategoryItemAward`, `LazyLoadFadeImage` — these have trivial or no Bootstrap class usage; their `style` prop (Bootstrap class string) becomes a custom CSS class string after `getStyle()` is updated.

---

## Verification

1. `npm run build:prod` — zero TypeScript errors, clean build
2. Dev server (`npm run dev`) — visually check:
   - Homepage grid: 2 cols → 3 → 4 → 6 across breakpoints
   - Dark navbar with hamburger collapse on mobile
   - Year dropdown opens/closes
   - Item detail page: card layout, details list, awards grid, modal opens
   - About page: profile image, card deck of technology lists
   - Footer icon links centred
