import AboutSection from 'components/AboutSection';
import AchievementsSection from 'components/AchievementsSection';
import BusinessHighlights from 'components/BusinessHighlights';
import MapSection from 'components/MapSection';
import TeamSection from 'components/TeamSection';
import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { getDictionary } from 'lib/getDictionary';
import { Suspense } from 'react';
export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and BigCommerce.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const dict = await getDictionary();
  return (
    <>
      <ThreeItemGrid />
      <Suspense>
        <Carousel />
        <AboutSection />
        <TeamSection />
        <MapSection dict={dict}/>
        <BusinessHighlights />
        <AchievementsSection />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
