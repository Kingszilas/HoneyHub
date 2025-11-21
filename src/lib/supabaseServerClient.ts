import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const supabaseServerClient = (cookieHeader?: string) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          if (!cookieHeader) return null;
          const match = cookieHeader.split("; ").find(c => c.startsWith(`${name}=`));
          return match?.split("=")[1] ?? null;
        },
        set() {},
        remove() {},
      },
    }
  );
};
