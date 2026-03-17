import localFont from "next/font/local";

export const arabicFont = localFont({
  variable: "--font-rtl",
  display: "swap",
  preload: false,
  fallback: ["sans-serif"],
  src: [
    {
      path: "../../assets/fonts/rtl/RH-Zak Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../assets/fonts/rtl/RH-Zak Reg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/rtl/RH-Zak Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const englishFont = localFont({
  variable: "--font-ltr",
  display: "swap",
  preload: false,
  fallback: ["sans-serif"],
  src: [
    {
      path: "../../assets/fonts/ltr/Montserrat-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});
