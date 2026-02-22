import Image from "next/image";
import { APP_NAME } from "@/constants/app.constant";
import type { CommonProps } from "@/types/common";
import { cn } from "@utils/cn";

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

  return (
    <div className={cn("logo relative", className)} style={{ width, height, ...style }}>
      {/* If mode is explicitly provided, render only that version */}
      {modeProp ? (
        <Image
          className={cn("h-full w-full object-contain", imgClass)}
          src={`${LOGO_SRC_PATH}logo-${modeProp}-${type}.${typeImg}`}
          alt={`${APP_NAME} logo`}
          width={width}
          height={height}
          priority
        />
      ) : (
        <>
          {/* Light Mode Logo - Visible by default, hidden in dark mode */}
          <Image
            className={cn("h-full w-full object-contain dark:hidden", imgClass)}
            src={`${LOGO_SRC_PATH}logo-light-${type}.${typeImg}`}
            alt={`${APP_NAME} logo`}
            width={width}
            height={height}
            priority
          />
          {/* Dark Mode Logo - Hidden by default, visible in dark mode */}
          <Image
            className={cn("h-full w-full hidden object-contain dark:block", imgClass)}
            src={`${LOGO_SRC_PATH}logo-dark-${type}.${typeImg}`}
            alt={`${APP_NAME} logo`}
            width={width}
            height={height}
            priority
          />
        </>
      )}
    </div>
  );
}
