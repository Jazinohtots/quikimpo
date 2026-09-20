import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import Analytics from "./components/Analytics";
import CookieConsent from "./components/CookieConsent";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Quote from "./pages/Quote";
import Contact from "./pages/Contact";
import Tracking from "./pages/Tracking";
import ClientReviews from "./pages/ClientReviews";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Analytics />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/reviews" element={<ClientReviews />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
      <CookieConsent />
    </div>
  );
}

export default App;
