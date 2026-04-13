import { motion } from 'motion/react';
import { Award, Users, Utensils, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="pt-32 pb-24 min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-gold font-medium tracking-widest uppercase text-xs mb-4 block">{t('about.subtitle')}</span>
            <h1 className="text-5xl md:text-7xl mb-8">{t('about.title')}</h1>
            <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              {t('about.p2')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1550966842-2849a2830a28?auto=format&fit=crop&q=80&w=800"
              alt="Notre équipe en cuisine"
              className="rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="glass-card p-10 text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6">
              <Utensils size={32} />
            </div>
            <h3 className="text-2xl mb-4">{t('about.mission')}</h3>
            <p className="text-zinc-400 leading-relaxed">
              {t('about.mission_text')}
            </p>
          </div>
          <div className="glass-card p-10 text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6">
              <Award size={32} />
            </div>
            <h3 className="text-2xl mb-4">{t('about.vision')}</h3>
            <p className="text-zinc-400 leading-relaxed">
              {t('about.vision_text')}
            </p>
          </div>
          <div className="glass-card p-10 text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl mb-4">{t('about.values')}</h3>
            <p className="text-zinc-400 leading-relaxed">
              {t('about.values_text')}
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-12">{t('about.team_title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Ahmed Benali", role: "Chef Exécutif", img: "https://images.unsplash.com/photo-1583394293214-28dea15ee548?auto=format&fit=crop&q=80&w=300" },
              { name: "Sarah Mansour", role: "Maître d'Hôtel", img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=300" },
              { name: "Karim Zaid", role: "Chef Pâtissier", img: "https://images.unsplash.com/photo-1577214195010-434189fe5730?auto=format&fit=crop&q=80&w=300" },
              { name: "Lila Chen", role: "Sommelière", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h4 className="text-xl font-serif">{member.name}</h4>
                <p className="text-gold text-sm uppercase tracking-widest">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
