# Phase 1 · Auth audit (19 frames)

## Flow groups

### Email entry · login gateway (5 frames)
- `1:2466` Empty State
- `1:2259` Focused State
- `1:2270` Focused State (partial input "info@gmail.c|")
- `1:2281` Focused State (filled "mikhail.mikhailov@mail.com")
- `1:2560` Error State ("info.com" → "Неправильный адрес")

Uses **Bottom Lined Input** (no floating label), leading mail icon, clear X on filled. CTA "Продолжить" + secondary "или продолжить с" + Google button.

### Pre-identification · signup details (4 frames)
- `1:2292` Pre identification (4 empty fields)
- `1:2310` Pre identification / Focused
- `1:2328` Pre identification / Next button
- `1:2346` Pre identification / Filled

Uses **Bottom Lined With Label Input** (floating label). Back "Отменить". CTA "Продолжить".

### Set PIN (2 frames)
- `1:2362` First state ("Придумайте код")
- `1:2377` Second state ("Подтвердите код")

Uses **Custom keyboard** with 6 PIN dots + digit grid + fingerprint/FaceID/delete icons.

### Enter PIN (2 frames + 1 Face ID overlay)
- `1:2392` Enter with pin
- `1:2408` Enter with pin (with Face ID modal overlay)

### Confirmation code / OTP (inside iOS modal) (4 frames)
- `1:2425` Focused
- `1:2436` **Loader** (Logo + Animation Text Group — full-screen loading)
- `1:2444` Resend code
- `1:2455` Resend code · error

### Settings / "More" (misfiled in Auth section) (2 frames)
- `1:2481` Settings main
- `1:2520` Settings with iOS Action Sheet overlay

Shows exchange rates tile + settings list.

## New DS components needed

| # | Component | Coverage |
|---|---|---|
| 1 | **Input — `Style` axis extension** (Boxed default / Bottom-lined new) | Email entry + Pre-identification; 10 variants total |
| 2 | **Full-screen Loader** | 1:2436 |
| 3 | **PIN Dots** | Set PIN + Enter PIN screens |

## Deferred / out-of-phase

- **Currency tile** for Settings exchange-rates row — covered by Card + Receipt Row combo
- **Phone Number Input** — not needed in Auth (flow uses email)
- **iOS modal / Action Sheet** — platform chrome, use iOS kit directly inside DS-composed body
