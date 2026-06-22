== stage-01-03 (6 checked) ==
PASS: Intl P2P / 01 Country / Idle, Intl P2P / 01 Country / Search
[BLOCKER] Intl P2P / 02 KYC / Empty (10847:39459)
  defect: KNOWN ISSUE STILL PRESENT (partially): 'Keyingisi' CTA is a small hug-width gray chip (~70px wide) centered near the bottom — not the required full-width 358px disabled pill docked above the home indicator. QA fix list explicitly requires full-width dock.
  fix: Replicate the Phase 2 dock pattern from frame 10860:39459: create a 390x72 Button wrapper (auto-layout, paddingLeft/Right=16, paddingTop=4, paddingBottom=20) docked at y=738; move the CTA pill inside and set layoutSizingHorizontal='FILL' (resolves to 358x48), cornerRadius=24, fill #E5E7EB, label color #9CA3AF.
[BLOCKER] Intl P2P / 02 KYC / Empty (10847:39459)
  defect: NEW: all four input fields (Ism, Familiya, Pasport seriyasi va raqami, Tug'ilgan sana) hug their placeholder text width — each field is a different narrow width instead of the DNA-spec full-width filled field (h=48, radius 16, fill bg/main). The form reads visually broken.
  fix: For each input field frame inside the body auto-layout: set layoutSizingHorizontal='FILL' (or resize to 358x48 if parent is not auto-layout), keep height 48, cornerRadius 16, fill #F2F3F4, paddingH 16. Re-assert body primaryAxisSizingMode='AUTO' after changes.
[MINOR] Intl P2P / 02 KYC / Empty (10847:39459)
  defect: KNOWN ISSUE STILL PRESENT: back arrow is a dark rounded-rectangle placeholder, not a chevron glyph.
  fix: Copy the real 24x24 back-arrow vector node from the navbar of cloned frame 10844:39091 and replace the placeholder rectangle in the navbar (same x/y slot, 24x24).
[MINOR] Intl P2P / 02 KYC / Empty (10847:39459)
  defect: KNOWN ISSUE PARTIALLY FIXED: '9:41' time is now present, but the status-icon cluster is a gray 68x11 placeholder rectangle positioned top-CENTER instead of right-aligned signal/wifi/battery icons.
  fix: Move the 68x11 placeholder rectangle to x=306 (390 - 16 margin - 68) within the 43px status bar, or copy the real status-icons instance from frame 10844:39091 and place it right-aligned.
[MINOR] Intl P2P / 02 KYC / Empty (10847:39459)
  defect: NEW: 'Tug'ilgan sana' field has no calendar icon (spec stage table: 'Tug'ilgan sana (calendar icon)'). Info-banner icon is also a bare blue circle with no i-glyph (known Phase 1 placeholder).
  fix: Make the Tug'ilgan sana field a horizontal auto-layout with space-between and append a 20x20 calendar icon (library icon instance, color #556379) right-aligned inside the field. Optionally add an 'i' text glyph (white, 12px, centered) inside the banner's blue circle.
[BLOCKER] Intl P2P / 02 KYC / Filled (10848:39459)
  defect: KNOWN ISSUE STILL PRESENT (partially): enabled 'Keyingisi' CTA is a small hug-width dark chip near the bottom, not a full-width 358x48 docked pill. No keyboard on this frame, so per QA fix list it must dock full-width.
  fix: Same fix as 02 KYC / Empty: 390x72 Button wrapper docked at y=738, CTA pill layoutSizingHorizontal='FILL' (358x48), cornerRadius=24, fill #1C1C1C, white text-md/medium label.
[BLOCKER] Intl P2P / 02 KYC / Filled (10848:39459)
  defect: NEW: input fields hug filled-text width (Mirjamol / Bekhzod / AS 1234567 / 07.10.1998 are all different narrow widths) instead of full-width 358x48 filled fields. Values themselves are correct per spec.
  fix: Set layoutSizingHorizontal='FILL' on all four input field frames (height 48, cornerRadius 16, fill #F2F3F4 retained); re-assert body primaryAxisSizingMode='AUTO'.
[MINOR] Intl P2P / 02 KYC / Filled (10848:39459)
  defect: KNOWN ISSUES STILL PRESENT: back arrow is a dark rounded-rect placeholder; status-icon cluster is a gray placeholder bar at top-center instead of right-aligned; Tug'ilgan sana calendar icon missing.
  fix: Apply the same three fixes as on 10847:39459: copy real back-arrow vector from 10844:39091; move/replace status-icon placeholder to right-aligned x=306; add 20x20 calendar icon inside the Tug'ilgan sana field.
[BLOCKER] Intl P2P / 03 Method / Default (10849:39459)
  defect: NEW: method-card subtitles clip at the card edge with no wrap or ellipsis. Card 2 shows 'Raqamga bog'langan karta yoki hamyo' (spec: '...yoki hamyonga') and card 3 shows 'Alipay, WeChat va boshqa hamyonlarg' (spec: '...hamyonlarga') — text runs under the chevron and is cut. All 5 titles/order are otherwise correct.
  fix: In each method card, set the text column to layoutSizingHorizontal='FILL' and the subtitle text node to textAutoResize='HEIGHT' with layoutSizingHorizontal='FILL' so the full string wraps to a second line; ensure the card's horizontal auto-layout reserves the 40px icon tile and ~24px chevron, leaving ~250px for text.
[MINOR] Intl P2P / 03 Method / Default (10849:39459)
  defect: KNOWN ISSUE STILL PRESENT: method icons are 20x20 plain blue ellipse dots on light-blue tiles — not card/phone/wallet/bank/cash icons.
  fix: Replace each ellipse with the matching library icon instance (credit-card, phone, wallet, bank, cash/banknote) at 20x20, color #438BFA, centered in the 40x40 light-blue tile.
[MINOR] Intl P2P / 03 Method / Default (10849:39459)
  defect: NEW: trailing chevrons are rendered as small dark vertical rectangle blocks (read as '▮'), and the back arrow is the same dark rounded-rect placeholder as the KYC frames; status-icon cluster is the gray placeholder bar at top-center.
  fix: Replace each trailing rectangle with a chevron-right vector (copy from a Country list card in 10844:39091), ~16px, color #99A4B2; replace navbar placeholder with the real 24x24 back-arrow vector; right-align the status-icon placeholder at x=306 or swap in the real instance.
[BLOCKER] Intl P2P / 03 Method / Unavailable (10850:39459)
  defect: NEW: 'Telefon raqami orqali' subtitle still clipped at card edge ('Raqamga bog'langan karta yoki hamyo' — missing 'nga'). Grayed states themselves are correct: Hamyonga o'tkazma and Naqd pul o'tkazmasi both gray with exact subtitle 'Bu davlat uchun mavjud emas'.
  fix: Same wrap fix as 10849:39459: set the Telefon card's text column and subtitle node to layoutSizingHorizontal='FILL' with textAutoResize='HEIGHT' so the subtitle wraps instead of clipping.
[MINOR] Intl P2P / 03 Method / Unavailable (10850:39459)
  defect: KNOWN ISSUES STILL PRESENT: icon dots instead of method icons (gray dots on disabled cards, blue on enabled); rectangle-block chevrons; dark rounded-rect back-arrow placeholder; gray status-icon placeholder bar at top-center.
  fix: Apply the same icon/chevron/back-arrow/status-bar replacements as on 10849:39459; for the two disabled cards use the same method icons tinted #9CA3AF on the gray tile.

== stage-04 (6 checked) ==
PASS: 
[BLOCKER] Intl P2P / 04 Amount / Card picker sheet (10867:39459)
  defect: Home indicator is missing: the white sheet panel extends to the bottom edge and covers/omits the 139x5 dark home-indicator bar (verified by cropping bottom 84px - pure white). Spec DNA requires the home indicator on every frame.
  fix: Bring the home-indicator node to the front of the frame's children (frame.appendChild(homeIndicatorFrame) after the sheet panel), or create a new 139x5 rect, cornerRadius=100, fill #1c1c1c, centered at x=125.5, y=831, appended above the sheet panel.
[MINOR] Intl P2P / 04 Amount / Card picker sheet (10867:39459)
  defect: Selected-card indicator on the NBU row reads as a minus sign (blue circle with a white horizontal bar), not a checkmark. Spec calls for a check on the selected card.
  fix: Inside the blue indicator circle, replace the white 10x2 rectangle with a check vector: figma.createVector() with vectorPaths [{windingRule:'NONZERO', data:'M 5 10 L 8.5 13.5 L 15 6'}], stroke white 2px, strokeCap ROUND, no fill, sized ~12x10 centered in the 20x20 circle.
[MINOR] Intl P2P / 04 Amount / Insufficient balance (10869:39459)
  defect: FX card values are stale for the entered amount: amount field shows 2 000 USD but the card still reads 'Komissiya 0,5% — 6 325 UZS' and 'Qabul qiladi 100 USD' (values computed for 100 USD). Internally inconsistent state.
  fix: On the FX card, setCharacters on the Komissiya value text node to '0,5% — 126 500 UZS' and on the Qabul qiladi value text node to '2 000 USD' (2 000 USD x 12 650 = 25 300 000 UZS; 0,5% = 126 500 UZS).
[MINOR] Intl P2P / 04 Amount / UZB sender / Empty (10860:39459)
  defect: Empty state shows computed FX values: amount placeholder is 0 but FX card reads 'Komissiya 0,5% — 6 325 UZS' and 'Qabul qiladi 100 USD'. Contradicts the empty input.
  fix: setCharacters on the Komissiya value node to '0,5% — 0 UZS' and on the Qabul qiladi value node to '0 USD' (keep 'Valyuta kursi 1 USD = 12 650,00 UZS' as is).
[MINOR] Intl P2P / 04 Amount / Foreign sender / Filled (10871:39459)
  defect: Komissiya math is wrong by 10x: shows '0,5% — 437,25 RUB' but 0,5% of 8 745 RUB is 43,73 RUB (437,25 RUB would be 5%).
  fix: setCharacters on the Komissiya value text node to '0,5% — 43,73 RUB'.
[MINOR] Intl P2P / 04 Amount / Foreign sender / Empty (10870:39459)
  defect: FX card shows filled computed values on the empty state ('Komissiya 0,5% — 437,25 RUB', 'Qabul qiladi 100 USD' while amount is 0), and the 437,25 RUB figure is also not 0,5% of anything (0,5% of 8 745 = 43,73).
  fix: setCharacters on the Komissiya value node to '0,5% — 0 RUB' and on the Qabul qiladi value node to '0 USD'.
[MINOR] Intl P2P / 04 Amount / Foreign sender / Empty (10870:39459)
  defect: Russia flag in the 'Yuboruvchi: Rossiya' chip is a hand-drawn striped circle that renders as a dark blue/red blob - the white top stripe is nearly invisible, so it does not read as the RU flag.
  fix: Replace the 20x20 stripe-stack frame with a library Country Flags 'RU' component instance (importComponentByKeyAsync), resized to 20x20 circular; or add a 0.5px #E5E7EB outer stroke and increase the white stripe to a full visible third.
[MINOR] Intl P2P / 04 Amount / Foreign sender / Filled (10871:39459)
  defect: Same Russia flag approximation as the Empty foreign frame - white stripe nearly invisible, flag reads as a blob.
  fix: Same as Foreign/Empty: swap the stripe-stack frame for a library 'RU' flag instance at 20x20, or fix stripe proportions and add a hairline border.
[MINOR] Intl P2P / 04 Amount / UZB sender / Empty (10860:39459)
  defect: Placeholder glyphs: back arrow is a solid dark rectangle, status-bar icons are a gray 68x11 rectangle, and the sender-row chevron is a dark vertical bar instead of a '>' chevron.
  fix: Swap placeholders for real glyphs: import back-arrow and chevron-right icon components from the library (importComponentByKeyAsync) and replace the rectangles; clone the real status-icon instance from anchor frame 10796:53295 into the status bar.
[MINOR] Intl P2P / 04 Amount / UZB sender / Filled (10864:39459)
  defect: Same placeholder glyphs as Empty: dark-rectangle back arrow, gray-bar status icons, vertical-bar chevron on the sender card row.
  fix: Same swap as UZB/Empty: replace rectangles with real back-arrow and chevron icon instances; clone real status icons from anchor 10796:53295.
[MINOR] Intl P2P / 04 Amount / Card picker sheet (10867:39459)
  defect: Placeholder glyphs carried over from the base screen (rectangle back arrow, gray-bar status icons, bar chevron) visible through the dim overlay.
  fix: Same icon swap as the UZB frames on the underlying screen content.
[MINOR] Intl P2P / 04 Amount / Insufficient balance (10869:39459)
  defect: Same placeholder glyphs: rectangle back arrow, gray-bar status icons, bar chevron on sender card row.
  fix: Same icon swap as the other UZB frames.
[MINOR] Intl P2P / 04 Amount / Foreign sender / Empty (10870:39459)
  defect: Placeholder glyphs: rectangle back arrow and gray-bar status icons.
  fix: Replace with real back-arrow icon instance and cloned status-icon instance from anchor 10796:53295.
[MINOR] Intl P2P / 04 Amount / Foreign sender / Filled (10871:39459)
  defect: Placeholder glyphs: rectangle back arrow and gray-bar status icons.
  fix: Replace with real back-arrow icon instance and cloned status-icon instance from anchor 10796:53295.

== stage-05 (8 checked) ==
PASS: Intl P2P / 05 Recipient / Card / Error
[MINOR] Intl P2P / 05 Recipient / Card / Empty (10879:39459)
  defect: Trailing 'scan' icon reads as an empty checkbox with a minus dash, not a card-scan/QR glyph. Also (applies to ALL 8 stage-05 frames): the nav back arrow is a dark rounded-rectangle placeholder, not a chevron glyph.
  fix: In the trailing 24x24 outline frame, delete the inner dash and draw 4 L-shaped corner brackets (2px stroke #556379) to read as a scan viewfinder. For the back arrow on all 8 frames, replace the 10x16 rounded rect with a left-chevron vector (two 2px #0f172a strokes meeting at a point) sized ~10x18 inside the 24x24 navbar slot.
[MINOR] Intl P2P / 05 Recipient / Card / Resolved (10880:39459)
  defect: Spec says resolved chip shows 'Qodirov Rustam · Optima Bank logo' — the build shows a person-initials 'QR' avatar and 'Optima Bank' as plain gray text with no bank logo. Also the trailing input icon is now an empty outline square (inner glyph missing, inconsistent with the Empty state).
  fix: Add a 20x20 rounded-square bank-logo tile (fill #1668C9, white 'O' Geologica Bold 11px) immediately before the 'Optima Bank' subtitle text inside the resolved card's horizontal auto-layout; or import a real Optima logo asset via upload_assets. Restore the same scan-viewfinder glyph used on Card/Empty inside the trailing 24x24 square.
[MINOR] Intl P2P / 05 Recipient / Phone / Empty (10882:39459)
  defect: KG flag is a generic red circle with a white ring (reads as a record button, not the Kyrgyzstan flag); spec/library has 96 Country Flag components that should be instanced. Contacts icon is a plain solid #438BFA disc with no person glyph.
  fix: Replace the 20x20 red circle with an instance of the library Country Flags / Kyrgyzstan component (importComponentByKeyAsync, resize 20x20, circular clip); fallback: red circle + small yellow sun ellipse center. For the contacts icon, overlay a white person silhouette on the blue disc: 6px head circle at top-center + 12x7 rounded-rect shoulders below.
[MINOR] Intl P2P / 05 Recipient / Phone / Wallet sheet (10883:39459)
  defect: Selected-state badge on Alipay is a blue circle with a white horizontal dash — it reads as a 'remove/minus' control, not a checkmark, inverting the meaning of 'selected'. Also the dim overlay does not cover the nav header ('Qabul qiluvchi ma'lumotlari' and 9:41 render at full contrast above the dim) and the underlying Phone/Empty screen content is absent behind the overlay (uniform gray).
  fix: Inside the 20x20 blue badge, replace the 10x2 white bar with a checkmark vector: two white 2px strokes (4px and 8px) joined at a corner, rotated ~45°. Re-order layers so the 0.4-opacity dim rectangle covers the full 390x844 frame above the header/status bar (appendChild overlay after body+header, before the sheet panel), and clone the Phone/Empty body (input field + recents chip) into the base layer beneath the overlay.
[MINOR] Intl P2P / 05 Recipient / Bank / Empty (10884:39459)
  defect: The three dropdown fields (Bankni tanlang, O'tkazma maqsadini tanlang, Mablag' manbaini tanlang) use a tiny dark dash as the trailing affordance instead of a chevron-down glyph — they don't read as dropdowns.
  fix: In each of the 3 dropdown fields, replace the trailing dash rect with a chevron-down vector: two 2px #556379 strokes (~6px each) meeting at a downward point, centered in a 16x16 slot at the field's right padding edge.
[MINOR] Intl P2P / 05 Recipient / Bank / Selector sheet (10885:39459)
  defect: Search field icon is a plain gray filled circle, not a magnifier glyph. Optima Bank selected indicator is the same blue-circle-with-white-dash 'minus' badge instead of a checkmark. Same overlay z-order issue as the wallet sheet: nav header renders un-dimmed above the dim layer and the underlying Bank/Empty form is not visible behind it.
  fix: Replace the gray circle with a magnifier: 9x9 circle with 1.5px #9ca3af stroke + 4px handle stroke at 45° bottom-right. Swap the dash in the Optima badge for a white checkmark vector (two 2px strokes at a corner, rotated ~45°). Extend/raise the dim overlay to cover the full frame including the header, and clone the Bank/Empty body fields into the base layer beneath it.
[MINOR] Intl P2P / 05 Recipient / Cash / Empty (10886:39459)
  defect: Input placeholders 'Ismingizni kiriting' / 'Familiyangizni kiriting' address the SENDER ('your name') but these fields capture the RECIPIENT's name — wrong grammatical person for this screen. Banner bg (#EAF3FF) is subtle against the #F2F3F4 screen bg (spec's own pending QA item) and the banner icon is a bare blue disc with no 'i' glyph; KG flag is the same generic red circle as Phone/Empty.
  fix: setCharacters on the two placeholder text nodes: 'Ismini kiriting' and 'Familiyasini kiriting'. Add a 1px solid #438BFA stroke to the banner frame (per spec QA fix list). Overlay a white lowercase 'i' (2x2 dot + 2x7 bar) on the 20x20 blue banner disc. Replace the KG flag circle with the library Country Flags / Kyrgyzstan instance.

== stage-06-07 (6 checked) ==
PASS: 
[BLOCKER] Intl P2P / 06 Pre-check / UZB sender (10893:39459)
  defect: Summary card collapsed to a 10px-high sliver — node 10893:39466 (Summary Card) is 358x10 and every row frame (10893:39467, 39472, 39477, 39482, 39487, 39492, 39497) is 326x10. All 7 rows including the required bold 'Jami yechiladi · 1 271 325 UZS' are invisible in render; only a thin white strip shows. Content/copy in the nodes is correct (Qodirov Rustam, 2221 77•• •••• 0994, 100 USD, 1 USD = 12 650,00 UZS, 0,5% — 6 325 UZS, 1 271 325 UZS, 10.06.2026, 14:30) but nothing renders.
  fix: use_figma script: bottom-up, set primaryAxisSizingMode='AUTO' on each of the 7 row frames (10893:39467, 39472, 39477, 39482, 39487, 39492, 39497), then on Summary Card 10893:39466 (expected hug height ~250). Then set Body Container 10893:39509 to layoutMode='VERTICAL', itemSpacing=12, paddingH=16, paddingTop=16 so the Sender Card Row reflows below the expanded card instead of overlapping at y=38. After expansion, verify 'Jami yechiladi' row (10893:39493/39495) uses Medium/SemiBold weight per spec (bold row).
[BLOCKER] Intl P2P / 06 Pre-check / UZB sender (10893:39459)
  defect: Sender-card row collapsed — node 10893:39501 is 358x10; its children sit at negative y (Card Info at y=-12.5, Card Chip at y=-7), so the NBU chip, balance '987 654,32 UZS', '••1456 | NBU · Humo' and chevron render clipped/garbled at the top of the body (visible in screenshot as a cut green NBU chip over smudged text).
  fix: use_figma script: on 10893:39501 set layoutMode='HORIZONTAL', primaryAxisSizingMode='FIXED' width 358, counterAxisSizingMode='FIXED' then resize height to 64 (or set counterAxisSizingMode='AUTO' with paddingTop/Bottom=12), counterAxisAlignItems='CENTER'. With Body Container converted to vertical auto-layout (see previous fix) it will sit below the summary card with the chevron right-aligned.
[MINOR] Intl P2P / 06 Pre-check / UZB sender (10893:39459)
  defect: Back arrow is a 10x16 rounded-rectangle placeholder and status-bar icons are a 68x11 gray rectangle (applies to all 5 non-sheet frames in this group: 10893, 10894, 10895, 10896, 10897). Documented Phase 1 deviation, still flagged in the spec's QA fix list.
  fix: Replace Back Arrow rect (10893:39464 and siblings on the other frames) with a chevron-left vector (createVector, path 'M9 1 L2 8 L9 15', stroke #0F172A 2px), and swap the 68x11 Status Icons rectangle for the library status-icon instance used on the cloned 01 Country frames.
[BLOCKER] Intl P2P / 06 Pre-check / Foreign sender (10894:39459)
  defect: Same summary-card collapse as the UZB variant — node 10894:39466 is 358x10 with all 7 row frames (10894:39467, 39472, 39477, 39482, 39487, 39492, 39497) at 326x10. None of the 7 rows, including 'Jami yechiladi · 1 271 325 UZS', is visible; the card renders as a white sliver.
  fix: use_figma script: bottom-up primaryAxisSizingMode='AUTO' on the 7 row frames, then on Summary Card 10894:39466; convert Body Container 10894:39504 to layoutMode='VERTICAL', itemSpacing=12, paddingH=16, paddingTop=16 so the Note reflows below the card. Verify 'Jami yechiladi' row weight is bold after expansion.
[BLOCKER] Intl P2P / 06 Pre-check / Foreign sender (10894:39459)
  defect: Note pill collapsed — node 10894:39501 is 358x10; the gray pill background is invisible, the info icon (10894:39502, y=-3) is half-clipped, and the note text 'To'lov keyingi qadamda amalga oshiriladi' renders with descenders cut, floating at the top of the body overlapping where the summary card should be.
  fix: use_figma script: on 10894:39501 set counterAxisSizingMode/height to hug (resize to 358x44, paddingV=12, counterAxisAlignItems='CENTER') or set primaryAxisSizingMode='AUTO' if vertical; it will reflow below the expanded summary card once Body Container is vertical auto-layout.
[BLOCKER] Intl P2P / 07 Confirm / OTP / Empty (10895:39459)
  defect: Title Stack collapsed — node 10895:39466 is 342x10, so the heading 'Tasdiqlash kodi' (10895:39467, h=28) renders as a clipped unreadable band and the required subtitle '+998 99 *** ** 90 raqamiga yuborilgan kodni kiriting' (10895:39468 at y=36) is completely invisible.
  fix: use_figma script: set primaryAxisSizingMode='AUTO' on 10895:39466 (hug height ~82). Then reposition siblings inside OTP Body 10895:39465: Amount Banner 10895:39469 to y=146, OTP Cells 10895:39472 to y=214, Resend Pill 10895:39479 to y=294 — or convert OTP Body to layoutMode='VERTICAL' with paddingTop=40, paddingH=24, itemSpacing=24 and let it reflow.
[MINOR] Intl P2P / 07 Confirm / OTP / Empty (10895:39459)
  defect: Amount banner pill collapsed — node 10895:39469 is 342x10; the banner background renders as a hairline sliver and the info ellipse (y=-4) is clipped. The text 'O'tkazma summasi: 100 USD ~ 1 265 000 UZS' is correct and readable but floats with no banner behind it.
  fix: use_figma script: on 10895:39469 resize to 342x44 (or set sizing to hug with paddingV=12), counterAxisAlignItems='CENTER', restoring the light-blue pill background behind the text and icon.
[BLOCKER] Intl P2P / 07 Confirm / OTP / Error (10896:39459)
  defect: Title Stack collapsed — node 10896:39466 is 342x10: heading 'Tasdiqlash kodi' clipped to an unreadable band, subtitle '+998 99 *** ** 90 raqamiga yuborilgan kodni kiriting' (10896:39468) fully hidden. The error-specific content itself is correct: 6 red-bordered cells with digits 4 8 2 9 1 5 and exact copy 'Kod noto'g'ri. Qayta urinib ko'ring' in red, enabled dark 'Qayta yuborish' pill.
  fix: use_figma script: set primaryAxisSizingMode='AUTO' on 10896:39466, then shift Amount Banner 10896:39469 to y=146, OTP Cells Block 10896:39472 to y=214, Resend Pill 10896:39487 to y=318 — or convert OTP Body 10896:39465 to vertical auto-layout (paddingTop=40, paddingH=24, itemSpacing=24).
[MINOR] Intl P2P / 07 Confirm / OTP / Error (10896:39459)
  defect: Amount banner pill collapsed — node 10896:39469 is 342x10, same as the Empty variant: correct text but no visible banner background, info ellipse clipped.
  fix: use_figma script: resize 10896:39469 to 342x44 (hug with paddingV=12), counterAxisAlignItems='CENTER'.
[BLOCKER] Intl P2P / 07 Confirm / Foreign form (10897:39459)
  defect: Entire payment-form card collapsed — Input Card 10897:39467 is 358x10 with nested collapses: Card Number Block 10897:39468 (326x10), Card Input Row 10897:39470 (326x10), Expiry CVC Row 10897:39477 (326x10), and both half-width blocks 10897:39478/39482 (157x10). The card-number field, '0000 0000 0000 0000' placeholder, VISA/MIR badges, 'Amal qilish muddati'/'MM/YY' and 'CVC'/'•••' inputs are all invisible — the screen shows only a white sliver between the navbar and the CTA. CTA 'To'lash · 8 745 RUB' and navbar 'To'lov ma'lumotlari' are correct.
  fix: use_figma script, bottom-up: set primaryAxisSizingMode='AUTO' on 10897:39478 and 10897:39482 (each should hug to ~63 with label + 44px input), then on 10897:39470, 10897:39468, 10897:39477, and finally Input Card 10897:39467 (expected hug ~180 with padding 16). Then set Body Container 10897:39466 to layoutMode='VERTICAL', itemSpacing=12, paddingH=16, paddingTop=16 so the 3-D Secure note reflows below the card.
[MINOR] Intl P2P / 07 Confirm / Foreign form (10897:39459)
  defect: 3-D Secure note collapsed — node 10897:39486 is 358x10; the lock icon (10897:39487, y=-3, h=16) is clipped and there is no pill background. Text '3-D Secure orqali himoyalangan' is correct and readable.
  fix: use_figma script: resize 10897:39486 to 358x40 (or hug with paddingV=10), counterAxisAlignItems='CENTER' so icon and text center inside a visible pill.
[MINOR] Intl P2P / 07 Confirm / Switch method sheet (10899:39459)
  defect: Selected-row check indicator (10899:39471 Check Circle) renders as a blue circle with a white horizontal bar — it reads as a minus/remove icon, not a checkmark. Spec calls for 'Saqlangan karta ✓'.
  fix: use_figma script: delete the white rectangle inside 10899:39471 and append a checkmark vector (createVector, path 'M6 12 L10 16 L18 8', stroke #FFFFFF, strokeWeight 2, strokeCap ROUND), centered in the 24x24 circle.
[MINOR] Intl P2P / 07 Confirm / Switch method sheet (10899:39459)
  defect: Placeholder glyphs: all three method icon tiles (10899:39467, 39474, 39480) are plain blue circles with no card/bank/app glyph, and the chevrons on unselected rows (10899:39478, 39484) are 8x14 gray rectangles. Also the status bar shows only '9:41' with no right-side status icons (sibling frames at least carry the 68x11 placeholder rect).
  fix: Swap icon-tile circles for library icon instances (card / card-plus / bank-app) per the spec QA fix list; replace chevron rects with chevron-right vectors (path 'M1 1 L7 7 L1 13', stroke #99A4B2 2px); add the 68x11 status-icons element to Status Bar 10899:39461 for consistency. Sheet itself passes: content ends at y=379 inside the 400px panel — no clipping; copy, dim overlay, top-radius 24, selected-row highlight and 'Tasdiqlash' CTA all correct.

== stage-08 (4 checked) ==
PASS: 
[BLOCKER] Intl P2P / 08 Receipt / Success (10904:39459)
  defect: Action rail (Saqlash / Tafsilotlar / Takrorlash) is clipped to a ~25px white strip at ~y=515: only the top arcs of the three blue icon tiles are visible, all three labels are completely unreadable. Confirms the known clipsContent risk on the fixed-height body.
  fix: Find the action-rail card frame inside the Body container; set its primaryAxisSizingMode='AUTO' (layoutSizingVertical='HUG') and re-assert AFTER children are appended so it expands to fit the 48px tiles + 8px gap + label rows (~96px total). Then set Body.clipsContent=false (or grow Body height) so the expanded rail is not cut at the 723px boundary.
[BLOCKER] Intl P2P / 08 Receipt / Success (10904:39459)
  defect: Ulashish/Yopish button row floats mid-screen at ~y=560-610 with ~200px of empty gradient below it before the home indicator (y=810). Spec/DNA requires bottom controls docked full-width above the home indicator (cf. Stage 04 pattern: 390×72 wrapper at y=738).
  fix: Move the Ulashish/Yopish row out of the body flow into a docked footer: create/position a 390×72 wrapper (paddingH=16, paddingTop=4, paddingBottom=20) at y=738 on the frame root and reparent the two pills into it as FILL-width halves with 12px gap. Alternatively insert a FILL-height spacer in Body between the action rail and the button row.
[MINOR] Intl P2P / 08 Receipt / Success (10904:39459)
  defect: APPROVED stamp is not horizontally centered: its center sits at ~x=142 while the cheque card center is ~x=195 (stamp occupies ~x=95-190, offset left). Group requirement: stamps rotated AND centered.
  fix: In the 60px stamp container frame, set the rotated stamp group's x so its bounding box centers: stamp.x = (container.width - stamp.width) / 2 (or set counterAxisAlignItems='CENTER' / layoutAlign on the wrapper if auto-layout). Keep rotation -12 degrees.
[BLOCKER] Intl P2P / 08 Receipt / Error (10905:39459)
  defect: Action rail clipped identically to Success: thin white strip at ~y=625 shows only the tops of three gray/blue circles; Saqlash/Tafsilotlar/Takrorlash labels and the disabled-gray vs enabled-blue states are unreadable.
  fix: Same as Success: set the action-rail card's primaryAxisSizingMode='AUTO' after children are appended so it hugs tiles + labels, and set Body.clipsContent=false or increase Body height past 723px so the rail renders fully.
[MINOR] Intl P2P / 08 Receipt / Error (10905:39459)
  defect: Ulashish/Yopish row sits at ~y=670-718, ~92px above the home indicator instead of docked at y=738 per the established footer pattern. Same root cause as Success (in-flow placement, no docked footer).
  fix: Reparent the Ulashish/Yopish row into a 390×72 docked footer wrapper at y=738 (paddingH=16, paddingTop=4, paddingBottom=20), pills as FILL-width halves.
[MINOR] Intl P2P / 08 Receipt / Error (10905:39459)
  defect: REJECTED stamp is offset left of the cheque-card centerline (same ~x=95-190 placement as Success), violating the 'rotated and centered' requirement.
  fix: Center the rotated stamp group inside its container: stamp.x = (container.width - stamp.width) / 2, keep -12 degree rotation and red #E5484D styling.
[MINOR] Intl P2P / 08 Receipt / Error (10905:39459)
  defect: Error banner leading icon is a solid red filled circle, not an actual error/warning glyph (placeholder pattern carried over from Phase 3).
  fix: Replace the 20x20 solid ellipse in the red banner with a library error/alert icon instance (or draw an exclamation vector inside a red circle frame) in #E5484D.
[BLOCKER] Intl P2P / 08 Receipt / Hold (10906:39459)
  defect: CONFIRMED: leftover placeholder text 'Tekshirilmoqda...' renders in muted gray italic in the stamp area (~y=425, below the perforation). Spec mandates Hold has NO stamp and specifies no replacement copy — this is unsanctioned placeholder content.
  fix: Delete the 'Tekshirilmoqda...' TEXT node (and its wrapper frame if empty) inside the stamp-area container of frame 10906:39459; leave the area empty so the cheque simply ends after the perforation.
[BLOCKER] Intl P2P / 08 Receipt / Hold (10906:39459)
  defect: Action rail clipped to a ~20px strip at ~y=585: only the tops of three gray disabled circles are visible; all three labels unreadable, disabled state cannot be judged.
  fix: Same rail fix: set the action-rail card to HUG vertically (primaryAxisSizingMode='AUTO', re-asserted after append) and disable clipsContent on / enlarge the 723px Body container so tiles + labels render.
[MINOR] Intl P2P / 08 Receipt / Hold (10906:39459)
  defect: Ulashish/Yopish row at ~y=625-672 with ~140px empty gap to the home indicator — not docked per the footer pattern.
  fix: Reparent Ulashish/Yopish into a 390×72 docked footer wrapper at y=738 (paddingH=16, paddingTop=4, paddingBottom=20).
[MINOR] Intl P2P / 08 Receipt / Hold (10906:39459)
  defect: Blue info banner icon is a solid blue filled circle, not an info glyph (placeholder).
  fix: Replace the 20x20 solid #438BFA ellipse in the banner with a library info icon instance or a drawn 'i' vector in a blue circle.
[BLOCKER] Intl P2P / 08 Receipt / Cash success (10908:39459)
  defect: Action rail clipped to a thin strip at ~y=595: only blue tile tops visible, Saqlash/Tafsilotlar/Takrorlash labels unreadable. Same clipsContent defect as the other three frames.
  fix: Same rail fix: action-rail card primaryAxisSizingMode='AUTO' (re-assert after children appended), then Body.clipsContent=false or increase Body height so the full rail (tiles + labels) is visible.
[MINOR] Intl P2P / 08 Receipt / Cash success (10908:39459)
  defect: Ulashish/Yopish row at ~y=640-688, ~122px above the home indicator — not docked.
  fix: Reparent Ulashish/Yopish into a 390×72 docked footer wrapper at y=738 (paddingH=16, paddingTop=4, paddingBottom=20).
[MINOR] Intl P2P / 08 Receipt / Cash success (10908:39459)
  defect: APPROVED stamp offset left of the cheque centerline (same misalignment as Success/Error), violating 'rotated and centered'.
  fix: Center the rotated stamp group: stamp.x = (container.width - stamp.width) / 2 within the stamp container; keep -12 degree rotation and blue #438BFA styling.

