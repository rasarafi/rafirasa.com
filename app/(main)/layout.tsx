import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {/* Clears the fixed 60px navbar once, so pages only own their own rhythm. */}
      <main className="pt-[60px]">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
