import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Navabr";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Personality test',
  description: 'App for testing if you are an introvert or extrovert',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" >
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
