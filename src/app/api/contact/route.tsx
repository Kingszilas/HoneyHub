import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>", // Ez lehet pl. noreply@domain.com
      to: "szilard.kiraly@gmail.com", // ide kapod az üzenetet
      subject: `New message from ${name}`,
      replyTo: email,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Email sending failed" }, { status: 500 });
  }
}
