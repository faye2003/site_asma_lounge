import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Utensils, Wine, IceCream, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
}

export default function MenuPage() {
  const { t } = useTranslation();
  
  const categories = [
    { id: 'Entrées', name: t('menu.categories.starters'), icon: <Utensils size={20} /> },
    { id: 'Plats principaux', name: t('menu.categories.main_courses'), icon: <Flame size={20} /> },
    { id: 'Grillades', name: t('menu.categories.grills'), icon: <Flame size={20} /> },
    { id: 'Boissons', name: t('menu.categories.drinks'), icon: <Wine size={20} /> },
    { id: 'Desserts', name: t('menu.categories.desserts'), icon: <IceCream size={20} /> },
  ];

  const [activeCategory, setActiveCategory] = useState('Entrées');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'menu'), where('isAvailable', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const menuData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
      setItems(menuData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching menu:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredItems = items.filter(item => item.category === activeCategory);

  // Mock data if empty for demo
  const displayItems = filteredItems.length > 0 ? filteredItems : [
    { id: '1', name: 'Salade César Royale', description: 'Poulet grillé, croûtons, parmesan, sauce maison', price: 14, category: 'Entrées', imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: '2', name: 'Soupe à l\'Oignon', description: 'Traditionnelle soupe gratinée au fromage', price: 12, category: 'Entrées', imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400', isAvailable: true },
    { id: '3', name: 'Entrecôte Grillée', description: '300g de bœuf, frites maison, sauce au poivre', price: 28, category: 'Grillades', imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=400', isAvailable: true },
  ].filter(item => item.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl mb-6">{t('menu.title')}</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            {t('menu.subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
                activeCategory === cat.id
                  ? 'bg-gold border-gold text-ink'
                  : 'bg-white/5 border-white/10 text-white hover:border-gold/50'
              }`}
            >
              {cat.icon}
              <span className="font-medium">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {displayItems.length > 0 ? (
                displayItems.map((item) => (
                  <div key={item.id} className="glass-card p-4 flex gap-6 group hover:border-gold/30 transition-all">
                    <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-grow">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-serif">{item.name}</h3>
                          <span className="text-gold font-mono font-bold">{item.price}€</span>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-zinc-500">
                  {t('menu.no_items')}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
