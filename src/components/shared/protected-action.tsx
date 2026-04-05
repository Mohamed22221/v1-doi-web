"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useProtectedAction } from "@/hooks/use-protected-action";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth-store";
import { useAuthGuardStore } from "@/lib/store/auth-guard-store";

interface ProtectedButtonProps extends React.ComponentProps<typeof Button> {
  intent?: string;
}

export function ProtectedButton({ intent, onClick, ...props }: ProtectedButtonProps) {
  const protect = useProtectedAction(intent);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) {
      protect(() => onClick(e))();
    } else {
      protect(() => {})();
    }
  };

  return <Button onClick={handleClick} {...props} />;
}

interface ProtectedLinkProps extends React.ComponentProps<typeof Link> {
  intent?: string;
  className?: string;
  children: React.ReactNode;
}

export function ProtectedLink({ intent, href, onClick, ...props }: ProtectedLinkProps) {
  const user = useAuthStore((state) => state.user);
  const openAuthModal = useAuthGuardStore((state) => state.openModal);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault(); // Stop navigation
      openAuthModal(intent, href?.toString());
    } else {
      if (onClick) onClick(e);
      // Let Link handle navigation normally
    }
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
