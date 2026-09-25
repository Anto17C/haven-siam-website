#!/usr/bin/env bash
# Submit every URL in sitemap.xml to IndexNow (Bing, Yandex, Naver, Seznam...).
# Run after deploying. Requires the key file to be live at https://havensiam.com/<key>.txt
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="havensiam.com"
KEY="5d5b392f35533711ffaafe597d2e7684"

curl -sfI "https://$HOST/$KEY.txt" >/dev/null || { echo "Key file not live yet at https://$HOST/$KEY.txt - deploy first."; exit 1; }

URLS=$(grep -o '<loc>[^<]*</loc>' sitemap.xml | sed 's/<[^>]*>//g' | sed 's/.*/"&"/' | paste -sd, -)

curl -s -o /dev/null -w "IndexNow HTTP %{http_code}\n" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/$KEY.txt\",\"urlList\":[$URLS]}"
