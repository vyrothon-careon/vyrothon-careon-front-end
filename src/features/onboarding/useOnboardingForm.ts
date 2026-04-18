import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiError, careonApi } from "@/lib/api";
import type { OnboardingCreateBody } from "@/lib/api/types";
import {
  getOnboardingProfile,
  getSessionUserId,
  setOnboardingComplete,
  setOnboardingProfile,
  type OnboardingProfile,
} from "@/lib/auth";
import { STEPS } from "./onboarding-constants";
import { isValidEmail, parseNonNegNumber, parsePositiveInt } from "./onboarding-utils";

const STEP_COUNT = STEPS.length;

function meToProfile(me: {
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
}): OnboardingProfile {
  return { ...me };
}

export function useOnboardingForm() {
  const userId = useMemo(() => getSessionUserId(), []);

  const [step, setStep] = useState(0);
  const [activated, setActivated] = useState(false);

  const [full_name, setFullName] = useState("");
  const [ageStr, setAgeStr] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");

  const [sysStr, setSysStr] = useState("");
  const [diaStr, setDiaStr] = useState("");
  const [hrStr, setHrStr] = useState("");
  const [known_diseases, setKnownDiseases] = useState("");
  const [current_medications, setCurrentMedications] = useState("");

  const [emergency_contact_email, setEmergencyContactEmail] = useState("");

  const [confirm, setConfirm] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const [loadStatus, setLoadStatus] = useState<"idle" | "loading" | "error">("idle");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const cached = getOnboardingProfile();
    if (cached && cached.user_id === userId) {
      setFullName(cached.full_name);
      setAgeStr(cached.age > 0 ? String(cached.age) : "");
      setGender(cached.gender);
      setCity(cached.city);
      setSysStr(cached.typical_bp_systolic > 0 ? String(cached.typical_bp_systolic) : "");
      setDiaStr(cached.typical_bp_diastolic > 0 ? String(cached.typical_bp_diastolic) : "");
      setHrStr(cached.typical_heart_rate > 0 ? String(cached.typical_heart_rate) : "");
      setKnownDiseases(cached.known_diseases);
      setCurrentMedications(cached.current_medications);
      setEmergencyContactEmail(cached.emergency_contact_email);
    }

    let cancelled = false;
    setLoadStatus("loading");
    setLoadError(null);

    careonApi
      .getOnboardingMe(userId)
      .then((me) => {
        if (cancelled) return;
        const profile = meToProfile(me);
        setOnboardingProfile(profile);
        setFullName(profile.full_name);
        setAgeStr(profile.age > 0 ? String(profile.age) : "");
        setGender(profile.gender);
        setCity(profile.city);
        setSysStr(profile.typical_bp_systolic > 0 ? String(profile.typical_bp_systolic) : "");
        setDiaStr(profile.typical_bp_diastolic > 0 ? String(profile.typical_bp_diastolic) : "");
        setHrStr(profile.typical_heart_rate > 0 ? String(profile.typical_heart_rate) : "");
        setKnownDiseases(profile.known_diseases);
        setCurrentMedications(profile.current_medications);
        setEmergencyContactEmail(profile.emergency_contact_email);
        setLoadStatus("idle");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof ApiError && (err.status === 404 || err.status === 400)) {
          setLoadStatus("idle");
          return;
        }
        const message = err instanceof ApiError ? err.message : "Could not load profile.";
        setLoadError(message);
        setLoadStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const payload: OnboardingProfile = useMemo(
    () => ({
      full_name: full_name.trim(),
      age: parsePositiveInt(ageStr) ?? 0,
      gender,
      city: city.trim(),
      typical_bp_systolic: parseNonNegNumber(sysStr),
      typical_bp_diastolic: parseNonNegNumber(diaStr),
      typical_heart_rate: parseNonNegNumber(hrStr),
      known_diseases: known_diseases.trim(),
      current_medications: current_medications.trim(),
      emergency_contact_email: emergency_contact_email.trim().toLowerCase(),
      id: 0,
      user_id: userId,
    }),
    [
      full_name,
      ageStr,
      gender,
      city,
      sysStr,
      diaStr,
      hrStr,
      known_diseases,
      current_medications,
      emergency_contact_email,
      userId,
    ],
  );

  const validateStep = useCallback(
    (s: number): string | null => {
      if (s === 0) {
        if (!full_name.trim()) return "Please enter the patient’s full name.";
        const age = parsePositiveInt(ageStr);
        if (age === null || age < 1 || age > 130) return "Please enter a valid age.";
        if (!gender) return "Please select a gender.";
        if (!city.trim()) return "Please enter a city.";
      }
      if (s === 1) {
        if (!sysStr.trim() || !diaStr.trim() || !hrStr.trim()) {
          return "Please fill in typical blood pressure and heart rate (use 0 if unknown).";
        }
      }
      if (s === 2) {
        if (!isValidEmail(emergency_contact_email)) {
          return "Please enter a valid emergency contact email.";
        }
      }
      return null;
    },
    [full_name, ageStr, gender, city, sysStr, diaStr, hrStr, emergency_contact_email],
  );

  const goNext = useCallback(() => {
    const err = validateStep(step);
    setStepError(err);
    if (err) return;
    setStep((x) => Math.min(STEP_COUNT - 1, x + 1));
  }, [step, validateStep]);

  const goBack = useCallback(() => {
    setStepError(null);
    setStep((x) => Math.max(0, x - 1));
  }, []);

  const activate = useCallback(async () => {
    const err = validateStep(2);
    setStepError(err);
    if (err) return;
    if (!confirm) return;
    if (!userId) {
      setStepError("You are not signed in.");
      return;
    }

    const body: OnboardingCreateBody = {
      full_name: payload.full_name,
      age: payload.age,
      gender: payload.gender,
      city: payload.city,
      typical_bp_systolic: payload.typical_bp_systolic,
      typical_bp_diastolic: payload.typical_bp_diastolic,
      typical_heart_rate: payload.typical_heart_rate,
      known_diseases: payload.known_diseases,
      current_medications: payload.current_medications,
      emergency_contact_email: payload.emergency_contact_email,
    };

    setSubmitting(true);
    setStepError(null);
    try {
      await careonApi.createOnboarding(userId, body);
      const me = await careonApi.getOnboardingMe(userId);
      setOnboardingProfile(meToProfile(me));
      setOnboardingComplete();
      setActivated(true);
    } catch (e) {
      const message = e instanceof ApiError ? e.message : "Could not save onboarding.";
      setStepError(message);
    } finally {
      setSubmitting(false);
    }
  }, [validateStep, confirm, payload, userId]);

  return {
    step,
    setStep,
    activated,
    payload,
    confirm,
    setConfirm,
    stepError,
    goNext,
    goBack,
    activate,
    loadStatus,
    loadError,
    submitting,
    fields: {
      full_name,
      setFullName,
      ageStr,
      setAgeStr,
      gender,
      setGender,
      city,
      setCity,
      sysStr,
      setSysStr,
      diaStr,
      setDiaStr,
      hrStr,
      setHrStr,
      known_diseases,
      setKnownDiseases,
      current_medications,
      setCurrentMedications,
      emergency_contact_email,
      setEmergencyContactEmail,
    },
  };
}
