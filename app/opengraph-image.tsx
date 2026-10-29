import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

/**
 * Site-wide social preview card, rendered once at build time.
 *
 * Applies to every route that does not carry its own image — home, gallery,
 * about, 404. Case studies point at their own composited thumbnail instead
 * (see `app/(main)/projects/[slug]/page.tsx`).
 *
 * Satori cannot read CSS custom properties, so the Biscuit palette is
 * repeated here as literals. Keep it in step with `app/globals.css`; the
 * card is single-look on purpose — link previews have no theme.
 */

export const alt = 'Rasa — Software Engineer. I engineer production systems and direct the AI that builds them.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BISCUIT = {
  bg: '#F7F3EA',
  surface: '#FFFDF8',
  text: '#2E2A24',
  text2: '#6B6459',
  text3: '#9A9284',
  line: '#E3DBC9',
  coral: '#C9552F',
  green: '#3F7248',
  greenBg: '#E0EBE0',
  washCoral: 'rgba(201, 85, 47, 0.16)',
  washBlue: 'rgba(63, 111, 168, 0.14)',
  washAmber: 'rgba(176, 128, 31, 0.14)',
};

/** The home hero headline, with the coral phrase marked. */
const HEADLINE = [
  ...'I engineer production systems — and'.split(' ').map((text) => ({ text, accent: false })),
  ...'direct the AI'.split(' ').map((text) => ({ text, accent: true })),
  ...'that builds them.'.split(' ').map((text) => ({ text, accent: false })),
];

const FONT_DIR = join(process.cwd(), 'lib', 'og', 'fonts');

export default async function OpenGraphImage() {
  const [display, body, mono] = await Promise.all([
    readFile(join(FONT_DIR, 'SpaceGrotesk-Bold.woff')),
    readFile(join(FONT_DIR, 'Inter-Medium.woff')),
    readFile(join(FONT_DIR, 'JetBrainsMono-Medium.woff')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: BISCUIT.bg,
          color: BISCUIT.text,
          fontFamily: 'Inter',
          position: 'relative',
        }}
      >
        {/* The three soft washes from the home hero. */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${BISCUIT.washCoral} 0%, rgba(201,85,47,0) 70%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -260,
            right: 220,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${BISCUIT.washBlue} 0%, rgba(63,111,168,0) 70%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -220,
            left: -200,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${BISCUIT.washAmber} 0%, rgba(176,128,31,0) 70%)`,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              alignSelf: 'flex-start',
              padding: '10px 20px',
              borderRadius: 9999,
              background: BISCUIT.greenBg,
              color: BISCUIT.green,
              fontFamily: 'JetBrains Mono',
              fontSize: 20,
            }}
          >
            <div
              style={{ width: 10, height: 10, borderRadius: 9999, background: BISCUIT.green }}
            />
            17 applications in production · open to senior roles
          </div>

          {/*
            Satori has no inline flow, so the headline is one flex item per
            word — that is the only way a coloured phrase can wrap naturally.
          */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginTop: 40,
              maxWidth: 1000,
              fontFamily: 'Space Grotesk',
              fontSize: 68,
              lineHeight: 1.08,
              letterSpacing: -2.2,
            }}
          >
            {HEADLINE.map((word, i) => (
              <span
                key={i}
                style={{ marginRight: 18, color: word.accent ? BISCUIT.coral : BISCUIT.text }}
              >
                {word.text}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: `2px solid ${BISCUIT.line}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 30, color: BISCUIT.text }}>Rafi Irtiza Rasa</span>
            <span style={{ fontSize: 22, color: BISCUIT.text2, marginTop: 4 }}>
              Software Engineer · AI-orchestration lead
            </span>
          </div>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 22, color: BISCUIT.text3 }}>
            rafirasa.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Space Grotesk', data: display, weight: 700, style: 'normal' },
        { name: 'Inter', data: body, weight: 500, style: 'normal' },
        { name: 'JetBrains Mono', data: mono, weight: 500, style: 'normal' },
      ],
    },
  );
}
