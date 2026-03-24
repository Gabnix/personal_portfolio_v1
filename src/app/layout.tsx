import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/constants";

const dmSans = DM_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${bricolage.variable} antialiased`} suppressHydrationWarning>
        <Providers>
          {/* Skip-to-content: invisible until focused, satisfies WCAG 2.4.1 */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-border focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
