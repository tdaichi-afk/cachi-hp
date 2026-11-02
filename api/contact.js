// お問い合わせフォームの送信先（Vercel Serverless Function）
// 必要な環境変数: RESEND_API_KEY, CONTACT_TO（受信アドレス）, CONTACT_FROM（例: CaCHI <noreply@cachi.jp>）
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  if (b.website) return res.status(200).json({ ok: true }); // bot
  const required = ["topic", "company", "name", "email"];
  if (required.some((k) => !String(b[k] || "").trim()) || !/^\S+@\S+\.\S+$/.test(b.email) || String(b.body || "").length > 5000)
    return res.status(400).json({ error: "入力内容を確認してください" });

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) return res.status(500).json({ error: "送信設定が未完了です" });

  const rows = [["種類", b.topic], ["会社名", b.company], ["お名前", b.name], ["メール", b.email], ["電話番号", b.tel || "-"]];
  const html = `<h2>HPからのお問い合わせ</h2><table cellpadding="6">${rows.map(([k, v]) => `<tr><th align="left">${k}</th><td>${esc(v)}</td></tr>`).join("")}</table><p style="white-space:pre-wrap">${esc(b.body)}</p>`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: CONTACT_FROM, to: CONTACT_TO.split(",").map((s) => s.trim()), reply_to: b.email, subject: `【HPお問い合わせ】${b.topic}／${b.company} ${b.name}様`, html }),
  });
  if (!r.ok) return res.status(502).json({ error: "送信に失敗しました" });
  return res.status(200).json({ ok: true });
};
