import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const isRealUrl = Boolean(
  rawUrl &&
  (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) &&
  !rawUrl.includes("placeholder")
);

const serviceKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const isRealKey = Boolean(
  serviceKey &&
  serviceKey !== "[SENSITIVE]" &&
  serviceKey !== "placeholder-key"
);

export const isSupabaseConfigured = isRealUrl && isRealKey;

const supabaseUrl = isRealUrl ? rawUrl! : "https://placeholder.supabase.co";

export const supabaseAdmin = createClient(
  supabaseUrl,
  isRealKey ? serviceKey! : "placeholder-key"
);