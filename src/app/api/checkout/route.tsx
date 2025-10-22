import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabaseClient";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { items, userId, shipping, billing } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "A rendeléshez bejelentkezés szükséges." },
        { status: 401 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Nincs termék a kosárban." },
        { status: 400 }
      );
    }

    if (!shipping || !shipping.name || !shipping.email || !shipping.phone) {
      return NextResponse.json(
        { error: "Hiányzó szállítási adatok." },
        { status: 400 }
      );
    }

    if (!billing || !billing.name || !billing.email || !billing.phone) {
      return NextResponse.json(
        { error: "Hiányzó számlázási adatok." },
        { status: 400 }
      );
    }

    // --- Összeg kiszámítása ---
    const total = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // --- Új order létrehozása ---
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: userId,
          total_amount: total,
          status: "Beérkezett",
          shipping: shipping,        // frontendből jövő szállítási adatok
          billing_address: billing,  // frontendből jövő számlázási adatok
          created_when: new Date(),
          updated_when: new Date(),
        },
      ])
      .select("id")
      .single();

    if (orderError || !orderData) {
      console.error("Order insert error:", orderError);
      throw orderError || new Error("Order insert failed");
    }

    const orderId = orderData.id;

    // --- Order items beszúrása ---
    const orderItemsPayload = items.map((item: any) => ({
      order_id: orderId,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
      created_when: new Date(),
      updated_when: new Date(),
    }));

    const { error: orderItemsError } = await supabase
      .from("order_items")
      .insert(orderItemsPayload);

    if (orderItemsError) {
      console.error("Order items insert error:", orderItemsError);
      throw orderItemsError;
    }

    // --- Email küldés ---
    const itemsHtml = items
      .map(
        (item: any) =>
          `<tr>
            <td style="padding:4px 8px;">${item.name}</td>
            <td style="padding:4px 8px; text-align:center;">${item.quantity}</td>
            <td style="padding:4px 8px; text-align:right;">${item.price.toLocaleString("hu-HU")} Ft</td>
            <td style="padding:4px 8px; text-align:right;">${(item.price * item.quantity).toLocaleString("hu-HU")} Ft</td>
          </tr>`
      )
      .join("");

    const htmlMessage = `
      <h2>Új rendelés érkezett!</h2>

      <h3>Számlázási adatok:</h3>
      <p><strong>Név:</strong> ${billing.name}</p>
      <p><strong>E-mail:</strong> ${billing.email}</p>
      <p><strong>Telefonszám:</strong> ${billing.phone}</p>
      <p><strong>Cím:</strong> ${billing.postal_code} ${billing.city}, ${billing.street} ${billing.house_number}</p>

      <h3>Szállítási adatok:</h3>
      <p><strong>Név:</strong> ${shipping.name}</p>
      <p><strong>E-mail:</strong> ${shipping.email}</p>
      <p><strong>Telefonszám:</strong> ${shipping.phone}</p>
      <p><strong>Cím:</strong> ${shipping.postal_code} ${shipping.city}, ${shipping.street} ${shipping.house_number}</p>

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
    `;

    await resend.emails.send({
      from: "Website Orders <onboarding@resend.dev>",
      to: "szilard.kiraly@gmail.com",
      subject: `Új rendelés ${shipping.name} részéről`,
      replyTo: shipping.email,
      html: htmlMessage,
    });

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    console.error("Checkout failed:", err);
    return NextResponse.json(
      { error: "Checkout failed", details: err },
      { status: 500 }
    );
  }
}
