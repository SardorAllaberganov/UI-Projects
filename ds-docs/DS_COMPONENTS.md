# DS Components

Masters live on page `17:2` "Design System" in Figma file
`gSas2PBv3XMAXj36FQDhFa`. Platform-chrome masters (iOS system UI) live
on a separate page `197:863` "Platform Chrome · iOS". Properties are
listed with their Figma type in parentheses. Source:
[.inventory-current.json](./.inventory-current.json).

Counts: 34 component sets · 23 single components · 24 icons · 81 total
masters.

- [Component sets — Design System](#component-sets--design-system)
- [Single components — Design System](#single-components--design-system)
- [Icons](#icons)
- [Slot pattern](#slot-pattern)
- [iOS Platform Chrome](#ios-platform-chrome)

---

## Component sets — Design System

31 sets on the `Design System` page. Sorted by master node id.

### Button — `19:2`

24 variants: `Variant` (Primary | Secondary | Tertiary | Destructive)
× `Size` (sm | md | lg) × `State` (Default | Disabled).

Component properties:
- `Label` (TEXT) — default `Button`
- `Show left icon` (BOOLEAN) — default `false`
- `Show right icon` (BOOLEAN) — default `false`
- `Left icon` (INSTANCE_SWAP) — default `arrow-left`; preferred: arrow-right, arrow-left, plus, check, download
- `Right icon` (INSTANCE_SWAP) — default `arrow-right`; preferred: same set

Pattern B inversion drives Primary fill from `color/surface-hero` with
`color/text-on-hero` label.

### Input — `36:107`

10 variants: `Style` (Boxed | Bottom-lined) × `State` (Default | Focus
| Filled | Error | Disabled).

Component properties:
- `Label` (TEXT) — default `Label`
- `Value` (TEXT) — default `Value`
- `Helper` (TEXT) — default `Helper text`
- `Show helper` (BOOLEAN) — default `true`
- `Show left icon` (BOOLEAN) — default `false`
- `Show right icon` (BOOLEAN) — default `false`
- `Left icon` (INSTANCE_SWAP) — preferred: search, close, arrow-left, arrow-right, plus
- `Right icon` (INSTANCE_SWAP) — preferred: same set

### Tab Bar — `54:309`

5 variants: `Active` (Home | Transfers | QR payment | Payments |
Monitoring). Bottom-nav reproduction of the Uzbek fintech pattern.

### Switch — `77:327`

2 variants: `State` (Off | On).

### Checkbox — `77:335`

3 variants: `State` (Unchecked | Checked | Indeterminate).

### Avatar — `78:328`

3 variants: `Size` (sm | md | lg).

Component properties:
- `Initials` (TEXT) — default `A`

### Badge — `78:339`

6 variants: `Variant` (Neutral | Positive | Negative | Warning | Brand
| Info).

Component properties:
- `Label` (TEXT) — default `Badge`

### Toast — `79:402`

4 variants: `Type` (Success | Info | Error | Warning).

Component properties:
- `Message` (TEXT) — default `Message goes here`

### OTP Input — `81:366`

3 variants: `State` (Default | Filled | Error).

### Switch Row — `83:384`

4 variants: `Label position` (Left | Right) × `State` (Off | On).

Component properties:
- `Label` (TEXT) — default `Setting label`

### Checkbox Row — `83:411`

6 variants: `Label position` (Left | Right) × `State` (Unchecked |
Checked | Indeterminate).

Component properties:
- `Label` (TEXT) — default `Option label`

### Spinner — `106:696`

3 variants: `Size` (sm | md | lg).

### Skeleton — `106:700`

3 variants: `Type` (Line | Block | Circle).

### Top Bar — `108:752`

3 variants: `Layout` (Screen | Brand | Large).

### Radio — `213:969`

2 variants: `State` (Unchecked | Checked).

### Radio Row — `213:984`

4 variants: `Label position` (Left | Right) × `State` (Unchecked |
Checked).

Component properties:
- `Label` (TEXT) — default `Option label`

### Chip — `214:974`

3 variants: `State` (Default | Selected | Disabled).

Component properties:
- `Label` (TEXT) — default `Filter`

### Card Visual — `216:992`

2 variants: `Theme` (Primary | Secondary). Visual card representation
for the Account/Card module — embossed PAN, holder name, expiry,
network logo.

Component properties:
- `Number` (TEXT) — default `•••• •••• •••• 4892`
- `Holder` (TEXT) — default `SARDOR ISLOMOV`
- `Expiry` (TEXT) — default `08/28`
- `Network` (TEXT) — default `VISA`

### Amount Input — `218:978`

2 variants: `State` (Default | Error).

Component properties:
- `Amount` (TEXT) — default `5 000 000`
- `Currency` (TEXT) — default `UZS`
- `Helper` (TEXT) — default `Available: 12 847 930 UZS`
- `Show helper` (BOOLEAN) — default `true`

### App Numpad — `219:1041`

2 variants: `Layout` (With letters | Numbers only). On-screen
numeric keypad for amount entry and PIN.

### Stepper — `226:1232`

2 variants: `State` (Default | Disabled).

Component properties:
- `Value` (TEXT) — default `3`

### FAB — `229:1223`

2 variants: `Size` (md | lg). Floating action button — used for the
centered QR payment node in the bottom nav.

Component properties:
- `Icon` (INSTANCE_SWAP) — default `plus`; preferred: plus, close, arrow-right, check

### Content Tabs — `232:1236`

3 variants: `Active` (Tab 1 | Tab 2 | Tab 3). Horizontal in-screen tab
selector (distinct from the bottom Tab Bar).

### Alert Dialog — `233:1279`

2 variants: `Type` (Warning | Destructive). Confirmation modal layer
with title + description + two buttons.

Component properties:
- `Title` (TEXT) — default `Review before sending`
- `Description` (TEXT) — default `The recipient's IBAN looks new.`

### Receipt Row — `241:1312`

2 variants: `Variant` (Default | Total). Label/value pair used in
transfer-confirm and statement layouts.

Component properties:
- `Label` (TEXT) — default `Transfer fee`
- `Value` (TEXT) — default `12 000 UZS`

### Progress Steps — `241:1331`

3 variants: `Current` (Step 1 | Step 2 | Step 3). Stepper indicator
for multi-screen flows.

### Slider — `259:260`

2 variants: `State` (Default | Disabled). Single-thumb range slider.

### Notification Banner — `260:296`

4 variants: `Type` (Info | Success | Warning | Error). Persistent
in-screen banner (not a Toast).

Component properties:
- `Title` (TEXT) — default `Update available`
- `Description` (TEXT) — default `Tap Update in Settings to get the latest features.`
- `Show close` (BOOLEAN) — default `true`

### Accordion — `261:286`

2 variants: `State` (Collapsed | Expanded).

Component properties:
- `Title` (TEXT) — default `What is a virtual card?`
- `Body` (TEXT) — default `A virtual card is a digital-only debit card you can use for online payments. It shares your main balance but has its own number.`

### Pagination Dots — `261:307`

4 variants: `Active` (Dot 1 | Dot 2 | Dot 3 | Dot 4). Onboarding /
carousel indicator.

### PIN Dots — `270:330`

7 variants: `Filled` (0 | 1 | 2 | 3 | 4 | 5 | 6). PIN entry progress
indicator.

---

## Single components — Design System

22 single (non-set) components on the `Design System` page.

### Account Card — `21:2` (360 × 202)

Hero card pattern. Pattern B full inversion in Light: `color/surface-hero`
fill + `color/text-on-hero` text.

Component properties:
- `Account label` (TEXT) — default `Everyday · 4892`
- `Type` (TEXT) — default `Checking`
- `Balance` (TEXT) — default `12 847 930 UZS`
- `Change amount` (TEXT) — default `+412 000 UZS`
- `Change period` (TEXT) — default `this week`
- `Show change` (BOOLEAN) — default `true`

### Transaction Row — `21:14` (360 × 60)

Component properties:
- `Avatar` (TEXT) — default `D`
- `Merchant` (TEXT) — default `Daybreak Coffee`
- `Meta` (TEXT) — default `Today · Food & drink`
- `Amount` (TEXT) — default `−48 000 UZS`

### Stat Card — `21:21` (301 × 152)

Component properties:
- `Label` (TEXT) — default `Spent this month`
- `Value` (TEXT) — default `4 120 000 UZS`
- `Change` (TEXT) — default `−12%`
- `Change label` (TEXT) — default `vs. last month`

### Segmented Control — `22:36` (350 × 44)

No component properties — purely visual segmented switch.

### Divider — `77:336` (320 × 1)

### List Item — `78:340` (360 × 64)

Component properties:
- `Title` (TEXT) — default `Account settings`
- `Subtitle` (TEXT) — default `Manage your profile`
- `Show subtitle` (BOOLEAN) — default `true`
- `Show leading icon` (BOOLEAN) — default `true`
- `Show trailing icon` (BOOLEAN) — default `true`
- `Leading icon` (INSTANCE_SWAP) — default `home`; preferred: home, chevron-right, search, filter, bell
- `Trailing icon` (INSTANCE_SWAP) — default `chevron-right`; preferred: same set

### Modal — `79:326` (350 × 188)

Centered dialog. For top-attached alert variants, prefer the new
`Alert Dialog` set.

Component properties:
- `Title` (TEXT) — default `Cancel transfer?`
- `Description` (TEXT) — default `This will cancel your scheduled transfer to Jordan Park. This action can't be undone.`

### Bottom Sheet — `79:353` (390 × 316)

Slot-based bottom sheet. The body is an INSTANCE_SWAP that accepts any
`Sheet Slot / *` component. See [Slot pattern](#slot-pattern) below.

Component properties:
- `Title` (TEXT) — default `Choose an account`
- `Content` (INSTANCE_SWAP) — default `Sheet Slot / Account Picker`; preferred: Account Picker, Action Menu, Empty

### Sheet Slot / Account Picker — `103:644` (390 × 231)
### Sheet Slot / Action Menu — `103:667` (390 × 243)
### Sheet Slot / Empty — `103:703` (390 × 151)

The three swap targets for Bottom Sheet's `Content` slot.

### Progress Bar — `106:682` (320 × 8)

No properties — width is auto-layout filled.

### Empty State — `107:682` (390 × 431)

Component properties:
- `Title` (TEXT) — default `No transactions yet`
- `Description` (TEXT) — default `Transfers you send or receive will show up here.`

### Success State — `107:715` (390 × 431)

Component properties:
- `Title` (TEXT) — default `Transfer sent`
- `Description` (TEXT) — default `485 000 UZS to Jordan Park should arrive in under 30 seconds.`

### Error State — `107:740` (390 × 431)

Component properties:
- `Title` (TEXT) — default `Something went wrong`
- `Description` (TEXT) — default `We couldn't complete your transfer. No money has left your account.`

### Tooltip — `108:700` (93 × 37)

Component properties:
- `Label` (TEXT) — default `Helpful hint`

### Dropdown Menu — `108:705` (240 × 165)

No component properties.

### Date Picker — `220:975` (336 × 392)

No component properties (calendar grid is internal).

### Section Header — `241:1303` (360 × 24)

Component properties:
- `Title` (TEXT) — default `Recent transactions`
- `Action` (TEXT) — default `See all`
- `Show action` (BOOLEAN) — default `true`

### Onboarding Slide — `245:1311` (390 × 518)

Component properties:
- `Title` (TEXT) — default `Your money, simplified`
- `Description` (TEXT) — default `Send, save, and track every UZS in one place. Works with every Uzbek bank.`

### Card — `259:261` (360 × 92)

Generic content card with optional border.

Component properties:
- `Title` (TEXT) — default `Card title`
- `Body` (TEXT) — default `Body text — replace with any content.`
- `Show border` (BOOLEAN) — default `true`

### Full-screen Loader — `270:276` (402 × 874)

Full-page loader overlay.

Component properties:
- `Title` (TEXT) — default `Загрузка…`
- `Description` (TEXT) — default `Пожалуйста, подождите`
- `Show description` (BOOLEAN) — default `true`

---

## Icons

24 single COMPONENT icons on the `Design System` page. All 20×20.
Used as INSTANCE_SWAP targets in Button, Input, List Item, and FAB.

| Name | ID |
|---|---|
| Icon / arrow-right | `43:103` |
| Icon / arrow-left | `43:106` |
| Icon / plus | `43:109` |
| Icon / check | `43:112` |
| Icon / download | `43:115` |
| Icon / close | `43:118` |
| Icon / search | `47:142` |
| Icon / filter | `47:146` |
| Icon / bell | `47:149` |
| Icon / user | `47:152` |
| Icon / home | `47:156` |
| Icon / chevron-right | `47:159` |
| Icon / chevron-down | `47:162` |
| Icon / eye | `47:165` |
| Icon / more | `47:169` |
| Icon / copy | `47:174` |
| Icon / transfers | `55:150` |
| Icon / qr | `55:153` |
| Icon / card | `55:165` |
| Icon / chart-up | `55:169` |
| Icon / arrow-up | `55:172` |
| Icon / arrow-down | `55:175` |
| Icon / alert-circle | `55:178` |
| Icon / bell-active | `82:876` |

---

## Slot pattern

`Bottom Sheet` uses an INSTANCE_SWAP `Content` property to accept any
`Sheet Slot / *` component. To add a new sheet body:

1. Create a component named `Sheet Slot / <Name>` next to existing
   slots on the `Design System` page.
2. Add it to the `preferredValues` of the `Content` property on
   Bottom Sheet (`79:353`).
3. Use auto-layout sized to the sheet width (390); the parent expands
   to fit.

The same pattern can be applied to any container component — pair an
INSTANCE_SWAP property with a clearly-namespaced slot folder.

---

## iOS Platform Chrome

3 component sets + 1 single component on the `Platform Chrome · iOS`
page. **These reproduce Apple system UI** for use in app screenshots
and onboarding mockups. App content should NOT bind to `color/ios/*`
tokens — those exist to drive these chrome components only.

### iOS Status Bar — `144:3519`

2 variants: `Type` (Default | Cupertino Bottom Sheet). 415 × 195.
Time/signal/wifi/battery indicators.

### iOS Keyboard — `144:3568`

6 variants: `Type` (Letters | Numbers | Symbols) × `Dark Mode` (False
| True). 876 × 993.

Component properties:
- `Show Toolbar` (BOOLEAN) — default `false`
- `Show Suggestion` (BOOLEAN) — default `false`
- `Show Decimal Point` (BOOLEAN) — default `false`
- `Show Keyboard Layouts` (BOOLEAN) — default `true`
- `Show Button` (BOOLEAN) — default `false`
- `Show Glyphs` (BOOLEAN) — default `false`

### iOS Search Bar — `144:4153`

4 variants: `Type` (Default | With cancel) × `Theme` (Light | Dark).
810 × 172.

### iOS Home Indicator — `207:990` (390 × 34)

Single component. The 5px black pill at the bottom of an iPhone
screen. No properties.
