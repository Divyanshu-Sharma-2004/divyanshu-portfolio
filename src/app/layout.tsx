import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Divyanshu Sharma | QA Engineer",
  description:
    "Divyanshu Sharma is a QA professional focused on manual testing, LLM applications, and clear, reliable software experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;family=Roboto:wght@400;500;700;800&amp;display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
