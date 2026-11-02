# CaCHI コーポレートサイト

株式会社CaCHI（https://cachi.jp/）のコーポレートサイトです。ビルド不要の静的HTMLで、Netlify で公開します。

```
index.html          … サイト本体（1ページ）
images/             … 画像（webp）
logo.png            … ファビコン
robots.txt / sitemap.xml … 検索エンジン向け
netlify.toml        … Netlify 設定
```

## 公開手順（cachi.jp が紐づいている既存の Netlify サイトを使う）

ドメインはすでに Netlify につながっているので、DNS の変更は不要です。

1. Netlify で cachi.jp のサイトを開き、**Site configuration → Build & deploy → Continuous deployment → Link repository**（すでに別のリポジトリにつながっている場合は **Manage repository → Link to a different repository**）
2. GitHub の `tdaichi-afk/cachi-hp` を選び、Branch は `main`、Build command は空欄、Publish directory は `.` のまま保存
3. **Deploys** で最新のデプロイが Published になれば cachi.jp に反映
   - 先に確認したい場合は、新しいサイトとして Import して `*.netlify.app` で確認 → OK なら上の手順で本番サイトに切り替え

## お問い合わせフォーム（Netlify Forms）

フォームは Netlify Forms で受け付けます（追加のサービスやキーは不要）。

1. 初回デプロイ後、**Forms** に `contact` が表示されることを確認（出ない場合は **Forms → Enable form detection** を押して再デプロイ）
2. **Site configuration → Notifications → Emails and webhooks → Form submission notifications → Add notification → Email notification** で受信アドレスを登録
3. サイトからテスト送信し、メールが届くことを確認

## 検索に表示させる（Google Search Console）

サイト側の準備（タイトル・説明文・構造化データ・`robots.txt`・`sitemap.xml`）は済んでいます。cachi.jp で公開した後に以下を行います。

1. https://search.google.com/search-console で **プロパティを追加 → ドメイン** に `cachi.jp` を入力
2. 表示された `google-site-verification=...` の TXT レコードを、お名前.com の DNS設定に追加して「確認」
3. 左メニュー **サイトマップ** に `sitemap.xml` を送信
4. **URL検査** で `https://cachi.jp/` を入力し「インデックス登録をリクエスト」

※ 反映には数日〜数週間かかります。「株式会社CaCHI」「CaCHI カチ」などの社名検索から先に表示されるのが一般的です。
