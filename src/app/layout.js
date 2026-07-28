import { Press_Start_2P, VT323, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start-2p",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata = {
  title: "MUHAMMAD A'IZ NUR AZIZ",
  description:
    "Portfolio interaktif karya Roihan Daffa dengan konsep toko piringan hitam Y2K brutalist. Menampilkan desain kemasan, identitas visual, ilustrasi fiksi ilmiah retro, dan live synthesizer ambient.",
  keywords:
    "Roihan Daffa, Portfolio, Brutalist, Vinyl Shop, Web Audio Synthesizer, Y2K Design, Packaging, Branding",
  authors: [{ name: "Roihan Daffa" }],
  openGraph: {
    title: "AZZ Portfolio | Brutalist Vinyl Shop Edition",
    description:
      "Portfolio interaktif karya Roihan Daffa dengan konsep toko piringan hitam Y2K brutalist.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${pressStart2P.variable} ${vt323.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="bg-han-dark text-white font-sans overflow-x-hidden relative min-h-screen">
        {children}
      </body>
    </html>
  );
}
