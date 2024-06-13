// app/layout.js
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import "primereact/resources/themes/lara-light-blue/theme.css";
import Starfield from "react-starfield";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Histori",
  description:
    "Histori is a platform for sharing historical maps and articles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrimeReactProvider value={{ pt: Tailwind }}>
      <html lang="en">
        <body className="">
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </PrimeReactProvider>
  );
}
