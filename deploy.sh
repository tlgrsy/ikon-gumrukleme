#!/usr/bin/env bash
# Yerel değişiklikleri commit'leyip GitHub'a gönderir.
# Push sonrası .github/workflows/deploy-hostinger.yml Hostinger'a otomatik yükler.
set -euo pipefail
cd "$(dirname "$0")"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Bu klasör bir git deposu değil." >&2
  exit 1
fi

msg="${1:-Site güncellemesi}"
git add -A
if git diff --cached --quiet; then
  echo "Commit edilecek değişiklik yok."
else
  git commit -m "$msg"
fi
git push origin main
echo "✓ GitHub'a gönderildi. Hostinger deploy Actions sekmesinde ilerliyor."
