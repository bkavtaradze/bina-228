# Product research for flat №228 (Tbilisi) — common brief

The owner is renovating a 66 m² flat in Tbilisi to the interior designer's final drawing set. An earlier market research (10 Oct) matched many items wrongly against the design. Your job: for your list of items, find products sold in Georgia that match **what the designer actually drew**, with real prices in GEL.

## Inputs (read these first)
- `spec.json` (same folder as this brief): per item — `sheets`, `label` (designer's exact words), `look` (material, finish, colour, texture, shape, metal colour), `dims`, `crop` (designer picture paths, relative to the project folder), `current_check` (how the currently chosen option compares: matches / close / wrong, with reason), `open` (unclear points).
- `scope.json` (same folder): per item — `qty`, `unit` (the price you give must be per THIS unit), `size`, `note`, and `current_options` (what the budget lists now; the one with tier "mid" is counted).
- Designer crops: `/Users/alpacawork/Desktop/Bondo Files/Bondo Personal/Projects/mirtskhulava/designer/ნიმუშები/<id>.jpg` (and `<id>-2.jpg`). LOOK at them with the Read tool before searching — match the picture, not the item's name.
- Shop lists from earlier research: `/Users/alpacawork/Desktop/Bondo Files/Bondo Personal/Projects/mirtskhulava/reports/ბინა 228 პროდუქტები და ფასები.md` and `ბინა 228 დამატებითი მომწოდებლები.md` (shop names and URLs that sell these things in Tbilisi). The old product picks there are not trustworthy; the shop lists are useful.

## How to search
- Georgian shops matter most: e.g. gorgia.ge, domino.ge / domino.com.ge, ideal.ge, nova.ge, citadeli.com, mihouse.ge, merlons.ge, roxy.ge, veneto.ge, deutscheshaus.ge, ee.ge, megatechnica.ge, kontakt.ge, technoshop.ge, lum.ge, newlight.ge, and the ones in the reports. Web search works poorly for Georgian shops: **fetch shop pages directly** (their search URLs, category pages, product pages) with WebFetch.
- Only report a price you saw on a page (`est: false`). If you estimate, say from what and set `est: true`. If you find nothing, say "not found" plainly — never invent a product, URL or price.
- Items marked custom-made in scope.json (`size`/`note` say „შეკვეთით“ or the item is joinery, glass, stone, a cabinet) are made to order: give published per-m² / per-piece rates of Tbilisi makers where they exist, or a clearly marked estimate, and write in `name`/`dims` the exact spec a craftsman needs (sizes from `dims`, material and finish from `look`).
- Respect the designer's look first: material, finish, colour/tone, texture, shape, metal colour. A cheaper item that differs visibly must be marked `match: "different"` and explained in `weak`.

## What to return for each item
Write ONE JSON file (path given in your task) — an array of objects:
```
{ "id": "...",
  "designer": "one Georgian sentence: what the designer shows",
  "keep": ["names of current_options worth keeping as they are (they match)"],
  "drop": ["names of current_options that do not match the design, with no reason needed"],
  "options": [ {
      "tier": "eco" | "mid" | "top" | null,   // exactly one eco, one mid, one top per item where possible: eco = cheapest acceptable match, mid = best value that matches well, top = closest to the designer's picture
      "shop": "shop name", "url": "product page", "img": "product photo URL if the page has one, else ''",
      "name": "Georgian description + brand/model", "dims": "sizes / format", "color": "colour/finish in Georgian",
      "weak": "how it differs from the design, in Georgian ('' if it matches)",
      "price": 123.45 or null, "priceNote": "date seen (2026-11-..), discount, stock — Georgian", "est": false,
      "match": "same" | "close" | "different" } ],
  "notes": "anything the owner or I must know, Georgian" }
```
- Options you return replace the current list, except those in `keep` (I will keep them). Give 2–5 options per item; at least one `same` or `close` where the market has it.
- Prices are per the item's `unit` in scope.json (per m², per piece, per set…). If a shop sells by pack, convert and say so in `priceNote`.
- All text fields the owner reads (`designer`, `name`, `color`, `weak`, `priceNote`, `notes`) in Georgian, plain words.

Do not edit any project files. Write only your JSON file (use Bash with python or a heredoc). In your final message give: the file path, and per item one line — what you chose as mid and how it matches. Keep the message short.
