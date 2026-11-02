# CaCHI コーポレートサイト

株式会社CaCHI（https://cachi.jp/）のコーポレートサイトです。静的HTML＋お問い合わせ用のVercel Function だけで構成しています。

```
index.html          … サイト本体（1ページ）
images/             … 画像（webp）
logo.png            … ファビコン
api/contact.js      … お問い合わせフォームの送信（Resend でメール送信）
vercel.json         … Vercel 設定
```

## 公開手順（Vercel）

1. Vercel で **Add New → Project** からこのリポジトリ（`cachi-hp`）を Import し、設定は変えずに **Deploy**
   - Framework Preset は「Other」のままで構いません（ビルド不要）
2. **Settings → Environment Variables** に以下を登録して再デプロイ
   | 名前 | 値 |
   | --- | --- |
   | `RESEND_API_KEY` | Resend の API キー |
   | `CONTACT_TO` | お問い合わせの受信アドレス（複数はカンマ区切り） |
   | `CONTACT_FROM` | 送信元。例 `CaCHI <noreply@cachi.jp>`（Resend で cachi.jp を認証済みであること） |
3. 発行された `*.vercel.app` の URL で表示とフォーム送信を確認

## 独自ドメイン（cachi.jp／お名前.com）

1. Vercel の **Settings → Domains** で `cachi.jp` と `www.cachi.jp` を追加（`www` は `cachi.jp` へリダイレクト）
2. お名前.com の **DNS設定** で次の2行だけ変更（Vercel の画面に表示される値を優先）
   | ホスト名 | TYPE | VALUE |
   | --- | --- | --- |
   | （空欄＝cachi.jp） | A | `76.76.21.21` |
   | www | CNAME | `cname.vercel-dns.com` |
3. MX（メール）や TXT のレコードは変更しないでください
4. 反映後、Vercel の Domains 画面で両方に Valid Configuration が出れば完了（SSL は自動）

## 検索に表示させる（Google Search Console）

サイト側の準備（タイトル・説明文・構造化データ・`robots.txt`・`sitemap.xml`）は済んでいます。cachi.jp で公開した後に以下を行います。

1. https://search.google.com/search-console で **プロパティを追加 → ドメイン** に `cachi.jp` を入力
2. 表示された `google-site-verification=...` の TXT レコードを、お名前.com の DNS設定に追加して「確認」
3. 左メニュー **サイトマップ** に `sitemap.xml` を送信
4. **URL検査** で `https://cachi.jp/` を入力し「インデックス登録をリクエスト」

※ 反映には数日〜数週間かかります。「株式会社CaCHI」「CaCHI カチ」などの社名検索から先に表示されるのが一般的です。
