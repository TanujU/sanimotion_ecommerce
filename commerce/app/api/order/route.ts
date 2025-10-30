import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { toEmail, subject, text, html } = body || {};

    // If SMTP env vars exist, send real email; otherwise, noop
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (host && user && pass) {
      const nodemailer = await import("nodemailer").then((m) => m.default || (m as any));
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || user,
        to: toEmail,
        subject: subject || "Order Confirmation",
        text: text || "Your order has been placed successfully.",
        html:
          html ||
          `<p>Thank you for your order.</p><p>We have received it and will process it shortly.</p>`,
      });
    } else {
      console.log("[ORDER EMAIL MOCK]", body);
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Order email error", e);
    return NextResponse.json({ ok: false, error: e?.message || "error" }, { status: 500 });
  }
}


