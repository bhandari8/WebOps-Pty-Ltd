export const isBrowser = typeof window !== "undefined";

export function readStorage<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}
export function readOrSeed<T>(key: string, seed: T): T {
  if (!isBrowser) return seed;
  const raw = window.localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw) as T;
    } catch {
    }
  }
  writeStorage(key, seed);
  return seed;
}

export const STORAGE_KEYS = {
  services: "webops.services",
  portfolio: "webops.portfolio",
  about: "webops.about",
  enquiries: "webops.enquiries",
  adminAuth: "webops.admin.auth",
} as const;
