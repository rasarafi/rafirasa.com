import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import ChatDrawer from '@/components/chat/ChatDrawer';
import { FEATURES } from '@/lib/feature-flags';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

/** Display face for headings — see the Biscuit Aurora spec. */
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rafirasa.com'),
  title: {
    default: 'Rasa — Software Engineer',
    template: '%s',
  },
  description:
    'Software engineer and AI-orchestration lead. Six years hand-coding production health systems across Android, desktop and web — now architecting and directing AI agents, with 17 applications live in production.',
  openGraph: {
    type: 'website',
    siteName: 'Rafi Irtiza Rasa',
    title: 'Rasa — Software Engineer',
    description:
      'Six years hand-coding production systems, now directing AI agents through implementation. 17 applications live in production.',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rasa — Software Engineer',
    description:
      'Six years hand-coding production systems, now directing AI agents through implementation.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

/**
 * Runs before paint to avoid a theme flash.
 *
 * Biscuit (light) is the brand default, so an unset preference resolves to
 * light rather than following the OS — the warm palette is the identity, and
 * the nav toggle is one click away.
 *
 * Also honours `?motion=force` / `?motion=os`: this machine's OS reports
 * `prefers-reduced-motion: reduce`, which otherwise hides all motion from the
 * author. The choice persists so the query string is only needed once.
 */
const bootScript = `(function(){
var d=document.documentElement;
try{
var t=localStorage.getItem('theme');
d.setAttribute('data-theme',t==='dark'||t==='light'?t:'light');
var q=new URLSearchParams(location.search).get('motion');
if(q==='force'||q==='os')localStorage.setItem('motion',q);
if(localStorage.getItem('motion')==='force')d.setAttribute('data-motion','force');
}catch(e){d.setAttribute('data-theme','light');}
})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        {FEATURES.chatbot && <ChatDrawer />}
      </body>
    </html>
  );
}
