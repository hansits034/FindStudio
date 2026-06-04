/**
 * Frontend-only "database" & auth.
 * No backend required — semua data user disimpan di localStorage browser.
 *
 * - Seed users (hardcoded) selalu tersedia untuk login demo.
 * - User baru hasil register disimpan di localStorage key 'fs_users'.
 * - Session aktif disimpan di 'fs_user'.
 */

export type Role = 'CLIENT' | 'VENDOR' | 'ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  phone?: string;
  businessName?: string;
  city?: string;
}

export interface AuthPayload {
  accessToken: string;
  user: AuthUser;
}

interface StoredUser extends AuthUser {
  password: string;
}

const SESSION_KEY = 'fs_user';
const TOKEN_KEY = 'fs_token';
const USERS_KEY = 'fs_users';

// ---- Hardcoded seed users (selalu bisa login) ------------------------------
const SEED_USERS: StoredUser[] = [
  {
    id: 'u-client-1',
    email: 'rakha@kreator.com',
    password: 'password123',
    fullName: 'Rakha Pratama',
    role: 'CLIENT',
    phone: '+628123456789',
    city: 'Surabaya',
  },
  {
    id: 'u-vendor-1',
    email: 'aperture@vendor.com',
    password: 'password123',
    fullName: 'Aperture Rental Co.',
    businessName: 'Aperture Rental Co.',
    role: 'VENDOR',
    city: 'Surabaya',
  },
  {
    id: 'u-vendor-2',
    email: 'rollhouse@vendor.com',
    password: 'password123',
    fullName: 'Roll House Studio',
    businessName: 'Roll House Studio',
    role: 'VENDOR',
    city: 'Surabaya',
  },
  {
    id: 'u-admin-1',
    email: 'admin@findstudio.id',
    password: 'admin123',
    fullName: 'Admin FindStudio',
    role: 'ADMIN',
    city: 'Surabaya',
  },
];

// ---- Local user store -------------------------------------------------------
function readRegisteredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeRegisteredUsers(users: StoredUser[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function allUsers(): StoredUser[] {
  return [...SEED_USERS, ...readRegisteredUsers()];
}

// ---- Session helpers (nama tetap sama agar import lama jalan) ---------------
export function setSession(payload: AuthPayload) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, payload.accessToken);
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload.user));
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(SESSION_KEY);
}

export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
}

function fakeToken(user: AuthUser): string {
  // Bukan JWT asli — hanya penanda sesi lokal.
  return btoa(`${user.id}:${user.role}:${Date.now()}`);
}

// ---- Auth (async agar drop-in dengan kode sebelumnya) ----------------------
export async function login(email: string, password: string): Promise<AuthPayload> {
  await delay(350); // simulasi network
  const e = email.trim().toLowerCase();
  const found = allUsers().find((u) => u.email.toLowerCase() === e);
  if (!found) throw new Error('Email belum terdaftar.');
  if (found.password !== password) throw new Error('Password salah.');

  const { password: _pw, ...safe } = found;
  const payload = { accessToken: fakeToken(safe), user: safe };
  setSession(payload);
  return payload;
}

export async function register(input: {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role?: 'CLIENT' | 'VENDOR';
  businessName?: string;
  city?: string;
}): Promise<AuthPayload> {
  await delay(350);
  const e = input.email.trim().toLowerCase();
  if (allUsers().some((u) => u.email.toLowerCase() === e)) {
    throw new Error('Email sudah terdaftar.');
  }

  const newUser: StoredUser = {
    id: `u-${Date.now()}`,
    email: input.email.trim(),
    password: input.password,
    fullName: input.fullName,
    role: input.role ?? 'CLIENT',
    phone: input.phone,
    businessName: input.businessName,
    city: input.city ?? 'Surabaya',
  };

  const registered = readRegisteredUsers();
  registered.push(newUser);
  writeRegisteredUsers(registered);

  const { password: _pw, ...safe } = newUser;
  const payload = { accessToken: fakeToken(safe), user: safe };
  setSession(payload);
  return payload;
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
