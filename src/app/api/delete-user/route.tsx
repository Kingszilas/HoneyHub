import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // csak szerver oldalon!
);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    // 1. Profil törlése
    await supabaseAdmin.from("profiles").delete().eq("id", userId);

    // 2. Rendelések anonim formázása (user_id nullázása)
    await supabaseAdmin.from("orders").update({ user_id: null }).eq("user_id", userId);

    // 3. Felhasználó törlése az auth-ból
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
