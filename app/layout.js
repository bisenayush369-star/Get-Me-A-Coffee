import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get me A Coffee - Fund your projects with crowdfunding",
  description: "This website is a crowdfunding platform for creators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#000000]
        bg-[radial-gradient(#ffffff33_1px,#00091d_1px)]
        bg-[size:20px_20px] text-white overflow-x-hidden`}
      >
  <Script
    src="https://checkout.razorpay.com/v1/checkout.js"
    strategy="afterInteractive"
  />
  <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: "#ffffff",
      color: "#0f172a",
      padding: "14px 16px",
      borderRadius: "8px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      fontWeight: "500",
    },
  }}
/>

        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* MAIN CONTENT */}
            <main className="flex-1 flex justify-center pt-24">
              {children}
            </main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
