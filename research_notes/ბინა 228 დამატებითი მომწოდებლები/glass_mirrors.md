# Made-to-measure shower glass and back-lit mirrors in Tbilisi, priced for flat 228's sizes (10 October 2026)

Sizes used everywhere below (my arithmetic):
- Shower glass: fixed 1.05 × 2.20 = 2.310 m²; door 0.76 × 2.20 = 1.672 m²; together 3.982 m² (opening 181 cm wide).
- Bathroom mirror 1.36 × 1.05 = 1.428 m², perimeter 4.82 m.
- Hall mirror 1.00 × 2.52 = 2.520 m², perimeter 7.04 m.
- "Wavy" mirror, bounding box 0.45 × 1.25 = 0.5625 m², box perimeter 3.40 m (the real outline is longer).

Method: every price was read with `curl` from the page itself (raw HTML, inline JSON or the page's own script) on 10 October 2026; saved copies are in `scratchpad/round2/pages/glass_mirrors/`. No browser was started. Web search (US-only index) was used only to find addresses. m² Club Card status is given per shop; no discount is applied to any figure.

## 1. Which Tbilisi glass workshops and mirror makers publish prices or tariffs?

### Takeaway
Fifteen shower-glass makers (five of them Facebook-only, two known only as servisebi.ge listings) and nine mirror makers with live pages were identified and read, plus the Serwish craftsmen platform; two mirror domains cited earlier are dead (mirrorcity.ge, mirror.ge). Only two mirror makers publish a real tariff (Smart Mirror — a full price formula; Mylux — a per-m² calculator) and no glass workshop publishes a per-m² rate for tempered glass: the only published shower-glass figures are Smart Mirror's starting prices by cabin type and two "typical job" ranges (Metrix, Serwish). Everybody else — including the large processors Standarti and Glassco and all Facebook-only workshops — says "price after measuring".

### Cited Findings

**Makers that publish numbers**
- Smart Mirror (Tbilisi, tel. +995 598 23 32 55, not an m² Club partner) — its mirror calculator is driven by a pricing table that is readable in the page's script: mirror 43 ₾/m², edge 1 ₾/m, LED strip 2.6 ₾/m, power supply 7 ₾ (perimeter under 3 m) / 15 ₾ (under 5 m) / 22 ₾ (under 9 m) / 30 ₾ (longer), the sum multiplied by 3.8; touch button +20 ₾; anti-fog film by longest side 30 / 45 / 60 / 75 / 90 / 105 / 120 / 135 ₾ (thresholds 0.30, 0.65, 0.95, 1.25, 1.55, 1.85, 2.15, 2.45 m); front lighting adds area × 35 × 2 ₾ — [Smart Mirror pricing script](https://smartmirror.ge/assets/mirrorPricing-25qO8S84.js), [calculator page](https://smartmirror.ge/kalkulatori)
- Smart Mirror, calculator extras shown on the page: clock and temperature display "+ 100 ₾", 15 cm magnifier "+ 150 ₾", RGB lighting +100 ₾, aluminium frame (gold, silver or black) = perimeter × 30 ₾ rounded to a whole lari; light colour choice 3000K / 4000K / 6000K; the page breaks the result into "სარკის სახარჯი მასალა", "კიდის დამუშავება", "განათების ლენტი", "კვების ბლოკი", "ჯამი × 3,8" — [Smart Mirror calculator component](https://smartmirror.ge/assets/MirrorPriceCalculator-C5jyyxey.js), [rectangular mirror page with the calculator](https://smartmirror.ge/produkti/rectangular)
- Smart Mirror, rounded-corner and oval shapes use the same table with dearer edge work: rounded rectangle adds a fixed 12 ₾ to the edge line; oval is 5 ₾ per metre of edge instead of 1 ₾ — [rounded script](https://smartmirror.ge/assets/roundedMirrorPricing-DEb686B7.js), [oval script](https://smartmirror.ge/assets/ovalMirrorPricing-DNNoSaXv.js)
- Smart Mirror, free-form mirror: "ინდივიდუალური ფორმის სარკე თქვენი ესკიზით — ნებისმიერი ზომა და კონტური … ფასი 300 ₾-დან"; this page has no calculator, only a quote request; promo code "SMART2026" gives 10% — [Smart Mirror custom shape](https://smartmirror.ge/produkti/custom)
- Smart Mirror, conditions: "მიწოდება და მონტაჟი თბილისის მასშტაბით უფასოა"; standard order ready in 5–10 working days; 1-year warranty covering LED, sensor and fittings; "ასიმეტრიულ ფორმებზეც ვმუშაობთ. გამოგვიგზავნეთ ესკიზი და დაგიდასტურებთ, შესრულებადია თუ არა" — [Smart Mirror site script with the FAQ text](https://smartmirror.ge/assets/index-CE4GThXQ.js)
- Smart Mirror, shower glass: "ვამზადებთ ინდივიდუალური ზომების მიხედვით, უსაფრთხო, 8მმ/10მმ, ნაწრთობი მინის შხაპის კაბინებს ალუმინის კარკასით, ჩარჩოთი ან ჩარჩოს გარეშე. ფასი 700 ₾-დან"; by type: "კუთხის კაბინა 900 ₾-დან", "Walk-in შხაპი 1200 ₾-დან", "მოცურავი კარით 1100 ₾-დან", "ნიშაში მოთავსება 950 ₾-დან"; "უფასო გაზომვა თბილისში", "მონტაჟი 1 დღეში", 1-year warranty. Hardware finish (gold / brass) is not mentioned — [Smart Mirror shower cabins](https://smartmirror.ge/sashkhape-kabinebi)
- Mylux (Tbilisi, WhatsApp/tel. 555 223 449, not a partner) — calculator constants in the page: "ფასი 1 მ² 50 ლარი", "სარკის საკიდი +15 ლარი", "LED დამატება +80 ლარი", "ჩარჩოს დამატება +60 ლარი", "მონტაჟი +30 ლარი"; the calculator is live today although the footer reads "© MYLUX.GE - 2021"; glass thickness, type of lighting (back or front) and shape cutting are not priced — [Mylux mirror calculator](https://mylux.ge/sarke/)
- Metrix (renovation contractor, Adam Mitskevichi 29b, not a partner): "ჩვეულებრივი, საშუალო ხარისხის კაბინა დაახლოებით 1100 ლარი ღირს, ხოლო ძვირადღირებული, მაღალი ხარისხის მექანიზმებითა და კარგი მინით – 1800-დან 2000 ლარამდე"; makes and fits in 3–4 days; 2-year warranty — [Metrix shower glass](https://metrix.ge/xelosani/sashkhape-minebis-damzadeba-tbilisi)
- Metrix's mirror page is titled "სარკის დამზადება შეკვეთით | ფასი კვადრატულზე" but contains no figure — [Metrix mirrors](https://metrix.ge/xelosani/sarkis-damzadeba)
- Serwish (a platform listing craftsmen, not a maker): "სტანდარტული თეთრი ნაწრთობი შუშით, გამოსახსნელი კარით, დაახლოებით 90x90x2მ ზომის საშხაპე კაბინები 1000-1100 ლარი ღირს მიტანა მონტაჟის მომსახურებით თბილისის მასშტაბით, საშხაპე კაბინები სლაიდური კარით 1100-1300 ლარი, ლამინირებული შუშით 1500 ლარი"; it adds that the price is driven mainly by labour and carrying the glass upstairs — [Serwish shower cabins](<https://serwish.ge/ka/services/საშხაპე-კაბინა>)
- Serwish on mirrors: "საშუალოდ ფასი იწყება 40-50 ყველაზე დაბალი ხარისხის ჩინური სარკისთვის" per m², rising with quality (Turkish, Russian, French mirror) — [Serwish mirrors to order](<https://serwish.ge/ka/services/სარკეები-შეკვეთით>)
- Skinali Decor (tel. 571 826 433) publishes the only tempered-glass rate found, but for printed 6 mm kitchen panels per running metre: "ექსტრა გამჭვირვალე - 220 ლარი (გრძ/მ)", "ულტრა გამჭვირვალე - 250 ლარი (გრძ/მ)"; shower glass is not offered — [Skinali Decor](https://skinalidecor.ge/)

**Shower-glass makers that publish no price (pages read)**
- Standarti (glass and mirror importer and processor since 2007, own tempering furnace, CNC cutting; tel. 577 104 903): shower cabins of "ნაწრთობი 10 მმ სისქის მინა", measuring and fitting, "საუკეთესო ფასად" — no figure — [Standarti products](https://standarti.ge/products/), [Standarti contact](https://standarti.ge/contact/)
- Glassco (Khosharauli St 29; tel. +995 574 90 70 70, 032 290 70 50): "საშხაპე კაბინა დამზადებულია 10მმ-იანი ნაწრთობი მინით და უმაღლესი ხარისხის უჟანგავი მექანიზმებით"; its online calculator covers windows only, in US dollars — [Glassco shower glass](https://www.glassco.ge/mina?type=sashkhape_mina), [Glassco calculator](https://www.glassco.ge/calculator)
- Unicom (Agladze St 7; tel. 568 11 53 59, 568 11 53 98): shower glass and partitions, hinged-door and sliding types, stainless accessories, delivery, fitting, warranty; no prices — [Unicom showers](<https://uni-com.ge/საშხაპეების-დამზადება-მი/>), [Unicom contact](<https://uni-com.ge/კონტაქტი/>)
- Alumina (tel. +995 555 746 719): hinged and sliding cabins to size, 6 / 8 / 10 mm tempered glass, fitting "1–2 საათში"; profile colours listed are "ქრომი, მატ ქრომი, შავი" (no gold); price "after we learn your sizes" — [Alumina shower cabins](https://alumina.ge/dush-kabinebi/)
- ArtLenPlast (tel. +995 555 412 525): tempered and laminated glass shower cabins "ნებისმიერი ზომის, ტიპის და ფასის"; no figure — [ArtLenPlast](https://artlenplast.com/kupe/)
- Dormer (tel. 568 11 53 59 — the same number as Unicom, to which it refers readers): "აბაზანის მინა ფასები განისაზღვრება აზომვითი სამუშაოების შედეგად, რაც სრულიად უფასოა" — [Dormer](<https://dormer.ge/საშხაპე-მინების-დამზად/>)
- LNE (Agladze 7a, Eliava market, "Archevani" centre; tel. 558 481 481, 558 058 008): shower cabins listed under glass products; no prices — [LNE glass products](https://lne.ge/glasswork.html)
- Go Georgia Glass LLC and Tsikhina LLC (listings on servisebi.ge): custom shower cabins of tempered glass with stainless accessories, mirrors of any shape with LED; Tsikhina has its own glass shop (tempering, laminating, bevel and edge work); no prices — [servisebi.ge glass listings](https://servisebi.ge/ka/product/detail/30810)
- Facebook-only workshops, first visible posts read: "დუშკაბინები და საშხაპეები ექსკლუზიური დიზაინით" (tel. +995 577 11 24 95) — [page](https://www.facebook.com/showerglassdesign/); B-Glass, "საშხაპე კაბინები/მინის კარები/მოაჯირები" (tel. 577 021 018, "13 years") — [page](https://www.facebook.com/YourHomeCareService/); Sandrex.ge (Eka Bezhanishvili 1, tel. +995 568 77 78 96; partitions, shower rooms, mirrors) — [page](https://www.facebook.com/sandrex.ge/); "საშხაპე კაბინა" (tel. 598 90 48 98) — [page](https://www.facebook.com/workshopproduct/); "საშხაპე კაბინები / душевые кабины" — [page](https://www.facebook.com/dush.kabina.sashxape.kabinebi/). None of the visible posts carries a price or a price list.

**Mirror makers that publish no price (pages read)**
- LNE: LED mirrors with hand-motion or touch sensor, make-up mirrors, moisture-resistant mirror mouldings and "mirror in a frame", figure cutting, euro-edge; no prices on any page — [LNE LED mirrors](https://lne.ge/ledmirror.html), [LNE frames](https://lne.ge/frames.html), [LNE cutting](https://lne.ge/cutbevel.html)
- Standarti: Turkish and European mirror, cutting, circular edge work, sand-blast drawing, measuring and fitting; no price; LED is not mentioned — [Standarti products](https://standarti.ge/products/)
- Go Georgia Glass: "ნებისმიერი ფორმის სარკეები – იდეალური ანარეკლი, LED განათებები" — [servisebi.ge listing](https://servisebi.ge/ka/product/detail/30810)
- Serwish craftsmen: lit mirrors "ნათების და ამომშრობი სენსორით" (light and demister sensor), delivery and fitting; individual listings carry no price — [Serwish mirrors](<https://serwish.ge/ka/services/სარკეები-შეკვეთით>)
- mirrorcity.ge (cited in round one from a snippet: 370 ₾ for a 100 × 60 cm back-lit mirror) does not resolve at all on 10 October 2026 (DNS failure from two networks); mirror.ge is a domain for sale — [mirror.ge](https://mirror.ge/)

### Inferences
- A per-m² tariff for 8 or 10 mm tempered glass is simply not published by Tbilisi workshops; the trade prices a shower as a job (glass + hardware + fitting). The owner's request for "price per m²" can only be met by phone quotes.
- Smart Mirror is the only maker whose final price for an exact size can be reproduced without a call; its numbers should be treated as the calculator's answer, to be confirmed by the operator.
- Mylux's flat "+80 ₾" for LED and "+60 ₾" for a frame regardless of size means its calculator under-prices large mirrors; it is a floor.

### Gaps
- mymarket.ge answers `curl` with a Cloudflare challenge (HTTP 403) and ss.ge and extra.ge return pages whose listings are filled in by scripts, so classified adverts with prices could not be read without a browser.
- Facebook pages give only the first post without login; price lists pinned deeper, in albums or in Instagram highlights could not be seen. Instagram was not readable at all.
- No phone quotes were taken — out of scope for web research; nine makers with phone numbers are listed for that purpose.

## 2. What do our four pieces cost at each maker that publishes a tariff?

### Takeaway
By published tariffs: the bathroom mirror 136 × 105 back-lit is 356.27 ₾ at Smart Mirror (451.27 ₾ with touch button and anti-fog) and 181.40 ₾ by Mylux's calculator; the hall mirror 100 × 252 with a black frame is 802.68 ₾ at Smart Mirror and 296.00 ₾ at Mylux; the wavy mirror starts at 300 ₾ (Smart Mirror) or 108.13 ₾ (Mylux, no shape-cutting charge shown); the shower glass has only starting prices and job ranges — 950 ₾-დან (Smart Mirror, niche type), about 1,106–1,217 ₾ pro-rata from Serwish's guide, and 1,800–2,000 ₾ for Metrix's "premium mechanisms" class, which is where brass hardware belongs.

### Cited Findings

**Smart Mirror — bathroom mirror 136 × 105 cm, back-lit** (formula from [the pricing script](https://smartmirror.ge/assets/mirrorPricing-25qO8S84.js); enter the size at [the rectangular mirror page](https://smartmirror.ge/produkti/rectangular))
- Mirror 1.428 m² × 43 = 61.404
- Edge 4.82 m × 1 = 4.82
- LED strip 4.82 m × 2.6 = 12.532
- Power supply (perimeter 4.82 m is under 5 m) = 15
- Sum 93.756 × 3.8 = **356.27 ₾** (the page shows 356,27)
- Touch button +20 → 376.27 ₾; anti-fog film (longest side 1.36 m is over 1.25 m) +75 → **451.27 ₾** with both
- Optional gold aluminium frame: 4.82 × 30 = 144.6 → 145 ₾ (501.27 ₾ with frame, no other extras)
- Delivery and fitting in Tbilisi: free, per the FAQ text in [the site script](https://smartmirror.ge/assets/index-CE4GThXQ.js)

**Smart Mirror — hall mirror 100 × 252 cm, back-lit, black frame**
- Mirror 2.520 m² × 43 = 108.36
- Edge 7.04 m × 1 = 7.04
- LED strip 7.04 m × 2.6 = 18.304
- Power supply (perimeter 7.04 m is under 9 m) = 22
- Sum 155.704 × 3.8 = 591.68 ₾
- Black aluminium frame 7.04 × 30 = 211.2 → 211 ₾
- Total **802.68 ₾**; with touch button +20 → 822.68 ₾
- The calculator's inputs have no upper limit (`min 0`, no `max`), so it accepts 252 cm, but nothing on the site says a 252 cm mirror is made in one piece — [calculator component](https://smartmirror.ge/assets/MirrorPriceCalculator-C5jyyxey.js)

**Smart Mirror — wavy mirror about 45 × 125 cm, back-lit**
- Published: "ფასი 300 ₾-დან", quote on a sketch — [custom shape page](https://smartmirror.ge/produkti/custom)
- For scale only (my arithmetic with the same table): a plain rectangle 45 × 125 back-lit would be (24.1875 + 3.40 + 8.84 + 15) × 3.8 = 195.42 ₾; at the oval edge rate of 5 ₾/m, (24.1875 + 17.00 + 8.84 + 15) × 3.8 = 247.10 ₾. Both are under the 300 ₾ floor, so 300 ₾ is the figure to carry; touch button +20 ₾.

**Smart Mirror — shower glass**
- Our layout (glass across a 181 cm opening between two walls) is the "ნიშაში მოთავსება" type: **950 ₾-დან**; the row currently carries the walk-in figure "1200 ₾-დან" — [Smart Mirror shower cabins](https://smartmirror.ge/sashkhape-kabinebi)
- 8 mm and 10 mm are both offered; the page gives no surcharge for 10 mm, for 220 cm height or for a hardware colour.

**Mylux — calculator rates** ([Mylux mirror calculator](https://mylux.ge/sarke/))
- Bathroom mirror: 1.428 m² × 50 = 71.40 + LED 80 + fitting 30 = **181.40 ₾** (with hanger +15 → 196.40 ₾)
- Hall mirror: 2.520 m² × 50 = 126.00 + LED 80 + frame 60 + fitting 30 = **296.00 ₾** (already in the budget)
- Wavy mirror: 0.5625 m² × 50 = 28.125 + LED 80 = 108.125 → the page would show **108.13 ₾** (the budget has 108 from a rounded area); no line for cutting an outline
- No shower glass.

**Metrix — shower glass** ([Metrix shower glass](https://metrix.ge/xelosani/sashkhape-minebis-damzadeba-tbilisi))
- "about 1100 ₾" for an ordinary mid-quality cabin; "1800-დან 2000 ლარამდე" with expensive, high-quality mechanisms and good glass. No size is attached to either figure.

**Serwish guide — shower glass, pro-rata to our area** ([Serwish shower cabins](<https://serwish.ge/ka/services/საშხაპე-კაბინა>))
- Guide: 1000–1100 ₾ for about 90 × 90 × 200 cm with a hinged door, delivered and fitted in Tbilisi. That cabin has 2 × 0.90 × 2.00 = 3.60 m² of glass, i.e. 277.78–305.56 ₾ per m² all-in.
- Ours: 1000 × 3.982 ÷ 3.6 = **1,106.11 ₾**; 1100 × 3.982 ÷ 3.6 = **1,216.72 ₾** (estimate; chrome/stainless hardware assumed by the source).

**Serwish guide — mirror glass only, cheapest grade** ([Serwish mirrors](<https://serwish.ge/ka/services/სარკეები-შეკვეთით>))
- 40–50 ₾/m²: bathroom 57.12–71.40 ₾; hall 100.80–126.00 ₾; wavy box 22.50–28.13 ₾ — glass without LED, frame, edge work or fitting.

### Inferences
- The two calculators differ by a factor of about two to three (bathroom 356.27 vs 181.40 ₾; hall 802.68 vs 296.00 ₾). Smart Mirror's figure includes edge work, a sized power supply, delivery and fitting; Mylux charges fitting 30 ₾ flat and LED 80 ₾ flat. A realistic budget line is the Smart Mirror figure, with Mylux as the lowest published floor.
- For the shower glass the published numbers bracket the job: 950 ₾ is a starting price for the right type but a standard height; Serwish's pro-rata 1,106–1,217 ₾ is for ordinary hardware; brushed-brass hinges, 220 cm height and possibly 10 mm glass push it toward Metrix's 1,800–2,000 ₾ class. Round one's "above 1,200 ₾" stands, now with an upper marker.
- 10 mm instead of 8 mm: no source publishes the difference. Standarti and Glassco describe their shower cabins as 10 mm by default, Alumina offers 6/8/10, Smart Mirror 8/10 — so 10 mm is readily available and must be asked for as a separate line in quotes.

### Gaps
- No maker publishes: a per-m² price for 8 or 10 mm tempered glass, a price per hinge cut-out or hole, a fitting fee for a 220 cm panel, a charge for cutting a free-form outline, or a price for a thin black frame other than Smart Mirror's 30 ₾ per metre and Mylux's flat 60 ₾.
- Smart Mirror's custom-shape price above 300 ₾ depends on the sketch; the site says it confirms feasibility after seeing it.

## 3. What does brass / gold hardware for a hinged glass shower door cost on its own in Tbilisi shops?

### Takeaway
No Tbilisi shop page read sells glass-to-wall hinges, a glass-door handle, wall profile or clamps, seals or a threshold as separate priced items in any finish, let alone brushed brass; nine sellers were checked. Hardware is supplied by the glass maker inside the quote, so a "glass + hardware + fitting" total cannot be built from shop prices.

### Cited Findings
- Domino (not a partner): the "accessories" category under shower cabins holds exactly three items, all sliding-door rollers — "საშხაპე კარის გორგოლაჭი TM IVA 23 მმ (1+1) Blister" 17.90 ₾, "საშხაპე კარის გორგოლაჭის კომპლექტი TM IVA 23 მმ (2+1) Blister" 23.00 ₾, "საშხაპე კარის გორგოლაჭი ექცენტრიკული TM IVA 25 მმ (1+1) Blister" 28.00 ₾; no hinges, handles, profiles or seals — [Domino shower accessories](<https://www.domino.com.ge/products/სანტექნიკა-და-აქსესუარები-ka/საშხაპე-კაბინები-და-მაკომპლექტებლები-ka/აქსესუარები/>)
- Gorgia (m² Club 5%-50%): site search for „მინის ანჯამა“ answers "სულ ნაპოვნია 0 პროდუქტი"; its shower door and glass section holds only complete screens — [Gorgia shower glass](https://gorgia.ge/ka/santeqnika/abazana-da-sashxape-kabina/sashxapes-kari-da-mina/sashxape-mina/)
- Nova (m² Club 7%-20%): search for „მინის ანჯამა“ answers "მოიძებნა 0 პროდუქტი" — [Nova shower glass section](https://nova.ge/ka/sashkhape-kabinebis-minebi)
- Citadeli: the hinge category holds only ordinary door hinges 100 × 50 × 2 mm in silver, antique and black — [Citadeli hinges](https://citadeli.com/ka/163-karebi-da-furnitura/165-furnitura/195-anjama)
- Modus (not a partner): site search for the same term showed no glass-hardware product — [Modus](https://modus.ge/)
- Ideal (m² Club 10%): the catalogue has shower glass, shower doors and a "საშხაპე მექანიზმი" group, all without prices online — [Ideal shower glass](https://ideal.ge/en/products/products/5141/Shower-Glass)
- Unicom (Agladze 7): sells "საშხაპე კაბინის აქსესუარები, მექანიზმები, სახელურები, მინის კარის აქსესუარები" and links catalogues, without prices or finishes — [Unicom accessories](<https://uni-com.ge/აქსესუარები/>)
- LNE (Agladze 7a): lists "ანჯამა (პეტლი)" among its glass-processing services, without a price — [LNE cutting and processing](https://lne.ge/cutbevel.html)
- Alumina: hinges "მაღალი გამძლეობის პრემიუმ ხარისხი", profile colours chrome, matt chrome, black — gold is not listed — [Alumina](https://alumina.ge/dush-kabinebi/)
- Metrix's two ranges are the only published hint of what hardware does to the price: about 1100 ₾ for an ordinary cabin against 1800–2000 ₾ "with expensive, high-quality mechanisms and good glass" — [Metrix shower glass](https://metrix.ge/xelosani/sashkhape-minebis-damzadeba-tbilisi)

### Inferences
- The 700–900 ₾ gap between Metrix's two classes (my subtraction: 1800 − 1100 and 2000 − 1100) covers better mechanisms and better glass together; it is the only published upper marker for what brass-finish hardware may add.
- Unicom and LNE sit next to each other at the Eliava market (Agladze 7 and 7a) and both name hinges and handles; that is the place to ask for brushed-gold glass hardware over the counter.
- Ready-made brushed-gold enclosures exist at Domino (Sonni "BGO" series, already in the budget), so gold hinges and profiles do reach Tbilisi, but only as part of a boxed product.

### Gaps
- No real product with a price and link could be found for: 2 glass-to-wall hinges, handle or knob, wall U-profile or 4 clamps, door seals, threshold strip — in any finish. Sellers checked: Domino, Gorgia, Nova, Modus, Citadeli, Ideal, Unicom, LNE, Alumina. extra.ge has a "საშხაპე აქსესუარები" catalogue but its listing is filled in by scripts and could not be read; mymarket.ge is behind a Cloudflare challenge.
- Whether any Tbilisi maker stocks brushed brass (not polished gold) hinges is unknown; Alumina's own list of finishes suggests some do not.

## 4. Ready-made alternatives close to our sizes

### Takeaway
Nothing ready-made matches the shower design: no shop sells an in-line screen 180–185 cm wide with a hinged door, 200 cm or higher, in gold — the widest in-line doors are 150 × 200 cm sliding ones in aluminium colour, and the only gold items are single 90–100 cm fixed fluted screens and one 90 × 90 corner cabin (all already in the budget). For the bathroom mirror the nearest ready-made back-lit pieces are 120 × 80 cm (Domino LM-125, 269.00 ₾, with anti-fog) and 120 × 70 cm (Modus #NCA24, 259 ₾), i.e. 16 cm narrower and 25–35 cm lower than 136 × 105.

### Cited Findings

**Shower screens and doors**
- Domino in-line (niche) doors, all 200 cm high: "საშხაპე კარი გასაწევი TM IVA D6C150C 150×200 სმ" 383.00 ₾ (was 589.00), 6 mm clear glass, profile colour "ალუმინი", sliding — 31 cm narrower than our 181 cm opening and 20 cm lower — [product page](<https://www.domino.com.ge/products/სანტექნიკა-და-აქსესუარები-ka/საშხაპე-კაბინები-და-მაკომპლექტებლები-ka/საშხაპე-კარები-ka/საშხაპე-კარი-გასაწევი-tm-iva-d6c150c-150200-სმ/>)
- Other Domino doors on the category page: Alex Baitler AB61C150 150×200 472.00 (was 589.00); TM IVA D6B150T 150×200 544.00 (was 679.00); single doors not marked as sliding — TM IVA D7B100T 100×200 461.00 (was 659.00) and Alex Baitler AB71C90 90×200 560.00 (was 699.00); none wider than 150 cm, none gold — [Domino shower doors](<https://www.domino.com.ge/products/სანტექნიკა-და-აქსესუარები-ka/საშხაპე-კაბინები-და-მაკომპლექტებლები-ka/საშხაპე-კარები-ka/>)
- Domino fixed screens (30 items): gold only on "Sonni F04P1-8-FLUBGO-100 100x200" 552.00 (was 849.00) and "WAY Fluted Golden WGF90 90x200" 349.00 — both fluted glass, no door; clear 8 mm screens run 280.00–400.00 ₾ (TM IVA 90–120 × 200) — [Domino shower partitions](<https://www.domino.com.ge/products/სანტექნიკა-და-აქსესუარები-ka/საშხაპე-კაბინები-და-მაკომპლექტებლები-ka/საშხაპე-ტიხრები-ka/>)
- Gorgia (m² Club 5%-50%): ten Seldus fixed screens only, 70–100 cm wide, 190 or 200 cm high, 8 mm, clear / black-profile / frosted, 421–608 ₾; no door, no gold — [Gorgia shower glass](https://gorgia.ge/ka/santeqnika/abazana-da-sashxape-kabina/sashxapes-kari-da-mina/sashxape-mina/)
- Nova (m² Club 7%-20%): corner-cabin door sets up to 100 × 100 cm, 180–190 cm high, 5–6 mm, black or grey, and a 90 × 190 partition at 155–175 ₾; nothing in-line, nothing gold — [Nova shower glass](https://nova.ge/ka/sashkhape-kabinebis-minebi)
- Ideal (m² Club 10%): shower doors up to 150 × 200 (BD150.4100A) and fixed glass up to 140 × 195 (BG140.0000) in the catalogue; no prices online — [Ideal shower doors](https://ideal.ge/en/products/products/119/Shower-Door), [Ideal fixed glass](https://ideal.ge/en/products/products/5141/Shower-Glass)
- Mihouse: corner cabins 90 × 90 × 200, 8 mm, 350.00–850.00 ₾; no in-line screen — [Mihouse shower cabins](<https://mihouse.ge/აბაზანის-მოწყობილობები/დუშკაბინა/საშხაპე-კაბინა>)

**LED mirrors near 136 × 105 cm**
- Domino "სარკე Led LM-125 80x120 სმ" — 269.00 ₾; features on the page: width 1200 mm, height 800 mm, lighting at the back, touch control, anti-fog "დიახ"; 3 in stock. Against 136 × 105: −16 cm wide, −25 cm high — [product page](<https://www.domino.com.ge/products/სანტექნიკა-და-აქსესუარები-ka/აბაზანის-ავეჯი-ka/სარკეები/სარკე-led-lm-125-80x120-სმ/>)
- Modus (not a partner) "სარკე LED განათებით 120*70 Touch Switch #NCA24 5000K" — 259 ₾, in stock; neutral-white light 5000K, touch switch; anti-fog not mentioned. −16 cm wide, −35 cm high — [product page](<https://modus.ge/ka/პროდუქცია/სააბაზანო-და-საპირფარეშო/სარკეები/56349-სარკე-LED-განათებით-12070-Touch-Switch-NCA24-5000K>)
- Modus "სარკე LED განათებით ASTRO 100x80 სმ სენსორით, ორთქლსაწინააღმდეგო ზედაპირით მწარ. Xpertials" — 579 ₾, availability "PreOrder". −36 cm wide, −25 cm high — [product page](<https://modus.ge/ka/პროდუქცია/სააბაზანო-და-საპირფარეშო/სარკეები/41823-სარკე-LED-განათებით-ASTRO-100x80-სმ-სენსორით-ორთქლსაწინააღმდეგო-ზედაპირით-მწარ-Xpertials>)
- Domino "სარკე Silver Mirrors Almina 1000х800 მმ, სენსორული" — 599.00 ₾; lit, touch, anti-fog "არა"; 3 in stock. −36 cm wide, −25 cm high — [product page](<https://www.domino.com.ge/products/სანტექნიკა-და-აქსესუარები-ka/აბაზანის-ავეჯი-ka/სარკეები/სარკე-silver-mirrors-almina-1000х800-მმ-სენსორული/>)
- Gorgia (m² Club 5%-50%): the largest of 15 lit mirrors is "სააბაზანოს სარკე განათებით LED-111 100*70" at 169 ₾ (ECO STAR, China; filed under the oval-lit group) — [product page](<https://gorgia.ge/ka/santeqnika/saabazanos-aveji/saabazanos-sarke/sarke-ganatebit/სააბაზანოს-სარკე-განათებით-led-111-10070/>)
- VitrA (m² Club 15%): "Mirror Core Flat with LED lights wooden frame 100 cm 66916" 671 ₾ (was 839 ₾); 100 cm wide, wooden frame, neutral-white light; height not stated; a different style from the design — [product page](https://vitra.com.ge/en/product/34737-mirror-core-flat-with-led-lights-wooden-frame-100-cm-66916/)
- Ideal (m² Club 10%): mirror sizes offered include 120 × 80, 120 × 70 and 100 × 80; no prices online — [Ideal mirrors](https://ideal.ge/en/products/products/101/Mirror)
- Nova (m² Club 7%-20%): the largest mirrors on the category page are 600 × 800 mm (231–247 ₾) and 900 × 700 mm (242 ₾); nothing near 136 × 105 — [Nova bathroom mirrors](https://nova.ge/ka/abazanis-sarkeebi)
- Roxy: DeRicci framed mirrors up to 1000 × 700 mm only — [Roxy mirrors](<https://roxygeorgia.ge/სააბაზანო/კერამიკა-და-ავეჯი/სარკე/>)
- No shop page read lists a lit mirror of 140 × 80, 150 × 100 or larger.

**Lit ready-made pieces for the hall and bedroom mirrors**
- Domino "სარკე Led LM-602 50x170 სმ" — 209.00 ₾; back lighting, touch control, motion sensor "დიახ"; 38 in stock. Against the hall's 100 × 252: half the width, 82 cm lower; frame not described — [product page](<https://www.domino.com.ge/products/სანტექნიკა-და-აქსესუარები-ka/აბაზანის-ავეჯი-ka/სარკეები/სარკე-led-lm-602-50x170-სმ/>)
- Domino "სარკე Led LM-406 Oval 50x100 სმ" — 159.00 ₾; oval, back lighting, touch, anti-fog "დიახ"; 46 in stock. Against the wavy 45 × 125: +5 cm wide, −25 cm high, a regular oval rather than a free outline — [product page](<https://www.domino.com.ge/products/სანტექნიკა-და-აქსესუარები-ka/აბაზანის-ავეჯი-ka/სარკეები/სარკე-led-lm-406-oval-50x100-სმ/>)
- Velinova sells unlit framed floor mirrors (147 × 37 cm 70.00 ₾, 152 × 42 cm 95.00 ₾, 167 × 62 cm 145.00 ₾, black or gold) — far below the hall size and without light — [Velinova mirrors](<https://velinova.ge/collections/სარკე>)

### Inferences
- The same Domino LM-125 at 269.00 ₾ offers more (back light, anti-fog, 120 × 80) for less than the LM-130 90 × 120 at 299.00 ₾ that the budget now uses as its mid option; the orientation of the LM-130 is not stated on its listing.
- For the shower, ready-made is not a real alternative but a different design: the opening would have to be closed to 150 cm, the height dropped to 200 cm and gold given up.

### Gaps
- Lussoni's shower and mirror category pages returned an empty shell to `curl` (m² Club 5%-50%); Deutsches Haus' home page exposed no category links; JYSK was covered in round one. Modus was checked for mirrors only, not for shower screens.
- Light colour (warm 3000K, as the design wants) is stated only for the Modus #NCA24 (5000K — cooler than the design) and VitrA (neutral white).

## 5. Is a 252 cm tall single mirror sheet available?

### Takeaway
Not confirmed by any maker. No Tbilisi maker's page states a maximum mirror length or says it can make 252 cm in one piece. The one local sheet size published — Standarti's 4 mm mirror, "2310*2250 მმ", the same figure it gives for clear glass — is shorter than 252 cm in both directions. The Turkish Flotal brand's own sheets include 3210 × 2250 mm, which would be long enough, but whether any Tbilisi workshop stocks that sheet is not stated anywhere. The question stays open and has to be asked on the phone before ordering.

### Cited Findings
- Standarti, mirror: "სარკე – Flotal – 4 მმ … ზომა | 2310*2250 მმ … სისქე | 4 მმ | 6 მმ | 8 მმ | 10 მმ … მწარმოებელი ქვეყანა | ირანი/აზერბაიჯანი" (page published 31 October 2022; no price) — [Standarti mirror sheet](<https://standarti.ge/product/სარკე-4მმ-ფლოტალი/>)
- Standarti, clear glass: "ზომა | 2310*2250 მმ", thickness 4 / 6 / 8 / 10 mm, made in Iran/Turkey — [Standarti clear glass](https://standarti.ge/product/mina-gamchvirvale/)
- Flotal (a Turkish mirror brand; the same word appears in the name of Standarti's product, though Standarti states the origin as Iran/Azerbaijan): standard 3 mm and 4 mm mirror sheets are 1605 × 2500, 3210 × 2100, 3210 × 2250 and 3210 × 2500 mm — read from a search summary of the maker's page, which refuses direct download (HTTP 403), so this line is second-hand — [Flotal Future](https://www.flotal.com/en/our-brands/flotal-future)
- Smart Mirror: every mirror is made to the customer's size; the calculator has no upper size limit in its code; nothing about one-piece length — [Smart Mirror calculator component](https://smartmirror.ge/assets/MirrorPriceCalculator-C5jyyxey.js)
- Serwish warns that a mirror over 1 metre must be carried and fitted by professionals because of breakage on stairs — relevant to a 2.52 m piece going up to the flat — [Serwish mirrors](<https://serwish.ge/ka/services/სარკეები-შეკვეთით>)
- LNE, Mylux, Glassco (its mirror page is empty) and Go Georgia Glass publish no sheet size — [Glassco mirror page](https://www.glassco.ge/sarke)

### Inferences
- Taken as written, Standarti's 2310 × 2250 mm sheet cannot give a 2520 mm piece: the hall mirror would need a horizontal joint or a reduction to about 225–230 cm. Standarti's page names the mirror "Flotal" but gives its origin as Iran/Azerbaijan, and repeats 2310 × 2250 on two separate pages, so the figure should not be assumed to be a misprint of the 3210 × 2250 mm sheet that the Flotal brand publishes. Only a workshop that actually holds a sheet 2520 mm or longer (for example 3210 × 2250) can make the hall mirror in one piece; the bathroom mirror (1360 × 1050) fits any of these sheets.
- The shower panels at 220 cm fit Standarti's published glass sheet: 2200 mm is under both 2250 and 2310 mm.
- A 2.52 m² mirror in 4 mm glass weighs about 25 kg (2.52 m² × 4 mm × 2.5 kg per m² per mm — my arithmetic); lift size and stair carrying should be raised with the maker, as Serwish's note suggests.

### Gaps
- No maker "says so" in writing: the question "do you cut 100 × 252 cm from one sheet, and what is your sheet size?" remains to be put to Smart Mirror (+995 598 23 32 55), Standarti (577 104 903), LNE (558 481 481) and Mylux (555 223 449).
- The Flotal sheet table could not be opened directly; it rests on a search-engine summary of flotal.com.
