import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Parth Panchal | Cyber Security Expert & Ethical Hacker",
    template: "%s | Parth Panchal",
  },
  description:
    "Parth Panchal is a skilled Cyber Security Expert and Ethical Hacker specializing in penetration testing, vulnerability assessment, and digital security solutions. Explore my portfolio showcasing security projects, CTF writeups, and professional expertise in protecting digital assets.",
  keywords: [
    "Parth Panchal",
    "Cyber Security Expert",
    "Ethical Hacker",
    "Security Researcher",
    "Penetration Testing",
    "Information Security",
    "Digital Security",
    "CTF Player",
    "Security Solutions",
    "Portfolio",
    "Vulnerability Assessment",
  ],
  authors: [{ name: "Parth Panchal" }],
  creator: "Parth Panchal",
  publisher: "Parth Panchal",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parth-m0n4rch.vercel.app/",
    siteName: "Parth Panchal - Cyber Security Portfolio",
    title: "Parth Panchal | Cyber Security Expert & Ethical Hacker",
    description:
      "Professional portfolio of Parth Panchal, featuring expertise in cyber security, ethical hacking, and digital asset protection. View projects, achievements, and security solutions.",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Parth Panchal - Cyber Security Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Panchal | Cyber Security Expert",
    description:
      "Discover cyber security expertise, ethical hacking projects, and professional security solutions by Parth Panchal.",
    images: ["/image.png"],
    creator: "@052Parth",
  },
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes if needed
  },
  // alternates: {
  //   canonical: "https://yourportfolio.com",
  // },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
