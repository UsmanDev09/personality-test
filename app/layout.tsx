'use client'

import { Toaster } from "react-hot-toast";
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
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Navbar>
          {children}
        </Navbar>
      </body>
    </html>
  );
}
