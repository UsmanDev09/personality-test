'use client'

import { Navbar } from "./components/Navabr";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <title>Personality test</title>
      <body>
        <Navbar>
          {children}
        </Navbar>
      </body>
    </html>
  );
}
