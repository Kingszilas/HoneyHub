"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function ConfirmInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Ellenőrzés folyamatban...");

  useEffect(() => {
    const token_hash = searchParams.get("token_hash") || "";
    const type = (searchParams.get("type") as "email" | "recovery") || "email";

    const verify = async () => {
      if (!token_hash) {
        // ha nincs token, nézzük, hogy már be van-e lépve
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          setStatus("E-mail már megerősítve! Üdv újra 🌸");
          setTimeout(() => router.push("/"), 2500);
        } else {
          setStatus("Hiányzó token. Próbáld újra a regisztrációt.");
        }
        return;
      }

      const { error } = await supabase.auth.verifyOtp({ type, token_hash });

      if (error) {
        console.error("Supabase verify error:", error);
        setStatus("Hiba történt a megerősítés során. Próbáld újra a regisztrációt.");
      } else {
        setStatus("E-mail megerősítve! Átirányítás...");
        setTimeout(() => router.push("/auth/login"), 2500);
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg text-center">
      <h1 className="text-xl font-bold mb-4">Fiók megerősítése</h1>
      <p>{status}</p>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Ellenőrzés folyamatban...</div>}>
      <ConfirmInner />
    </Suspense>
  );
}
