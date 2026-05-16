// app/layout.tsx
import type { Metadata } from "next";
import { Bebas_Neue, Barlow, Barlow_Condensed } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sribalajiearthmovers.vercel.app"),
  title: {
    default: "Sri Balaji Earth Movers | JCB 3DX Rental in Sivagangai, Tamil Nadu",
    template: "%s | Sri Balaji Earth Movers",
  },
  description:
    "Sri Balaji Earth Movers — Professional JCB 3DX rental and earth works in Sivagangai, Tamil Nadu. Excavation, land levelling, road construction, site preparation. 20+ years experience. ☎ +91 9443239842",
  keywords: [
    "JCB rental Sivagangai",
    "earth movers Tamil Nadu",
    "excavator rental Sivagangai",
    "earth moving contractor Tamil Nadu",
    "land levelling Karaikudi",
    "road construction equipment rental",
    "backhoe loader rental Tamil Nadu",
    "demolition contractor Sivagangai",
    "site preparation Tamil Nadu",
    "heavy equipment rental",
    "Sri Balaji Earth Movers",
  ],
  authors: [{ name: "Sri Balaji Earth Movers" }],
  creator: "Sri Balaji Earth Movers",
  publisher: "Sri Balaji Earth Movers",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sribalajiearthmovers.com",
    siteName: "Sri Balaji Earth Movers",
    title: "Sri Balaji Earth Movers | Professional Earth Moving Services in Tamil Nadu",
    description: "Professional JCB 3DX rental and earth works in Sivagangai, Tamil Nadu. 4.6★ Google rating. 20+ years experience. 6AM-6PM daily.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sri Balaji Earth Movers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Balaji Earth Movers | Earth Moving Services Tamil Nadu",
    description: "Professional JCB rental, excavation, and earth works in Sivagangai, Tamil Nadu.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://sribalajiearthmovers.com",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://sribalajiearthmovers.com",
  name: "Sri Balaji Earth Movers",
  description: "Professional JCB 3DX rental and earth works in Sivagangai, Tamil Nadu",
  url: "https://sribalajiearthmovers.com",
  telephone: "+919443239842",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Railway Station Rd, Senthamil Nagar",
    addressLocality: "Sivagangai",
    addressRegion: "Tamil Nadu",
    postalCode: "630561",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 9.8447, longitude: 78.4744 },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.6", bestRating: "5", ratingCount: "47+"  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "08:00", closes: "18:00" },
  ],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Bank Transfer, UPI",
  hasMap: "https://maps.google.com/?q=Sri+Balaji+Earth+Movers+Sivagangai",
  image: "https://sribalajiearthmovers.com/og-image.jpg",
  sameAs: [
    "https://www.google.com/maps/place/Sri+Balaji+Earth+Movers",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#F5A623" />
      </head>
      <body className="bg-brand-black text-white antialiased">
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: { background: "#1E1E1E", color: "#fff", border: "1px solid rgba(245,166,35,0.3)" },
          success: { iconTheme: { primary: "#F5A623", secondary: "#000" } },
        }} />
      </body>
    </html>
  );
}
