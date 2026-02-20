"use client";

import * as React from "react";
import type { Role } from "@/types/nav";

export function useRoles() {
  const [roles, setRoles] = React.useState<Role[]>(["guest"]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await fetch("/api/me");
        if (!response.ok) {
          throw new Error("Failed to fetch roles");
        }
        const data = await response.json();
        // Assuming API returns { roles: Role[] } or similar
        setRoles(data.roles || ["guest"]);
      } catch (err) {
        console.error("Error fetching roles:", err);
        setRoles(["guest"]);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRoles();
  }, []);

  const hasRole = (roleList: Role[]) => {
    return roleList.some((r) => roles.includes(r));
  };

  return { roles, isLoading, error, hasRole };
}
