import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import Script from "next/script";
// pages/_app.js
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS file

config.autoAddCss = false; // Prevent FontAwesome from adding its own CSS

// Add icons to the library
library.add(faInstagram);

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const afacadFlux = localFont({
  src: "./fonts/AfacadFlux.ttf",
  variable: "--font-afacad-flux",
  weight: "100 900",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata = {
  title: {
    default: "Elbin Binil - Full Stack Developer & Software Engineer",
    template: "%s | Elbin Binil"
  },
  description: "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my portfolio, projects, and work experience.",
  keywords: [
    "Elbin Binil",
    "Full Stack Developer", 
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Developer",
    "Web Developer",
    "Portfolio",
    "Software Development",
    "UI/UX Development"
  ],
  authors: [{ name: "Elbin Binil" }],
  creator: "Elbin Binil",
  publisher: "Elbin Binil",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elbinbinil.github.io",
    title: "Elbin Binil - Full Stack Developer & Software Engineer",
    description: "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my portfolio, projects, and work experience.",
    siteName: "Elbin Binil Portfolio",
    images: [
      {
        url: "/apple-touch-icon.png", // Using existing icon as fallback
        width: 180,
        height: 180,
        alt: "Elbin Binil - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elbin Binil - Full Stack Developer & Software Engineer",
    description: "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my portfolio, projects, and work experience.",
    images: ["/apple-touch-icon.png"], // Using existing icon as fallback
    creator: "@elbinbinil", // Replace with your actual Twitter handle if you have one
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://elbinbinil.github.io"),
  alternates: {
    canonical: "/",
  },
  category: "technology",
  classification: "Portfolio Website",
  referrer: "origin-when-cross-origin",
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  other: {
    "application-name": "Elbin Binil Portfolio",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Elbin Binil",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#000000",
    "msapplication-tap-highlight": "no",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Elbin Binil",
              "jobTitle": "Full Stack Developer",
              "description": "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies",
              "url": "https://elbinbinil.github.io",
              "sameAs": [
                // Add your social media profiles here
                // "https://linkedin.com/in/yourprofile",
                // "https://github.com/ElbinBinil",
                // "https://twitter.com/yourhandle"
              ],
              "knowsAbout": [
                "React",
                "Next.js", 
                "Node.js",
                "JavaScript",
                "TypeScript",
                "Full Stack Development",
                "Frontend Development",
                "Backend Development"
              ]
            })
          }}
        />
      </head>
      <body className={`${afacadFlux.variable} antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
