import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import '@/app/globals.css'
import Header from '@/components/Header/Header'
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "NoteHub",
  description: "Take full control of your day with NoteHub application.",
  openGraph: {
    title: "NoteHub",
    description: "Take full control of your day with NoteHub application.",
    url: 'http://localhost:3000',
    images:
      [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1500,
          height: 1000,
          alt: 'NoteHub logo',
        },
      ],
  }
};



export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
              {modal}
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>

      </body>
    </html>
  );
}
