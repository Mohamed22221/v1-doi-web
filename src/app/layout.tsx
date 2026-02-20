import { Montserrat, Cairo } from "next/font/google";
import "@/app/globals.css";
import { THEME_INIT_CODE } from "@/components/shared/scripts/theme-init-code";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Inline blocking script for zero FOUC - executes before first paint */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_CODE }} />
      </head>
      <body className={`${montserrat.variable} ${cairo.variable} antialiased font-sans`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[10000] bg-primary-400 text-white p-3 rounded-md shadow-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
