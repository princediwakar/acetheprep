import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { TUTOR_ROUTES } from "@/lib/constants/tutor";
import { getDueComebacks, type ComebackItem } from "@/lib/comeback-queue";
import { hydrateDueComebacks } from "@/lib/services/comeback-hydration";
import { ZeroClickDrillView } from "@/components/error-log/ZeroClickDrillView";
import type { ExamProfile } from "@/types/tutor";

export const metadata: Metadata = {
  title: "Mistake Vault | AceThePrep",
  description: "Targeted active recall to calibrate past errors and reinforce your mental model against test-day traps.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MistakesPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  // Fetch active exam profile
  const { data: profile, error: profileErr } = await supabase
    .from("exam_profiles")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (profileErr || !profile) {
    redirect(TUTOR_ROUTES.SETUP);
  }

  const activeProfile = profile as ExamProfile;

  // Partitioned due comebacks exclusively for this active exam profile
  const dueItems = await getDueComebacks(
    supabase,
    user.id,
    activeProfile.profile_id
  ).catch(() => [] as ComebackItem[]);

  const hydratedTraps = await hydrateDueComebacks(
    dueItems,
    activeProfile.exam_name
  );

  return (
    <ZeroClickDrillView
      initialTraps={hydratedTraps}
      examName={activeProfile.exam_name}
    />
  );
}
