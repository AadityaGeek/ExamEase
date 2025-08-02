import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/footer';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'ExamEase AI - AI-Powered Question Paper Generator',
  description: 'Generate high-quality, exam-oriented question papers for any subject in seconds with ExamEase AI. Perfect for students and educators.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} antialiased min-h-screen bg-background`}>
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

    