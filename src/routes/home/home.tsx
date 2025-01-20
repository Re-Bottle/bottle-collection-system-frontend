import About from "../../components/about";
import AppDownload from "../../components/appDownload";
import Contact from "../../components/contact";
import Footer from "../../components/footer";
import Hero from "../../components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <AppDownload />
      <Contact />
      <Footer />
    </>
  );
}
