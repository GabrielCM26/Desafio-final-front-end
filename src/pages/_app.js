import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (

    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-[428px] py-8 space-y-6">
        <main className="container flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
        <Navbar />
      </div>

    </div>
  );
}