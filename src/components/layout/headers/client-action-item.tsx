"use client";

import { Button } from "@components/ui/button";

interface ClientActionItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  variant?: "outline" | "ghost";
}

export function ClientActionItem({
  id,
  children,
  className,
  variant = "outline",
}: ClientActionItemProps) {
  const handleClick = () => {
    console.info(`Action ${id} clicked`);
  };

  return (
    <Button
      variant={variant}
      size="icon"
      rounded="full"
      className={className}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
