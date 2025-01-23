import { Montserrat } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { AOSInit } from "./aos";
import { Navbar, Footer } from "./components";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "UMKM Kelurahan Kedungwuluh",
  description:
    "UMKM Kelurahan Kedungwuluh adalah sebuah website yang berisi informasi seputar UMKM di Kelurahan Kedungwuluh, Kecamatan Purwokerto Barat, Kabupaten Banyumas, Jawa Tengah.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <AOSInit />
        <NextTopLoader color="#fa8e3c" showSpinner={false} />
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
