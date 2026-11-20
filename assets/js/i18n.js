/* İKON — TR / EN language layer.
   Turkish lives in the HTML; English is supplied here and swapped in place. */
(function () {
  'use strict';
  const EN = {
    'meta.home.title': 'İKON Customs Brokerage — We bring the world to your doorstep',
    'meta.home.desc': 'Customs brokerage for import, export and transit operations since 1994. Based in Istanbul, serving every customs office.',
    'pre.top': 'Customs Brokerage',
    'pre.since': 'Since 1994',
    'brand.sub': 'Customs Brokerage',
    'nav.home': 'Home', 'nav.about': 'Company', 'nav.services': 'Services', 'nav.contact': 'Contact', 'nav.cta': 'Get a quote',
    'a11y.skip': 'Skip to content',
    'hero.eyebrow': 'Customs Brokerage · Since 1994',
    'hero.t1': 'We bring', 'hero.t2': 'the world to', 'hero.t3': 'your doorstep.',
    'hero.lead': 'Since 1994, import, export and transit operations have been handled by a team that knows the legislation, runs the process and follows every document. From Istanbul to every customs office.',
    'hero.cta1': 'Our services', 'hero.cta2': 'Talk to us',
    'hero.m1': 'Founded', 'hero.m2': 'Quality system', 'hero.m3': 'Courier & documents',
    'hero.coord1': 'Rotterdam · 51.95°N', 'hero.live': 'Live process',
    'hero.badge': 'years of hands-on experience',
    'tick.1': 'Import', 'tick.2': 'Export', 'tick.3': 'Transit', 'tick.4': 'HS code', 'tick.5': 'EDI', 'tick.6': 'Legislation', 'tick.7': 'Declaration', 'tick.8': 'Motor courier',
    'm.label': '01 — About',
    'm.text': 'The name of professionalism and the address of reliability meet at the last mile.',
    'm.lead': 'Founded in 1994 by a team of seasoned customs professionals, İKON stands today among the sector\'s most distinguished firms — through proactive teamwork, fast and dependable outcomes, and an unshakeable commitment to integrity.',
    'm.body': 'With a portfolio of leading Turkish companies and a modern understanding of trade, we continue to grow from customs brokerage into a complete logistics partner. In a world where competition sets the direction, quality is the prerequisite and the client is indispensable, the decisive factor is personal quality, team quality and management quality.',
    'm.link': 'Company profile', 'm.cap': 'Port operation · Maasvlakte',
    's.1': 'Founded in', 's.2': 'Years of hands-on experience', 's.3': 'Licensed customs brokers', 's.4': 'Motor courier & documents',
    'sv.label': '02 — Services', 'sv.title1': 'One contact,', 'sv.title2': 'one file, one process.', 'sv.all': 'All services',
    'sv.1.t': 'Import operations', 'sv.1.d': 'The full import process — from HS classification and inspection to duty assessment and delivery.',
    'sv.2.t': 'Export operations', 'sv.2.d': 'A.TR, EUR.1, certificates of origin and every document the export regime requires.',
    'sv.3.t': 'Information systems', 'sv.3.d': 'Official Gazette and legislation monitoring, with expert commentary tailored to your business.',
    'sv.4.t': 'Legislation & technical advisory', 'sv.4.d': 'Direct contact with ministries and authorities; current, practical interpretation.',
    'sv.5.t': 'Motor courier & documents', 'sv.5.d': 'Document exchange at any hour — no time lost on the customs ground.',
    'sv.6.t': 'EDI & digital customs', 'sv.6.d': 'Among the first companies in Türkiye to use electronic data interchange.',
    'sv.sectors': 'Sectors we serve', 'sec.1': 'Automotive', 'sec.2': 'Textiles', 'sec.3': 'Chemicals', 'sec.4': 'Machinery', 'sec.5': 'Food', 'sec.6': 'Electronics',
    'pr.label': '03 — Process', 'pr.title1': 'Where uncertainty', 'pr.title2': 'ends.',
    'pr.lead': 'Every file is opened with the same discipline and closed with the same care. Five steps, and you always know where things stand.',
    'pr.link': 'Process details',
    'pr.1.t': 'Document intake & pre-check', 'pr.1.d': 'Invoice, packing list, bill of lading and any incentive certificates are checked in one place; missing documents are flagged the same day.', 'pr.1.tag': 'Intake',
    'pr.2.t': 'HS classification & legislation', 'pr.2.d': 'The goods\' tariff position, applicable regime and required permits are determined.', 'pr.2.tag': 'Classification',
    'pr.3.t': 'Declaration & registration', 'pr.3.d': 'The declaration is prepared, acceptance and registration begin, and the process is tracked in real time.', 'pr.3.tag': 'Declaration',
    'pr.4.t': 'Inspection & assessment', 'pr.4.d': 'Goods are inspected; shortages, damage or discrepancies are recorded. Duties and fees are assessed.', 'pr.4.tag': 'On site',
    'pr.5.t': 'Delivery & file closure', 'pr.5.d': 'Payments are followed, goods delivered where needed, and the file closed. No file is left open.', 'pr.5.tag': 'Closure',
    'w.label': '04 — Network', 'w.title1': 'From Rotterdam to Shanghai,', 'w.title2': 'one file.',
    'w.lead': 'A process run from Istanbul moves with the same discipline in every port. You focus on your cargo; we follow the paperwork.',
    'w.base': 'Headquarters',
    'w.f1.t': 'Every customs office', 'w.f1.d': 'Licensed import, export, accounting and client representatives on the ground.',
    'w.f2.t': 'EDI infrastructure', 'w.f2.d': 'One of the first adopters of electronic data interchange — uninterrupted data flow.',
    'w.f3.t': '24/7 document tracking', 'w.f3.d': 'Motor courier service at any hour, wherever the documents need to be.',
    'b.label': 'İKON / 1994—2026', 'b.note': 'Customs · Foreign trade · Logistics',
    'b.q1': 'The only thing competition cannot imitate is', 'b.q2': 'the knowledge and skill unique to a firm.',
    'b.c1': 'Founded', 'b.c2': 'Years of experience', 'b.c3': 'Customs brokers', 'b.c4': 'Courier service',
    'b.m': 'We bring the world to your doorstep',
    'faq.label': '05 — Questions', 'faq.title1': 'What people ask,', 'faq.title2': 'answered plainly.',
    'faq.lead': 'If you can\'t find what you need, call us — we\'ll clarify the process together.', 'faq.cta': 'Ask a question',
    'faq.q1': 'What exactly does a customs broker do?', 'faq.a1': 'A customs broker handles classification, prepares the declaration, corresponds with the customs authority and manages duties and fees. At İKON, that also includes legislation monitoring, document courier service and EDI infrastructure.',
    'faq.q2': 'Which documents are needed for an import?', 'faq.a2': 'The invoice, packing list and bill of lading or transport document are essential. Depending on the goods and regime, a certificate of origin, control certificate, health certificate or incentive certificate may also be required. We confirm exactly which documents are needed when the file is opened.',
    'faq.q3': 'What is EDI and why does it matter?', 'faq.a3': 'EDI (Electronic Data Interchange) moves customs procedures into a paperless electronic environment. İKON was among the first companies to use EDI, in step with the automation project of the Undersecretariat of Customs and its offices.',
    'faq.q4': 'Do you serve every customs office?', 'faq.a4': 'Yes. Our licensed import, export, accounting and client representatives serve at customs offices nationwide. Our Istanbul-based team works alongside representatives on the ground.',
    'faq.q5': 'How long does a file take?', 'faq.a5': 'It depends on the goods, the regime, the workload of the customs office and the completeness of the documents. That is why our first step is to complete the paperwork and give you a realistic timeline — and to share every step as it happens.',
    'cta.label': 'A new file', 'cta.title1': 'Your cargo is moving.', 'cta.title2': 'Your documents are with us.',
    'cta.sub': 'Import, export or transit — even for a single file, let us be the right contact. We\'re one phone call away.', 'cta.b1': 'Get a quote',
    'ft.since': 'Since 1994 · Istanbul',
    'ft.office': 'Head office', 'ft.directions': 'Get directions ↗', 'ft.contact': 'Contact', 'ft.form': 'Quote form', 'ft.menu': 'Menu', 'ft.hours': 'Service',
    'ft.h1': 'Weekday customs operations', 'ft.h2': '24/7 motor courier', 'ft.h3': 'Representation at all customs offices',
    'ft.legal1': 'Scope of services', 'ft.legal2': 'Privacy', 'ft.credits': 'Image credits',
    'meta.svc.title': 'Services — Import, Export, Legislation | İKON Customs Brokerage',
    'meta.svc.desc': 'Import and export operations, information systems, legislation advisory, motor courier and EDI. İKON customs brokerage services.',
    'meta.about.title': 'Company — Since 1994 | İKON Customs Brokerage',
    'meta.about.desc': 'Customs brokerage since 1994: the story, vision, mission, values and customs brokers of İKON.',
    'meta.contact.title': 'Contact — İKON Customs Brokerage',
    'meta.contact.desc': 'İKON Customs Brokerage: Ataşehir, Istanbul. Phone +90 216 324 05 95. Contact form for quotes and advice.',
    'svp.count': '01 — 06',
    'svp.title': 'Customs is a <em>process</em>.',
    'svp.lead': 'From import to export, from legislation watch to document courier — every service serves one purpose: your business never stops.',
    'svp.s1': 'Service areas', 'svp.s3': 'Customs offices',
    'svp.cap1': 'Customs ground', 'svp.cap2': 'Container operations',
    'svp.i1': 'HS code · Declaration · Inspection', 'svp.i2': 'A.TR · EUR.1 · Origin',
    'svp.i3': 'Legislation · Insight · Information', 'svp.i4': 'Authorities · Rulings · Compliance',
    'svp.i5': '24/7 · Delivery · Tracking', 'svp.i6': 'Data · Integration · Speed',
    'svp.nav': 'Services', 'svp.import': 'Import', 'svp.export': 'Export', 'svp.info': 'Information',
    'svp.legis': 'Legislation', 'svp.courier': 'Courier', 'svp.edi': 'EDI',
    'svp.b1.lead': 'We start the day the file opens, not the day the cargo sails. From the purchase decision to delivery on the customs ground, we run the whole chain from a single desk.',
    'svp.b1.l1': 'Project preparation and incentive certificates for goods under incentive schemes',
    'svp.b1.l2': 'HS classification and correct tariff positioning',
    'svp.b1.l3': 'Preparation and approval of domestic/imported global lists for investment incentives',
    'svp.b1.l4': 'Preparation and certification of packing lists',
    'svp.b1.l5': 'Document handover, bill of lading endorsements and collection of originals',
    'svp.b1.l6': 'Pre-declaration rulings where the goods raise doubt',
    'svp.b1.l7': 'Customs acceptance, registration and physical inspection',
    'svp.b1.l8': 'Records for shortages, damage or discrepancies; notification of the authorities',
    'svp.b1.l9': 'Duty assessment, security-backed value and fee payments',
    'svp.b1.l10': 'Transport of the goods to the requested location and delivery to the authorities',
    'svp.b1.l11': 'Closing bank undertaking accounts and releasing securities',
    'svp.b1.l12': 'Blocking tax and duty cheques; timely and online payments',
    'svp.b1.note.t': 'A classification error means duty and penalties.',
    'svp.b1.note.d': 'The HS code is the identity of the goods. A wrong code produces the wrong result even with perfect paperwork. That is why we settle classification in writing at the very start.',
    'svp.b2.lead': 'In export, document discipline matters as much as speed. From A.TR to EUR.1, from prior authorisation to the closure copy, we run the entire process.',
    'svp.b2.l1': 'Prior authorisation and special document procurement under the export regime',
    'svp.b2.l2': 'A.TR, EUR.1, certificate of origin, Form A, control certificate, health certificate',
    'svp.b2.l3': 'Consular legalisation; chamber of commerce / governorship invoice approval where required',
    'svp.b2.l4': 'Membership registration with the relevant exporter associations',
    'svp.b2.l5': 'Transfer of documents prepared by the broker to the bank or relevant unit',
    'svp.b2.l6': 'Declaration preparation, acceptance, registration and inspection',
    'svp.b2.l7': 'Completion of customs formalities for the loaded vehicle',
    'svp.b2.l8': 'Closing the declaration after the confirmation copy and delivering the closure copy',
    'svp.b2.l9': 'Temporary export operations and re-entry within the deadline',
    'svp.b2.l10': 'Tracking of all exports under the customs legislation',
    'svp.b2.note.t': 'Origin, not price, wins markets.',
    'svp.b2.note.d': 'Preferential tariff advantage starts with the right document. We plan origin and movement certificates on day one of the export.',
    'svp.b3.lead': 'Legislation changes every day. Our job is to read the change on your behalf and tell you its effect on your file the same day.',
    'svp.b3.l1': 'Continuous review of the Customs Act, regulations, circulars and communiqués',
    'svp.b3.l2': 'Official Gazette monitoring and a finger on the pulse of current procedures',
    'svp.b3.l3': 'Expert interpretation; client briefings by e-mail',
    'svp.b3.l4': 'Research on the issues that matter to your company, with a favourable reading',
    'svp.b3.l5': 'Proactive guidance with a minimum-error principle',
    'svp.b3.l6': 'Multi-functional information sharing aligned with communication technology',
    'svp.b3.note.t': 'Reading the legislation is not enough; it must be read for your file.',
    'svp.b3.note.d': 'The same circular affects every company differently. The information system exists to tell the difference.',
    'svp.b4.lead': 'When you are stuck, we bring the right authority into the room. We speak directly with specialists at the Treasury and at the Undersecretariat of Customs and obtain comprehensive answers as fast as possible.',
    'svp.b4.l1': 'Direct contact with legislation and technical specialists',
    'svp.b4.l2': 'Managing correspondence and rulings with customs authorities',
    'svp.b4.l3': 'Technical opinions and information support on classification',
    'svp.b4.l4': 'Software-supported processes for compliance with new rules',
    'svp.b4.l5': 'Full discharge of the legal obligations set by the legislation',
    'svp.b4.l6': 'Extending the boundaries of responsibility our clients entrust to us',
    'svp.b4.note.t': 'Correct information is the fastest information.',
    'svp.b4.note.d': 'In legislative interpretation, accuracy matters as much as speed. That is why we obtain information at the source.',
    'svp.b5.lead': 'On the customs ground, one delayed signature delays everything. Our own motor courier service carries documents hand to hand at any hour.',
    'svp.b5.l1': 'Document exchange at any hour of the day',
    'svp.b5.l2': 'Uninterrupted flow between office, customs ground and port',
    'svp.b5.l3': 'Maximum performance in document exchange',
    'svp.b5.l4': 'Time saved; less waiting and less risk of delay',
    'svp.b5.l5': 'Representation and delivery tracking at all customs offices',
    'svp.b5.l6': 'Multiple deliveries and pickups within the same day',
    'svp.b5.note.t': 'Documents should be the fastest-moving part of the process.',
    'svp.b5.note.d': 'Our courier service is not outsourced; it is part of the operation. That is why it does not wait.',
    'svp.b6.lead': 'We work at the speed of data, not paper. As one of the first companies to use EDI in Türkiye, we keep the data flowing.',
    'svp.b6.l1': 'EDI adoption in step with the Undersecretariat of Customs modernisation project',
    'svp.b6.l2': 'One of the first companies to use electronic data interchange',
    'svp.b6.l3': 'Electronic flow of declarations and documents',
    'svp.b6.l4': 'Compliance through integrated software support',
    'svp.b6.l5': 'File-level traceability and fast feedback',
    'svp.b6.l6': 'Uninterrupted data flow and a low error rate',
    'svp.b6.note.t': 'When the data is right, the process is fast.',
    'svp.b6.note.d': 'Electronic infrastructure delivers not only speed but traceability and consistency. At İKON, EDI is the backbone of the operation.',
    'svp.strip': 'Every service answers a single question: <em>does the file close?</em>',
    'svp.cta.sub': 'Let\'s define the scope together. Tell us about your file and we will map the best route.',
    'ab.count': '1994 — today',
    'ab.title': 'Since 1994, <em>the last mile.</em>',
    'ab.lead': 'More than thirty years of hands-on customs experience; young minds, legislation specialists and uninterrupted operations.',
    'ab.s2': 'Years of experience', 'ab.s3': 'Customs brokers',
    'ab.p1': 'İKON was founded in 1994 by a team of seasoned customs professionals. With proactive teamwork, fast and dependable outcomes, a portfolio of leading Turkish companies and an unshakeable commitment to integrity, it stands today among the sector\'s most distinguished firms.',
    'ab.p2': 'In a world where competition sets the direction, quality is the prerequisite and the client is indispensable, the decisive factor is personal quality, team quality and management quality. As a result, the only thing competition cannot imitate is the knowledge and skill unique to a firm\'s people.',
    'ab.p3': 'Certified to TS EN ISO 9001/2000, İKON understands the challenges of the service sector and works on a client-representation model — never compromising on service quality, always putting client satisfaction first.',
    'ab.p4': 'Its in-house motor courier service keeps clients served at any hour, delivering maximum performance in document exchange and saving time. Through technology investments and its people, İKON brings the innovations of the age into the service sector.',
    'ab.sig': 'İKON / Gümrük Müşavirlik Hizmetleri Ltd. Şti.',
    'ab.fig1': 'Maasvlakte', 'ab.fig2': 'Port operation',
    'ab.t1.t': 'Founded', 'ab.t1.d': 'Founded in Istanbul by a team of seasoned customs professionals.',
    'ab.t2.t': 'Quality certificate', 'ab.t2.d': 'Service standards certified to TS EN ISO 9001/2000.',
    'ab.t3.t': 'Digital transition', 'ab.t3.d': 'Among the first companies to use EDI, in step with the modernisation project of the Undersecretariat of Customs and its offices.',
    'ab.t4.b': 'Today', 'ab.t4.t': 'Full logistics', 'ab.t4.d': 'Advancing from customs brokerage toward a complete logistics partner, continuing investment in technology and people.',
    'ab.vision.l': 'Our vision', 'ab.vision.t': 'To be Türkiye\'s most trusted, highest-quality customs brokerage.',
    'ab.vision.d': 'In a world where competition sets the direction, quality is the prerequisite and the client is indispensable, the decisive factor is personal quality, team quality and management quality.',
    'ab.mission.l': 'Our mission', 'ab.mission.t': 'To be the firm the best in the sector want to work with.',
    'ab.mission.d': 'Balanced, solid growth; meeting client needs and expectations with better service; using technology effectively and efficiently. We value the human mind above all and invest in people continuously.',
    'ab.val.label': 'Values', 'ab.val.t1': 'Quality,', 'ab.val.t2': 'on three levels.', 'ab.val.note': 'Personal · Team · Management',
    'ab.v1.t': 'Personal quality', 'ab.v1.d': 'Licensed import, export, accounting and client representatives; the same competence and care on every file.', 'ab.v1.b': 'Licence · Experience',
    'ab.v2.t': 'Team quality', 'ab.v2.d': 'A team where years of experience work alongside young minds, supported by foreign trade and legislation specialists.', 'ab.v2.b': 'Experience · Youth',
    'ab.v3.t': 'Management quality', 'ab.v3.d': 'Years of experience at the top; proactive decisions, transparent communication and sustainable growth.', 'ab.v3.b': 'Decision · Transparency',
    'ab.team.label': 'Team', 'ab.team.t1': 'Years of experience,', 'ab.team.t2': 'young minds.', 'ab.team.note': 'Customs brokers',
    'ab.team.lead': 'Our team combines years of experience with young minds. Together with our foreign trade and legislation specialists, we serve at every customs office.',
    'ab.m1.role': 'Customs Broker', 'ab.m1.desc': 'Foreign trade and customs legislation',
    'ab.m2.role': 'Customs Broker', 'ab.m2.desc': 'Operations and field management',
    'ab.iso.label': 'Quality & compliance', 'ab.iso.1': 'TS EN ISO 9001 / 2000 Quality System', 'ab.iso.2': 'Electronic Data Interchange', 'ab.iso.3': 'Uninterrupted service since 1994',
    'ab.cta.label': 'Let\'s work together', 'ab.cta.t1': 'The right team,', 'ab.cta.t2': 'the right outcome.',
    'ab.cta.sub': 'Let\'s open your file together and plan the process end to end. The İKON team is one phone call away.',
    'ct.title': 'Let\'s talk<span style="color:var(--orange)">.</span>',
    'ct.lead': 'A file, a question or a new partnership... The right contact is one phone call away. Fill in the form and our team will get back to you shortly.',
    'ct.address.l': 'Head office', 'ct.address.s': 'Ataşehir, Istanbul',
    'ct.phone.l': 'Telephone', 'ct.phone.s': 'Weekday customs operations · 24/7 motor courier',
    'ct.reach.l': 'Getting here', 'ct.reach.s': 'Central Ataşehir; close to the TEM and D-100 connections.',
    'ct.note.l': 'Fast response', 'ct.note.d': 'Fill in the form or call us directly. We share our first assessment of your file the same day.',
    'ct.f.name': 'Full name *', 'ct.f.company': 'Company', 'ct.f.email': 'E-mail *', 'ct.f.phone': 'Phone',
    'ct.f.subject': 'Subject *', 'ct.f.choose': 'Select', 'ct.f.other': 'Other', 'ct.f.message': 'Your message *',
    'ct.f.kvkk': 'By submitting, I agree that my details may be used solely to respond to my request.',
    'ct.f.required': '* Required fields. Your details are not shared with third parties.', 'ct.f.send': 'Send',
    'ct.ok.t': 'Your request is in.', 'ct.ok.d': 'We will get back to you shortly. For anything urgent, call +90 216 324 05 95.', 'ct.ok.reset': 'New message',
    'ct.map.label': 'Head office', 'ct.map.t': 'In Ataşehir, at the centre of the city and its ports.',
    'ct.map.d': 'Örnek Mah. Şehit Cahar Dudayev Cad. Örnek İş Merkezi No:14 Kat:2, Ataşehir / Istanbul',
    'ct.strip': 'Need an answer faster? <em>+90 216 324 05 95</em>', 'ct.strip.note': 'Weekday customs operations',
  };

  const i18nEls = Array.from(document.querySelectorAll('[data-i18n]'));
  const contentEls = Array.from(document.querySelectorAll('[data-i18n-content]'));
  const store = new Map();
  i18nEls.forEach(el => store.set(el, el.innerHTML));
  const contentStore = new Map();
  contentEls.forEach(el => contentStore.set(el, el.getAttribute('content')));

  let current = 'tr';

  function apply(lang) {
    current = lang === 'en' ? 'en' : 'tr';
    document.documentElement.lang = current;
    document.documentElement.classList.toggle('lang-en', current === 'en');
    i18nEls.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (current === 'en' && EN[key] != null) el.innerHTML = EN[key];
      else el.innerHTML = store.get(el);
    });
    contentEls.forEach(el => {
      const key = el.getAttribute('data-i18n-content');
      const val = current === 'en' && EN[key] != null ? EN[key] : contentStore.get(el);
      el.setAttribute('content', val);
    });
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === current)));
    document.querySelectorAll('[data-words]').forEach(el => { delete el.dataset.split; });
    if (window.IkonSplitWords) window.IkonSplitWords();
    try { localStorage.setItem('ikon-lang', current); } catch (e) {}
    try {
      const url = new URL(location.href);
      if (current === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
      history.replaceState(null, '', url);
    } catch (e) {}
    document.dispatchEvent(new CustomEvent('ikon:lang', { detail: current }));
  }

  window.IkonI18N = {
    set: apply,
    get: () => current,
    t: (key) => (current === 'en' && EN[key] != null ? EN[key] : key)
  };

  let initial = 'tr';
  try {
    const q = new URLSearchParams(location.search).get('lang');
    initial = q === 'en' || (!q && localStorage.getItem('ikon-lang') === 'en') ? 'en' : 'tr';
  } catch (e) {}
  if (initial === 'en') apply('en');
})();
