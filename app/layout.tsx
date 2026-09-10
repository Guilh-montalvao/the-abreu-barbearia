import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'The Abreu Barbearia | Corte & Barba em Águas Claras',
  description: 'Um novo ícone de barbearia em Brasília. Conheça o espaço, os cortes e o cuidado com a barba na The Abreu, em Águas Claras. Agende pelo WhatsApp.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-512.png', type: 'image/png', sizes: '512x512' }
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body>{children}</body></html>}
