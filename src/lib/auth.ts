import type { AuthResponse } from "@/lib/api/types";

const SESSION_KEY = "eg_session";
const ONBOARDING_PROFILE_KEY = "eg_onboarding_profile";

/** Persisted client session after login/signup API. */
export type Session = {
  user_id: number;
  email: string;
  is_onboarded: boolean;
};

/** Matches backend onboarding record. */
export type OnboardingProfile = {
  full_name: string;
  age: number;
  gender: string;
  city: string;
  typical_bp_systolic: number;
  typical_bp_diastolic: number;
  typical_heart_rate: number;
  known_diseases: string;
  current_medications: string;
  emergency_contact_email: string;
  id: number;
  user_id: number;
};

function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<Session>;
    if (
      typeof data.user_id !== "number" ||
      typeof data.email !== "string" ||
      typeof data.is_onboarded !== "boolean"
    ) {
      return null;
    }
    return {
      user_id: data.user_id,
      email: data.email,
      is_onboarded: data.is_onboarded,
    };
  } catch {
    return null;
  }
}

export function getSession(): Session | null {
  return readSession();
}

export function getSessionEmail(): string | null {
  return readSession()?.email ?? null;
}

export function getSessionUserId(): number {
  return readSession()?.user_id ?? 0;
}

export function isSignedIn(): boolean {
  const s = readSession();
  return s !== null && s.user_id > 0;
}

export function persistSession(session: Session): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function persistSessionFromAuthResponse(auth: AuthResponse): void {
  persistSession({
    user_id: auth.user_id,
    email: auth.email,
    is_onboarded: auth.is_onboarded,
  });
}

/** Mark user as onboarded locally (after POST /api/onboarding succeeds). */
export function setOnboardingComplete(): void {
  const s = readSession();
  if (!s) return;
  persistSession({ ...s, is_onboarded: true });
}

export function isOnboardingComplete(): boolean {
  return readSession()?.is_onboarded === true;
}

export function signOut(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(ONBOARDING_PROFILE_KEY);
}

export function getOnboardingProfile(): OnboardingProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ONBOARDING_PROFILE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<OnboardingProfile>;
    if (typeof data.full_name !== "string") return null;
    return {
      full_name: data.full_name,
      age: typeof data.age === "number" ? data.age : Number(data.age) || 0,
      gender: typeof data.gender === "string" ? data.gender : "",
      city: typeof data.city === "string" ? data.city : "",
      typical_bp_systolic:
        typeof data.typical_bp_systolic === "number"
          ? data.typical_bp_systolic
          : Number(data.typical_bp_systolic) || 0,
      typical_bp_diastolic:
        typeof data.typical_bp_diastolic === "number"
          ? data.typical_bp_diastolic
          : Number(data.typical_bp_diastolic) || 0,
      typical_heart_rate:
        typeof data.typical_heart_rate === "number"
          ? data.typical_heart_rate
          : Number(data.typical_heart_rate) || 0,
      known_diseases: typeof data.known_diseases === "string" ? data.known_diseases : "",
      current_medications:
        typeof data.current_medications === "string" ? data.current_medications : "",
      emergency_contact_email:
        typeof data.emergency_contact_email === "string" ? data.emergency_contact_email : "",
      id: typeof data.id === "number" ? data.id : Number(data.id) || 0,
      user_id: typeof data.user_id === "number" ? data.user_id : Number(data.user_id) || 0,
    };
  } catch {
    return null;
  }
}

export function setOnboardingProfile(profile: OnboardingProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARDING_PROFILE_KEY, JSON.stringify(profile));
}
