/** Auth — POST /api/auth/signup | /api/auth/login */
export type AuthRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user_id: number;
  email: string;
  is_onboarded: boolean;
};

/** POST /api/onboarding — body (user_id passed as query param). */
export type OnboardingCreateBody = {
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
};

/** POST /api/onboarding/me — full record */
export type OnboardingMeResponse = {
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
