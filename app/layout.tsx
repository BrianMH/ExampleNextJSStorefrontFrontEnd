/**
 * Sets up the effective "head" that would be present in all site pages
 */
import '@/app/ui/globals.css'
import {inter} from "@/app/ui/fonts";
import type { Metadata } from "next";
import { STORE_NAME } from "@/app/lib/constants";

// And then define some metadata for the head of the page to use
export const metadata: Metadata = {
  title: {
    template: `%s | ${STORE_NAME} Fashion`,
    default: `${STORE_NAME} Fashion`
  },
  description: "LA Fashion Retail Store",
};

// And just define the root header layout here
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
