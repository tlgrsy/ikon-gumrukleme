# İKON Gümrük Müşavirliği — Kurumsal Web Sitesi

Awwwards referanslı, çok sayfalı, Türkçe/İngilizce kurumsal web sitesi tasarımı.
Tasarım yönü **“Signal & Steel”**: derin lacivert-siyah zemin, kâğıt dokulu açık bölümler,
lojistik sektörünün hi-vis sinyal turuncusu ve editoryal tipografi.

> **Hızlı bakış:** 4 sayfa · TR/EN dil geçişi · özel animasyon katmanı · canlı dünya haritası ·
> erişilebilir form ve akordeonlar · harici JS kütüphanesi yok.

---

## Çalıştırma

Kök dizinde basit bir statik sunucu yeterli:

```bash
python3 -m http.server 4321
# http://127.0.0.1:4321
```

`index.html` doğrudan (`file://`) da açılabilir; ancak harita katmanı ve göreli yollar için
sunucu üzerinden açmak önerilir.

## Sayfalar

| Sayfa | İçerik |
| --- | --- |
| `index.html` | Sinematik hero, manifesto (scroll ile aydınlanan metin), hizmet listesi (hover önizlemeli), 5 adımlı süreç, canlı ağ haritası, turuncu rakam bandı, SSS, CTA, footer |
| `hizmetler.html` | 6 hizmet bloğu; sabit yan menü + scroll spy, kontrol listeleri, uzman notları |
| `kurumsal.html` | 1994 hikâyesi, kronoloji, vizyon/misyon, üç seviyeli kalite, ekip, ISO/EDI şeridi |
| `iletisim.html` | İletişim bilgileri, doğrulamalı form + başarı durumu, Ataşehir haritası |

## Tasarım sistemi

- **Renk:** `--ink #070A0F`, `--paper #F2EFE9`, `--orange #FF5A1F`, `--navy #1E3FAE`
- **Tipografi:** Outfit (200–600, display + metin) · Instrument Serif Italic (marka ve vurgular) · JetBrains Mono (etiketler)
- **Grid:** 12 kolon, `max-width: 1680px`, akışkan gutter; 44px yuvarlatılmış bölüm geçişleri
- **Motion:** `cubic-bezier(.16,1,.3,1)`; maskeli satır açılışları, IntersectionObserver reveal,
  imleç takibi, manyetik butonlar, paralaks, sayaçlar, marquee, scroll ilerleme çubuğu

## Öne çıkan etkileşimler

- **Preloader:** yüzde sayacı + marka; oturum içi tekrar ziyaretlerde kısalır (`sessionStorage`).
- **Dünya haritası:** GeoJSON’dan üretilmiş ~8.900 noktalı, canvas üzerinde çizilen harita;
  İstanbul merkezli animasyonlu rotalar. Veri: `assets/js/world-dots.js`.
- **Hizmet önizlemesi:** satır hover’ında imleci takip eden görsel kart (yalnızca pointer cihazlarda).
- **Dil:** `data-i18n` anahtarları; Türkçe HTML’de, İngilizce `assets/js/i18n.js` sözlüğünde.
  Seçim `localStorage` ve `?lang=en` ile korunur.
- **Form:** istemci tarafı doğrulama, `aria-live` başarı paneli; **backend yoktur**.

## Erişilebilirlik & performans

- `skip` bağlantısı, görünür odak halkaları, ARIA durumları (menü, akordeon, dil, form),
  `prefers-reduced-motion` desteği.
- Tüm görseller `width/height`, `loading="lazy"` (hero hariç), WebP + JPEG fallback.
- Kendi barındırılan WOFF2 alt kümeleri; harici font isteği yok.
- Konsolda hata yok; 390px–1440px arasında yatay taşma yok.

## Dosya yapısı

```
.
├── index.html / hizmetler.html / kurumsal.html / iletisim.html
├── assets/
│   ├── css/style.css        # tüm tasarım sistemi + sayfa stilleri + responsive
│   ├── js/main.js           # etkileşim katmanı
│   ├── js/i18n.js           # TR/EN sözlük ve değiştirici
│   ├── js/world-dots.js     # dünya haritası nokta verisi
│   ├── fonts/               # Outfit, Instrument Serif, JetBrains Mono (subset)
│   └── img/                 # optimize edilmiş görseller + favicon + og.jpg
├── tools/                   # üretim / ekran görüntüsü / QA yardımcıları
├── ATTRIBUTIONS.md          # görsel lisansları
├── robots.txt · sitemap.xml
```

## İçerik kaynağı

Tüm firma bilgileri ekli **İKON TANITIM.pdf** (2013) dosyasından alınmıştır:
1994 kuruluşu, adres, telefon/faks, ISO 9001/2000, EDI geçişi, ithalat/ihracat adımları,
bilgi işletim sistemi, motorlu kurye, vizyon/misyon ve gümrük müşavirleri.

**Yayına almadan önce:**
1. Formu bir backend’e bağlayın (Formspree, Netlify Forms veya kendi API’niz) ve KVKK metnini ekleyin.
2. `ATTRIBUTIONS.md`’deki CC lisanslı fotoğrafları kurumsal çekimlerle değiştirin veya atfı koruyun.
3. Telefon/e-posta ve çalışma saatlerini teyit edin; kurumsal e-posta adresi ekleyin.
4. Alan adını `sitemap.xml`, `robots.txt` ve JSON-LD içinde güncelleyin.

## Tarayıcı desteği

Chrome/Edge 111+, Safari 16.4+, Firefox 113+ (`aspect-ratio`, `backdrop-filter`, `clip-path`, `svh` desteklenir). JavaScript kapalıyken içerik
Türkçe olarak okunabilir kalır.

---

Tasarım prototipi · 2026 · İKON Gümrük Müşavirlik Hizmetleri Ltd. Şti.
