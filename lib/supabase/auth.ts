import { supabase } from "@/lib/supabase/client";
import { signOutAction } from "@/lib/actions/auth";

export async function signInWithGoogle(returnUrl?: string) {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const callbackUrl = new URL("/api/auth/callback", origin);

  if (returnUrl) {
    callbackUrl.searchParams.set("next", returnUrl);
  }

  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl.toString(),
    },
  });
}

export async function signOut(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Client Supabase signOut error:", error);
  }

  try {
    window.localStorage.clear();
    window.sessionStorage.clear();
  } catch (error) {
    console.error("Storage clear error:", error);
  }

  try {
    await signOutAction();
  } catch (error) {
    console.error("Server signOutAction error:", error);
  }

  // Force clean browser navigation to purge in-memory React state and router cache
  window.location.href = "/";
}

export function storeReturnUrl(path: string): void {
  window.localStorage.setItem("returnUrl", path);
}