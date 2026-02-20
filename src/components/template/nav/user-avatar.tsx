import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

interface UserAvatarProps {
  src?: string;
  alt?: string;
  size?: string;
  className?: string;
  href?: string;
}

export function UserAvatar({ src, alt = "User avatar", size, className, href }: UserAvatarProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex aspect-square shrink-0 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-600 dark:bg-primary-900/20 dark:text-primary-400",
          !size && "size-12",
          className,
        )}
        style={size ? { width: size, height: size } : undefined}
      >
        P
      </div>
    );
  }

  return (
    <Link
      className={cn(
        "border-neutral-20 relative aspect-square shrink-0 overflow-hidden rounded-full border dark:border-neutral-700",
        !size && "size-12",
        className,
      )}
      style={size ? { width: size, height: size } : undefined}
      href={href || "/profile"}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </Link>
  );
}
