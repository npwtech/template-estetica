import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Philosophy from './components/Philosophy.jsx';
import Services from './components/Services.jsx';
import Ritual from './components/Ritual.jsx';
import About from './components/About.jsx';
import Gallery from './components/Gallery.jsx';
import Testimonials from './components/Testimonials.jsx';
import FAQ from './components/FAQ.jsx';
import CTA from './components/CTA.jsx';
import Footer from './components/Footer.jsx';
import StickyMobileCTA from './components/StickyMobileCTA.jsx';
import BackToTop from './components/BackToTop.jsx';

export default function App() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <Ritual />
        <About />
        <Gallery />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <StickyMobileCTA />
      <BackToTop />
    </>
  );
}
