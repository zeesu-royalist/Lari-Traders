import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lari Traders — Professional Trading Education & Market Intelligence',
  description:
    'Master disciplined execution, quantitative market analysis, and systematic risk management with Lari Traders institutional-grade curriculum and research.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/13ab13418f633c1b0516fed6e30bedbc?family=Suisse+Int%27l"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
