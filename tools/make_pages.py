import re, pathlib
idx = pathlib.Path('index.html').read_text()
# ---- extract shared blocks from index
header = re.search(r'<header class="nav".*?</header>', idx, re.S).group(0)
menu = re.search(r'<div class="menu" id="menu".*?</div>\s*</div>\s*(?=<main)', idx, re.S).group(0)
footer = re.search(r'<footer class="footer">.*?</footer>', idx, re.S).group(0)
footer = footer.replace('<div class="footer__word">ikon<em class="footer__word-meta">Gümrük Müşavirliği<br>Since 1994 · İstanbul</em></div>', '<div class="footer__word">ikon<em class="footer__word-meta">Gümrük Müşavirliği<br>1994\'ten beri · İstanbul</em></div>')
preloader = re.search(r'<div class="preloader" id="preloader".*?preloader__bottom.*?</div>\s*</div>', idx, re.S).group(0)
progress = '<div class="progress" id="progress" aria-hidden="true"></div>'
start = idx[idx.index('<a class="skip"'):idx.index('<main id="main">')]

def nav_for(active):
    h = header
    # clear all active
    h = h.replace('nav__link is-active', 'nav__link')
    # mark target
    h = re.sub(r'class="nav__link" href="%s"' % re.escape(active), 'class="nav__link is-active" href="%s"' % active, h)
    return h

HEAD = '''<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title data-i18n="{tk}">{title}</title>
<meta name="description" data-i18n-content="{dk}" content="{desc}">
<meta name="theme-color" content="#070A0F">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/Outfit-200_600-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/Outfit-200_600-latin-ext.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/InstrumentSerif-Italic-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/style.css">
<noscript><style>.preloader{{display:none!important}}[data-reveal]{{opacity:1!important;transform:none!important}}.mask-line>span{{transform:none!important}}.cursor,.cursor-dot{{display:none!important}}.faq__a{{grid-template-rows:1fr!important}}.form__success{{display:none!important}}</style></noscript>

<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="assets/img/og.jpg">
</head>
<body>
'''

def page(filename, title, tk, desc, dk, active, body, body_class=''):
    out = HEAD.format(title=title, tk=tk, desc=desc, dk=dk)
    if body_class: out = out.replace('<body>', '<body class="%s">' % body_class)
    out += progress + '\n' + preloader + '\n' + start
    out = out.replace(header, nav_for(active))
    out += '\n<main id="main">\n' + body + '\n</main>\n\n' + footer
    out += '\n\n<script src="assets/js/i18n.js"></script>\n<script src="assets/js/main.js"></script>\n</body>\n</html>\n'
    pathlib.Path(filename).write_text(out)
    print('wrote', filename, len(out))

# ============================ HİZMETLER ============================
H_SERVICES = '''  <section class="page-hero grain">
    <div class="shell">
      <div class="page-hero__meta">
        <div class="crumbs"><a href="./" data-i18n="nav.home">Ana Sayfa</a><span>/</span><span data-i18n="nav.services">Hizmetler</span></div>
        <span class="mono" style="color:var(--muted)" data-i18n="svp.count">01 — 06</span>
      </div>
      <h1 data-i18n="svp.title">Gümrük, bir <em>süreç</em> meselesi.</h1>
      <div class="page-hero__foot">
        <p class="page-hero__lead" data-i18n="svp.lead">İthalattan ihracata, mevzuat takibinden evrak kuryesine; her hizmet tek bir amaca hizmet eder: işinizin aksamaması.</p>
        <div class="page-hero__aside">
          <div class="page-hero__stat"><b>6</b><span data-i18n="svp.s1">Hizmet alanı</span></div>
          <div class="page-hero__stat"><b>1994</b><span data-i18n="hero.m1">Kuruluş</span></div>
          <div class="page-hero__stat"><b>Tüm</b><span data-i18n="svp.s3">Gümrükler</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--light" style="padding-top:clamp(26px,3.4vw,44px);padding-bottom:clamp(40px,5vw,64px)">
    <div class="shell">
      <figure class="banner" data-reveal="scale">
        <img src="assets/img/ship-2000.jpg" srcset="assets/img/ship-900.webp 900w, assets/img/ship-1600.webp 1600w, assets/img/ship-2000.webp 2000w" sizes="94vw" width="2000" height="1333" alt="Açık denizde ilerleyen konteyner gemisi" loading="lazy" decoding="async">
        <figcaption class="banner__cap"><span data-i18n="svp.cap1">Gümrük sahası</span><span style="opacity:.5">/</span><span data-i18n="svp.cap2">Konteyner operasyonu</span></figcaption>
      </figure>
      <div class="svc-index" data-reveal>
        <a href="#ithalat"><em>01</em><b data-i18n="sv.1.t">İthalat İşlemleri</b><span data-i18n="svp.i1">GTİP · Beyanname · Muayene</span></a>
        <a href="#ihracat"><em>02</em><b data-i18n="sv.2.t">İhracat İşlemleri</b><span data-i18n="svp.i2">A.TR · EUR.1 · Menşe</span></a>
        <a href="#bilgi"><em>03</em><b data-i18n="sv.3.t">Bilgi İşletim Sistemi</b><span data-i18n="svp.i3">Mevzuat · Yorum · Bilgi</span></a>
        <a href="#mevzuat"><em>04</em><b data-i18n="sv.4.t">Mevzuat &amp; Teknik Danışmanlık</b><span data-i18n="svp.i4">İdare · Görüş · Uyum</span></a>
        <a href="#kurye"><em>05</em><b data-i18n="sv.5.t">Motorlu Kurye &amp; Evrak</b><span data-i18n="svp.i5">7/24 · Teslim · Takip</span></a>
        <a href="#edi"><em>06</em><b data-i18n="sv.6.t">EDI &amp; Dijital Gümrük</b><span data-i18n="svp.i6">Veri · Entegrasyon · Hız</span></a>
      </div>
    </div>
  </section>

  <section class="section section--light" style="padding-top:0">
    <div class="shell svc-layout">
      <aside class="svc-nav" aria-label="Hizmetler">
        <span class="svc-nav__label" data-i18n="svp.nav">Hizmetler</span>
        <a href="#ithalat" class="is-active">01 · <span data-i18n="sv.1.t">İthalat İşlemleri</span></a>
        <a href="#ihracat">02 · <span data-i18n="sv.2.t">İhracat İşlemleri</span></a>
        <a href="#bilgi">03 · <span data-i18n="sv.3.t">Bilgi İşletim Sistemi</span></a>
        <a href="#mevzuat">04 · <span data-i18n="sv.4.t">Mevzuat &amp; Teknik Danışmanlık</span></a>
        <a href="#kurye">05 · <span data-i18n="sv.5.t">Motorlu Kurye &amp; Evrak</span></a>
        <a href="#edi">06 · <span data-i18n="sv.6.t">EDI &amp; Dijital Gümrük</span></a>
      </aside>

      <div>
        <article class="svc-block" id="ithalat">
          <div class="svc-block__head">
            <div>
              <div class="svc-block__num">01 / <span data-i18n="svp.import">İthalat</span></div>
              <h2 data-i18n="sv.1.t">İthalat İşlemleri</h2>
            </div>
            <p data-i18n="svp.b1.lead">Eşyanın yola çıktığı gün değil, dosyanın açıldığı gün başlarız. Satın alma kararından gümrük sahasındaki teslime kadar tüm zinciri tek elden yönetiriz.</p>
          </div>
          <figure class="svc-block__figure" data-reveal="scale">
            <img src="assets/img/detail-1100.webp" srcset="assets/img/detail-700.webp 700w, assets/img/detail-1100.webp 1100w" sizes="(max-width:1024px) 92vw, 62vw" width="1100" height="1467" alt="Konteyner sahasında vinç operasyonu" loading="lazy" decoding="async">
          </figure>
          <div class="svc-columns">
            <ul class="svc-list-items">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b1.l1">Teşvik konusu emtialarda proje hazırlığı ve teşvik belgesi işlemleri</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b1.l2">GTİP tespiti ve eşyanın doğru sınıflandırılması</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b1.l3">Yatırım teşviklerinde yerli ve ithal global listelerin hazırlanması, tasdiki</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b1.l4">Çeki listelerinin tanzimi ve tasdik ettirilmesi</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b1.l5">Vesaik teslimi, konşimento ciro işlemleri ve orijinal evrakın alınması</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b1.l6">Beyanname öncesi tereddütlerde küşat işlemi ve resmî görüş</span></li>
            </ul>
            <ul class="svc-list-items">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b1.l7">Gümrük kabul, tescil ve eşya muayenesi</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b1.l8">Eksiklik, hasar veya yanlışlık tutanakları; ilgili mercilerin bilgilendirilmesi</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b1.l9">Tahakkuk, teminata bağlı değer ve ücret yatırımı</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b1.l10">Eşyanın istenen yere taşınması ve yetkililere teslimi</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b1.l11">Banka taahhüt hesaplarının kapatılması, teminatların çözülmesi</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b1.l12">Vergi ve harç çeklerinin blokajı; ödemelerin zamanında ve online yapılması</span></li>
            </ul>
          </div>
          <div class="svc-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg>
            <div><b data-i18n="svp.b1.note.t">Sınıflandırma hatası, vergi ve ceza demektir.</b><span data-i18n="svp.b1.note.d">GTİP eşyanın kimliğidir. Yanlış GTİP, doğru evrakla bile yanlış sonuç üretir. Bu yüzden sınıflandırmayı dosyanın en başında, yazılı olarak netleştiririz.</span></div>
          </div>
        </article>

        <article class="svc-block" id="ihracat">
          <div class="svc-block__head">
            <div>
              <div class="svc-block__num">02 / <span data-i18n="svp.export">İhracat</span></div>
              <h2 data-i18n="sv.2.t">İhracat İşlemleri</h2>
            </div>
            <p data-i18n="svp.b2.lead">İhracatta hız kadar belge disiplini belirleyici. A.TR'dan EUR.1'e, ön müsaadeden kapanış nüshasına kadar tüm süreci yürütürüz.</p>
          </div>
          <figure class="svc-block__figure" data-reveal="scale">
            <img src="assets/img/marus-1600.webp" srcset="assets/img/marus-900.webp 900w, assets/img/marus-1600.webp 1600w" sizes="(max-width:1024px) 92vw, 62vw" width="1600" height="1067" alt="Konteyner gemisi açık denizde" loading="lazy" decoding="async">
          </figure>
          <div class="svc-columns">
            <ul class="svc-list-items">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b2.l1">İhracat rejimi ve yönetmeliği çerçevesinde ön müsaade ve özel belge temini</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b2.l2">A.TR, EUR.1, Menşe Şahadetnamesi, Forma-A, Kontrol Belgesi, Sağlık Sertifikası</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b2.l3">Konsolosluk tasdiki; ülke durumuna göre Ticaret Odası / Valilik fatura tasdiki</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b2.l4">Eşyanın cinsine göre ilgili ihracatçı birliklerine üyelik kayıtları</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b2.l5">Gümrük müşaviri tarafından düzenlenen vesaikin bankaya veya ilgili birime intikali</span></li>
            </ul>
            <ul class="svc-list-items">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b2.l6">Beyanname düzenleme, kabul-tescil ve muayene tespiti</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b2.l7">Yüklenen aracın gümrük işlemlerinin tamamlanması</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b2.l8">Teyit nüshası sonrası beyannamenin kapatılması ve kapama nüshasının teslimi</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b2.l9">Geçici ihracat işlemleri ve süresi içinde yurda giriş</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b2.l10">Kanunlar çerçevesinde gerçekleşen tüm ihracatların takibi</span></li>
            </ul>
          </div>
          <div class="svc-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg>
            <div><b data-i18n="svp.b2.note.t">Menşe, fiyat değil; pazar kazandırır.</b><span data-i18n="svp.b2.note.d">Tercihli tarife avantajı doğru belgeyle başlar. Menşe ve dolaşım belgelerini ihracatın ilk gününde planlarız.</span></div>
          </div>
        </article>

        <article class="svc-block" id="bilgi">
          <div class="svc-block__head">
            <div>
              <div class="svc-block__num">03 / <span data-i18n="svp.info">Bilgi</span></div>
              <h2 data-i18n="sv.3.t">Bilgi İşletim Sistemi</h2>
            </div>
            <p data-i18n="svp.b3.lead">Mevzuat her gün değişiyor. Bizim işimiz, değişimi sizin adınıza okumak ve dosyanıza etkisini aynı gün söylemek.</p>
          </div>
          <figure class="svc-block__figure" data-reveal="scale">
            <img src="assets/img/stacks-1200.jpg" srcset="assets/img/stacks-700.webp 700w, assets/img/stacks-1200.webp 1200w" sizes="(max-width:1024px) 92vw, 62vw" width="1200" height="900" alt="Konteyner istif alanı" loading="lazy" decoding="async">
          </figure>
          <div class="svc-columns">
            <ul class="svc-list-items">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b3.l1">Gümrük Kanunu, Yönetmelik, Genelge ve Tebliğlerin sürekli incelenmesi</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b3.l2">Resmî Gazete takibi ve güncel işlemlerin nabzı</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b3.l3">Uzman görüşle yorum; müşteriye e-posta yoluyla bilgilendirme</span></li>
            </ul>
            <ul class="svc-list-items">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b3.l4">Firmaya özel öncelikli konularda araştırma ve lehe yorum</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b3.l5">Minimum hata ilkesiyle proaktif yönlendirme</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b3.l6">İletişim teknolojilerine paralel, çok fonksiyonlu bilgi paylaşımı</span></li>
            </ul>
          </div>
          <div class="svc-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg>
            <div><b data-i18n="svp.b3.note.t">Mevzuatı okumak yetmez; sizin dosyanız için okumak gerekir.</b><span data-i18n="svp.b3.note.d">Aynı genelge her firmayı farklı etkiler. Bilgi İşletim Sistemi bunu ayırt etmek için var.</span></div>
          </div>
        </article>

        <article class="svc-block" id="mevzuat">
          <div class="svc-block__head">
            <div>
              <div class="svc-block__num">04 / <span data-i18n="svp.legis">Mevzuat</span></div>
              <h2 data-i18n="sv.4.t">Mevzuat &amp; Teknik Danışmanlık</h2>
            </div>
            <p data-i18n="svp.b4.lead">Takıldığınız yerde doğru muhatabı devreye alırız. Hazine Müsteşarlığı ve Gümrük Müsteşarlığı bünyesindeki uzmanlarla doğrudan temas eder, kapsamlı bilgiyi en hızlı şekilde temin ederiz.</p>
          </div>
          <figure class="svc-block__figure" data-reveal="scale">
            <img src="assets/img/aerial-1600.webp" srcset="assets/img/aerial-900.webp 900w, assets/img/aerial-1600.webp 1600w" sizes="(max-width:1024px) 92vw, 62vw" width="1600" height="1200" alt="Liman ve konteyner terminalleri" loading="lazy" decoding="async">
          </figure>
          <div class="svc-columns">
            <ul class="svc-list-items">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b4.l1">Mevzuat ve teknik uzmanlarla doğrudan iletişim</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b4.l2">Gümrük idareleriyle yazışma ve görüş süreçlerinin yönetimi</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b4.l3">Eşya sınıflandırmasına dair teknik görüş ve bilgi desteği</span></li>
            </ul>
            <ul class="svc-list-items">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b4.l4">Yeni düzenlemelere uyum için yazılım destekli süreçler</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b4.l5">Kanunların öngördüğü hukuki zorunlulukların tamamının yerine getirilmesi</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b4.l6">Müşterinin devrettiği sorumluluğun sınırlarının genişletilmesi</span></li>
            </ul>
          </div>
          <div class="svc-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg>
            <div><b data-i18n="svp.b4.note.t">Doğru bilgi, en hızlı bilgidir.</b><span data-i18n="svp.b4.note.d">Mevzuat yorumunda hız kadar isabet önemlidir. Bu yüzden bilgiyi kaynağından, doğrudan temin ederiz.</span></div>
          </div>
        </article>

        <article class="svc-block" id="kurye">
          <div class="svc-block__head">
            <div>
              <div class="svc-block__num">05 / <span data-i18n="svp.courier">Kurye</span></div>
              <h2 data-i18n="sv.5.t">Motorlu Kurye &amp; Evrak</h2>
            </div>
            <p data-i18n="svp.b5.lead">Gümrükte bir imza gecikirse tüm süreç gecikir. Kendi motorlu kurye servisimizle evrakı günün her saatinde elden ele taşırız.</p>
          </div>
          <figure class="svc-block__figure" data-reveal="scale">
            <img src="assets/img/istanbul-1800.webp" srcset="assets/img/istanbul-800.webp 800w, assets/img/istanbul-1400.webp 1400w, assets/img/istanbul-1800.webp 1800w" sizes="(max-width:1024px) 92vw, 62vw" width="1800" height="1000" alt="İstanbul Boğazı ve liman" loading="lazy" decoding="async">
          </figure>
          <div class="svc-columns">
            <ul class="svc-list-items">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b5.l1">Günün her saati evrak alışverişi</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b5.l2">Ofis, gümrük sahası ve liman arasında kesintisiz akış</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b5.l3">Evrak alışverişinde maksimum performans</span></li>
            </ul>
            <ul class="svc-list-items">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b5.l4">Zamandan tasarruf; bekleme ve gecikme riskinin azalması</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b5.l5">Tüm gümrüklerde temsil ve teslim takibi</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b5.l6">Aynı gün içinde çoklu teslim ve evrak toplama</span></li>
            </ul>
          </div>
          <div class="svc-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg>
            <div><b data-i18n="svp.b5.note.t">Evrak, sürecin en hızlı hareket eden parçası olmalı.</b><span data-i18n="svp.b5.note.d">Kurye hizmetimiz dışarıdan bir hizmet değil; operasyonun kendi parçası. Bu yüzden beklemez.</span></div>
          </div>
        </article>

        <article class="svc-block" id="edi">
          <div class="svc-block__head">
            <div>
              <div class="svc-block__num">06 / <span data-i18n="svp.edi">EDI</span></div>
              <h2 data-i18n="sv.6.t">EDI &amp; Dijital Gümrük</h2>
            </div>
            <p data-i18n="svp.b6.lead">Kâğıdın hızıyla değil, verinin hızıyla çalışıyoruz. EDI'yi Türkiye'de ilk kullanan firmalardan biri olarak kesintisiz veri akışı sağlarız.</p>
          </div>
          <figure class="svc-block__figure" data-reveal="scale">
            <img src="assets/img/cranes-1600.webp" srcset="assets/img/cranes-900.webp 900w, assets/img/cranes-1600.webp 1600w" sizes="(max-width:1024px) 92vw, 62vw" width="1600" height="900" alt="Gece limanında konteyner vinçleri" loading="lazy" decoding="async">
          </figure>
          <div class="svc-columns">
            <ul class="svc-list-items">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b6.l1">Gümrük Müsteşarlığı modernizasyon projesiyle eş zamanlı EDI geçişi</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b6.l2">Elektronik Veri Transferi sistemini ilk kullanan firmalardan biri</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b6.l3">Beyanname ve evrak akışında elektronik süreç</span></li>
            </ul>
            <ul class="svc-list-items">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b6.l4">Entegre yazılım desteğiyle mevzuata uygun işleyiş</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b6.l5">Dosya bazında izlenebilirlik ve hızlı geri bildirim</span></li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg><span data-i18n="svp.b6.l6">Kesintisiz veri akışı ve düşük hata oranı</span></li>
            </ul>
          </div>
          <div class="svc-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg>
            <div><b data-i18n="svp.b6.note.t">Veri doğruysa süreç hızlıdır.</b><span data-i18n="svp.b6.note.d">Elektronik altyapı yalnızca hız değil; izlenebilirlik ve tutarlılık sağlar. İKON'da EDI operasyonun omurgasıdır.</span></div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="section section--light" style="padding-top:0;padding-bottom:clamp(40px,5vw,60px)">
    <div class="shell"><div class="strip">
      <q data-i18n="svp.strip">Hizmetin tamamı tek bir soruya cevap verir: <em>dosya kapanıyor mu?</em></q>
      <span>İKON / <span data-i18n="svp.count">01 — 06</span></span>
    </div></div>
  </section>

  <section class="cta grain">
    <div class="cta__media"><img src="assets/img/cranes-1600.webp" alt="" loading="lazy" aria-hidden="true"></div>
    <div class="shell cta__inner">
      <span class="eyebrow" data-i18n="cta.label">Yeni bir dosya</span>
      <h2 class="cta__title" data-reveal><span data-i18n="cta.title1">Yükünüz yolda,</span> <em data-i18n="cta.title2">evrakınız bizde.</em></h2>
      <p class="cta__sub" data-i18n="svp.cta.sub">Hizmet kapsamınızı birlikte netleştirelim. Dosyanızı anlatın; en doğru yol haritasını çıkaralım.</p>
      <div class="cta__actions">
        <a class="btn" href="iletisim" data-magnetic><span data-i18n="cta.b1">Teklif alın</span><span class="btn__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg></span></a>
        <a class="btn btn--ghost" href="tel:+902163240595" data-magnetic><span>+90 216 324 05 95</span><span class="btn__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg></span></a>
      </div>
    </div>
  </section>'''

page('hizmetler.html', 'Hizmetler — İthalat, İhracat, Mevzuat | İKON Gümrük Müşavirliği', 'meta.svc.title',
     'İthalat ve ihracat işlemleri, bilgi işletim sistemi, mevzuat danışmanlığı, motorlu kurye ve EDI. İKON Gümrük Müşavirliği hizmetleri.',
     'meta.svc.desc', 'hizmetler', H_SERVICES)

# ============================ KURUMSAL ============================
H_ABOUT = '''  <section class="page-hero page-hero--light">
    <div class="shell">
      <div class="page-hero__meta">
        <div class="crumbs"><a href="./" data-i18n="nav.home">Ana Sayfa</a><span>/</span><span data-i18n="nav.about">Kurumsal</span></div>
        <span class="mono" style="color:var(--muted-2)" data-i18n="ab.count">1994 — bugün</span>
      </div>
      <h1 data-i18n="ab.title">1994'ten beri <em>son nokta.</em></h1>
      <div class="page-hero__foot">
        <p class="page-hero__lead" data-i18n="ab.lead">Gümrük müşavirliğinde otuz yılı aşan bir saha deneyimi; genç beyinler, mevzuat uzmanları ve kesintisiz operasyon.</p>
        <div class="page-hero__aside">
          <div class="page-hero__stat"><b>1994</b><span data-i18n="hero.m1">Kuruluş</span></div>
          <div class="page-hero__stat"><b>30<sup style="color:var(--orange);font-size:.4em">+</sup></b><span data-i18n="ab.s2">Yıl deneyim</span></div>
          <div class="page-hero__stat"><b>2</b><span data-i18n="ab.s3">Gümrük müşaviri</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--light" style="padding-top:clamp(36px,4.6vw,64px)">
    <div class="shell">
      <div class="about-grid">
        <div class="about-copy">
          <p class="lead" data-reveal data-i18n="ab.p1">İKON, 1994 yılında gümrükleme hizmetlerinde uzman ve deneyimli bir kadro tarafından kuruldu. Proaktif ekip çalışması, hızlı ve güvenilir sonuç üretmesi, Türk ekonomisinin seçkin kuruluşlarından oluşan portföyü ve dürüstlük ilkelerine bağlılığıyla bugün sektörün en seçkin kuruluşlarından biri.</p>
          <p data-reveal style="--d:.06s" data-i18n="ab.p2">Rekabetin yol göstericisi, kalitenin ön koşul, müşterinin ise vazgeçilmez olduğu iş dünyasında belirleyici etken; bireysel kalite, ekip kalitesi ve yönetim kalitesidir. Bu anlayışın sonucu olarak rekabetin taklit edilemeyen tek unsuru, kuruma özgü bilgi ve becerilere sahip çalışanlardır.</p>
          <p data-reveal style="--d:.12s" data-i18n="ab.p3">TS EN ISO 9001/2000 Kalite Sistem Sertifikasına sahip olan İKON, hizmet sektörünün zorluklarının bilincinde; müşteri temsilciliği esası üzerine kurulu bir anlayışla kaliteli hizmetten taviz vermeden müşteri memnuniyetini ön planda tutar.</p>
          <p data-reveal style="--d:.18s" data-i18n="ab.p4">Bünyesindeki motorlu kurye servisi ile günün her saati müşterilerinin hizmetindedir; evrak alışverişinde maksimum performans gösterir ve zaman tasarrufu sağlar. Teknolojik yatırımları ve insan kaynaklarıyla çağın yeniliklerini hizmet sektörüne yansıtır.</p>
          <div class="mono" style="color:var(--muted-2);margin-top:10px" data-i18n="ab.sig">İKON / Gümrük Müşavirlik Hizmetleri Ltd. Şti.</div>
        </div>
        <figure class="about-fig" data-reveal="scale">
          <img src="assets/img/aerial-1600.webp" srcset="assets/img/aerial-900.webp 900w, assets/img/aerial-1600.webp 1600w" sizes="(max-width:1024px) 92vw, 42vw" width="1600" height="1200" alt="Liman sahası ve konteyner terminalleri" loading="lazy" decoding="async">
          <figcaption><span data-i18n="ab.fig1">Maasvlakte</span><span data-i18n="ab.fig2">Liman operasyonu</span></figcaption>
        </figure>
      </div>

      <div class="timeline">
        <div class="tl-item" data-reveal><b>1994</b><div><h3 data-i18n="ab.t1.t">Kuruluş</h3><p data-i18n="ab.t1.d">Gümrükleme hizmetlerinde uzman ve deneyimli bir kadro tarafından İstanbul'da kuruldu.</p></div></div>
        <div class="tl-item" data-reveal style="--d:.06s"><b>ISO 9001/2000</b><div><h3 data-i18n="ab.t2.t">Kalite belgesi</h3><p data-i18n="ab.t2.d">TS EN ISO 9001/2000 Kalite Sistem Sertifikası ile hizmet standardı belgelendi.</p></div></div>
        <div class="tl-item" data-reveal style="--d:.12s"><b>EDI</b><div><h3 data-i18n="ab.t3.t">Dijital geçiş</h3><p data-i18n="ab.t3.d">Gümrük Müsteşarlığı ve bağlı idarelerin modernizasyon projesiyle eş zamanlı olarak EDI'yi kullanan ilk firmalardan biri oldu.</p></div></div>
        <div class="tl-item" data-reveal style="--d:.18s"><b data-i18n="ab.t4.b">Bugün</b><div><h3 data-i18n="ab.t4.t">Tam lojistik</h3><p data-i18n="ab.t4.d">Gümrük müşavirliğinden tam bir lojistik çözüm ortağı olmaya doğru adımlar sürüyor; teknoloji ve insan kaynağına yatırımı sürdürüyor.</p></div></div>
      </div>
    </div>
  </section>

  <section class="section section--light" style="padding-top:0">
    <div class="shell">
      <div class="vm">
        <div class="vm__card vm__card--dark" data-reveal="scale">
          <span class="mono" data-i18n="ab.vision.l">Vizyonumuz</span>
          <h3 data-i18n="ab.vision.t">Türkiye'de en kaliteli ve güvenle hizmet veren gümrükleme firması olmak.</h3>
          <p data-i18n="ab.vision.d">Rekabetin yol göstericisi, kalitenin ön koşul, müşterinin ise vazgeçilmez olduğu iş dünyasında belirleyici etken bireysel kalite, ekip kalitesi ve yönetim kalitesidir.</p>
          <svg class="vm__card__icon" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1"><circle cx="50" cy="50" r="46"/><circle cx="50" cy="50" r="30"/><path d="M4 50h92M50 4v92"/></svg>
        </div>
        <div class="vm__card" data-reveal="scale" style="--d:.08s">
          <span class="mono" data-i18n="ab.mission.l">Misyonumuz</span>
          <h3 data-i18n="ab.mission.t">Sektöründeki en iyilerin çalışmak istediği firma olmak.</h3>
          <p data-i18n="ab.mission.d">Dengeli ve sağlam büyümek; müşterilerin ihtiyaç ve beklentilerini daha kaliteli hizmetle karşılamak; teknolojik altyapıyı etkin ve verimli kullanmak. En büyük önemi insan beynine verir, sürekli insana yatırım yaparız.</p>
          <svg class="vm__card__icon" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1"><path d="M8 82L50 10l42 72z"/><path d="M28 82V52h44v30"/></svg>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--dark">
    <div class="shell">
      <div class="head">
        <div class="head__label"><span class="eyebrow" data-i18n="ab.val.label">Değerler</span></div>
        <h2 class="head__title" data-reveal><span data-i18n="ab.val.t1">Kalite,</span> <span class="dim" data-i18n="ab.val.t2">üç seviyede.</span></h2>
        <div class="head__aside"><span class="mono" style="color:var(--muted)" data-i18n="ab.val.note">Bireysel · Ekip · Yönetim</span></div>
      </div>
      <div class="pillars">
        <div class="pillar" data-reveal><span>01</span><h3 data-i18n="ab.v1.t">Bireysel kalite</h3><p data-i18n="ab.v1.d">Diplomalı ithalat, ihracat, muhasebe ve müşteri temsilcileri; her dosyada aynı yetkinlik ve aynı özen.</p><b data-i18n="ab.v1.b">Diploma · Deneyim</b></div>
        <div class="pillar" data-reveal style="--d:.08s"><span>02</span><h3 data-i18n="ab.v2.t">Ekip kalitesi</h3><p data-i18n="ab.v2.d">Yılların tecrübesi ile genç beyinlerin bir arada çalıştığı; dış ticaret ve mevzuat uzmanlarıyla desteklenen bir ekip.</p><b data-i18n="ab.v2.b">Tecrübe · Gençlik</b></div>
        <div class="pillar" data-reveal style="--d:.16s"><span>03</span><h3 data-i18n="ab.v3.t">Yönetim kalitesi</h3><p data-i18n="ab.v3.d">Üst yönetimin yılların deneyimi; proaktif karar alma, şeffaf iletişim ve sürdürülebilir büyüme.</p><b data-i18n="ab.v3.b">Karar · Şeffaflık</b></div>
      </div>
    </div>
  </section>

  <section class="section section--light">
    <div class="shell">
      <div class="head">
        <div class="head__label"><span class="eyebrow" data-i18n="ab.team.label">Ekip</span></div>
        <h2 class="head__title" data-reveal><span data-i18n="ab.team.t1">Yılların tecrübesi,</span><br><span class="dim" data-i18n="ab.team.t2">genç beyinler.</span></h2>
        <div class="head__aside"><span class="mono" style="color:var(--muted-2)" data-i18n="ab.team.note">Gümrük müşavirleri</span></div>
      </div>
      <p class="lead" style="max-width:56ch" data-reveal data-i18n="ab.team.lead">Ekibimiz; yılların tecrübesi ve genç beyinlerden oluşur. Dış ticaret ve mevzuat uzmanlarımızla birlikte, tüm gümrüklerde hizmet veririz.</p>
      <div class="team">
        <div class="member" data-reveal>
          <div class="member__mono"><span>HK</span></div>
          <div><h3>Hüseyin Kurtuluş</h3><p data-i18n="ab.m1.role">Gümrük Müşaviri</p><small data-i18n="ab.m1.desc">Dış ticaret ve gümrük mevzuatı</small></div>
        </div>
        <div class="member" data-reveal style="--d:.08s">
          <div class="member__mono"><span>ET</span></div>
          <div><h3>Erdal Turuthan</h3><p data-i18n="ab.m2.role">Gümrük Müşaviri</p><small data-i18n="ab.m2.desc">Operasyon ve saha yönetimi</small></div>
        </div>
      </div>
      <div class="iso-strip">
        <span data-i18n="ab.iso.label">Kalite ve uyum</span>
        <div class="iso-badge"><i>ISO</i><span data-i18n="ab.iso.1">TS EN ISO 9001 / 2000 Kalite Sistemi</span></div>
        <div class="iso-badge"><i>EDI</i><span data-i18n="ab.iso.2">Elektronik Veri Transferi</span></div>
        <div class="iso-badge"><i>'94</i><span data-i18n="ab.iso.3">1994'ten beri kesintisiz hizmet</span></div>
      </div>
    </div>
  </section>

  <section class="cta grain">
    <div class="cta__media"><img src="assets/img/ship-1600.webp" alt="" loading="lazy" aria-hidden="true"></div>
    <div class="shell cta__inner">
      <span class="eyebrow" data-i18n="ab.cta.label">Birlikte çalışalım</span>
      <h2 class="cta__title" data-reveal><span data-i18n="ab.cta.t1">Doğru ekip,</span> <em data-i18n="ab.cta.t2">doğru sonuç.</em></h2>
      <p class="cta__sub" data-i18n="ab.cta.sub">Dosyanızı birlikte açalım; süreci baştan sona planlayalım. İKON ekibi bir telefon uzağınızda.</p>
      <div class="cta__actions">
        <a class="btn" href="iletisim" data-magnetic><span data-i18n="cta.b1">Teklif alın</span><span class="btn__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg></span></a>
        <a class="btn btn--ghost" href="hizmetler" data-magnetic><span data-i18n="sv.all">Tüm hizmetler</span><span class="btn__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg></span></a>
      </div>
    </div>
  </section>'''

page('kurumsal.html', 'Kurumsal — 1994\'ten beri | İKON Gümrük Müşavirliği', 'meta.about.title',
     '1994\'ten beri gümrük müşavirliği: İKON\'un hikâyesi, vizyonu, misyonu, değerleri ve gümrük müşavirleri.',
     'meta.about.desc', 'kurumsal', H_ABOUT, 'nav-on-light')

# ============================ İLETİŞİM ============================
H_CONTACT = '''  <section class="page-hero grain">
    <div class="shell">
      <div class="page-hero__meta">
        <div class="crumbs"><a href="./" data-i18n="nav.home">Ana Sayfa</a><span>/</span><span data-i18n="nav.contact">İletişim</span></div>
        <span class="mono" style="color:var(--muted)">41.00°N · 29.03°E</span>
      </div>
      <h1 data-i18n="ct.title">Konuşalım<span style="color:var(--orange)">.</span></h1>
      <div class="page-hero__foot">
        <p class="page-hero__lead" data-i18n="ct.lead">Bir dosya, bir soru veya yeni bir iş ortaklığı... Doğru muhatap bir telefon uzağınızda. Formu doldurun; ekibimiz en kısa sürede dönsün.</p>
        <div class="page-hero__aside">
          <div class="page-hero__stat"><b>7/24</b><span data-i18n="hero.m3">Kurye &amp; evrak</span></div>
          <div class="page-hero__stat"><b>2</b><span data-i18n="ab.s3">Gümrük müşaviri</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--light" style="padding-top:clamp(36px,4.6vw,64px)">
    <div class="shell">
      <div class="contact">
        <div class="contact__info">
          <div class="contact__block">
            <h3 data-i18n="ct.address.l">Merkez ofis</h3>
            <address>Örnek Mah. Şehit Cahar Dudayev Cad.<br>Örnek İş Merkezi No:14 Kat:2<br>Ataşehir / İstanbul</address>
          </div>
          <div class="contact__block">
            <h3 data-i18n="ct.phone.l">Telefon</h3>
            <p><a href="tel:+902163240595">T +90 216 324 05 95</a><br><a href="tel:+902163249444">F +90 216 324 94 44</a></p>
            <small data-i18n="ct.phone.s">Hafta içi gümrük operasyonu · 7/24 motorlu kurye</small>
          </div>
          <div class="contact__block">
            <h3 data-i18n="ct.reach.l">Ulaşım</h3>
            <p><a class="link-arrow" href="https://maps.google.com/?q=Örnek+Mahallesi+Şehit+Cahar+Dudayev+Caddesi+Örnek+İş+Merkezi+Ataşehir+İstanbul" target="_blank" rel="noopener"><span data-i18n="ft.directions">Yol tarifi al ↗</span></a></p>
            <small data-i18n="ct.reach.s">Ataşehir merkez; TEM ve D-100 bağlantılarına yakın.</small>
          </div>
          <div class="contact__block" style="border-bottom:0">
            <h3 data-i18n="ct.note.l">Hızlı yanıt</h3>
            <p style="font-size:1rem;color:#565A62;line-height:1.6" data-i18n="ct.note.d">Formu doldurun veya doğrudan arayın. Dosyanızla ilgili ilk değerlendirmeyi aynı gün içinde paylaşırız.</p>
          </div>
        </div>

        <form class="form" id="contactForm" novalidate>
          <div class="form__row">
            <div class="field"><label for="name" data-i18n="ct.f.name">Ad Soyad *</label><input id="name" name="name" autocomplete="name" required placeholder="Adınız Soyadınız"></div>
            <div class="field"><label for="company" data-i18n="ct.f.company">Firma</label><input id="company" name="company" autocomplete="organization" placeholder="Firma adı"></div>
          </div>
          <div class="form__row">
            <div class="field"><label for="email" data-i18n="ct.f.email">E-posta *</label><input id="email" name="email" type="email" autocomplete="email" required placeholder="ad@firma.com"></div>
            <div class="field"><label for="phone" data-i18n="ct.f.phone">Telefon</label><input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="+90 ___ ___ __ __"></div>
          </div>
          <div class="field">
            <label for="subject" data-i18n="ct.f.subject">Konu *</label>
            <select id="subject" name="subject" required>
              <option value="" data-i18n="ct.f.choose">Seçiniz</option>
              <option data-i18n="sv.1.t">İthalat İşlemleri</option>
              <option data-i18n="sv.2.t">İhracat İşlemleri</option>
              <option data-i18n="sv.3.t">Bilgi İşletim Sistemi</option>
              <option data-i18n="sv.4.t">Mevzuat &amp; Teknik Danışmanlık</option>
              <option data-i18n="sv.5.t">Motorlu Kurye &amp; Evrak</option>
              <option data-i18n="sv.6.t">EDI &amp; Dijital Gümrük</option>
              <option data-i18n="ct.f.other">Diğer</option>
            </select>
          </div>
          <div class="field"><label for="message" data-i18n="ct.f.message">Mesajınız *</label><textarea id="message" name="message" rows="3" required placeholder="Eşya, ülke, dosya veya sorunuz hakkında kısa bilgi..."></textarea></div>
          <label class="check" id="kvkk"><input type="checkbox" required><span data-i18n="ct.f.kvkk">Formu göndererek, bilgilerimin yalnızca talebime dönüş amacıyla kullanılmasını kabul ediyorum.</span></label>
          <div class="form__foot">
            <small data-i18n="ct.f.required">* Zorunlu alanlar. Bilgileriniz üçüncü taraflarla paylaşılmaz.</small>
            <button class="btn" type="submit" data-magnetic><span data-i18n="ct.f.send">Gönder</span><span class="btn__ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg></span></button>
          </div>
          <div class="form__success" id="formSuccess" aria-hidden="true">
            <i><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l4 4L19 6"/></svg></i>
            <h3 data-i18n="ct.ok.t">Talebiniz alındı.</h3>
            <p data-i18n="ct.ok.d">En kısa sürede size dönüş yapacağız. Acil bir konu için +90 216 324 05 95 numarasını arayabilirsiniz.</p>
            <button class="link-arrow" type="button" id="formReset"><span data-i18n="ct.ok.reset">Yeni mesaj</span></button>
          </div>
        </form>
      </div>

      <div class="map-card" data-reveal="scale">
        <div class="map-card__copy">
          <div>
            <span class="eyebrow" data-i18n="ct.map.label">Merkez ofis</span>
            <h3 style="margin-top:14px" data-i18n="ct.map.t">Ataşehir'de, şehrin ve limanların merkezinde.</h3>
          </div>
          <div>
            <p data-i18n="ct.map.d">Örnek Mah. Şehit Cahar Dudayev Cad. Örnek İş Merkezi No:14 Kat:2, Ataşehir / İstanbul</p>
            <a class="link-arrow" style="margin-top:16px;color:var(--paper);border-color:rgba(255,255,255,.2)" href="https://maps.google.com/?q=Örnek+Mahallesi+Şehit+Cahar+Dudayev+Caddesi+Örnek+İş+Merkezi+Ataşehir+İstanbul" target="_blank" rel="noopener"><span data-i18n="ft.directions">Yol tarifi al ↗</span></a>
          </div>
        </div>
        <div class="map-card__viz">
          <img src="assets/img/map-istanbul.webp" width="1600" height="800" alt="Ataşehir ve çevresi haritası" loading="lazy" decoding="async">
          <div class="map-card__pin"><span>İKON · ATAŞEHİR</span><i></i></div>
          <span class="map-card__coords">40.9923°N · 29.1244°E · © OpenStreetMap</span>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--light" style="padding-top:0;padding-bottom:clamp(48px,6vw,80px)">
    <div class="shell"><div class="strip">
      <q data-i18n="ct.strip">Telefonla ulaşmak daha mı hızlı? <em>+90 216 324 05 95</em></q>
      <span data-i18n="ct.strip.note">Hafta içi gümrük operasyonu</span>
    </div></div>
  </section>'''

page('iletisim.html', 'İletişim — İKON Gümrük Müşavirliği', 'meta.contact.title',
     'İKON Gümrük Müşavirlik Hizmetleri: Ataşehir, İstanbul. Telefon +90 216 324 05 95. Teklif ve danışmanlık için iletişim formu.',
     'meta.contact.desc', 'iletisim', H_CONTACT)
