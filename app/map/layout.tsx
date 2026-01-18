import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SAGE Interactive Map | Solano County GIS',
  description:
    'Interactive map for exploring Solano County parcels, zoning, hazards, and more.',
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
