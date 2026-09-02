"use client";

import { useCallback, useEffect, useState } from "react";
import { isBrowser } from "@/lib/storage";

const SESSION_KEY = "webops.admin.session";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Deliberately deferred to an effect (not a lazy useState initializer):
    // reading sessionStorage during render would mismatch the server-rendered
    // HTML and cause a hydration error.
    if (isBrowser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(window.sessionStorage.getItem(SESSION_KEY) === "true");
    }
    setChecked(true);
  }, []);

  const signIn = useCallback(() => {
    if (isBrowser) window.sessionStorage.setItem(SESSION_KEY, "true");
    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    if (isBrowser) window.sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, checked, signIn, signOut };
}
