import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: false,        // <--- EZ A FONTOS!!!
      autoRefreshToken: false,      // opcionális (ne frissítse magát örökké)
      detectSessionInUrl: true,
    }
  }
);
