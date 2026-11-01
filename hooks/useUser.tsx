'use client'
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import { identifyUser, resetUser } from "@/lib/telemetry";

const INTERNAL_EMAILS = new Set([
	"princediwakar25@gmail.com",
	"mental.alternate@gmail.com",
	"rawkindepic@gmail.com",
	"princediwakar.cjs@gmail.com",
	"neurovisionranchi@gmail.com",
	"prince@supersite.app",
]);

export function useUser() {
	const [user, setUser] = useState<User | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [isUserLoading, setIsUserLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;

		const getSession = async () => {
			setIsUserLoading(true);
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession();
				if (!cancelled) {
					setSessionState(session);
				}
			} catch {
				if (!cancelled) {
					setIsUserLoading(false);
				}
			}
		};

		getSession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(
			(event, session) => {
				if (event === "SIGNED_OUT") {
					resetUser();
				}
				setSessionState(session);
			}
		);

		function setSessionState(session: Session | null) {
			if (cancelled) return;
			const currentUser = session?.user ?? null;
			setUser(currentUser);
			setAccessToken(session?.access_token ?? null);
			setIsUserLoading(false);

			if (currentUser) {
				const isInternal = Boolean(
					currentUser.email &&
					INTERNAL_EMAILS.has(currentUser.email.toLowerCase())
				);
				identifyUser(currentUser.id, {
					email: currentUser.email,
					is_internal: isInternal,
				});
			}
		}

		return () => {
			cancelled = true;
			subscription.unsubscribe();
		};
	}, []);

	return { user, accessToken, isUserLoading };
}