import './globals.css';

export const metadata = {
  title: 'SAGE - Solano Agent for Geographic Enquiry',
  description: 'AI-powered GIS assistant for Solano County',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full m-0 p-0">{children}</body>
    </html>
  );
}
