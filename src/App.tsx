import './App.css';
import About from './components/about/about';
import AppDownload from './components/appDownload/appDownload';
import Footer from './components/footer/footer';
import Hero from './components/hero/hero';

function App() {
  return (
    <>
      <Hero />
      <About />
      <AppDownload />
      <Footer />
    </>
  );
}

export default App;
