/* ---------- geometry, in millimetres. x → right, y → down, as on the measured sheet ---------- */
(function () {
  // Everything below is the designer's final drawing set (IJ Design Studio, 10.2026: A.8 survey taken on site with a laser, A.9 new partitions, A.10 furniture, A.11–A.13 electrics,
  // A.14 plumbing, A.15 ceiling, A.16 bathroom walls, A.17–A.21 joinery), read off the drawings' own geometry at 1:40 (owner, 2026-10-31: the designer's file is the only truth).
  // Faces are the finished faces: the designer draws 15 mm of plaster on every wall, so the survey's structural faces lie 15 mm behind these. Origin: the olive wall (y = 0) and the kitchen wall (x = 0).
  const H = 2900;      // finished ceiling: the bathroom elevations (A.16) are 2,900 high and the tall units are 2,880 (A.17–A.21; 01-B and 04-A 2,650, under the beams); the slab measured 2,980, the ceiling hangs below it
  const rooms = [
    { id: 'living', name: 'მისაღები', proj: 22.83, lp: [3400, 1900],      // A.10 zone 02 „სტუდიო“; two 120-deep drywall boxes on the olive wall leave the 2,750 niche for the sofa (A.9)
      poly: [[0,0],[2956,0],[2956,120],[3656,120],[3656,0],[6406,0],[6406,120],[6746,120],[6746,180],[6946,180],[6946,3235],[-274,3235],[-274,2524],[0,2524]] },
    { id: 'hall', name: 'ჰოლი', proj: 8.98, lp: [1170, 5300],      // zone 01; the short wall beside the niche runs on to 700 (new drywall, A.9); a pier squares the shaft corner to the beam's face (A.9 note)
      poly: [[-274,3365],[886,3365],[886,4065],[1016,4065],[1016,3235],[2096,3235],[2096,7495],[426,7495],[426,5910],[296,5910],[296,6194],[-274,6194]] },
    { id: 'bed4', name: 'საძინებელი №4', proj: 13.23, lp: [4700, 4300],      // zone 03 „საძინებელი“ (main)
      poly: [[2226,3365],[6946,3365],[6946,5762],[6746,5762],[6746,6195],[3800,6195],[3800,5895],[2970,5895],[2970,6195],[2226,6195]] },
    { id: 'bed3', name: 'საძინებელი №3', proj: 13.86, lp: [4900, 7900],      // zone 04 „ბავშვების“; a 400-deep drywall/block pier by the window (A.9)
      poly: [[2226,6325],[6746,6325],[6746,6592],[6946,6592],[6946,6695],[6547,6695],[6547,6825],[6946,6825],[6946,9410],[2526,9410],[2526,7625],[3126,7625],[3126,7495],[2226,7495]] },
    { id: 'wc', name: 'სააბაზანო', proj: 4.29, lp: [1000, 8300],      // zone 05, 2,458 × 1,785 between tiles (A.16)
      poly: [[426,7625],[2396,7625],[2396,9410],[-62,9410],[-62,7824],[426,7824]] },
  ];
  // the balcony carries no dimension on the drawings; read off the survey's lines (A.8, 1:40): 1,254 deep from the wall to the glass rail, 5,245 long from the closet to the rail's end
  const balcony = { id: 'balcony', name: 'აივანი', proj: 8.1, lp: [7790, 3900],
    poly: [[7162,1130],[8416,1130],[8416,6375],[7162,6375]] };
  const closet = { id: 'closet', name: 'საკუჭნაო', lp: [7786, 590],
    poly: [[7176,180],[8396,180],[8396,1000],[7176,1000]] };

  const FOOT = [[-489,-215,7162,9625],[2985,-415,3785,-215],[6746,-635,7162,-215],[7162,65,8511,1130]];
  const COLS = [[2985,-415,3785,0],[6746,-635,7162,180],[2970,5895,3800,6325],[6746,5762,7162,6592]];
  const SHAFTS = [[-489,-215,0,2524],[-489,6194,426,7824],[-489,7824,-62,9625]];
  const OPEN = [
    { r: [-489,4613,-274,5613], sill: 0,   head: 2100, type: 'door', t: 'შესასვლელი კარი' },   // შესასვლელი, 1,000
    { r: [2096,3571,2226,4471], sill: 0,   head: 2200, type: 'door', t: 'საძინებელი №4-ის კარი' },   // საძინებელი 4, 900
    { r: [2096,6493,2226,7393], sill: 0,   head: 2200, type: 'door', t: 'საძინებელი №3-ის კარი' },   // საძინებელი 3, 900
    { r: [576,7495,1376,7625],  sill: 0,   head: 2100, type: 'door', t: 'სააბაზანოს კარი' },   // სააბაზანო: an 800 door set nearer the shaft, opening out into the hall; 150 of new wall fills the old opening's far end (A.9)
    { r: [6946,1575,7162,2975], sill: 0,   head: 2685, type: 'glass', t: 'აივნის მინის კარი', parts: [{ w: 600, k: 'win' }, { w: 800, k: 'door', hinge: 'end' }] },  // მისაღები → აივანი
    { r: [6946,3735,7162,5135], sill: 0,   head: 2685, type: 'glass', t: 'აივნის მინის კარი', parts: [{ w: 800, k: 'door', hinge: 'start' }, { w: 600, k: 'win' }] },  // საძინებელი 4 → აივანი
    { r: [6946,7973,7162,8873], sill: 0,   head: 2685, type: 'glass', t: 'ფანჯარა იატაკამდე', parts: [{ w: 900, k: 'win', fixedBelow: 900 }] },  // საძინებელი 3, ფანჯარა
    { r: [7329,1000,8229,1130], sill: 0,   head: 2100, type: 'door', sw: 1, parts: [{ w: 900, k: 'door', solid: true, hinge: 'end' }] },   // საკუჭნაო
  ];

  const inRect = (r, x, y) => x > r[0] && x < r[2] && y > r[1] && y < r[3];
  function inPoly(poly, x, y) {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  const area = poly => Math.abs(poly.reduce((s, [x, y], i) => {
    const [x2, y2] = poly[(i + 1) % poly.length]; return s + x * y2 - x2 * y;
  }, 0)) / 2e6;

  // Everything inside the outline that is not a room is wall. Cut it into merged rectangles.
  function buildWalls() {
    const voids = [...rooms, closet];
    const xs = new Set(), ys = new Set();
    const addR = r => { xs.add(r[0]); xs.add(r[2]); ys.add(r[1]); ys.add(r[3]); };
    FOOT.forEach(addR); COLS.forEach(addR); SHAFTS.forEach(addR); OPEN.forEach(o => addR(o.r));
    voids.forEach(v => v.poly.forEach(([x, y]) => { xs.add(x); ys.add(y); }));
    const X = [...xs].sort((a, b) => a - b), Y = [...ys].sort((a, b) => a - b);
    const rows = [];
    for (let j = 0; j < Y.length - 1; j++) {
      const cy = (Y[j] + Y[j + 1]) / 2, row = [];
      let run = null;
      for (let i = 0; i < X.length - 1; i++) {
        const cx = (X[i] + X[i + 1]) / 2;
        let key = null;
        if (FOOT.some(r => inRect(r, cx, cy)) && !voids.some(v => inPoly(v.poly, cx, cy))) {
          const op = OPEN.findIndex(o => inRect(o.r, cx, cy));
          const kind = COLS.some(r => inRect(r, cx, cy)) ? 'col' : SHAFTS.some(r => inRect(r, cx, cy)) ? 'shaft' : 'wall';
          key = kind + '|' + op;
        }
        if (run && run.key === key) run.x2 = X[i + 1];
        else { if (run && run.key) row.push(run); run = { key, x1: X[i], x2: X[i + 1], y1: Y[j], y2: Y[j + 1] }; }
      }
      if (run && run.key) row.push(run);
      rows.push(row);
    }
    const out = [];
    let open = [];
    for (const row of rows) {
      const next = [];
      for (const r of row) {
        const m = open.find(o => o.key === r.key && o.x1 === r.x1 && o.x2 === r.x2 && o.y2 === r.y1);
        if (m) { m.y2 = r.y2; next.push(m); } else { out.push(r); next.push(r); }
      }
      open = next;
    }
    return out.map(r => { const [kind, op] = r.key.split('|'); return { ...r, kind, op: +op }; });
  }

  // ceiling lights: [x, y, lamps] — 2 = a twin recessed fitting, 1 = a single round spot. From the lighting plan (A.13): 15 twins, 3 spots, as its table counts.
  // The 3D view, the wiring layer of the plan and both budgets use these lists.
  const spots = [
    [1557,800,2], [1557,2434,2],                                        // kitchen front
    [4212,800,2], [4212,2434,2], [5942,800,2], [5942,2434,2],           // living room, sofa zone
    [267,4987,2], [1557,4987,2], [1557,6902,2],                         // hall
    [3862,5284,2], [6262,5284,2],                                       // bedroom 4, along the bed's foot
    [4112,7124,2], [6112,7124,2], [4112,8724,2], [6112,8724,2],         // bedroom 3
    [439,8517,1], [1168,8517,1], [1897,8517,1],                         // bathroom
  ];
  const linear = [[1001,367,1001,2867]];                                                   // one 2,500 recessed line of light over the kitchen front: [x1, y1, x2, y2]
  const track = { line: [3812,3913,6312,3913], lamps: 3 };                                // 2,500 line in bedroom 4 (A.13), a black magnetic track with three linear lamps as in the pictures
  const pendants = [[2200,550],[2200,1050],[2013,5685],[1970,5829]];                      // two glass globes over the dining table; two small ones by the hall mirror
  // [x, y, how many one above the other, group, heights of their middles]: two pairs over the sofa at 1,200 and 1,900; the bed's two at 1,400 with a pull cord; two on the balcony over the middles of the two glass doors, so above their heads (height not on the drawings)
  const wallLights = [[4057,40,2,'F',[1200,1900]], [6007,40,2,'F',[1200,1900]], [4286,6155,1,'Z',[1400]], [5286,6155,1,'Z',[1400]], [7202,2274,1,'O',[2800]], [7202,4434,1,'O',[2800]]];
  // sockets from the designer's plan (A.11): [x, y, how many, note, height of its middle when not the usual 300], placed 100 inside the room from the wall they are on.
  // 21 points as its table counts (31.10, 20:37): 6 single, 11 double, 1 triple, 2 internet, 1 with a lid (the balcony); the two air-conditioner points are listed with them.
  // In the hall wardrobe 01-A: a double one at 350 for the washer and the dryer — A.11 puts it 800 from the entrance wall, in the bay without the machines; with the bays mirrored it moves to 300 from that wall; a modem box with an internet point under the electric panel (its height is not given: ours)
  const sockets = [
    [1500,100,1], [2799,100,1], [6561,220,2], [100,999,2,'',750], [100,1300,1,'',1100], [100,1949,1,'',650], [-174,2879,1,'მაცივარი',2200],
    [4621,3135,1,'ინტ.',500], [4871,3135,3,'TV',500], [5496,3135,2,'',850], [6846,840,1,'კონდ.',2500],
    [7276,588,2,'',1000], [7262,3355,1,'ლუქით',900],
    [26,3465,2,'სარეცხი და საშრობი',350], [-174,3770,1,'ინტ. (მოდემი)',1250], [171,6094,2,'ვერტ.'],
    [3924,6095,2,'',1100], [5947,6095,2,'ვერტ.',650], [6446,3465,1,'კონდ.',2500],
    [5326,6425,2,'',950], [6146,6425,2,'',950], [5076,9310,2,'',650],
    [338,9310,1,'',1100],
  ];
  // switches from the designer's plan (A.12): [x, y, room, keys or 'rev' (two-way / intermediate), height of its middle when not the usual 850].
  // The first one and the splashback socket at 1,300 share one spot on the drawings; they are set side by side in one frame
  const switches = [[100,1380,'living',1,1100], [6846,1396,'living','rev'], [5383,3135,'living',1], [1066,3384,'living',3], [2046,3384,'living',3], [6846,3675,'bed4','rev'],
    [-174,4453,'hall',3], [2326,4543,'bed4',3], [2326,4643,'bed4','rev'], [1996,5978,'hall',2,1100], [3852,6095,'bed4','rev'], [5845,6095,'bed4','rev'],
    [5470,6425,'bed3',1,950], [1505,7395,'wc',1], [2910,7395,'bed3',2], [255,9310,'wc',2,1100]];
  // the groups of lamps that go on together, as the wiring on A.12 joins them: [letter, what, the switches above that work it (1 = the first), short name]
  const light = {
    groups: [
      ['A', 'მისაღები: ჭერის ოთხი ორმაგი სანათი დივნის ზონაში', [5], 'ჭერი დივანთან'], ['B', 'სამზარეულო: ჭერის ორი ორმაგი სანათი', [4], 'ჭერი სამზარეულოსთან'], ['P', 'სამზარეულო: ხაზოვანი სანათი დახლის თავზე', [4], 'ხაზოვანი'],
      ['C', 'სასადილო მაგიდის ორი ჩამოსაკიდი სანათი', [4], 'ჩამოსაკიდები'], ['D', 'დივნის ნიშის ფარული შუქი ჭერის ჯიბეში', [5], 'ნიშის შუქი'], ['F', 'მისაღების ბრები: ორ-ორი დივნის თავზე', [5], 'ბრები'],
      ['E', 'სამზარეულოს სამუშაო ზედაპირის შუქი ზედა კარადების ქვეშ', [1], 'ზედაპირის შუქი'], ['V', 'ტელევიზორის კონსოლისა და ვიტრინის შუქი', [3], 'ტვ კედელი'],
      ['G', 'ჰოლის ჭერის სამი ორმაგი სანათი', [7], 'ჭერი'], ['W', 'ჰოლის კარადის შიდა შუქი', [7], 'კარადა'], ['X', 'ჰოლის სარკის შუქი', [7], 'სარკე'],
      ['H', 'ჰოლის ორი ჩამოსაკიდი სანათი სარკესთან', [10], 'ჩამოსაკიდები'], ['Y', 'ჰოლის ვიწრო კარადის (01-B) შიდა შუქი', [10], 'ვიწრო კარადა'],
      ['I', 'საძინებელი №4: ჭერის ორი ორმაგი სანათი', [8], 'ჭერი'], ['T', 'საძინებელი №4: ტრეკი', [8], 'ტრეკი'], ['U', 'საძინებელი №4: ღია თაროს და კარადის შუქი', [8], 'თარო'],
      ['J', 'საძინებელი №4: საწოლის თავის შუბლის ფარული შუქი — კართან და საწოლის ორივე მხარეს', [9, 11, 12], 'საწოლის თავი'], ['Z', 'საძინებელი №4: საწოლის ორი ბრა, თოკით', [], 'ბრები'],
      ['K', 'საძინებელი №3: ჭერის ოთხი ორმაგი სანათი', [15], 'ჭერი'], ['Q', 'საძინებელი №3: კარადის შუქი', [15], 'კარადა'], ['L', 'საძინებელი №3: ჭერის ჯიბისა და ფარდის ჯიბის შუქი', [13], 'ჯიბეები'],
      ['M', 'სააბაზანოს ჭერის სამი სანათი', [14], 'ჭერი'], ['N', 'სააბაზანო: სარკის შუქი და საშხაპის ჭერის ჯიბე', [16], 'სარკე'], ['R', 'სააბაზანო: ნიჟარის ქვეშა შუქი და გამწოვი ვენტილატორი', [16], 'ნიჟარა'],
      ['O', 'აივნის ორი ბრა — მისაღებიდან და საძინებელი №4-დან', [2, 6], 'აივანი'],
    ],
    switchText: ['სამზარეულოს ფართუკზე, 110 სმ — ზედაპირის შუქი (E)', 'მისაღებში, აივნის კართან — აივანი (O), ორი ადგილიდან', 'ტელევიზორის კედელზე — კონსოლი და ვიტრინა (V)',
      'მისაღების გასასვლელთან, ნიშის კედელზე — სამზარეულოს ჭერი (B), ხაზოვანი (P), ჩამოსაკიდები (C), სამი ღილაკი', 'მისაღების გასასვლელთან, საძინებლის კედელზე — მისაღების ჭერი (A), ბრები (F), ნიშის შუქი (D), სამი ღილაკი',
      'საძინებელ №4-ში, აივნის კართან — აივანი (O), მეორე ადგილიდან', 'შესასვლელთან — ჰოლის ჭერი (G), კარადა (W), სარკე (X), სამი ღილაკი', 'საძინებელი №4-ის კართან — ტრეკი (T), ჭერი (I), თარო (U), სამი ღილაკი',
      'საძინებელი №4-ის კართან — საწოლის თავი (J), სამი ადგილიდან', 'ჰოლში, სარკის ბოლოს, 110 სმ — ჩამოსაკიდები (H) და ვიწრო კარადის შუქი (Y)', 'საწოლის მარცხნივ — საწოლის თავი (J), შუალედური', 'საწოლის მარჯვნივ — საწოლის თავი (J)',
      'საძინებელ №3-ში, მაგიდასთან, 95 სმ — ჯიბეების შუქი (L)', 'სააბაზანოს კართან, გარედან — სააბაზანოს ჭერი (M)', 'საძინებელი №3-ის კართან — ჭერი (K) და კარადა (Q)', 'სააბაზანოში, ნიჟარასთან, 110 სმ — სარკე (N), ნიჟარა და ვენტილატორი (R)'],
    spotGroup: ([x, y]) => ({ living: x < 3000 ? 'B' : 'A', hall: 'G', bed4: 'I', bed3: 'K', wc: 'M', balcony: 'O' })[([...rooms, balcony].find(r => inPoly(r.poly, x, y)) || {}).id] || '?',
    pendGroup: i => i < 2 ? 'C' : 'H',
  };
  // other points on the electrical plans: [x, y, what, height]
  const points = [[881,3135,'გაზის დეტექტორი',2650], [-174,3770,'ელ. ფარი',null], [38,8911,'გამწოვი ვენტილატორი',null]];

  // kitchen along the shaft wall (02-A, A.10 and A.18): base run from the olive wall (y = 0) to the fridge recess (y = 2524), widths in mm.
  // The plan puts the hob at 232–812 and the sink at 1,773–2,273 (it stands at 1,812–2,312 here, inside its own cabinet: drawn at 1,773 it would run 21 onto the dishwasher's);
  // the run is 900 high and 600 deep, the wall units 1,380 high and 340 deep up to 2,880.
  // The fronts are A.18's: from the olive wall an 18 end panel, a 201 pull-out, the oven 600, three drawers 525, the dishwasher 450, the sink 550 and a plain 150 by the fridge,
  // 2,494 in all; then the fridge column, 736 wide (A.18), whose back part is cut 30 round the recess's corner (the recess is 711 deep into the wall's line at 2,524).
  // Five equal wall doors of 499 in two rows, split at 2,500; the hood sits behind the first two
  const kitchen = {
    len: 2494, depth: 600, wallDepth: 340, plinth: 100, top: 860, slab: 40, wallFrom: 1500, wallTo: 2500, wallTop: 2880,
    base: [ { w: 18, k: 'filler' }, { w: 201, k: 'pull', name: 'ვიწრო გამოსაწევი' }, { w: 600, k: 'oven', name: 'ღუმელი და ქურა' }, { w: 525, k: 'drawers', name: 'უჯრები' },
            { w: 450, k: 'dish', name: 'ჭურჭლის სარეცხი' }, { w: 550, k: 'sink', name: 'ნიჟარა' }, { w: 150, k: 'filler' } ],
    wall: [ { w: 998, k: 'hood', doors: 2, name: 'გამწოვი' }, { w: 499, k: 'door', hinge: 'start', name: 'თეფშები' },
            { w: 499, k: 'door', hinge: 'end', name: 'ჭიქები' }, { w: 498, k: 'door', hinge: 'end', name: 'საშრობი' } ],
  };

  // strips of light: [group, metres, [[x1, y1, x2, y2], ...], [where its letter stands]] — the lighting plan draws them, the take-off adds them up.
  // The designer marks where each one is fed (A.13, „ელ. წერტილი — განათების წყარო“, 15 points); the lengths follow the joinery they light
  const led = [
    ['E', 2.49, [[300, 0, 300, 2494]], [450, 1290]], ['D', 2.75, [[3656, 60, 6406, 60]], [5000, 260]],
    ['V', 2.8, [[3271, 3010, 6071, 3010]], [4400, 2900]], ['V', 4.36, [[5700, 3100, 6050, 3100]], [5870, 2950]],      // the console's underside; the glazed part's two uprights, 2 × 2.18
    ['W', 1.16, [[-274, 4000, 886, 4000]], [300, 3900]], ['X', 6.8, [[2080, 4586, 2080, 5586]], [1940, 5080]], ['Y', 2.88, [[-274, 6150, 296, 6150]], [0, 6050]],
    ['U', 2.88, [[2727, 6150, 2970, 6150]], [2850, 6050]], ['J', 2.95, [[3800, 5978, 6746, 5978]], [5300, 5870]],
    ['L', 3.24, [[3511, 6385, 6746, 6385]], [5100, 6520]], ['L', 2.59, [[6653, 6825, 6653, 9410]], [6500, 8100]], ['Q', 1.79, [[3100, 7625, 3100, 9410]], [3000, 8500]],
    ['N', 1.79, [[2346, 7625, 2346, 9410]], [2230, 8150]], ['N', 5.4, [[-62, 9380, 1438, 9380]], [700, 9280]], ['R', 1.5, [[-62, 9000, 1438, 9000]], [700, 8890]],
  ];
  // curtains hang in pockets cut into the ceiling along the balcony wall (A.15): [x of the pocket's middle, y1, y2, room]
  const rails = [[6701,120,3235,'მისაღები'], [6701,3365,5895,'საძინებელი №4'], [6653,6825,9410,'საძინებელი №3']];
  // the ceiling plan (A.15): pockets cut into the ceiling [x1, y1, x2, y2] for curtains and for hidden light, and the lit fascia over the bed head
  const pockets = [
    { r: [6641,120,6761,3235], k: 'curtain' }, { r: [6641,3365,6761,5895], k: 'curtain' }, { r: [6546,6825,6761,9410], k: 'curtain' },
    { r: [3656,0,6406,120], k: 'light' }, { r: [3511,6325,6746,6445], k: 'light' }, { r: [2296,7625,2396,9410], k: 'light' },
    { r: [3800,5895,6746,6060], k: 'fascia' },
  ];
  // ceiling beams as plan rectangles, undersides at Z. Places from the drawings' dashed lines: one 400 wide across the whole flat at x 3,112–3,511,
  // one 400 wide across it at y 5,910–6,310, one along the balcony wall. Their depth is not on the drawings: Z is our own measurement (2,660).
  // In the living room the beam is boxed in fluted drywall with rounded corners, 700 wide (A.15, section A-A); round: the two long lower edges are rounded in the model
  const Z = 2660;
  // The hall's beam runs on over 01-B, which the designer lowered to 2,650 (A.17 of 31.10, 20:37); over 03-A's open shelf A.19 still draws 2,880 — a question for the designer.
  // In bedroom 3 the strip between the beam and the bathroom's wall, over wardrobe 04-A, is filled down to the beam's level (A.15: „შეივსოს რიგელის დონეზე“); fill: drawn as a beam, it is drywall
  const beams = [ { r: [2955,120,3655,3235], round: 1, flute: 1 }, { r: [3112,3365,3511,5910] }, { r: [3112,6325,3511,9410] },
    { r: [-274,5910,2096,6310] }, { r: [3800,5910,6746,6195] }, { r: [2226,5910,2726,6195] },
    { r: [6761,180,6946,3235] }, { r: [6761,3365,6946,5762] }, { r: [6761,6825,6946,9410] }, { r: [2526,7625,3112,9410], fill: 1 } ];
  // built-in things the take-off needs; the 3D model reads the same numbers. r: footprint, z: [from, to] (floor to ceiling unless given), front: the axis its priced front runs along,
  // thin: a skin on a wall, float: hangs on the wall (hides nothing), paint: plastered and painted like the wall it stands at. Tall units are 2,880 (A.17–A.21), except 01-B and 04-A at 2,650 (TB), which stand under the beams (drawing set of 31.10, 20:37)
  const KT = kitchen.top + kitchen.slab, TU = 2880, TB = 2650, stripsOf = (a, b, step) => { const o = []; for (let x = b - step; x > a; x -= step) o.push(x); return o; };
  const built = {
    kbase:   { t: 'სამზარეულოს ქვედა კარადები ზედაპირით', r: [0,0,kitchen.depth,kitchen.len], z: [0,KT] },
    ksplash: { t: 'ფართუკის ფილა', r: [0,0,8,kitchen.len], z: [KT,kitchen.wallFrom], thin: 1 },      // 900–1,500 from the finished floor (A.3)
    kend:    { t: 'ფართუკის ფილა გვერდით კედელზე', r: [0,0,kitchen.depth,8], z: [KT,H], thin: 1 },      // the same tile on the wall at the hob's end, from 900 to the ceiling (A.3)
    kwall:   { t: 'სამზარეულოს ზედა კარადები', r: [0,0,kitchen.wallDepth,kitchen.len], z: [kitchen.wallFrom,TU] },
    fridge:  { t: 'მაცივრის კარადა', r: [-274,kitchen.len,kitchen.depth,kitchen.len + 736], z: [0,TU] },      // A.18: 736 wide, 850 deep, its back cut round the recess's corner at 2,524
    niche:   { t: 'კარადა სარეცხი მანქანით', n: 'კარადა სარეცხი მანქანით (ჰოლი, 01-A)', r: [-274,3365,886,4065], z: [0,TU], front: 'x' },      // 1,160 × 700 (A.17): the washing machine with the dryer stacked on it; the owner mirrored the bays (2026-11-01), so the machines stand in the right (wide) bay and their socket is in the left one, by the panel
    cab:     { t: 'ვიწრო კარადა რობოტი მტვერსასრუტით', n: 'ვიწრო კარადა რობოტი მტვერსასრუტით (ჰოლი, 01-B)', r: [-274,5910,296,6194], z: [0,TB], fz: [430,TB], front: 'x' },
      // 570 × 280 (A.17): one door over a shelf at 1,000 and a tall bay above it; under it, open to the floor, the robot vacuum's bay („რობოტი მტვერსასრუტის ადგილი“, its top shelf at 350–430, to be checked against the robot bought).
      // 2,650 high (A.17 of 31.10, 20:37), so it stands under the beam; fz: the door's span, which is what is priced
    hmirror: { t: 'სარკე', r: [2060,4586,2096,5586], z: [0,2400], thin: 1 },      // 01-C: 1,000 × 2,400 from the floor
    hshelf:  { t: 'კონსოლი-თარო', r: [1896,5286,2096,6186], z: [700,900], float: 1 },      // 01-C: 900 long, 200 thick, its top at 900
    clad:    { t: 'მუხის მოპირკეთება №4-ის კარის ირგვლივ', r: [2086,3496,2096,4576], thin: 1 },
    tvwall:  { t: 'ბამბუკის ფაქტურის პანელი', n: 'ტელევიზორის კედელი (მისაღები)', r: [2096,3223,5672,3235], thin: 1, strips: stripsOf(2096, 5672, 510) },
    vitrine: { t: 'ვიტრინა', r: [5672,2960,6622,3235], z: [0,TU], glass: 6071 },      // 02-B: 970 × 275 (A.18): a closed part floor to top at the balcony end, a glass door over the console (x < glass)
    w4:      { t: 'კარადა', n: 'კარადა (საძინებელი №4, 03-A)', r: [2226,4695,2726,6195], z: [0,TU], front: 'y' },      // 1,500 × 500 (A.19)
    tower:   { t: 'ღია თარო', r: [2726,5895,2970,6195], z: [0,TU] },      // 03-A's open end, 300 wide, up to the column
    bedwall: { t: 'ბამბუკის ფაქტურის პანელი', n: 'საწოლის თავის კედელი (საძინებელი №4)', r: [3800,6183,6746,6195], z: [0,Z], thin: 1, strips: [1, 2, 3, 4].map(k => 3800 + k * 589) },   // up to the beam
    w3:      { t: 'კარადა', n: 'კარადა (საძინებელი №3, 04-A)', r: [2526,7625,3126,9410], z: [0,TB], front: 'y' },      // 1,780 × 600 (A.20), four doors, 2,650 high; over it the ceiling comes down to the beam's level (A.15)
    desk:    { t: 'სამუშაო მაგიდა', r: [4179,6325,6746,6825], z: [0,750], float: 1 },      // 04-B: 750 high, a drawer unit and a rounded leg (A.20)
    wcbox:   { t: 'უნიტაზის ყუთი', r: [-62,7824,88,8624], flute: [7824,8624,1250,H] },      // 800 wide; 05-B, the 800 × 150 × 1,650 fluted cabinet over the cistern, runs to the ceiling (A.21)
    tv:      { t: 'ტელევიზორის კონსოლი', r: [3271,2785,6071,3235], z: [350,700], float: 1 },      // 02-B: 2,800 × 450, 350 high under its top at 700, both front corners rounded; it runs on under the display cabinet's glass part (A.10, A.18)
    vanity:  { t: 'ნიჟარის კარადა', r: [-62,8910,1438,9410], z: [350,850], fz: [350,700], float: 1 },          // 05-A: 1,500 × 500, the oak front 350 high under the 150 stone (A.21); fz: the front that is priced
  };
  // walls painted in a colour of their own (skins in the model); everything else is Caparol Cremeweiss. The order matters to the 3D model: 0 olive, 1 taupe, then the others
  const tint = [ { col: 'olive', t: 'Caparol Oase 45', w: 'სასადილო მაგიდის უკან', r: [600,0,2956,10] }, { col: 'greige', t: 'Caparol Siena 40', w: 'საწოლების უკან', r: [3126,9400,6946,9410] },
    { col: 'flora', t: 'Caparol Flora 15', w: 'დივნის ნიშაში', r: [3656,0,6406,10] }, { col: 'amber', t: 'Caparol Amber 20', w: 'სამუშაო მაგიდის კედელი', r: [3511,6325,6746,6335] },
    { col: 'olive', t: 'Caparol Oase 45', w: 'სასადილოს გვერდით, თაბაშირის ყუთზე', r: [2956,120,3656,130] }, { col: 'olive', t: 'Caparol Oase 45', w: 'ყუთის გვერდზე, სასადილოს მხარეს', r: [2946,0,2956,120] } ];      // the olive runs on over the drywall box to the sofa niche (A.3, A.4)
  const bathTerrazzo = [2388,7625,2396,9410];      // the shower's back wall (A06): the designer put terrazzo there (A.16)
  const TZ_WALL = false;                            // owner, 15 Nov 2026: that wall takes the bought wall tile too (Canvë Craie); terrazzo only on the floor

  /* ---------- quantity take-off: one calculation from the drawing; both pages print A.qty ---------- */
  // Net areas are exact; what to BUY is a rule on top (RULE) and is always labelled as a rule. Every item is rounded to 0.01 and sums are sums of the rounded items, so the printed lines add up.
  const RULE = { floor: 15, underlay: 10, skirt: 8, tile: 10, coats: 2, m2perL: 10 };
  function takeoff() {
    const tintCols = [...new Set(tint.map(t => t.col))];      // one colour may be painted on several pieces of wall (the olive runs on over the drywall box)
    const TOL = 25, r2 = n => Math.round(n * 100) / 100, r1 = n => Math.round(n * 10) / 10, sum = (a, f = x => x) => a.reduce((s, x) => s + f(x), 0), uniq = a => [...new Set(a)].sort((p, q) => p - q);
    const m = v => (v / 1000).toFixed(Math.round(v) % 10 ? 3 : 2), a2 = n => n.toFixed(2), a1 = n => n.toFixed(1), M2 = ' მ²';
    const edges = poly => poly.map(([x, y], i) => { const [x2, y2] = poly[(i + 1) % poly.length], v = x === x2, c = v ? x : y, a = Math.min(v ? y : x, v ? y2 : x2), b = Math.max(v ? y : x, v ? y2 : x2), mid = (a + b) / 2;
      return { v, c, a, b, sg: inPoly(poly, v ? c + 5 : mid, v ? mid : c + 5) ? 1 : -1 }; });      // sg: the side the room lies on
    // the stretch of a wall that a plan rectangle stands against (a beam may also cross the wall's line); an opening lies in the wall's thickness instead
    const along = (e, r, open) => { const lo = e.v ? r[0] : r[1], hi = e.v ? r[2] : r[3], s0 = Math.max(e.a, e.v ? r[1] : r[0]), s1 = Math.min(e.b, e.v ? r[3] : r[2]);
      const at = open ? (e.sg > 0 ? hi === e.c : lo === e.c) : (e.sg > 0 ? lo <= e.c + TOL && hi > e.c : hi >= e.c - TOL && lo < e.c);
      return at && s1 - s0 >= 30 ? [s0, s1] : null; };
    const E = rooms.map(r => edges(r.poly)), B = Object.keys(built).map(id => ({ id, ...built[id], z: built[id].z || [0, H] }));
    const solids = B.filter(b => !b.thin && !b.float && b.z[1] >= H);      // bodies that reach the ceiling
    // everything that hides a part of one wall, in the order of precedence: openings, built-ins and skins, beam ends
    function covers(ri, e) {
      const out = [], add = (id, t, k, s, z0, z1) => s && out.push({ id, t, k, s0: s[0], s1: s[1], z0, z1, floor: z0 === 0 });
      OPEN.forEach((o, i) => add('o' + i, o.t, 0, along(e, o.r, true), o.sill, o.head));
      E.forEach((es, rj) => rj !== ri && es.forEach(f => f.v === e.v && f.c === e.c && f.sg !== e.sg && Math.min(e.b, f.b) - Math.max(e.a, f.a) >= 30 && add('pass', 'ღია გასასვლელი', 0, [Math.max(e.a, f.a), Math.min(e.b, f.b)], 0, H)));
      B.forEach(b => b.float || add(b.id, b.t, 1, along(e, b.r), b.z[0], b.paint ? b.z[0] : b.z[1]));
      beams.forEach(b => add('beam', 'კედელზე მიბჯენილი ჭერის კოჭების ბოლოები', 2, along(e, b.r), Z, H));
      return out;
    }
    // one wall cut into cells: a cell belongs to the first thing that covers it; what is left is painted (or tiled)
    function wall(ri, e) {
      const cs = covers(ri, e), tn = tint.map(t => ({ t, s: along(e, t.r), cut: [] })).filter(x => x.s), free = {};
      const S = uniq([e.a, e.b, ...cs.flatMap(c => [c.s0, c.s1]), ...tn.flatMap(x => x.s)]), ZZ = uniq([0, H, ...cs.flatMap(c => [c.z0, c.z1])]);
      cs.forEach(c => { c.got = 0; c.sk = 0; c.bb = [1e9, 1e9, -1e9, -1e9]; });
      for (let i = 0; i < S.length - 1; i++) {
        const s = (S[i] + S[i + 1]) / 2, w = S[i + 1] - S[i], f = cs.find(c => c.floor && s > c.s0 && s < c.s1); if (f) f.sk += w;
        for (let j = 0; j < ZZ.length - 1; j++) {
          const z = (ZZ[j] + ZZ[j + 1]) / 2, c = cs.find(c => s > c.s0 && s < c.s1 && z > c.z0 && z < c.z1), t = tn.find(x => s > x.s[0] && s < x.s[1]), k = t ? t.t.col : 'cream';
          if (c) { c.got += w * (ZZ[j + 1] - ZZ[j]); c.bb = [Math.min(c.bb[0], S[i]), Math.min(c.bb[1], ZZ[j]), Math.max(c.bb[2], S[i + 1]), Math.max(c.bb[3], ZZ[j + 1])]; if (t) t.cut.push([w, ZZ[j + 1] - ZZ[j]]); }
          else free[k] = (free[k] || 0) + w * (ZZ[j + 1] - ZZ[j]);
        }
      }
      return { e, cs, free, tn, w: e.b - e.a };
    }
    // the covers of several walls as items: { t, parts: [[width, height], ...], a, clip (what an earlier item already took out of it), sk: [lengths that interrupt the skirting] }
    const group = cs => { const g = {};
      cs.forEach(c => { if (!c.got && !c.sk) return; const x = g[c.id] || (g[c.id] = { id: c.id, t: c.t, k: c.k, parts: [], got: 0, full: 0, sk: [] });
        if (c.got) { const w = c.bb[2] - c.bb[0], h = c.bb[3] - c.bb[1], ok = Math.abs(w * h - c.got) < 1; x.parts.push(ok ? [w, h] : [c.s1 - c.s0, c.z1 - c.z0]); x.got += c.got; x.full += ok ? c.got : (c.s1 - c.s0) * (c.z1 - c.z0); }
        if (c.sk) x.sk.push(c.sk); });
      return Object.values(g).sort((p, q) => p.k - q.k).map(x => { const a = r2(x.got / 1e6), full = r2(x.full / 1e6); return { id: x.id, t: x.t, parts: x.parts, a, clip: r2(full - a), sk: x.sk }; }); };
    const dims = ps => { const h = ps[0][1]; return ps.every(p => p[1] === h) ? (ps.length > 1 ? '(' + ps.map(p => m(p[0])).join(' + ') + ')' : m(ps[0][0])) + ' × ' + m(h) : ps.map(p => m(p[0]) + ' × ' + m(p[1])).join(' + '); };
    const item = x => `${x.t} ${dims(x.parts)}${x.clip ? ` − ${a2(x.clip)} (იქვე უკვე გამოკლებული ღიობი)` : ''} = ${a2(x.a)}`;
    // the faces of beams and soffits that look into a room: not against a wall, a to-ceiling body or another beam
    const faces = rooms.map(() => []), cut = k => uniq([...rooms.flatMap(r => r.poly.map(p => p[k])), ...solids.flatMap(b => [b.r[k], b.r[k + 2]]), ...beams.flatMap(b => [b.r[k], b.r[k + 2]])]), CX = cut(0), CY = cut(1);
    beams.forEach((b, bi) => { const [x1, y1, x2, y2] = b.r;
      [[1, x1, y1, y2, -5], [1, x2, y1, y2, 5], [0, y1, x1, x2, -5], [0, y2, x1, x2, 5]].forEach(([v, c, a, z, d], si) => {
        const cs = uniq([a, z, ...(v ? CY : CX).filter(t => t > a && t < z)]);
        for (let i = 0; i < cs.length - 1; i++) { const mid = (cs[i] + cs[i + 1]) / 2, px = v ? c + d : mid, py = v ? mid : c + d, ri = rooms.findIndex(r => inPoly(r.poly, px, py));
          if (ri < 0 || solids.some(s => inRect(s.r, px, py)) || beams.some(o => o !== b && inRect(o.r, px, py))) continue;
          const f = faces[ri], l = f[f.length - 1]; if (l && l.key === bi + '/' + si && l.end === cs[i]) { l.len += cs[i + 1] - cs[i]; l.end = cs[i + 1]; } else f.push({ key: bi + '/' + si, len: cs[i + 1] - cs[i], end: cs[i + 1] }); } }); });

    const R = rooms.map((r, ri) => {
      const ws = E[ri].map(e => wall(ri, e)), per = sum(ws, w => w.w), wet = r.id === 'wc', its = group(ws.flatMap(w => w.cs)), floor = r2(r.area);
      const ded = wet ? [] : its.filter(x => x.a), gross = r2(per * H / 1e6), fl = faces[ri].map(f => [f.len, H - Z]);
      const add = fl.length ? [{ t: 'ჭერის კოჭების გვერდები', parts: fl, a: r2(sum(fl, p => p[0] * p[1]) / 1e6), clip: 0 }] : [];
      const net = wet ? 0 : r2(gross - sum(ded, x => x.a) + sum(add, x => x.a)), white = sum(add, x => x.a);
      const tints = wet ? [] : ws.flatMap(w => w.tn.map(x => ({ col: x.t.col, t: x.t.t, w: x.t.w, parts: [[x.s[1] - x.s[0], H]], cut: x.cut, a: r2((w.free[x.t.col] || 0) / 1e6) })));
      const paint = { white: r2(white) }; tint.forEach(t => paint[t.col] = 0); tints.forEach(x => paint[x.col] = r2(paint[x.col] + x.a)); paint.cream = wet ? 0 : r2(net - sum(tintCols, c => paint[c]) - paint.white);
      const skDed = wet ? [] : its.filter(x => x.sk.length).map(x => ({ t: x.t, parts: x.sk, l: sum(x.sk) })), skirt = wet ? 0 : (per - sum(skDed, x => x.l)) / 1000;
      const ceilDed = solids.filter(b => inPoly(r.poly, (b.r[0] + b.r[2]) / 2, (b.r[1] + b.r[3]) / 2)).map(b => ({ t: b.t, parts: [[b.r[2] - b.r[0], b.r[3] - b.r[1]]], a: r2((b.r[2] - b.r[0]) * (b.r[3] - b.r[1]) / 1e6) })), ceil = r2(floor - sum(ceilDed, x => x.a));
      const lines = wet ? null : {      // the working, in plain words
        wall: [`კედლები სულ: პერიმეტრი ${m(per)} × სიმაღლე ${m(H)} = ${a2(gross)}${M2}`, ...ded.map(x => '− ' + item(x)), ...add.map(x => '+ ' + item(x)), `= შესაღები კედელი ${a2(net)}${M2}`,
          ...tints.map(x => `აქედან ${x.t} კედელი (${x.w}): ${dims(x.parts)}${x.cut.map(c => ` − კოჭის ბოლო ${m(c[0])} × ${m(c[1])}`).join('')} = ${a2(x.a)}${M2}`), ...(paint.white ? [`კოჭების გვერდები ჭერთან ერთად თეთრად იღებება: ${a2(paint.white)}${M2}`] : []), `თბილი კრემისფერი: ${a2(paint.cream)}${M2}`],
        skirt: [`პერიმეტრი ${m(per)}`, ...skDed.map(x => `− ${x.t} ${x.parts.map(m).join(' + ')}`), `= პლინტუსი ${m(skirt * 1000)} მ`],
        ceil: [`იატაკის ფართობი ${a2(floor)}`, ...ceilDed.map(x => `− ${x.t} (ჭერამდეა) ${m(x.parts[0][0])} × ${m(x.parts[0][1])} = ${a2(x.a)}`), `= ჭერი ${a2(ceil)}${M2}`] };
      // where the skirting runs, for the 3D model: every wall less what stands on the floor against it — [the wall runs along y?, its coordinate, the side the room lies on, from, to]
      const skAt = wet ? [] : ws.flatMap(w => { const out = []; let s = w.e.a;
        for (const c of w.cs.filter(c => c.floor).sort((p, q) => p.s0 - q.s0)) { if (c.s0 > s) out.push([s, c.s0]); s = Math.max(s, c.s1); }
        if (w.e.b > s) out.push([s, w.e.b]); return out.map(([a, b]) => [w.e.v, w.e.c, w.e.sg, a, b]); });
      return { id: r.id, name: r.name, floor, per, gross, ded, add, wall: net, paint, skDed, skirt, skAt, ceilDed, ceil, lines, ws };
    });
    const dry = R.filter(r => r.id !== 'wc'), T = k => r2(sum(dry, r => r[k]));

    // laminate: the four rooms wall to wall plus the strips inside the wall thickness at doors between two of them
    const strips = OPEN.map(o => { const s = []; rooms.forEach((r, ri) => r.id !== 'wc' && E[ri].forEach(e => { const q = along(e, o.r, true); if (q) s.push(q[1] - q[0]); })); return s.length === 2 ? { t: o.t, w: s[0], d: Math.min(o.r[2] - o.r[0], o.r[3] - o.r[1]) } : null; }).filter(Boolean);
    // under the kitchen run and the fridge column the floor is tiled, not laminated (owner, 2026-11-01): their footprints, less the corner of the fridge's back that sits in the shaft wall
    const rA = r => (r[2] - r[0]) * (r[3] - r[1]) / 1e6, overlapA = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1])) / 1e6;
    const kTile = r2(rA(built.kbase.r) + rA(built.fridge.r) - overlapA(built.fridge.r, SHAFTS[0]));
    const stripA = r2(sum(strips, s => r2(s.w * s.d / 1e6))), floorNet = r2(T('floor') + stripA - kTile), skirtNet = sum(dry, r => r.skirt);

    // paint: every colour separately, RULE.coats coats at RULE.m2perL m² a litre, each rounded up to a whole litre
    const L = a => Math.ceil(a * RULE.coats / RULE.m2perL - 1e-9), ceilAll = r2(sum(R, r => r.ceil)), wallAll = T('wall');
    const cols = [['cream', 'Caparol Cremeweiss (კედლები)'], ...tintCols.map(k => { const ts = tint.filter(t => t.col === k); return [k, `${ts[0].t} (${ts.map(t => t.w).join('; ')})`]; })].map(([k, t]) => ({ k, t, a: r2(sum(dry, r => r.paint[k])) }));
    cols.push({ k: 'white', t: 'თეთრი (ჭერები და კოჭების გვერდები)', a: r2(ceilAll + sum(dry, r => r.paint.white)) }); cols.forEach(c => c.l = L(c.a));
    const paint = { cols, litres: sum(cols, c => c.l), walls: wallAll, ceil: ceilAll };

    // bathroom: every wall on its own, the tiled box of the toilet, the floor
    const wi = rooms.findIndex(r => r.id === 'wc'), wc = R[wi], bx = built.wcbox, bd = bx.r[2] - bx.r[0], bw = bx.r[3] - bx.r[1], WN = { v1: 'დასავლეთის', 'v-1': 'აღმოსავლეთის', h1: 'ჩრდილოეთის', 'h-1': 'სამხრეთის' };
    const seen = {}, bwalls = wc.ws.map(w => ({ w, o: (w.e.v ? 'v' : 'h') + w.e.sg })).sort((p, q) => q.w.w - p.w.w).map(x => { const short = seen[x.o]; seen[x.o] = 1;
      const its = group(x.w.cs).filter(i => i.a), gross = r2(x.w.w * H / 1e6), a = r2((x.w.w * H - sum(x.w.cs, c => c.got)) / 1e6), mat = TZ_WALL && along(x.w.e, bathTerrazzo) ? 'terrazzo' : 'grey';
      return { e: x.w.e, cs: x.w.cs, t: WN[x.o] + (short ? ' მოკლე კედელი (შახტის კუთხესთან)' : ' კედელი'), w: x.w.w, gross, ded: its, a, mat,
        line: `${WN[x.o]}${short ? ' მოკლე კედელი (შახტის კუთხესთან)' : ' კედელი'} ${m(x.w.w)} × ${m(H)}${its.map(i => ` − ${i.id === 'wcbox' ? 'ყუთის უკან დამალული' : i.t} ${dims(i.parts)}`).join('')} = ${a2(a)}${M2}` }; });
    bwalls.sort((p, q) => wc.ws.findIndex(w => w.e === p.e) - wc.ws.findIndex(w => w.e === q.e));
    const fl = bx.flute, fluteA = r2((fl[1] - fl[0]) * (fl[3] - fl[2]) / 1e6), frontA = r2((bw * H - (fl[1] - fl[0]) * (fl[3] - fl[2])) / 1e6), sideA = r2(2 * bd * H / 1e6), boxFoot = r2(bd * bw / 1e6);
    const grey = bwalls.filter(w => w.mat === 'grey'), tzw = bwalls.filter(w => w.mat === 'terrazzo'), greyA = r2(sum(grey, w => w.a) + frontA + sideA), tzWall = r2(sum(tzw, w => w.a)), tzFloor = r2(rooms[wi].area - bd * bw / 1e6);
    // whole tiles for a stated layout: every surface is covered from one corner with a grid of tw × th; a cut piece is taken as a strip across the tile, and offcuts are reused within the same group
    function tiling(surfs, tw, th) {
      let full = 0; const fr = [];
      for (const s of surfs) for (let u = 0; u < s.w - 0.5; u += tw) for (let v = 0; v < s.h - 0.5; v += th) {
        const U = uniq([u, Math.min(u + tw, s.w), ...(s.bu || []).filter(t => t > u && t < u + tw && t < s.w)]), V = uniq([v, Math.min(v + th, s.h), ...(s.bv || []).filter(t => t > v && t < v + th && t < s.h)]);
        const on = U.slice(1).map((_, i) => V.slice(1).map((_, j) => !s.cov || s.cov((U[i] + U[i + 1]) / 2, (V[j] + V[j + 1]) / 2))), done = on.map(c => c.map(() => false));
        for (let i = 0; i < on.length; i++) for (let j = 0; j < on[i].length; j++) { if (!on[i][j] || done[i][j]) continue;      // one connected piece inside this tile
          let bb = [1e9, 1e9, -1e9, -1e9], ar = 0; const st = [[i, j]]; done[i][j] = true;
          while (st.length) { const [p, q] = st.pop(); ar += (U[p + 1] - U[p]) * (V[q + 1] - V[q]); bb = [Math.min(bb[0], U[p]), Math.min(bb[1], V[q]), Math.max(bb[2], U[p + 1]), Math.max(bb[3], V[q + 1])];
            for (const [dp, dq] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const a = p + dp, b = q + dq; if (on[a] && on[a][b] && !done[a][b]) { done[a][b] = true; st.push([a, b]); } } }
          if (ar > tw * th - 1) full++; else fr.push(Math.min((bb[2] - bb[0]) / tw, (bb[3] - bb[1]) / th)); }
      }
      const bins = []; fr.sort((p, q) => q - p).forEach(f => { const i = bins.findIndex(b => b + f <= 1 + 1e-9); if (i < 0) bins.push(f); else bins[i] += f; });
      return { full, cut: bins.length, n: full + bins.length };
    }
    const DT = TZ_WALL ? { grey: 30, terrazzo: 19 } : null;      // the designer's exact counts (A.16: „ზუსტი რაოდენობა“): 30 concrete-colour, 19 terrazzo — with terrazzo on the shower wall only; the budget never bought fewer
    const TG = [1200, 600], TT = [1200, 600];      // both porcelains are 120 × 60 with 1 mm joints (A.7, A.16): the concrete colour laid on its side (rows 60 cm high), the terrazzo the same
    const holes = w => w.cs.filter(c => c.got), plain = w => ({ w: w.w, h: H, bu: holes(w).flatMap(c => [c.s0 - w.e.a, c.s1 - w.e.a]), bv: holes(w).flatMap(c => [c.z0, c.z1]), cov: (u, v) => !holes(w).some(c => u > c.s0 - w.e.a && u < c.s1 - w.e.a && v > c.z0 && v < c.z1) });
    const tileOf = (w, sz) => { const b = w.cs.find(c => c.id === 'wcbox' && c.got);      // the wall with the box: the wall each side of it, the box's two sides and its front with the fluted panel left out
      if (!b) return { t: w.t, ...tiling([plain(w)], ...sz) };
      const front = { w: bw, h: H, bu: [fl[0] - bx.r[1], fl[1] - bx.r[1]], bv: [fl[2], fl[3]], cov: (u, v) => !(u > fl[0] - bx.r[1] && u < fl[1] - bx.r[1] && v > fl[2] && v < fl[3]) };
      return { t: w.t + ' ყუთთან ერთად', ...tiling([{ w: b.s0 - w.e.a, h: H }, { w: bd, h: H }, front, { w: bd, h: H }, { w: w.e.b - b.s1, h: H }].filter(s => s.w > 0), ...sz) }; };
    const px = Math.max(...rooms[wi].poly.map(p => p[0])), py = Math.max(...rooms[wi].poly.map(p => p[1])), pw = px - Math.min(...rooms[wi].poly.map(p => p[0])), ph = py - Math.min(...rooms[wi].poly.map(p => p[1]));
    const floorT = { t: 'იატაკი', ...tiling([{ w: pw, h: ph, bu: [...rooms[wi].poly.map(p => px - p[0]), px - bx.r[0], px - bx.r[2]], bv: [...rooms[wi].poly.map(p => py - p[1]), py - bx.r[1], py - bx.r[3]],
      cov: (u, v) => inPoly(rooms[wi].poly, px - u, py - v) && !inRect(bx.r, px - u, py - v) }], ...TT) };
    const nv = rooms[wi].poly.find(p => p[0] > px - pw && p[0] < px && p[1] > py - ph && p[1] < py);      // the corner of the shaft that is cut out of the rectangle
    const need = (a, sz) => Math.ceil(a * (1 + RULE.tile / 100) / (sz[0] * sz[1] / 1e6) - 1e-9);
    const tiles = { grey: { size: TG, walls: grey.map(w => tileOf(w, TG)) }, terrazzo: { size: TT, walls: [...tzw.map(w => tileOf(w, TT)), floorT] } };
    for (const k in tiles) { const t = tiles[k]; t.n = sum(t.walls, w => w.n); t.m2 = r2(t.n * t.size[0] * t.size[1] / 1e6); t.rule = need(k === 'grey' ? greyA : r2(tzWall + tzFloor), t.size); }
    const bath = { walls: bwalls.map(({ t, w, gross, ded, a, mat, line }) => ({ t, w, gross, ded, a, mat, line })), box: { w: bw, d: bd, front: frontA, flute: fluteA, sides: sideA, foot: boxFoot }, floor: wc.floor, terrazzoFloor: tzFloor, terrazzoWall: tzWall, terrazzo: r2(tzWall + tzFloor), grey: greyA, tiles };

    // made to order, priced by the m² of front; the stone; the two panel walls with their brass strips; curtain rails
    const fr = (t, w, h) => ({ t, w, h, a: r2(w * h / 1e6) }), K = kitchen, fw = b => b.front === 'x' ? b.r[2] - b.r[0] : b.r[3] - b.r[1];
    const kit = [fr('ქვედა კარადები ცოკოლით', K.len, K.top), fr('ზედა კარადები ორ რიგად, ჭერამდე', K.len, K.wallTop - K.wallFrom), fr('მაცივრის კარადა', built.fridge.r[3] - built.fridge.r[1], built.fridge.z[1])];
    const wards = B.filter(b => b.front).map(b => fr(b.n, fw(b), (b.fz || b.z)[1] - (b.fz || b.z)[0])), tvF = fr('კონსოლის ფასადი', built.tv.r[2] - built.tv.r[0], built.tv.z[1] - built.tv.z[0]), vanF = fr('ნიჟარის კარადის მუხის ფასადი (უჯრა და ღია თარო, ქვის გარეშე)', built.vanity.r[2] - built.vanity.r[0], built.vanity.fz[1] - built.vanity.fz[0]);
    const stone = [fr('ზედაპირი', K.len, K.depth), fr('კედლის ფართუკი', K.len, K.wallFrom - KT), fr('ფილა გვერდით კედელზე', K.depth, H - KT)], stoneA = r2(sum(stone, x => x.w * x.h) / 1e6);
    const under = (b, x1, x2) => beams.filter(q => b.z[1] > Z && q.r[0] < x2 && q.r[2] > x1 && q.r[1] <= b.r[1] && q.r[3] >= b.r[3]).map(q => [Math.max(q.r[0], x1), Math.min(q.r[2], x2)]);      // where a beam comes down in front of a wall skin that runs along x
    const panels = B.filter(b => b.strips).map(b => { const w = b.r[2] - b.r[0], h = b.z[1], un = under(b, b.r[0], b.r[2]), cutA = r2(sum(un, q => (q[1] - q[0]) * (H - Z)) / 1e6), sh = b.strips.map(x => under(b, x - 1, x + 1).length ? Z : h);
      const a = r2((w * h - sum(un, q => (q[1] - q[0]) * (H - Z))) / 1e6);
      return { t: b.n, w, h, cut: cutA, a, strips: sh, brass: sum(sh) / 1000, line: `${b.n}: ${m(w)} × ${m(h)}${un.map(q => ` − კოჭის ბოლო ${m(q[1] - q[0])} × ${m(H - Z)}`).join('')} = ${a2(a)}${M2}` }; });
    const brass = r1(sum(panels, p => p.brass)), railL = rails.map(q => q[2] - q[1]), railM = sum(railL) / 1000;

    // counts from the wiring and lighting data; the designer's plans (A.11–A.13) add the balcony's sconces and its socket with a lid, so they are bought too
    const inside = () => true, by = (list, n = () => 1) => [...rooms, balcony, closet].map(r => [r.name, sum(list.filter(p => inPoly(r.poly, p[0], p[1])), n)]).filter(x => x[1]), say = l => l.map(x => `${x[0]} ${x[1]}`).join(', ');
    const tw = spots.filter(p => p[2] === 2 && inside(p)), sg = spots.filter(p => p[2] === 1 && inside(p)), sk = sockets.filter(inside), nSock = sum(sk, q => q[2]), nSw = switches.length, ledM = r2(sum(led, l => l[1]));
    const counts = { twins: tw.length, singles: sg.length, linear: linear.length, pendants: pendants.length, wallLights: sum(wallLights, w => w[2]), trackLamps: track.lamps, sockets: nSock, switches: nSw };

    const P = (a, p) => r1(a * (1 + p / 100)), front = a => r2(sum(a, x => x.a));
    const Q = { floor10: P(floorNet, RULE.underlay), floor15: P(floorNet, RULE.floor), skirt: P(skirtNet, RULE.skirt), paintL: paint.litres, terrazzo: Math.max(P(bath.terrazzo, RULE.tile), tiles.terrazzo.m2, DT ? r1(DT.terrazzo * 0.72) : 0), walltile: Math.max(P(bath.grey, RULE.tile), tiles.grey.m2, DT ? r1(DT.grey * 0.72) : 0),      // tiles: the larger of area + waste and the whole-tile count
      twins: tw.length, singles: sg.length, linear: linear.length, ledM: Math.round(ledM), sockets: nSock, switches: nSw, gu10: tw.length * 2, wardFront: r1(front(wards)), ceil: r1(ceilAll), wallPaint: r1(wallAll) };

    // „როგორ დაითვალა“: the working behind every figure, in plain words, for both pages
    const fronts = (a, what) => [...a.map(x => `${x.t}: ${m(x.w)} × ${m(x.h)} = ${a2(x.a)}${M2}`), ...(a.length > 1 ? [`სულ ${what} ${a2(front(a))}${M2}`] : [])];
    const tileSay = (k, name) => { const t = tiles[k]; return [`მთელი ფილებით (${name}): ${t.walls.map(w => `${w.t} — ${w.n}`).join('; ')}; სულ ${t.n} ფილა = ${a2(t.m2)}${M2}.`,
      `შედარება: ფართობი + ${RULE.tile}% არის ${t.rule} ფილა. ${t.n > t.rule ? `მთელი ფილებით ${t.n - t.rule} ფილით მეტი გამოდის, ამიტომ ბიუჯეტში მთელი ფილების რაოდენობაა აღებული: ${t.n} ფილა, ${a2(t.m2)}${M2}. ყიდვამდე ოსტატთან დააზუსტე წყობა.` : 'წესით ნაყიდი რაოდენობა ამ წყობას ჰყოფნის.'}`]; };
    const HT = `ფილა ჭერამდეა დათვლილი, ${m(H)} მ სიმაღლეზე; თუ ჭერი უფრო დაბლა ჩამოიკიდება, ზედა ზოლი აღარ დაგჭირდება.`;
    const flo = [...dry.map(r => `${r.name} ${a2(r.floor)}${M2}`), ...strips.map(s => `${s.t}: ზღურბლი კედლის სისქეში ${m(s.w)} × ${m(s.d)} = ${a2(r2(s.w * s.d / 1e6))}${M2}`), `სამზარეულოს კარადებისა და მაცივრის სვეტის ქვეშ მეტლახია: −${a2(kTile)}${M2}`, `სულ სუფთად ${a2(floorNet)}${M2} — იატაკი კედლიდან კედლამდე იგება, სამზარეულოს გარდა ავეჯისა და ჩაშენებული კარადების ქვეშაც.`];
    const paintRule = [`შესაღები კედლები სულ ${a2(wallAll)}${M2} (${dry.map(r => `${r.name} ${a2(r.wall)}`).join(' + ')}); ჭერები სულ ${a2(ceilAll)}${M2} (${R.map(r => `${r.name} ${a2(r.ceil)}`).join(' + ')}).`,
      `წესი (არა ზუსტი ზომა): ${RULE.coats} ფენა, 1 ლიტრი ${RULE.m2perL} მ²-ზე, ყოველი ფერი მთელ ლიტრამდე მრგვალდება:`, ...cols.map(c => `${c.t}: ${a2(c.a)}${M2} × ${RULE.coats} ÷ ${RULE.m2perL} = ${a2(c.a * RULE.coats / RULE.m2perL)} → ${c.l} ლ`), `სულ ${paint.litres} ლ.`,
      'არ ითვლება: კედელი სამზარეულოს, ჭერამდე კარადების, ვიტრინისა და ქსოვილის პანელების უკან, ჭერი — ჭერამდე კარადების თავზე. კარების მოჩარჩოება და ფანჯრების ფერდოები ცალკე არ არის დათვლილი.'];
    const how = {
      floor15: [...flo, `წესი (არა ზუსტი ზომა): ნაძვისებურ წყობაზე ჭრისთვის +${RULE.floor}% → ${a1(Q.floor15)}${M2}.`],
      floor10: [...flo, `წესი (არა ზუსტი ზომა): ქვესაგებზე +${RULE.underlay}% → ${a1(Q.floor10)}${M2}.`],
      skirt: [...dry.map(r => `${r.name}: პერიმეტრი ${m(r.per)}${r.skDed.map(x => ` − ${x.t} ${x.parts.map(m).join(' + ')}`).join('')} = ${m(r.skirt * 1000)} მ`), `სულ სუფთად ${a2(skirtNet)} მ. პლინტუსი არ იდება ღიობებში, ჭერამდე კარადების, სამზარეულოსა და ქსოვილის პანელების გასწვრივ; სააბაზანოში პლინტუსი არ არის. კარების მოჩარჩოების სიგანე არ არის გამოკლებული.`,
        `წესი (არა ზუსტი ზომა): ჭრისთვის +${RULE.skirt}% → ${a1(Q.skirt)} მ.`],
      paintL: [...dry.flatMap(r => [`${r.name} —`, ...r.lines.wall]), ...paintRule],
      paintRule,
      terrazzo: [`იატაკი ${m(pw)} × ${m(ph)}${nv ? ` − შახტის კუთხე ${m(Math.min(nv[0] - (px - pw), px - nv[0]))} × ${m(Math.min(nv[1] - (py - ph), py - nv[1]))}` : ' (შახტის კუთხის გარეშე)'} − უნიტაზის ყუთის ქვეშ ${m(bd)} × ${m(bw)} = ${a2(tzFloor)}${M2}`, ...tzw.map(w => 'საშხაპის კედელი — ' + w.line), `სულ სუფთად ${a2(bath.terrazzo)}${M2}. ${HT}`,
        `წესი (არა ზუსტი ზომა): ჭრისთვის +${RULE.tile}% → ${a1(P(bath.terrazzo, RULE.tile))}${M2}.`, ...tileSay('terrazzo', 'ფილა 120 × 60, მთელი ფილები საშხაპის კუთხიდან იწყება'), DT ? `დიზაინერის ზუსტი რაოდენობა (A.7, A.16): ${DT.terrazzo} ფილა = ${a2(DT.terrazzo * 0.72)}${M2}; ბიუჯეტი ამაზე ნაკლებს არ ყიდულობს.` : 'დიზაინერის რაოდენობა (A.16: 19 ტერაცო, 30 ბეტონისფერი) საშხაპის კედელს ტერაცოთი ითვლიდა; 15.11-დან ის კედელიც კედლის ფილითაა (Canvë Craie), ამიტომ აქ აღარ ითვლება.'],
      walltile: [...grey.map(w => w.line), `უნიტაზის ყუთის წინა მხარე ${m(bw)} × ${m(H)} − კარადა დაღარული კარით ${m(fl[1] - fl[0])} × ${m(fl[3] - fl[2])} = ${a2(frontA)}${M2}`, `ყუთის ორი გვერდი 2 × ${m(bd)} × ${m(H)} = ${a2(sideA)}${M2}`,
        `სულ სუფთად ${a2(greyA)}${M2}. ${HT}`, 'კარადის ადგილას ფილა არ არის დათვლილი (კარადა ავზის ზემოთ, ყუთშია ჩაშენებული, დაღარული კარი ფილის სიბრტყეშია); ნიჟარის, სარკისა და შხაპის თაროს უკან კედელი ფილითაა დათვლილი.', `წესი (არა ზუსტი ზომა): ჭრისთვის +${RULE.tile}% → ${a1(P(bath.grey, RULE.tile))}${M2}.`,
        ...tileSay('grey', 'ფილა 120 × 60 დაწოლილი, როგორც დიზაინერის კედლების განშლაზეა (A.16): 120 სიგანეზე, 60 სიმაღლეზე; ყოველი კედელი კუთხიდან მთელი ფილით იწყება, ნაჭრები იმავე კედელზე გამოიყენება'), DT ? `დიზაინერის ზუსტი რაოდენობა (A.7, A.16): ${DT.grey} ფილა = ${a2(DT.grey * 0.72)}${M2}; ბიუჯეტი ამაზე ნაკლებს არ ყიდულობს.` : 'დიზაინერის რაოდენობა (A.16: 19 ტერაცო, 30 ბეტონისფერი) საშხაპის კედელს ტერაცოთი ითვლიდა; 15.11-დან ის კედელიც კედლის ფილითაა (Canvë Craie), ამიტომ აქ აღარ ითვლება.'],
      twins: [`ჭერის ნახაზიდან: ${say(by(tw))} — სულ ${tw.length}.`],
      gu10: [`ყოველ ორმაგ სანათს ორი ნათურა უნდა: ${tw.length} × 2 = ${tw.length * 2}.`],
      singles: [`ჭერის ნახაზიდან: ${say(by(sg))} — სულ ${sg.length}.`],
      linear: [`ნახაზიდან: ${linear.length} ხაზი სამზარეულოს დახლის თავზე, თითო ${m(Math.hypot(linear[0][2] - linear[0][0], linear[0][3] - linear[0][1]))} მ.`],
      ledM: [`ლენტის მონაკვეთები განათების ნახაზიდან: ${led.map(l => l[1]).join(' + ')} = ${a2(ledM)} მ.`],
      sockets: [`როზეტები ნახაზიდან (ორიანი ორად ითვლება): ${say(by(sk, q => q[2]))} — სულ ${nSock}, კონდიციონერების ორი წერტილის ჩათვლით.`, `ჩამრთველები: ${nSw} ადგილი ნახაზზე (A.12), სამზარეულოს ზედაპირის შუქის ჩამრთველიც მათშია.`],
      wardFront: [...fronts(wards, 'ფასადი'), 'ოსტატები ფასს ფასადის (წინა ხედის) კვადრატულ მეტრზე ამბობენ: სიგანე × სიმაღლე ჭერამდე.'],
      kitchen: [...fronts(kit, 'ფასადი'), 'ოსტატები ფასს ფასადის (წინა ხედის) კვადრატულ მეტრზე ამბობენ.'],
      tv: fronts([tvF]), vanity: fronts([vanF]), worktop: [`${stone.map(x => `${x.t} ${m(x.w)} × ${m(x.h)}`).join(' + ')} = ${a2(stoneA)}${M2}`],
      wallcover: [...panels.map(p => p.line), `სულ ${a2(front(panels))}${M2}. ეს კედლები არ იღებება და პლინტუსიც არ მიუყვება.`],
      brass: [...panels.map(p => `${p.t}: ${p.strips.length} ზოლი — ${[...new Set(p.strips)].map(h => `${p.strips.filter(x => x === h).length} × ${m(h)}`).join(' + ')} = ${a2(p.brass)} მ`), `სულ ${a2(sum(panels, p => p.brass))} მ.`],
      rails: [...rails.map((q, i) => `${q[3]}: ${m(railL[i])} მ`), `სულ ერთ ფენაზე ${a2(railM)} მ, ორ ფენაზე (სქელი და თხელი ფარდა) ${a2(railM * 2)} მ.`],
    };
    window.APT.skirting = R.flatMap(r => r.skAt);      // geometry for the 3D model, not a quantity: kept beside the take-off, not in it
    R.forEach(r => { delete r.ws; delete r.skAt; });
    return { rule: RULE, rooms: R, floor: { rooms: T('floor'), strips, kTile, net: floorNet }, skirt: skirtNet, walls: wallAll, ceil: ceilAll, paint, bath, kitchen: { items: kit, a: front(kit) }, wardrobes: { items: wards, a: front(wards) },
      tv: tvF, vanity: vanF, worktop: { items: stone, a: stoneA }, panels: { items: panels, a: front(panels), brass }, rails: { items: railL.map(l => l / 1000), m: railM }, counts, led: ledM, Q, how, HT };
  }

  rooms.forEach(r => r.area = area(r.poly));
  balcony.area = area(balcony.poly) + area(closet.poly);
  window.APT = { H, Z, rooms, balcony, closet, FOOT, OPEN, walls: buildWalls(), spots, linear, track, pendants, wallLights, sockets, switches, points, light, kitchen, led, rails, pockets, beams, built, tint, bathTerrazzo, area, inPoly };
  window.APT.qty = takeoff();
  // labour is priced on net quantities, without the purchase allowance: the same take-off, summed the way craftsmen charge
  { const A_led = window.APT.led, q = window.APT.qty, S = (a, f) => a.reduce((t, x) => t + f(x), 0), r1 = n => Math.round(n * 10) / 10, c = q.counts, hole = d => /^o\d|^pass$/.test(d.id);
    const lights = c.twins + c.singles + c.linear + c.pendants + c.wallLights, feeds = A_led.length + 1, bathGross = S(q.bath.walls, w => w.gross - S(w.ded.filter(hole), d => d.a));
    Object.assign(q.Q, { floorNet: r1(q.floor.net), kitchenTile: r1(q.floor.kTile), skirtNet: r1(q.skirt), panelWall: r1(S(q.panels.items, x => x.a)), tileWalls: r1(q.bath.grey + q.bath.terrazzoWall), tileFloor: r1(q.bath.terrazzoFloor),
      wallsGross: r1(S(q.rooms.filter(r => r.id !== 'wc'), r => r.gross - S(r.ded.filter(hole), d => d.a)) + bathGross),      // every wall of every room minus doors and windows (the bathroom's walls come from its own list)
      putty: r1(q.walls + q.ceil + S(q.panels.items, x => x.a)), floorAll: r1(S(q.rooms, r => r.floor)), waterproof: r1(q.bath.floor + (1.785 + 2 * 0.865) * 2), devices: c.sockets + c.switches, points: c.sockets + c.switches + lights + feeds, lights, feeds,
      // the flat came as a white frame (2026-10-21): rooms plastered and screeded, wiring to the developer's project — only the bathroom has nothing
      bathWalls: r1(bathGross), bathFloor: r1(q.rooms.find(r => r.id === 'wc').floor), pointsPart: lights + feeds + Math.round((c.sockets + c.switches) / 2) });
    const f = n => n.toFixed(2), dry = q.rooms.filter(r => r.id !== 'wc'), pan = S(q.panels.items, x => x.a), holes = r => S(r.ded.filter(hole), d => d.a);
    Object.assign(q.how, {      // the working for the labour rows: net figures, no purchase allowance
      kitchenTile: [`სამზარეულოს ქვედა კარადები 2.49 × 0.60 + მაცივრის სვეტი ნიშის ჩათვლით = ${f(q.floor.kTile)} მ² — კარადები მთლიანად ფილაზე დგას.`],
      floorNet: [`სუფთა ფართობი ნახაზიდან: ${dry.map(r => f(r.floor)).join(' + ')} + კარის ზღურბლები ${f(q.floor.net - q.floor.rooms + q.floor.kTile)} − სამზარეულოს ქვეშ მეტლახი ${f(q.floor.kTile)} = ${f(q.floor.net)} მ². მარაგი აქ არ ემატება: ხელობა დაგებულ ფართობზე ითვლება.`],
      skirtNet: [`სუფთა სიგრძე ნახაზიდან: ${dry.map(r => f(r.skirt)).join(' + ')} = ${f(q.skirt)} მ (კარადების, სამზარეულოსა და პანელების გასწვრივ პლინტუსი არ არის).`],
      panelWall: [...q.panels.items.map(x => x.line), `სულ ${f(pan)} მ².`],
      tileWalls: [q.bath.terrazzoWall ? `კედლის ფილა ${f(q.bath.grey)} მ² + ტერაცოს კედელი ${f(q.bath.terrazzoWall)} მ² = ${f(q.bath.grey + q.bath.terrazzoWall)} მ² (სუფთად, უნიტაზის ყუთის ჩათვლით).` : `კედლის ფილა ყველა კედელზე, საშხაპის კედლის ჩათვლით: ${f(q.bath.grey)} მ² (სუფთად, უნიტაზის ყუთის ჩათვლით).`],
      tileFloor: [`სააბაზანოს იატაკი უნიტაზის ყუთის გარეშე: ${f(q.bath.terrazzoFloor)} მ².`],
      wallsGross: [...dry.map(r => `${r.name}: ${f(r.gross)} − კარ-ფანჯარა ${f(holes(r))} = ${f(r.gross - holes(r))} მ²`), `სააბაზანო: ${f(S(q.bath.walls, w => w.gross))} − კარი ${f(S(q.bath.walls, w => S(w.ded.filter(hole), d => d.a)))} = ${f(bathGross)} მ²`, `სულ ${f(S(dry, r => r.gross - holes(r)) + bathGross)} მ² — ლესვა კარადების უკანაც კეთდება.`],
      putty: [`შესაღები კედლები ${f(q.walls)} + შპალერის კედლები ${f(pan)} + ჭერი ${f(q.ceil)} = ${f(q.walls + pan + q.ceil)} მ².`],
      floorAll: [`ყველა ოთახის იატაკი: ${q.rooms.map(r => f(r.floor)).join(' + ')} = ${f(S(q.rooms, r => r.floor))} მ².`],
      waterproof: [`იატაკი ${f(q.bath.floor)} + საშხაპის სამი კედელი 2 მ სიმაღლემდე (1.785 + 2 × 0.865) × 2.00 = ${f(q.bath.floor + (1.785 + 2 * 0.865) * 2)} მ².`],
      devices: [`${c.sockets} როზეტი + ${c.switches} ჩამრთველი = ${c.sockets + c.switches}.`],
      points: [`${c.sockets + c.switches} როზეტი და ჩამრთველი + ${lights} სანათი (${c.twins} ორმაგი, ${c.singles} წერტილოვანი, ${c.linear} ხაზოვანი, ${c.pendants} ჩამოსაკიდი, ${c.wallLights} ბრა) + ${feeds} კვების წერტილი (LED ლენტის ${feeds - 1} და ტრეკის 1) = ${c.sockets + c.switches + lights + feeds} წერტილი.`],
      bathWalls: [...q.bath.walls.map(w => w.line.replace(/ − ყუთის უკან.*$/, ` = ${f(w.gross)} მ²`)), `სულ ${f(bathGross)} მ² კარის გამოკლებით (ყუთის უკანაც ილესება). დანარჩენი ოთახები დეველოპერმა უკვე გალესა.`],
      bathFloor: [`სააბაზანოს იატაკი ${f(q.rooms.find(r => r.id === 'wc').floor)} მ², დახრილობით ტრაპისკენ. დანარჩენი ოთახები უკვე მოჭიმულია.`],
      pointsPart: [`სანათის ${lights} წერტილი და ${feeds} კვების წერტილი (LED ლენტის ${feeds - 1} — A.13-ის ცხრილით „ელ. წერტილი (განათების წყარო)“ — და ტრეკის 1) ახალია: ფოტოებზე დეველოპერს ჭერში ოთახზე თითო გამოსასვლელი აქვს.`, `როზეტებიდან და ჩამრთველებიდან (${c.sockets + c.switches}) ნახევარი — ${Math.round((c.sockets + c.switches) / 2)} — ჩათვლილია გადასატანად ან ახლად. ეს შეფასებაა: ზუსტ რიცხვს ელექტრიკოსი მონიშვნის დღეს დათვლის.`, `სულ ${lights + feeds + Math.round((c.sockets + c.switches) / 2)} წერტილი.`],
      ceil: [`ჭერი ოთახების მიხედვით, ჭერამდე კარადების გამოკლებით: ${q.rooms.map(r => f(r.ceil)).join(' + ')} = ${f(q.ceil)} მ².`],
      wallPaint: [`შესაღები კედლები ოთახების მიხედვით: ${dry.map(r => f(r.wall)).join(' + ')} = ${f(q.walls)} მ². თითო ოთახის დათვლა „საღებავის“ სტრიქონშია.`] }); }
})();
