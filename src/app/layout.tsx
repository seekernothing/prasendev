import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ScrollProgress } from "@/components/scroll-progress";
import { JsonLd } from "@/components/json-ld";
import { PageBackground } from "@/components/page-background";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/react";
import OnekoCat from "@/components/oneko";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: "seekernothing | Full Stack Developer",
    template: `%s | seekernothing`,
  },
  description:
    "Abhishek Biradar is a Full Stack Developer from India, with expertise in React, Next.js, TypeScript and Node.js. I create modern web applications and have a passion for clean, efficient code. View my portfolio to see my latest projects and technical blog posts.",
  keywords: [
    "Abhishek Biradar",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Web Developer India",
    "Software Engineer",
  ],
  authors: [{ name: "Abhishek Biradar" }],
  creator: "Abhishek Biradar",
  publisher: "Abhishek Biradar",
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: "seekernothing | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript and Node.js. Check out my portfolio, projects and blog posts.",
    url: DATA.url,
    siteName: "Abhishek Biradar - Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DATA.url}/images/products/hi.v4.png`,
        width: 1200,
        height: 630,
        alt: "Abhishek Biradar - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Biradar | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript and Node.js",
    images: [`${DATA.url}/images/products/hi.v4.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/images/products/favicon.ico", type: "image/x-icon" }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "seekernothing",
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.variable, "font-sans antialiased")}>
        {/* Background container */}
        <div className="fixed inset-0 z-[-1]">
          <PageBackground />
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-2xl mx-auto py-12 sm:py-24 px-6">
          <GoogleAnalytics gaId="G-XVF0SFD4GW" />
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "p73rco1nfp");
            `}
          </Script>
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
              <Analytics />
              <SpeedInsights />
              <Navbar />
            </TooltipProvider>
          </ThemeProvider>
        </div>

        {/* Oneko cat - rendered outside the container so it can move on full screen */}
        <OnekoCat />
      </body>
    </html>
  );
}
