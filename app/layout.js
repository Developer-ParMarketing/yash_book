import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
});

// export const metadata = {
//   title: "Yashasvi Prasad | Author of When Staying Stops Making Sense",
//   description: "Explore the work of Yashasvi Prasad on decision-making, the psychology of endurance, and knowing when to stay or leave. Discover his book, \"When Staying Stops Making Sense.\"",
//   other: {
//     "google-site-verification": "vRQXCUTsbJz1bOwz9IvYuyoE0url7q0yz9GJogFC7m4",
//   },

// };

export const metadata = {
  title: "Yashasvi Prasad | Author of When Staying Stops Making Sense",
  description:
    'Explore the work of Yashasvi Prasad on decision-making, the psychology of endurance, and knowing when to stay or leave. Discover his book, "When Staying Stops Making Sense."',

  other: {
    "google-site-verification": "vRQXCUTsbJz1bOwz9IvYuyoE0url7q0yz9GJogFC7m4",
  },

  // ✅ ADD THIS
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },

  // ✅ VERY IMPORTANT FOR LINKEDIN
  openGraph: {
    title:
      "Yashasvi Prasad | Author of When Staying Stops Making Sense",
    description:
      'Explore the work of Yashasvi Prasad on decision-making and leadership.',
    url: "https://www.yashasviprasad.com",
    siteName: "Yashasvi Prasad",
    images: [
      {
        url: "https://www.yashasviprasad.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Optional but recommended
  twitter: {
    card: "summary_large_image",
    title:
      "Yashasvi Prasad | Author of When Staying Stops Making Sense",
    description:
      'Explore the work of Yashasvi Prasad on decision-making and leadership.',
    images: ["https://www.yashasviprasad.com/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Script id="gtm-script" strategy="afterInteractive">
          {`
  (function(w,d,s,l,i){
    w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),
        dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5QVB7WKM');
`}
        </Script>


        <Navbar />
        {children}
        <Footer />

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5QVB7WKM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      </body>
    </html>
  );
}
