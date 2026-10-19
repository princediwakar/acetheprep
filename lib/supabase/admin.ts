import { createClient } from '@supabase/supabase-js';

// if (typeof window !== 'undefined') {
//   throw new Error('supabaseAdmin should only be initialized on the server');
// }


const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))
  ? rawUrl
  : "https://placeholder.supabase.co";

export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key"
);