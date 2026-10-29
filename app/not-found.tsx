import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import NotFoundContent from '@/components/layout/NotFoundContent';

export const metadata = {
  title: 'Page not found — Rasa',
};

/**
 * Catches URLs that match no route at all. This one sits outside the (main)
 * route group, so it has to bring its own chrome — including the 60px offset
 * that (main)'s layout normally provides.
 */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-[60px]">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
