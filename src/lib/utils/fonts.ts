import localFont from "next/font/local";

export const arabicFont = localFont({
  variable: "--font-rtl",
  display: "swap",
  preload: false,
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
  src: [
    {
      path: "../../assets/fonts/ltr/Montserrat-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-ExtraLightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../assets/fonts/ltr/Montserrat-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
});
