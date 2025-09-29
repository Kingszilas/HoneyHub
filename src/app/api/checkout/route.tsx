import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, items } = await req.json();

    // Ellenőrzés: items tömb-e
    if (!items || !Array.isArray(items) || items.length === 0) {
      return new NextResponse(JSON.stringify({ error: "Items are missing" }), { status: 400 });
    }

    // Összesen kiszámítása
    const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    // HTML táblázat formátum a rendeléshez
    const itemsHtml = items
      .map(
        (item: any) =>
          `<tr>
            <td style="padding: 4px 8px;">${item.name}</td>
            <td style="padding: 4px 8px; text-align:center;">${item.quantity}</td>
            <td style="padding: 4px 8px; text-align:right;">${item.price.toLocaleString("hu-HU")} Ft</td>
            <td style="padding: 4px 8px; text-align:right;">${(item.price * item.quantity).toLocaleString("hu-HU")} Ft</td>
          </tr>`
      )
      .join("");

    const htmlMessage = `
      <h2>Új rendelés érkezett!</h2>
      <p><strong>Név:</strong> ${name}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefonszám:</strong> ${phone}</p>
      <h3>Rendelés részletei:</h3>
      <table border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Termék</th>
            <th>Mennyiség</th>
            <th>Ár / db</th>
            <th>Összesen</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="text-align:right; padding: 4px 8px;"><strong>Összesen:</strong></td>
            <td style="padding: 4px 8px; text-align:right;"><strong>${total.toLocaleString("hu-HU")} Ft</strong></td>
          </tr>
        </tfoot>
      </table>
      <p>Kérjük, vegyék fel a kapcsolatot a vásárlóval a rendelés visszaigazolásához.</p>
    `;

    await resend.emails.send({
      from: "Website Orders <onboarding@resend.dev>",
      to: "szilard.kiraly@gmail.com",
      subject: `Új rendelés ${name} részéről`,
      replyTo: email,
      html: htmlMessage, // HTML formátumban küldjük
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Email sending failed" }, { status: 500 });
  }
}
