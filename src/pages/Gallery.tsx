import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { X, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export default function Gallery() {
  const { t } = useTranslation();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', name: t('gallery.filters.all') },
    { id: 'restaurant', name: t('gallery.filters.restaurant') },
    { id: 'food', name: t('gallery.filters.food') },
    { id: 'ambiance', name: t('gallery.filters.ambiance') },
    { id: 'events', name: t('gallery.filters.events') },
  ];

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const galleryData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
      setImages(galleryData);
    });

    return () => unsubscribe();
  }, []);

  // Mock data for demo
  const displayImages = images.length > 0 ? images : [
    { id: '1', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', caption: 'Notre salle principale', category: 'restaurant' },
    { id: '2', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800', caption: 'Ambiance tamisée', category: 'ambiance' },
    { id: '3', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800', caption: 'Plat signature', category: 'food' },
    { id: '4', url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800', caption: 'Cuisine ouverte', category: 'restaurant' },
    { id: '5', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800', caption: 'Détails culinaires', category: 'food' },
    { id: '6', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800', caption: 'Service d\'exception', category: 'ambiance' },
  ];

  const filteredImages = filter === 'all' ? displayImages : displayImages.filter(img => img.category === filter);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl mb-6">{t('gallery.title')}</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2 rounded-full border transition-all uppercase text-xs tracking-widest font-medium ${
                filter === cat.id
                  ? 'bg-gold border-gold text-ink'
                  : 'bg-white/5 border-white/10 text-white hover:border-gold/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img) => (
            <motion.div
              layout
              key={img.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 text-center">
                <ZoomIn className="text-gold mb-4" size={32} />
                <p className="text-white font-serif text-lg">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-gold transition-colors">
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="max-w-full max-h-full object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-10 left-0 right-0 text-center">
              <p className="text-white font-serif text-2xl">{selectedImage.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
