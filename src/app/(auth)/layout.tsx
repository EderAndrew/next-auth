import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header id="auth-header">
          <p>Welcome back!</p>
          <form action="">
            <button>Logout</button>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}