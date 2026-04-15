# Design Critique — Adelmann Website (April 2026)

Focus: mobile layout issues, plus a few general polish items.
Status: **critical CSS and HTML fixes already applied to `styles.css` and all `*.html` head sections** — everything marked ✅ below is live in the files, pending your `git push`.

---

## Overall Impression
The site is well-structured and on-brand on desktop: strong green hero card, cream canvas, Fraunces serif + Inter sans, gold italic accents. The biggest opportunity is mobile — several layouts were only responsive down to 720 px, left awkward orphan items at that breakpoint, and had hardcoded pixel offsets that break on real phone widths (360–414 px).

---

## Critical (🔴) — fixed

| # | Finding | Fix applied |
|---|---------|-------------|
| 1 | **Mobile nav menu had hardcoded `top: 76px` and no `z-index`.** On scroll or with taller headers the dropdown misaligned and could sit behind content. | Changed to `top: calc(100% + 8px)`, added `z-index: 60`, padded items as tappable rows. ✅ |
| 2 | **No hamburger → X animation.** Users couldn't see menu state. | Added rotate transition on `.nav-links.is-open ~ .nav-toggle span`. ✅ |
| 3 | **Mobile breakpoint too late (720 px).** Between 720–900 px, the 5-item desktop nav (Start / Über uns / Schuhtechnik / Sportlerberatung / Kontakt-CTA) got cramped, especially in German where words are long. | Moved nav-toggle breakpoint to **900 px**. ✅ |
| 4 | **Stats grid at 720 px was `1fr 1fr` with 3 items** → orphan third stat on row 2 looked broken. | Changed to **1 col on phones**, stacked vertically with full labels. ✅ |
| 5 | **Duplicate `@media (max-width: 1024px)` block** at the bottom of `styles.css` (only set `meister-grid` to 1 col). Confusing and easy to miss during future edits. | Consolidated into the single 1024 px block. ✅ |
| 6 | **Container padding locked at `0 28px`** on all sizes. On a 360 px phone that's 56 px lost (15% of viewport) before content even starts. | Reduced to **20 px at ≤720 px and 16 px at ≤400 px**. ✅ |
| 7 | **Hero card padding `40px` on mobile** — oversized on small phones, shrunk content box below 300 px. | Now `clamp(28px, 5vw, 48px)`. ✅ |
| 8 | **Timeline had no mobile override.** `padding-left: 32px` + `padding: 24px 28px` + container padding = very tight cards on 360 px. | Reduced timeline padding, shrunk dots, repositioned rail line. ✅ |
| 9 | **Hero buttons side-by-side on mobile** — on narrow phones they either wrapped awkwardly or overflowed. | Forced column stack with full-width buttons inside `hero-actions`. ✅ |
| 10 | **Missing `<meta name="theme-color">`** — Chrome/Safari mobile chrome stayed white-grey instead of matching brand. | Added `#037456` on all 7 pages. ✅ |

## Moderate (🟡) — fixed

| # | Finding | Fix applied |
|---|---------|-------------|
| 11 | **Footer at mobile was 2 columns with brand spanning** → 3 content columns (Seiten / Kontakt / Öffnungszeiten) ended with an orphan third. | Single column on phones, centered bottom row. ✅ |
| 12 | **Service card padding `36px 32px`** too heavy on mobile. | Reduced to `28px 24px` at ≤720 px. ✅ |
| 13 | **Process items kept `60px 1fr` grid on mobile** — the 01/02/03 number crowded the text. | Stacked vertically on phones with smaller number. ✅ |
| 14 | **Meister-cards still had side-by-side photo + copy** at ≤720 px (`120px 1fr`). 120 px portrait at that width felt postage-stamp sized. | Stacked and centered with 220 px max-width photo. ✅ |
| 15 | **Location map/photo kept 460 px min-height** on mobile → two stacked 460 px blocks = 920 px of ghost-grey space before the next section. | Dropped to 260 px on phones. ✅ |
| 16 | **Contact form fields had no mobile padding adjustment.** Form card filled the whole width with 36 px interior padding. | Reduced to 24 px on phones. ✅ |
| 17 | **Reviews stayed 2-col until 820 px** → awkward narrow cards on tablets. | Now 1 col at ≤720 px as well. ✅ |
| 18 | **CTA band `clamp(48px, 7vw, 88px)`** padding was still 48 px at mobile — too much. | Now `44px 24px` explicitly. ✅ |
| 19 | **Hero H1 font-size `clamp(2.6rem, 5.2vw, 4.6rem)`** — at 360 px fell back to 2.6 rem / 41.6 px with `max-width: 18ch`, producing ugly 2-word line breaks. | Retuned to `clamp(2rem, 8vw, 2.8rem)` on phones, down to 1.9 rem on very small devices. ✅ |

## Minor (🟢) — fixed

| # | Finding | Fix applied |
|---|---------|-------------|
| 20 | Section padding `clamp(72px, 10vw, 120px)` felt airy but wasteful on mobile. | Flat `56px 0` on phones. ✅ |
| 21 | FAQ button padding `22px 28px` too heavy on mobile. | Reduced to `18px 20px`. ✅ |
| 22 | Brand logo 52 px tall made the sticky nav eat vertical space on small phones. | Shrunk to 44 px at ≤400 px. ✅ |
| 23 | Hero eyebrow with stars + rating + "6. Generation" didn't wrap cleanly on narrow devices. | Added `flex-wrap: wrap` and smaller font at ≤400 px. ✅ |

---

## Not yet addressed — suggestions

These are design direction items rather than bugs; they need your input:

1. **No favicon / apple-touch-icon.** The tab shows the default globe icon. Export a 32×32 PNG + a 180×180 `apple-touch-icon.png` from the `OA_OKay.svg` logo and add:
   ```html
   <link rel="icon" type="image/svg+xml" href="OA_OKay.svg">
   <link rel="apple-touch-icon" href="apple-touch-icon.png">
   ```
2. **Contact form is local-only** — `onsubmit` just shows an `alert()` and resets. For production, wire it to Formspree, Netlify Forms, or a small backend; otherwise visitor inquiries are lost.
3. **Video section on Über uns is still a placeholder** (`Vimeo folgt`). Either ship the video or hide the section until it's ready.
4. **"Behind the Scenes" section on ueber-uns.html** — currently between the compare block and the timeline. Consider moving it directly after the Meister section (right after you introduce Oliver and Luis) so the reader sees the craftsmen before the process.
5. **Hero H1 `max-width: 18ch`** is excellent for the index/sportlerberatung page but on Über uns it clips "Handwerk, das Generationen trägt" oddly. Consider 20ch on that page.
6. **Öffnungszeiten footer shorthand** — "Mo, Di, Do, Fr: 8:00–18:00" hides Wednesday closure inside a comma-separated list. On mobile with the single column layout, consider listing Wed explicitly so it's not missed by customers planning visits.
7. **Trust strip copy** on index ("Seit den 1840er Jahren…") is hidden in a single-line border strip. On mobile it wraps to 2 lines and can feel like a footer fragment. Consider giving it its own eyebrow+heading treatment or folding the message into the hero card.
8. **Accessibility**: `.stat-label { opacity: 0.85 }` on green-800 is ~3.8:1 contrast — below WCAG AA 4.5:1 for body text. Consider `opacity: 0.92` or switching to `var(--cream-50)` full-strength.
9. **No analytics** — if the client wants traffic data, drop in Plausible or Google Analytics before going live.

---

## What works well

- **Typography system**: Fraunces SOFT/WONK variable axes + italic accents in gold (#e8d29a) = instantly distinctive.
- **Hero card pattern**: the dark-green rounded-corner card on cream background is the strongest brand signal.
- **Information architecture** across 5 pages is clean; no orphan content, each page has clear purpose.
- **Timeline on Über uns**: a great storytelling device — dot + year + title + body works well.
- **Meister section**: the two-card approach (Senior/Junior) is emotionally effective and communicates succession visibly.

---

## Priority Recommendations (if client feedback loop is short)

1. **Push the mobile fixes now** (`git add -A && git commit && git push`) so Max can share the updated GitHub Pages URL with the client. Biggest visible wins: nav menu behavior, stats stacking, hero padding, footer single column.
2. **Favicon + apple-touch-icon** before any link is shared externally — it's the first thing a client screenshots.
3. **Wire the contact form** to a real endpoint before launch.
4. **Replace the video placeholder** or hide the section.

---

## To push the changes

```bash
cd /Users/max/Desktop/COWORK/oadelmann-website
rm -f .git/HEAD.lock .git/index.lock    # from the sandbox's interrupted commit
git add -A
git commit -m "Mobile responsive fixes"
git push origin main
```

Then wait ~30 seconds for GitHub Pages to rebuild and reload [https://maxbarcley.github.io/OA/](https://maxbarcley.github.io/OA/) on a phone.
