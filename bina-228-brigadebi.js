/* The crew hired for flat №228 (owner, 7 November 2026): the works by trade, what their price covers, their terms and their letter, and today's dollar rate.
   Work names and quantities come from bina-228-budget.js; the money page (index.html, ფული) counts the contract instead of the rows it covers. */
window.CREWS = {
  rate: { USD: 2.5949, date: '2026-11-07', src: 'ეროვნული ბანკის კურსი' },
  // the works, by trade; ids are budget rows
  sections: [
    ['მომზადება, ტიხრები და ჭერი', ['la-plaster', 'la-screed', 'la-floor-screed', 'la-self-level', 'la-wall-lining', 'la-wall-buildout', 'la-wcbox', 'la-ceiling-gyps', 'la-putty']],
    ['ელექტრობა', ['la-electric-rough', 'la-panel', 'la-sockets', 'la-lights', 'la-led']],
    ['წყალი, კანალიზაცია, გათბობა', ['la-plumb-rough', 'la-radiator-move', 'la-radiators', 'la-plumb-fixtures', 'he-boiler-install', 'he-ac-prep', 'la-appliances']],
    ['სააბაზანო და ფილა', ['la-waterproof', 'la-tile-wall', 'la-tile-floor', 'la-kitchen-tile']],
    ['მოპირკეთება', ['la-paint-walls', 'la-paint-ceiling', 'la-floor-lay', 'la-skirting', 'la-doors']],
    ['დასრულება', ['la-transport', 'la-waste', 'la-cleaning']],
    ['შავი მასალა', ['rm-putty', 'rm-drywall', 'rm-wall-lining', 'rm-floor', 'rm-bath', 'rm-electric', 'rm-plumb']],
    ['შემდეგი ეტაპი — ცალკე ფასით', ['la-ac', 'la-curtain-tracks', 'la-wallcover']],
  ],
  later: ['la-ac', 'la-curtain-tracks', 'la-wallcover'],
  // what each state means on the page
  states: { yes: 'შედის', no: 'არ შედის', part: 'ნაწილობრივ', '?': 'არ წერია' },
  offers: [
    {
      id: 'c1', name: 'კომპანია 1', date: '2026-11-07', cur: 'USD', total: 17400, area: 66.2,
      // hired (owner, 7 Nov): every work below for 17,400 $, paid in three equal parts; the owner is left to buy the finishing things, the laminate and the furniture
      agreed: { date: '2026-11-07', pay: [5800, 5800, 5800] },
      alsoCovers: ['he-flue', 'ba-wcbox-mat', 'ba-shower-niche'],   // the flue goes up with the boiler (owner, 7 Nov); the WC box boards are in their drywall, the niche is their tiling work
      how: 'ბინა ნახეს; ფასი ფართზე, ნახაზებით დათვლის გარეშე; ხელობა და შავი მასალა ერთად',
      lines: {
        'la-plaster': 'yes', 'la-screed': 'yes', 'la-floor-screed': 'yes', 'la-self-level': 'yes', 'la-wall-lining': 'yes', 'la-wall-buildout': 'yes', 'la-wcbox': 'yes', 'la-ceiling-gyps': 'yes', 'la-putty': 'yes',
        'la-electric-rough': 'yes', 'la-panel': 'yes', 'la-sockets': 'yes', 'la-lights': 'yes', 'la-led': 'yes',
        'la-plumb-rough': 'yes', 'la-radiator-move': 'yes', 'la-radiators': 'yes', 'la-plumb-fixtures': 'yes', 'he-boiler-install': 'yes', 'he-ac-prep': 'yes', 'la-appliances': '?',
        'la-waterproof': 'yes', 'la-tile-wall': 'yes', 'la-tile-floor': 'yes', 'la-kitchen-tile': 'yes',
        'la-paint-walls': 'yes', 'la-paint-ceiling': 'yes', 'la-floor-lay': 'yes', 'la-skirting': 'yes', 'la-doors': 'yes',
        'la-transport': 'yes', 'la-waste': 'yes', 'la-cleaning': 'yes',
        'rm-putty': 'yes', 'rm-drywall': 'yes', 'rm-wall-lining': 'yes', 'rm-floor': 'yes', 'rm-bath': 'yes', 'rm-electric': 'yes', 'rm-plumb': 'yes',
        'la-ac': '?', 'la-curtain-tracks': '?', 'la-wallcover': 'no',
      },
      // what is left to pay on a line marked „part“
      notes: {
        'la-floor-screed': 'ბინის ნახვის შემდეგ: აუცილებელიაო',
        'la-wall-lining': 'ბინის ნახვის შემდეგ: აუცილებელიაო; ჰკითხეთ, რომელ კედლებზე და რამდენი მ²',
        'la-paint-walls': 'მეპატრონე, 7.11: კედლებზე ჯერ სპეციალურ შესაღებ შპალერს აკრავენ, მერე ღებავენ — აკვრა ფასშია; შპალერს და წებოს თქვენ ყიდულობთ (ბიუჯეტში დაემატა, დაახლ. 430–550 ₾). ეს ჩვენს შეფასებაში არ იყო — სხვა ბრიგადებსაც ჰკითხეთ',
        'la-sockets': 'მეპატრონე, 7.11: შედის; როზეტებს და ჩამრთველებს თქვენ ყიდულობთ',
        'la-panel': 'ფარის აწყობა შედის; ავტომატებს თქვენ ყიდულობთ (მეპატრონე, 7.11; წერილშიც ასე წერია)',
        'rm-electric': 'სადენები, კოლოფები და ფარის ყუთი შედის; ავტომატებს თქვენ ყიდულობთ (მეპატრონე, 7.11) — ბიუჯეტში ცალკეა',
        'la-doors': 'მეპატრონე, 7.11: შედის',
        'la-kitchen-tile': 'მეპატრონე, 7.11: შედის',
        'la-wallcover': 'კედელს ისინი ამზადებენ, პანელს კი გამყიდველი აკრავს (მეპატრონე, 7.11). კედელს იმ პანელის მოთხოვნით მოამზადებენ, რომელსაც აირჩევთ — დაადასტურეს. მაღაზიაში ჰკითხეთ, დაკვრა ფასში შედის თუ ცალკეა',
        'he-boiler-install': 'მეპატრონე, 7.11: დაკიდება, მიერთება, საკვამური და კონდენსატის მილი შედის; გაზზე მიერთება — „თბილისი ენერჯი“',
        'la-appliances': 'სამზარეულო მერე მოვა — ჰკითხეთ, დაბრუნდებიან თუ არა მის მისაერთებლად',
        'la-led': 'მეპატრონე, 7.11: ყველა განათებას ამონტაჟებენ — სანათებს და ლენტს თქვენ ყიდულობთ',
        'la-lights': 'მეპატრონე, 7.11: ყველა განათებას ამონტაჟებენ, რასაც იყიდით',
        'la-skirting': 'მეპატრონე, 7.11: შედის',
        'la-cleaning': 'მეპატრონე, 7.11: შედის',
        'la-radiators': '„ცენტრალური გათბობის მონტაჟი“',
        'la-plumb-fixtures': 'ჩასაშენებელი მექანიზმები და სააბაზანოს აქსესუარები',
        'la-tile-floor': 'მხოლოდ სააბაზანო წერია',
      },
      // what to ask them before comparing further
      ask: [
        'რომელ კედლებს ასწორებენ თაბაშირ-მუყაოთი და რამდენი მ²-ია',
        'სამზარეულო რომ მოვა, ტექნიკის მისაერთებლად დაბრუნდებიან? კარნიზები და კონდიციონერები მერე შედის?',
        'ფასი ლარში ან რა კურსით; გადახდის ეტაპები; წერილობითი გარანტია — რაზე და რამდენი ხნით',
      ],
      terms: {   // the owner, 7 Nov
        time: 'თებერვლის ბოლო – მარტის დასაწყისი', pay: '3 თანაბარ ნაწილად — 5,800 $ თითო (შეთანხმდით 7.11)',
        warranty: 'მხოლოდ სიტყვით: „ძალიან ხარისხიანად იქნება“ — წერილობით არ არის',
        vat: '17,400 $ საბოლოო ფასია, რასაც იხდით', valid: '1 თვე — დაახლ. 7 დეკემბრამდე', visit: 'ბინა ნახეს' },
      warnTerms: ['warranty'],
      text: `დავთვალეთ სახლის სამუშაოები ჩვენი შეთავაზება ამ კონკრეტულ შემთხვევაში ასე გამოიყურება 66.2 კვადრატულ ფართზე.

ჩვენს მომსახურების საფასურში  შესული.

 შავი მასალები:
ქვიშა-ცემენტი.
ელექტრო სადენები.
ინტერნეტის კაბელები.
ჩამრთველების კოლოფები. ცენტრალური ავტომატების შიტი.
სანტექნიკის მილები დაქსელვისთვის.
ცენტრალური გათბობის მილები.
თაბაშირ-მუყაო თავის პროფილებით და აქსესუარებით  კნაუფის .
გარდექსი.
წებო-ცემენტი კნაუფის.
გიდროიზოლაცია.
შპაკლი, გიფსი.კუთხოვანები, სეტკა-ბადე  კნაუფის.ქაღალდის წებო.გრუნტი.
თვითწორებადის მასალა .
კონდენციონერის მილები.

აღნიშნულ მასალებში არ იგულისხმება:
 გარე ფურნიტურის შეძენა : ჩამრთველების და როზეტების გარე მონტაჟის ჩარჩოები.ავტომატები.
 ასევე ქაღალდი(შპალერი), კერამოგრანიტი, და ა, შ. რაც ვიზუალურად და ფინანსურად უნდა შეფასდეს და აირჩეს თქვენი მოთხოვნის და განსაზღვრული ბიუჯეტის ფარგლებში.

ხელობა:
კედლების კორექტირება თაბაშირ-მუყაოთი.
ელექტროობის დაქსელვა.
სანტექნიკის დაქსელვა, ჩაშენებული მექანიზმის მონტაჟი.
ცენტრალური გათბობის დაქსელვა.
კონდენცინერის მილების და დრენაჟის დაქსელვა.
თაბაშირ-მუყაოს სამუშაოები.
ქვიშა ცემენტის სამუშოები.აბაზანის გალესვა,იატაკი მოჭიმვა (სტიაშკა).
თვითწორებადის დასხმა.
სააბაზანოს: კაფელ-მეთლახი იატაკი, კედლები.
ქაღალდი(შპალერი), დაშპაკვლა შეღებვა.
იატაკის დაგება: ლამინატი,პარკეტი.(ნაძვის წყობა)
სანათების მონტაჟი.
სააბაზანოს სანტექნიკური გარე აქსესუარების მონტაჟი,
ცენტრალური გათბობის მონტაჟი.
მასალის ტრანსპორტირება. ატანა. ნაგვის გატანა.

ზემოთ ჩამოთვლილი ამ ყველაფრის საფასური შეადგენს 17400 დოლარი.`,
    },
  ],
};

// the crew the owner hired: the rows its price covers, so the budget pages count the contract instead of those rows
window.CREWS.hired = (function (C) {
  const o = C.offers.find(x => x.agreed); if (!o) return null;
  const later = new Set(C.later);
  const covers = Object.keys(o.lines).filter(id => o.lines[id] === 'yes' && !later.has(id)).concat(o.alsoCovers || []);
  return { id: o.id, name: o.name, usd: o.total, rate: C.rate.USD, rateDate: C.rate.date, gel: Math.round(o.total * C.rate.USD), date: o.agreed.date, pay: o.agreed.pay, covers };
})(window.CREWS);

// today's dollar rate from the National Bank of Georgia (it changes daily); kept for the day in this browser, the rate above stays when the bank cannot be reached.
// Pages listen for the „b228-rate“ event to redraw once it arrives.
(function (C) {
  if (typeof document === 'undefined' || typeof fetch !== 'function') return;      // the check tools read this file outside a browser
  const KEY = 'b228-nbg-usd', today = new Date().toLocaleDateString('en-CA');
  const apply = (rate, date) => {
    C.rate = { USD: rate, date, src: 'ეროვნული ბანკის კურსი' };
    if (C.hired) Object.assign(C.hired, { rate, rateDate: date, gel: Math.round(C.hired.usd * rate) });
    document.dispatchEvent(new CustomEvent('b228-rate'));
  };
  try { const v = JSON.parse(localStorage.getItem(KEY) || 'null'); if (v && v.day === today && v.rate > 0) { apply(v.rate, v.date); return; } } catch (e) {}
  fetch('https://nbg.gov.ge/gw/api/ct/monetarypolicy/currencies/ka/json/')
    .then(r => r.json())
    .then(d => {
      const u = d && d[0] && d[0].currencies.find(c => c.code === 'USD');
      if (!u || !(u.rate > 0)) return;
      const date = String(u.validFromDate || d[0].date).slice(0, 10);
      try { localStorage.setItem(KEY, JSON.stringify({ day: today, rate: u.rate, date })); } catch (e) {}
      apply(u.rate, date);
    })
    .catch(() => {});
})(window.CREWS);
