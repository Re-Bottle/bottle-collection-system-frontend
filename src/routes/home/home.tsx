import About from '../../components/about/about';
import AppDownload from '../../components/appDownload/appDownload';
import Contact from '../../components/contact/contact';
import Footer from '../../components/footer/footer';
import Hero from '../../components/hero/hero';

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <AppDownload />
            <Contact />
            <Footer />
        </>
    )
} 