import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@lcde.ma";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AdminLCDE2026!";
const SESSION_COOKIE_NAME = "lcde_admin_session";
const SESSION_SECRET_TOKEN = "lcde_auth_session_valid_token_2026";

export function checkAdminCredentials(email: string, pass: string): boolean {
  return (
    email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase() &&
    pass === ADMIN_PASSWORD
  );
}

export async function isUserAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return session?.value === SESSION_SECRET_TOKEN;
}

export { SESSION_COOKIE_NAME, SESSION_SECRET_TOKEN, ADMIN_EMAIL, ADMIN_PASSWORD };
