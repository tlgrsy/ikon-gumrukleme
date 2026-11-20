# GitHub → Hostinger Yayın Akışı

Bu proje statik bir sitedir; derleme adımı yoktur. `main` dalına yapılan her push,
GitHub Actions üzerinden Hostinger'a otomatik yüklenir.

## 1. GitHub deposu

Depo: **`tlgrsy/ikon-gumrukleme`** (önerilen ad)

- Boş bir depo oluşturun (README/`.gitignore` eklemeden): <https://github.com/new?name=ikon-gumrukleme>
- Görünürlük: **Public** önerilir. Private seçilirse Hostinger'ın Git özelliği için deploy key,
  Actions için ise FTP bilgileri (aşağıdaki secrets) gerekir; FTP yöntemi her iki durumda da çalışır.

İlk push:

```bash
git remote add origin git@github.com:tlgrsy/ikon-gumrukleme.git
git branch -M main
git push -u origin main
```

## 2. Hostinger FTP bilgileri

Hostinger hPanel → **Dosyalar → FTP Hesapları**:

| Alan | Değer |
| --- | --- |
| FTP sunucusu | Genellikle `ftp.alanadiniz.com` veya sunucu IP'si |
| Kullanıcı adı | FTP hesabı |
| Şifre | FTP şifresi |
| Hedef klasör | `/public_html/` (ana alan adı) |

## 3. GitHub Secrets

Depo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Örnek | Açıklama |
| --- | --- | --- |
| `FTP_SERVER` | `ftp.ikongumrukleme.com` | FTP sunucu adresi |
| `FTP_USERNAME` | `u123456789` | FTP kullanıcısı |
| `FTP_PASSWORD` | — | FTP şifresi |
| `FTP_SERVER_DIR` | `/public_html/` | İsteğe bağlı; boş bırakılırsa `/public_html/` kullanılır |

> FTP şifresini sohbete yazmayın; yalnızca GitHub Secrets'a ekleyin.

## 4. Otomatik yayın

- `main` dalına push → **Actions → Deploy to Hostinger** otomatik çalışır.
- Actions sekmesinden **Run workflow** ile manuel de tetiklenebilir.
- İlk çalıştırmada tüm dosyalar, sonraki çalıştırmalarda yalnızca değişenler yüklenir.

Yerel değişiklikleri tek komutla göndermek için:

```bash
./deploy.sh "Hizmetler sayfası güncellendi"
```

## 5. Alternatif: Hostinger hPanel Git deploy

Hostinger → **Gelişmiş → Git**:

1. GitHub hesabını bağlayın, `ikon-gumrukleme` deposunu ve `main` dalını seçin.
2. Yayın dizini: `public_html`.
3. **Deploy** ile çekin. Otomatik çekim seçeneği varsa etkinleştirin.

Not: Bu yöntem depodaki **tüm** dosyaları (ör. `preview/`, `tools/`, `.github/`) yayına dahil eder.
Daha temiz bir yayın için FTP + Actions akışı önerilir.

## 6. Yayın sonrası kontrol listesi

- [ ] Alan adı `https://www.ikongumrukleme.com` ise `sitemap.xml`, `robots.txt` ve JSON-LD güncel.
- [ ] Hostinger SSL (Let's Encrypt) aktif; HTTP → HTTPS yönlendirmesi açık.
- [ ] `preview/` ve `tools/` dizinleri canlıda görünmüyor.
- [ ] Form backend'e bağlandı (Formspree / Netlify Forms / kendi API).
- [ ] `ATTRIBUTIONS.md` lisans notları korundu veya fotoğraflar kurumsal çekimlerle değiştirildi.
- [ ] Hostinger önbelleği temizlendi (varsa CDN/cache).

## 7. Geri alma

Hostinger'da dosyaların yedeği alınmışsa hPanel → **Dosyalar → Yedekler** üzerinden geri dönülebilir.
Git tarafında ise:

```bash
git revert <commit>
git push origin main
```
