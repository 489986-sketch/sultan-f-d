import { useEffect, useState } from 'react';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import LogoSnow from './components/LogoSnow';
import Navbar from './components/Navbar';
import Process from './components/Process';
import ProductShowcase from './components/ProductShowcase';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import WhatsAppButton from './components/WhatsAppButton';

const SNOW_DURATION_MS = 4000;
const SNOW_COUNT = 200;

type SnowOrigin = { x: number; y: number } | null;

export default function App() {
  const [snowing, setSnowing] = useState(false);
  const [origin, setOrigin] = useState<SnowOrigin>(null);

  useEffect(() => {
    const onSnow = (event: Event) => {
      const ce = event as CustomEvent<{ origin: SnowOrigin }>;
      // ignore re-trigger while a shower is in progress
      setSnowing((isSnowing) => {
        if (isSnowing) return isSnowing;
        setOrigin(ce.detail?.origin ?? null);
        return true;
      });
    };
    window.addEventListener('sultan:snow', onSnow);
    return () => window.removeEventListener('sultan:snow', onSnow);
  }, []);

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ProductShowcase />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />

      {snowing && (
        <LogoSnow
          count={SNOW_COUNT}
          durationMs={SNOW_DURATION_MS}
          origin={origin}
          onComplete={() => setSnowing(false)}
        />
      )}
    </div>
  );
}
