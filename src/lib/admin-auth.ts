import { createHmac } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

function generateToken(password: string): string {
  return createHmac("sha256", password).update("zitara-admin").digest("hex");
}

export function createAdminCookieValue(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD not set");
  return generateToken(password);
}

export function verifyPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return input === password;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return token === generateToken(password);
}

export { COOKIE_NAME };
