import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ChevronUp, Menu, X, Instagram, Facebook, Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';
import { Toaster } from 'sonner';
import { useTranslation } from 'react-i18next';

// Pages
import Home from './pages/Home';
import MenuPage from './pages/Menu';
import Reservation from './pages/Reservation';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/Login';

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.menu'), path: '/menu' },
    { name: t('nav.reservation'), path: '/reservation' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform">
            <div className="absolute inset-0 border-[1px] border-gold/30 scale-75 rounded-full" />
            {/* <span className="text-xl font-serif font-bold text-gold relative z-10">A</span> */}
            <img 
              src="/images/logo_asma_lounge.jpg" // mets ici le chemin de ton logo
              alt="Asma Lounge Logo"
              className="w-full h-full object-cover rounded-full relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold text-white leading-none tracking-tighter">ASMA</span>
            <span className="text-xs font-sans font-medium text-gold tracking-[0.4em] leading-none mt-1">LOUNGE</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm uppercase tracking-widest font-medium transition-colors hover:text-gold ${location.pathname === link.path ? 'text-gold' : 'text-white/80'}`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors"
            >
              <Globe size={18} />
              <span className="text-xs uppercase font-bold">{i18n.language.split('-')[0]}</span>
            </button>
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl min-w-[120px]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gold hover:text-ink transition-colors ${i18n.language.startsWith(lang.code) ? 'text-gold' : 'text-white/80'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/reservation" className="btn-gold text-xs py-2 px-5">
            {t('nav.reserve')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Mobile Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="text-white/80 hover:text-gold"
            >
              <Globe size={24} />
            </button>
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl min-w-[120px]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gold hover:text-ink transition-colors ${i18n.language.startsWith(lang.code) ? 'text-gold' : 'text-white/80'}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-zinc-900 border-t border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-lg font-medium text-white/90 hover:text-gold"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/reservation"
              className="btn-gold text-center mt-2"
              onClick={() => setIsOpen(false)}
            >
              Réserver une table
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const { t } = useTranslation();

  const paymentMethods = [
    { name: 'Orange Money', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg' },
    { name: 'Wave', logo: 'https://seeklogo.com/images/W/wave-logo-8D86A34F6D-seeklogo.com.png' },
    { name: 'Mastercard', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
    { name: 'Visa', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' },
    { name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-3xl font-serif font-bold text-gold mb-6 block">ASMA LOUNGE</Link>
          <p className="text-zinc-400 max-w-md mb-8 leading-relaxed">
            {t('footer.description')}
          </p>
          <div className="flex gap-4 mb-8">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-ink transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-ink transition-all">
              <Facebook size={20} />
            </a>
          </div>
          
          <div className="mt-8">
            <h5 className="text-white text-sm uppercase tracking-widest mb-4">{t('footer.payment')}</h5>
            <div className="flex flex-wrap gap-4">
              {paymentMethods.map((method) => (
                <div key={method.name} className="h-8 bg-white/5 px-3 rounded flex items-center justify-center grayscale hover:grayscale-0 transition-all border border-white/10" title={method.name}>
                  <img src={method.logo} alt={method.name} className="h-5 object-contain" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-serif text-xl mb-6">{t('footer.contact')}</h4>
          <ul className="space-y-4 text-zinc-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-gold shrink-0 mt-1" />
              <span>Saly, Sénégal (Près de la station Shell)</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-gold shrink-0" />
              <span>+221 77 212 34 34</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-gold shrink-0" />
              <span>contact@asmalounge.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif text-xl mb-6">{t('footer.hours')}</h4>
          <ul className="space-y-4 text-zinc-400">
            <li className="flex justify-between">
              <span>{t('common.mon_fri')}</span>
              <span>12:00 - 23:00</span>
            </li>
            <li className="flex justify-between">
              <span>{t('common.sat')}</span>
              <span>12:00 - 00:00</span>
            </li>
            <li className="flex justify-between">
              <span>{t('common.sun')}</span>
              <span>{t('common.closed')}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-zinc-500 text-sm">
        &copy; {new Date().getFullYear()} Asma Lounge. {t('footer.rights')}
      </div>
    </footer>
  );
};

const FloatingButtons = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      <a
        href="https://wa.me/221772123434"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        aria-label="Contact WhatsApp"
      >
        <MessageCircle size={30} />
      </a>
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="w-14 h-14 bg-gold text-ink rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            aria-label="Retour en haut"
          >
            <ChevronUp size={30} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButtons />
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}
