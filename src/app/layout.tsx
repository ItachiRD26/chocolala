import { getLocale } from "next-intl/server";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="h-full antialiased">
      <head>
        {/* Preload loader poster so the first video frame is ready before JS loads */}
        <link rel="preload" as="image" href="/videos/loader-poster.webp" />
      </head>
      <body className="min-h-full flex flex-col bg-chocolala-brown text-chocolala-cream">
        {children}
      </body>
    </html>
  );
}
