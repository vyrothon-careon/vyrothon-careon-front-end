import type {
  AuthRequest,
  AuthResponse,
  OnboardingCreateBody,
  OnboardingMeResponse,
} from "./types";

export const DEFAULT_API_BASE_URL = "http://vyrothon-careon-back-end.onrender.com";

export function getApiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (fromEnv && fromEnv.trim()) return fromEnv.replace(/\/$/, "");
  return DEFAULT_API_BASE_URL.replace(/\/$/, "");
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type JsonRecord = Record<string, unknown>;

function parseErrorMessage(text: string): string {
  if (!text) return "Request failed";
  try {
    const j = JSON.parse(text) as JsonRecord;
    const detail = j.detail;
    const message = j.message;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail[0] && typeof (detail[0] as JsonRecord).msg === "string") {
      return String((detail[0] as JsonRecord).msg);
    }
    if (typeof message === "string") return message;
  } catch {
    /* plain text */
  }
  return text.length > 200 ? `${text.slice(0, 200)}…` : text;
}

/**
 * HTTP client for CareOn Render backend.
 */
export class CareonApi {
  constructor(private readonly baseUrl: string = getApiBaseUrl()) {}

  private async requestJson<T>(path: string, init: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    const res = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...init.headers,
      },
    });

    return this.parseJsonResponse<T>(res);
  }

  /** POST without body (e.g. `/me` endpoints that only use query params). */
  private async requestPostEmpty<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
    return this.parseJsonResponse<T>(res);
  }

  private async parseJsonResponse<T>(res: Response): Promise<T> {
    const text = await res.text();
    if (!res.ok) {
      throw new ApiError(res.status, parseErrorMessage(text) || res.statusText);
    }
    if (!text) {
      return undefined as T;
    }
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new ApiError(res.status, "Invalid JSON response");
    }
  }

  signup(body: AuthRequest): Promise<AuthResponse> {
    return this.requestJson<AuthResponse>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  login(body: AuthRequest): Promise<AuthResponse> {
    return this.requestJson<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  /**
   * POST /api/onboarding?user_id=…
   */
  createOnboarding(userId: number, body: OnboardingCreateBody): Promise<unknown> {
    const q = new URLSearchParams({ user_id: String(userId) });
    return this.requestJson(`/api/onboarding?${q.toString()}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  /**
   * POST /api/onboarding/me?user_id=…
   */
  getOnboardingMe(userId: number): Promise<OnboardingMeResponse> {
    const q = new URLSearchParams({ user_id: String(userId) });
    return this.requestPostEmpty<OnboardingMeResponse>(`/api/onboarding/me?${q.toString()}`);
  }
}

export const careonApi = new CareonApi();
