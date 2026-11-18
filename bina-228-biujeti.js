/* Flat №228's own money (owner, 7 November 2026): what there is, what is already paid, and what is bought in which order.
   Items, options, quantities and prices come from bina-228-budget.js and bina-228-data.js; the hired crew and the dollar rate from bina-228-brigadebi.js.
   This file holds only the owner's real money and the order of buying, and is filled from the receipts he sends. */
window.SPEND = {
  /* the money for moving in, taken out of the bank on 8 Nov 2026: 58,800 ₾ in two places (owner, 8 Nov).
     Every crew payment and receipt says where its money came from (`from`: 'home' | 'bank' | 'other' — 'other' = money outside these 58,800),
     so the page can say how much should be at home and in the bank right now. */
  piles: {
    home: { name: 'სახლში, ნაღდი', via: 'ნაღდით, სახლის ფულიდან', gel: 35000 },
    bank: { name: 'ბანკში', via: 'ბანკიდან — ბარათით ან გადარიცხვით', gel: 23800 },
  },
  // money moved between the two places: { date: '2026-11-20', from: 'bank', to: 'home', gel: 2000, note: 'ბანკომატიდან' }
  // to: 'personal' = taken out of these 58,800 for the owner's own needs: it leaves the pile but is not a cost of the flat
  moves: [
    // owner, 17 Nov: took some bank money for personal needs; the bank now holds exactly 16,235.39 ₾ (it should have held 16,301.05)
    { date: '2026-11-17', from: 'bank', to: 'personal', gel: 65.66, note: 'პირადი საჭიროებისთვის' },
  ],
  // the money being saved apart from the 58,800 (owner, 17 Nov: 3,100 ₾ saved so far). Receipts paid „from: 'other'“ after `date` come off it;
  // when he puts more aside: adds: [{ date: '2026-11-25', gel: 500 }]; when he gives a new real count, set gel and date to it and empty adds
  savings: { date: '2026-11-17', gel: 3100, adds: [] },
  reservePct: 5,                                // unforeseen costs, on what is still to buy

  // the crew's three payments: paid once `date` is set ('YYYY-MM-DD'); lari = `gel` if the paid sum is known, else usd × rate,
  // and with rate null the page asks the National Bank for that day's rate. from: where the money came from (see piles)
  crewPayments: [
    // owner, 14 Nov: paid at the exchange-booth rate, exactly 15,080 ₾ handed over, taken from the 35,000 at home
    { n: 1, usd: 5800, date: '2026-11-14', rate: 2.6, gel: 15080, from: 'home' },
    { n: 2, usd: 5800, date: null, rate: null, gel: null, from: null },
    { n: 3, usd: 5800, date: null, rate: null, gel: null, from: null },
  ],

  // already theirs, bought before this page from other money: counted as spent, not taken from `cash`. gel null = the budget's price
  owned: {
    // links: the products as bought (owner, 7 Nov)
    'he-boiler': { gel: 4175, note: 'ნაყიდია 2.11, ნაწილ-ნაწილ გადახდით — ინვოისი „ქვითრებშია“', links: [['ქვაბი — Qebuli Climate', 'https://qebuli-climate.ge/product/sakondensacio-qvabi/']] },
    'ba-toilet-cistern': { gel: 1069, note: 'ნაყიდია 17.10 — ინვოისი „ქვითრებშია“', links: [
      ['ჩასაშენებელი ავზი Geberit Sigma, 12 სმ — Gorgia', 'https://gorgia.ge/ka/santeqnika/unitazi-da-makompleqteblebi/unitazis-makompleqteblebi-da-aqsesuarebi/unitazis-chamrecxi-meqanizmi/111-950-00-6-sigma-%E1%83%A9%E1%83%90%E1%83%A1%E1%83%90%E1%83%A8%E1%83%94%E1%83%9C%E1%83%94%E1%83%91%E1%83%94%E1%83%9A%E1%83%98-%E1%83%A9%E1%83%90%E1%83%9B%E1%83%A0%E1%83%94%E1%83%AA%E1%83%AE%E1%83%98-%E1%83%9B%E1%83%94%E1%83%A5%E1%83%90%E1%83%9C%E1%83%98%E1%83%96%E1%83%9B%E1%83%98-12%E1%83%A1%E1%83%9B/'],
      ['ჩამრეცხი ღილაკი Geberit Sigma20 — Gorgia', 'https://gorgia.ge/ka/santeqnika/unitazi-da-makompleqteblebi/shekiduli-unitazis-gilaki-avzi-da-jami/shekiduli-unitazis-avzi-da-gilaki/115-882-kk-1-geberit-sigma20-chamrecxi-gilaki/']] },
    'li-gas-detector': { gel: 0, note: 'დეველოპერის საჩუქარი' },
    // owner, 11 Nov: bought at VitrA from saved money, outside the move-in money; 600 ₾ confirmed by the owner, no receipt
    'ba-toilet': { gel: 600, note: 'ნაყიდია 11.11, VitrA-ში, დაგროვებული თანხით — 600 ₾, შენი დადასტურებით', links: [['შეკიდული უნიტაზი VitrA M60 Round 8320B003-6405 — VitrA', 'https://vitra.com.ge/products/40515-wall-hung-toilet-m60-round-white-wall-mounted-52cm-8320b003-6405']] },
  },

  // bought with separate money: shown on its own line, not in the total
  separate: { 'fl-floor': 'ცალკე თანხით, ჯერ არ არის ნაყიდი' },

  /* receipts, one per shop visit; the total is the sum of its lines.
     A row counts as bought once any line points to it, and its real cost is the sum of those lines; a line with row null is a cost the budget has no row for.
     from: 'home' (cash) | 'bank' (card or transfer) | 'other'; ask the owner when a receipt does not show it.
     { id: 'r1', date: '2026-11-12', shop: 'Gorgia', from: 'bank', photo: 'ქვითრები/2026-11-12 gorgia.jpg',
       items: [ { row: 'ba-shower', gel: 1390 }, { row: null, what: 'სილიკონი და ლენტი', gel: 24.5 } ], note: 'შხაპის კომპლექტი' } */
  receipts: [
    // bought before the move-in money, from other money (owner's invoices, sent 8 Nov): counted under „უკვე გაქვს“, not taken from the 58,800
    { id: 'r1', date: '2026-10-17', shop: 'Gorgia, შეკვეთა #2014001', from: 'other', photo: 'ქვითრები/2026-10-17 gorgia 2014001.pdf',
      items: [ { row: 'ba-toilet-cistern', what: 'Geberit Sigma ჩასაშენებელი ავზი 12 სმ', gel: 845 }, { row: 'ba-toilet-cistern', what: 'ჩამრეცხი ღილაკი Geberit Sigma20', gel: 224 } ],
      note: 'TBC ბარათით. მიწოდების მისამართად მარნეული წერია' },
    { id: 'r2', date: '2026-11-02', shop: 'ქებული კლიმატი, შეკვეთა #38674', from: 'other', photo: 'ქვითრები/2026-11-02 qebuli-climate 38674.pdf',
      items: [ { row: 'he-boiler', what: 'Ferroli BLUEHELIX MAXIMA 28 საკონდენსაციო ქვაბი', gel: 4175 } ],
      note: 'ნაწილ-ნაწილ გადახდით; 8.11-ზე შეკვეთის სტატუსი: მუშავდება. მიწოდება ჩხიკვაძის 16-ზე' },
    // owner, 11 Nov: 600 ₾ confirmed by the owner; no receipt photo
    { id: 'r3', date: '2026-11-11', shop: 'VitrA', from: 'other',
      items: [ { row: 'ba-toilet', what: 'შეკიდული უნიტაზი VitrA M60 Round 8320B003-6405, თეთრი პრიალა', gel: 600 } ],
      note: 'დაგროვებული თანხით, შესვლის ფულის გარეთ. 600 ₾ — შენ დაადასტურე' },
    // owner, 14 Nov: one card payment for everything; the shop's slip has no per-item prices, so the whole sum sits on the
    // first tile row (so the tile stage shows it) and the other bought rows get a 0 line (bought, cost inside that sum)
    { id: 'r4', date: '2026-11-14', shop: 'NewDesign (ნიუ დიზაინი), აღმაშენებლის ხეივანი 13 კმ', from: 'bank', photo: 'ქვითრები/2026-11-14 newdesign.jpg',
      items: [
        { row: 'ba-terrazzo', what: 'ყველაფერი ერთად: ტერაცო Grespania Bierzo Marfil Seda 60×120 (44BZP79), 38 კედლის ფილა Novabell Canvë Craie 60×120 (CNV82RT) და 18 ტერაცო — ტერაცოს მეტობა სამზარეულოს ქვეშ წავა — ფუგა და ტუალეტის ქაღალდის საკიდი; ცალ-ცალკე ფასი ქვითარზე არ წერია', gel: 5048.2 },
        { row: 'ba-walltile', what: 'Novabell Canvë Craie 60×120 (CNV82RT) — ფასი ზემოთ, ერთად წერია', gel: 0 },
        { row: 'fl-kitchen-tile', what: 'სააბაზანოს ფილის მეტობა — ცალკე ყიდვა აღარ სჭირდება', gel: 0 },
        { row: 'ba-accessories', what: 'ტუალეტის ქაღალდის საკიდი IMEX Technic CAT002-08/OC, ოქროსფერი — ფასი ზემოთ, ერთად წერია', gel: 0 },
      ],
      note: 'Visa ბარათით, 13:10. შესვლის საერთო ფულიდან. ფილების სახელები და ბმულები მეპატრონემ 15.11-ს მოგვაწოდა' },
    // owner, 14 Nov: same shop, earlier visit (12:21). Slip 1,888.00 ₾ (the owner wrote 1,880); the shop's invoice:
    // 1,350 + 550 + 460 = 2,360 ₾, minus 20% = 1,888 — each line below is its price minus 20%
    { id: 'r5', date: '2026-11-14', shop: 'NewDesign (ნიუ დიზაინი), აღმაშენებლის ხეივანი 13 კმ', from: 'bank', photo: 'ქვითრები/2026-11-14 newdesign 2 ქვითარი.jpg',
      items: [
        // codes checked 14 Nov at IMEX's own and Spanish shops: GPT064 = Toscana shower set, GLM039 = Monza wall basin mixer, RDM001 = Munich wall bidet (hygienic) mixer
        { row: 'ba-shower', what: 'IMEX Toscana GPT064/OC ჩასაშენებელი საშხაპე, ოქროსფერი ბრაშირებული — 1,350 ₾, 20% ფასდაკლებით', gel: 1080 },
        { row: 'ba-hygienic', what: 'IMEX Munich RDM001/OC ჩასაშენებელი ჰიგიენური შემრევი, ოქროსფერი ბრაშირებული — 550 ₾, 20% ფასდაკლებით', gel: 440 },
        { row: 'ba-basin-mixer', what: 'IMEX Monza GLM039/OC ხელსაბნის ჩასაშენებელი შემრევი (კედლიდან), ოქროსფერი ბრაშირებული — 460 ₾, 20% ფასდაკლებით', gel: 368 },
      ],
      note: 'Visa ბარათით, 12:21. შესვლის საერთო ფულიდან. ზედნადები: 2,360 ₾ − 20% = 1,888 ₾ (ზედნადების ფოტო: ქვითრები/2026-11-14 newdesign 2 ზედნადები.jpg)' },
    // owner, 14 Nov, third visit (17:50). Slip 369.75 ₾; the shop's invoice: 3 × 85 + 180 = 435 ₾, minus 15% = 369.75
    { id: 'r6', date: '2026-11-14', shop: 'NewDesign (ნიუ დიზაინი), აღმაშენებლის ხეივანი 13 კმ', from: 'bank', photo: 'ქვითრები/2026-11-14 newdesign 3 ქვითარი.jpg',
      items: [
        { row: 'ba-accessories', what: 'IMEX CAT004-01/OC პირსახოცის საკიდი, ოქროსფერი — 3 ცალი × 85 ₾, 15% ფასდაკლებით', gel: 216.75 },
        { row: 'ba-accessories', what: 'IMEX CAE001-06/OC-B უნიტაზის ჯაგრისი, ოქროსფერი — 180 ₾, 15% ფასდაკლებით', gel: 153 },
      ],
      note: 'Visa ბარათით, 17:50. შესვლის საერთო ფულიდან. ზედნადები: 435 ₾ − 15% = 369.75 ₾ (ზედნადების ფოტო: ქვითრები/2026-11-14 newdesign 3 ზედნადები.jpg)' },
    // owner, 16 Nov: both drains, gold matt like the bathroom's taps, and two anti-smell siphons — one under each drain, so each drain's line carries one.
    // The invoice photo shows a Bank of Georgia card slip under the owner's thumb, hence 'bank'. 126.70 + 42.50 + 2 × 11.90 = 193.00
    { id: 'r7', date: '2026-11-16', shop: 'პენი (შპს პენი)', from: 'bank', photo: 'ქვითრები/2026-11-16 peni ზედნადები.jpg',
      items: [
        { row: 'ba-drain', what: 'ხაზოვანი ტრაპი BAIYI SFD-083, 8 × 60 სმ, უჟანგავი ფოლადი, ოქროსფერი მქრქალი; ზემოდან კერამოგრანიტი ეკვრება, ჩანს მხოლოდ ოქროსფერი კანტი (დიზაინერთან 70 სმ-ია)', gel: 126.7 },
        { row: 'ba-drain', what: 'ტრაპის სიფონი Valtemo VLD-507860, 360°, სუნის საწინააღმდეგო', gel: 11.9 },
        { row: 'ba-floor-drain', what: 'კვადრატული ტრაპი BAIYI SFD-042, 10 × 10 სმ, უჟანგავი ფოლადი, ოქროსფერი მქრქალი; ზემოდან კერამოგრანიტი ეკვრება, ჩანს მხოლოდ ოქროსფერი კანტი (დიზაინერთან შავია)', gel: 42.5 },
        { row: 'ba-floor-drain', what: 'ტრაპის სიფონი Valtemo VLD-507860, 360°, სუნის საწინააღმდეგო', gel: 11.9 },
      ],
      note: 'ბარათით (საქართველოს ბანკის ქვითარი). შესვლის საერთო ფულიდან. ზედნადები: 193.00 ₾' },
  ],

  // the part of a row needed now; the rest waits with the furniture it lights
  part: {
    'li-led-strip': { k: 0.84, now: 'ჭერისა და კედლის ლენტი (დაახლ. 38 მ) — პროფილები ჭერში ახლავე ჩადგება', later: 'ტელევიზორის კონსოლისა და ვიტრინის ლენტი (დაახლ. 7 მ)' },
  },
  // one thing that the budget keeps as two rows: the other row's options join this one's, each with a warning
  merge: {
    'ki-fridge': { from: 'ki-fridge-wide', name: 'ჩასაშენებელი მაცივარი', warn: 'ფართო მაცივარია: დიზაინერის სვეტში (შიგნით 70 სმ) არ ეტევა — სვეტი დაახლ. 75 სმ-მდე უნდა გაფართოვდეს' },
  },
  // waits until after moving in; the text says what still has to be done now so it can be added later without breaking the finished walls
  later: {
    'ki-dishwasher': 'ახლავე: წყალი, კანალიზაცია და როზეტი სამზარეულოში; ავეჯში 60 სმ ადგილი დატოვეთ',
    'ki-washer': 'ახლავე: წყალი, კანალიზაცია და ორმაგი როზეტი ჰოლის კარადაში (01-A)',
    'ki-dryer': 'ახლავე: იგივე როზეტი, სარეცხის თავზე',
    'ki-stacking-kit': '',
    'fu-sofa': '', 'fu-ottoman': '', 'fu-coffee-table': '', 'fu-dining-table': '', 'fu-dining-chairs': '', 'fu-rug': '',
    'fu-tv': 'ახლავე: როზეტი და კაბელის მილი ტელევიზორის კედელში',
    'fu-display-cabinet': '', 'fu-tree': '',
    'fu-bed-200': '', 'fu-mattress-200': 'დროებითი მატრასი გაქვთ', 'fu-bedside-round': '', 'fu-pouf-round': '',
    'fu-ac': 'ახლავე: ტრასა კედელში — ბრიგადა აკეთებს',
    'fu-bed-90': '', 'fu-mattress-90': '', 'fu-bedside-small': '', 'fu-desk-chairs': '', 'fu-robot': '', 'fu-art': '', 'fu-table-lamps': '',
    'cu-wardrobes': 'ყველაზე დიდი თანხაა. ახლავე: ჭერი, იატაკი და შეღებვა კარადების ადგილზეც; სარეცხის წერტილები 01-A-ში',
    'cu-tv-console': 'ახლავე: LED-ის კვება და როზეტები კონსოლის ადგილზე',
    'cu-desk': 'ახლავე: განათებული ნიშის კვება და როზეტები',
    'cu-hall-shelf': '',
    'cu-door-panels': 'ახლა კარის თავზე კედელი უბრალოდ შეიღებება; პანელი მერე ზედ დაეკვრება',
    'cu-wall-cover': 'ახლა კედელი უბრალოდ შეიღებება',
    'cu-brass-strips': '',
    'cu-curtains': 'ახლავე: ფარდის ჯიბე ჭერში. საძინებლისთვის შეიძლება ადრე დაგჭირდეთ',
    'cu-curtain-tracks': 'ჯიბე ჭერში ახლავე კეთდება, კარნიზი მერე ჩაჯდება',
    'cu-mirror-hall': 'ახლავე: უკანა განათების კვება',
    'cu-mirror-wavy': 'ახლავე: განათების კვება',
    'li-dining-pendants': 'სადენი ახლავე; დროებით უბრალო ნათურა',
    'li-mirror-pendants': 'სადენი ახლავე; დროებით უბრალო ნათურა',
    'li-wall-globes': 'სადენი ახლავე',
    'li-reading-lights': 'სადენი ახლავე',
  },
  // the later list is grouped by the part of the flat; first match wins
  areas: [
    ['სამზარეულო და სარეცხი', /^(cu-kitchen|ki-)/],
    ['გათბობა და კონდიციონერი', /^(he-|cu-radiators|fu-ac)/],
    ['განათება', /^li-/],
    ['კედლები, კარები და ფარდები', /^(cu-door|cu-wall-cover|cu-brass-strips|cu-curtain)/],
    ['ავეჯი და დეკორი', /./],
  ],

  // the works the crew does not do: who does them, and with which purchase they go (its stage decides now or later)
  works: {
    'la-appliances': { who: 'ჯერ არ ვიცით — ჰკითხეთ ბრიგადას, დაბრუნდებიან თუ არა სამზარეულოს მისაერთებლად; თუ არა, ტექნიკის მაღაზიის ან სხვა ხელოსანი', with: 'cu-kitchen' },
    'la-ac': { who: 'კონდიციონერის გამყიდველი ან მისი ხელოსანი — ზოგი მაღაზია უფასოდ ამონტაჟებს, ყიდვისას ჰკითხეთ', with: 'fu-ac' },
    'la-curtain-tracks': { who: 'კარნიზის გამყიდველი ან ხელოსანი; ბრიგადამ ჯერ არ თქვა, შედის თუ არა', with: 'cu-curtain-tracks' },
    'la-wallcover': { who: 'პანელის გამყიდველი აკრავს; კედელს ბრიგადა ამზადებს. მაღაზიაში ჰკითხეთ, დაკვრა ფასში შედის თუ ცალკეა', with: 'cu-wall-cover' },
  },

  /* the crew's work in order, and what has to be in the flat BEFORE each stage starts. No dates: the crew's plan is not known yet.
     rows: budget row ids; every row the owner buys (not the crew's, not a work) stands in exactly one stage — see check() below */
  stages: [
    { id: 'pipes', name: 'ელექტრო და წყლის გაყვანილობა',
      why: 'სანტექნიკოსი კედელში ჩასაშენებელ ნაწილებს მილებთან ერთად აყენებს — პირველივე დღეებში ბინაში უნდა იყოს. ავტომატები ფარის აწყობამდე მოიცდის.',
      // the crew's word on 8 Nov: the bathroom goes first
      alert: 'ბრიგადამ 8 ნოემბერს თქვა: სააბაზანო ეჩქარებათ — ეს ნაწილები ახლავე იყიდე. ახლავე აირჩიე (ყიდვა მოიცდის): პირსახოცის საშრობი, ქვის ნიჟარა და სარკე — მილი და სადენი მათ ზომაზე გაიყვანება.',
      rows: ['ba-toilet-cistern', 'ba-shower', 'ba-basin-mixer', 'ba-hygienic', 'ba-drain', 'ba-floor-drain'] },
    { id: 'ceiling', name: 'ჭერი',
      why: 'LED-ის პროფილები, ჭერში ჩაძირული არხები და სანათების ჩარჩოები ჭერის აწყობისას ჯდება — ხვრელის ზომა მათზეა დამოკიდებული.',
      rows: ['li-led-strip', 'li-twin-frames', 'li-single-spots', 'li-kitchen-lines', 'li-magnetic-track'] },
    { id: 'tile', name: 'ფილა',
      why: 'ფილა ბინაში უნდა იყოს, სანამ მეფილე მოვა. ლამინატიც უკვე არჩეული უნდა იყოს — სააბაზანოსა და ოთახების იატაკის დონე რომ დაემთხვეს.',
      rows: ['ba-terrazzo', 'ba-walltile', 'fl-kitchen-tile'] },
    { id: 'paint', name: 'შპალერი და ღებვა',
      why: 'ბრიგადა შპალერს აკრავს და ღებავს, მასალას თქვენ ყიდულობთ. საღებავი ჯერ ცოტა — ფერი კედელზე გასინჯეთ.',
      rows: ['cu-paint-wallpaper', 'cu-paint'] },
    { id: 'floor', name: 'იატაკი',
      why: 'ლამინატი და ქვესაგები ორი დღით ადრე მოიტანეთ, რომ ოთახის ტემპერატურას შეეგუოს.',
      rows: ['fl-underlay', 'fl-floor'] },
    { id: 'fit', name: 'სანათები, როზეტები, სანტექნიკა',
      why: 'ბრიგადა ამონტაჟებს ყველაფერს, რასაც იყიდით. შხაპის მინა და ნიჟარის ქვა ფილის შემდეგ იზომება.',
      rows: ['li-gu10-lamps', 'li-sockets-switches', 'li-breakers', 'li-balcony-lights', 'li-gas-detector',
        'ba-toilet', 'ba-vanity', 'ba-vanity-cabinet', 'cu-wc-cabinet', 'ba-mirror', 'ba-glass', 'ba-towel-rail', 'ba-fan', 'ba-accessories',
        'cu-radiators', 'cu-radiators-panel', 'he-boiler', 'he-boiler-cabinet', 'he-gas'] },
    { id: 'doors', name: 'კარები და პლინტუსი',
      why: 'კარები შეკვეთით რამდენიმე კვირა მზადდება — ზომა კარის ღიობებიდან, კედლების შემდეგ.',
      rows: ['cu-doors-oak', 'fl-skirting'] },
    { id: 'kitchen', name: 'სამზარეულო',
      why: 'ავეჯის ოსტატს ტექნიკის ზუსტი მოდელები სჭირდება; ქვის ზედაპირი ქვედა კარადების შემდეგ იზომება.',
      rows: ['cu-kitchen', 'ki-fridge', 'ki-oven', 'ki-hob-mixed', 'ki-hood', 'ki-sink', 'ki-tap', 'ki-worktop'] },
    { id: 'later', name: 'შესვლის შემდეგ / ავეჯი', later: true,
      why: 'შესვლის შემდეგ, ეტაპობრივად. ყვითლად წერია, რა უნდა მომზადდეს ახლავე, რომ მერე მზა კედელი არ დაზიანდეს.' },
  ],
};

// the rows of a stage (the last one takes every `later` row), and a check that every row the owner buys stands in exactly one stage.
// Works (la-*), rough materials (rm-*), the crew's rows and a row joined into another are not bought by the owner and stay out.
window.SPEND.stageRows = function (s) { return s.later ? Object.keys(window.SPEND.later) : s.rows; };
window.SPEND.check = function (budget, covers) {
  const S = window.SPEND, cov = new Set(covers || []), joined = new Set(Object.values(S.merge).map(m => m.from));
  const all = budget.groups.flatMap(g => g.rows).filter(r => r && r.id), ids = new Set(all.map(r => r.id)), seen = {};
  for (const s of S.stages) for (const id of S.stageRows(s)) (seen[id] = seen[id] || []).push(s.id);
  const need = all.filter(r => !cov.has(r.id) && !/^(la|rm)-/.test(r.id) && !joined.has(r.id)).map(r => r.id);
  return {
    missing: need.filter(id => !seen[id]),                                         // a row to buy that no stage names
    twice: Object.keys(seen).filter(id => seen[id].length > 1),                    // a row in two stages
    unknown: Object.keys(seen).filter(id => !ids.has(id)),                        // a stage names a row the budget does not have
    covered: Object.keys(seen).filter(id => cov.has(id) || /^(la|rm)-/.test(id)), // a stage names the crew's row or a work
    count: need.length,
  };
};
