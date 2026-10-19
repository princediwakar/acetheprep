// Path: lib/actions/auth.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function signOutAction(): Promise<{ success: boolean }> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Server signOutAction error:", error);
  }

  // Purge the full layout and server component tree cache
  revalidatePath("/", "layout");

  return { success: true };
}
