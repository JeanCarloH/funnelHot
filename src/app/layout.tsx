"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Header from "../components/header";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const pathname = usePathname(); // Obtén el pathname actual
  const isLoginPage = pathname === "/login";
  return (
    <html lang="en" >
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider theme={theme}>
        {!isLoginPage && <Header />}
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
