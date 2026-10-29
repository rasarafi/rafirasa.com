import NotFoundContent from '@/components/layout/NotFoundContent';

export const metadata = {
  title: 'Page not found — Rasa',
};

/** Handles notFound() thrown inside a (main) route — e.g. an unknown project slug. */
export default function NotFound() {
  return <NotFoundContent />;
}
