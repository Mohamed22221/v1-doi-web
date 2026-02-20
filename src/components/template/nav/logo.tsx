"use client";

import Image from "next/image";
import { APP_NAME } from "@/constants/app.constant";
import type { CommonProps } from "@/types/common";
import { cn } from "@utils/cn";
import { useThemeStore } from "@/lib/store/theme-store";

interface LogoProps extends CommonProps {
  type?: "full" | "streamline";
  mode?: "light" | "dark";
  typeImg?: "png" | "svg" | "jpg" | "jpeg" | "webp";
  imgClass?: string;
  width?: number;
  height?: number;
}

const LOGO_SRC_PATH = "/img/";

export function Logo(props: LogoProps) {
  const {
    type = "full",
    mode: modeProp,
    className,
    imgClass,
    style,
    width = 120,
    height = 40,
    typeImg = "png",
  } = props;

  const theme = useThemeStore((state) => state.theme);
  const mode = modeProp || theme;

  return (
    <div className={cn("logo", className)} style={{ width, height, ...style }}>
      <Image
        className={cn("h-full w-full object-contain", imgClass)}
        src={`${LOGO_SRC_PATH}logo-${mode}-${type}.${typeImg}`}
        alt={`${APP_NAME} logo`}
        width={width}
        height={height}
        priority
      />
    </div>
  );
}
