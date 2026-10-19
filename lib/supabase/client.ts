// Path: lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))
  ? rawUrl
  : "https://placeholder.supabase.co";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'placeholder-anon-key';

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseKey
);