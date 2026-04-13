import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Phone, ArrowRight, Utensils, Award, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/images/img9.jpg" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 video-overlay" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold font-medium tracking-[0.3em] uppercase text-sm mb-4 block">{t('home.hero_subtitle')}</span>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight">
            {t('home.hero_title')}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/menu" className="btn-gold w-full sm:w-auto">
              {t('common.discover_menu')}
            </Link>
            <Link to="/reservation" className="btn-outline w-full sm:w-auto">
              {t('common.book_table')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

const Presentation = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800"
            alt="Intérieur du restaurant"
            className="rounded-2xl shadow-2xl relative z-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gold/10 rounded-2xl -z-0 border border-gold/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl mb-8 leading-tight" dangerouslySetInnerHTML={{ __html: t('home.about_title') }} />
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            {t('home.about_p1')}
          </p>
          <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
            {t('home.about_p2')}
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Utensils size={24} />
              </div>
              <div>
                <h4 className="font-bold">Cuisine Fine</h4>
                <p className="text-xs text-zinc-500">Produits frais</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Award size={24} />
              </div>
              <div>
                <h4 className="font-bold">Service Elite</h4>
                <p className="text-xs text-zinc-500">Attention personnalisée</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Specialties = () => {
  const { t } = useTranslation();
  const dishes = [
    { name: "Grillade Mixte Royale", price: "32€", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400" },
    { name: "Tagine d'Agneau aux Pruneaux", price: "28€", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400" },
    { name: "Couscous Signature", price: "26€", image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <section className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-medium tracking-widest uppercase text-xs mb-4 block">{t('home.specialties_subtitle')}</span>
          <h2 className="text-4xl md:text-5xl">{t('home.specialties_title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dishes.map((dish, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card overflow-hidden group"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl mb-1">{dish.name}</h3>
                  <p className="text-gold font-mono">{dish.price}</p>
                </div>
                <Link to="/menu" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-ink transition-all">
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Sophie Martin", text: "Une expérience inoubliable. Le cadre est magnifique et les plats sont d'une finesse incroyable.", rating: 5 },
    { name: "Marc Dubois", text: "Le meilleur restaurant de la ville. Le service est impeccable et l'ambiance est parfaite pour un dîner romantique.", rating: 5 },
    { name: "Elena Rossi", text: "Des saveurs authentiques qui nous font voyager. Je recommande vivement le tagine d'agneau.", rating: 5 },
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Ce que disent nos clients</h2>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-gold text-gold" />)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 italic text-zinc-300 leading-relaxed"
            >
              <p className="mb-6">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                  {review.name[0]}
                </div>
                <span className="text-white font-medium not-italic">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InfoSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center">
          <Clock className="text-gold mb-6" size={40} />
          <h3 className="text-2xl mb-4">{t('footer.hours')}</h3>
          <p className="text-zinc-400">{t('common.mon_fri')}: 12h - 23h</p>
          <p className="text-zinc-400">{t('common.sat')}: 12h - 00h</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <MapPin className="text-gold mb-6" size={40} />
          <h3 className="text-2xl mb-4">Localisation</h3>
          <p className="text-zinc-400">Saly, Sénégal</p>
          <p className="text-zinc-400">(Près de la station Shell)</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Phone className="text-gold mb-6" size={40} />
          <h3 className="text-2xl mb-4">Contact</h3>
          <p className="text-zinc-400">+221 77 212 34 34</p>
          <p className="text-zinc-400">contact@asmalounge.com</p>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Presentation />
      <Specialties />
      <Testimonials />
      <InfoSection />
      
      {/* Map Section */}
      <section className="h-96 w-full grayscale contrast-125 opacity-50 hover:opacity-100 transition-opacity duration-500">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.568434789547!2d-17.0059251!3d14.4446482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec18b98dd5c9c6b%3A0xd6b9ca8fde097274!2sAsma%20Lounge!5e0!3m2!1sfr!2sfr!4v1711900000000!5m2!1sfr!2sfr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
}
