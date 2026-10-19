// Path: lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))
  ? rawUrl
  : "https://placeholder.supabase.co";

export const supabase = createBrowserClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
);