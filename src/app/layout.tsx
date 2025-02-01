import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Livescores",
  description: "Live football scores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background">
        <main>{children}</main>
      </body>
    </html>
  );
}
