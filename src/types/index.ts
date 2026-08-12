export type RouteOption = "3km" | "5km" | "8km";

export interface RegistrationResponse {
  success: boolean;
  codigo: string;
  message: string;
}

export interface RegistrationError {
  error: string;
  details?: Record<string, string[]>;
}
