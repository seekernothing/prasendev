import type { Metadata } from "next";
import Script from "next/script";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";

import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollProgress } from "@/components/scroll-progress";
import { JsonLd } from "@/components/json-ld";
import { PageBackground } from "@/components/page-background";
import OnekoCat from "@/components/oneko";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: "seekernothing | Full Stack Developer",
    template: "%s | seekernothing",
  },
  description:
    "Abhishek Biradar is a Full Stack Developer from India, specializing in React, Next.js, TypeScript and Node.js.",
  keywords: [
    "Abhishek Biradar",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
  ],
  authors: [{ name: "Abhishek Biradar" }],
  creator: "Abhishek Biradar",
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: "seekernothing | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript and Node.js.",
    url: DATA.url,
    siteName: "seekernothing",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DATA.url}/images/products/hi.v4.jpg`,
        width: 1200,
        height: 630,
        alt: "Abhishek Biradar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Biradar | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript and Node.js.",
    images: [`${DATA.url}/images/products/hi.v4.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-XVF0SFD4GW" />

        {/* Umami Analytics */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "p73rco1nfp");
          `}
        </Script>
      </head>

      <body className={cn(fontSans.variable, "font-sans antialiased")}>
        {/* Background */}
        <div className="fixed inset-0 z-[-1]">
          <PageBackground />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-2xl mx-auto py-12 sm:py-24 px-6">
          <JsonLd />
          <ScrollProgress />

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={0}>
              {children}
              <Navbar />
            </TooltipProvider>
          </ThemeProvider>
        </div>

        {/* Platform analytics */}
        <Analytics />
        <SpeedInsights />

        {/* Fun */}
        <OnekoCat />
      </body>
    </html>
  );
}
