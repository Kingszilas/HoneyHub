import { supabase } from "@/lib/supabaseClient";

interface FetchOptions extends RequestInit {
  json?: any;
}

export async function fetchWithAuth(url: string, options: FetchOptions = {}) {
  // Session lekérése
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Nincs érvényes felhasználói session.");
  }

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    "Authorization": `Bearer ${session.access_token}`,
  };

  const res = await fetch(url, {
    ...options,
    headers,
    body: options.json ? JSON.stringify(options.json) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || "Hiba a fetch során");
  }

  return res.json();
}
