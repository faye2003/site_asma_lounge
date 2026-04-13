import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Utensils, 
  Calendar, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X,
  TrendingUp,
  Users,
  Clock,
  Mail,
  Phone
} from 'lucide-react';
import { toast } from 'sonner';

// Sub-components for Dashboard
const DashboardHome = ({ reservations, menuItems, messages }: any) => {
  const stats = [
    { label: 'Réservations', value: reservations.length, icon: <Calendar />, color: 'text-blue-400' },
    { label: 'Plats au menu', value: menuItems.length, icon: <Utensils />, color: 'text-gold' },
    { label: 'Nouveaux messages', value: messages.length, icon: <MessageSquare />, color: 'text-green-400' },
    { label: 'Visiteurs (estimé)', value: '1.2k', icon: <TrendingUp />, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 flex items-center gap-6">
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-zinc-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
            <Clock size={20} className="text-gold" /> Réservations récentes
          </h3>
          <div className="space-y-4">
            {reservations.slice(0, 5).map((res: any) => (
              <div key={res.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <p className="font-medium">{res.name}</p>
                  <p className="text-xs text-zinc-500">{res.date} à {res.time} • {res.guests} pers.</p>
                </div>
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                  res.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {res.status}
                </span>
              </div>
            ))}
            {reservations.length === 0 && <p className="text-zinc-500 text-center py-4">Aucune réservation</p>}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
            <MessageSquare size={20} className="text-gold" /> Messages récents
          </h3>
          <div className="space-y-4">
            {messages.slice(0, 5).map((msg: any) => (
              <div key={msg.id} className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex justify-between mb-2">
                  <p className="font-medium text-sm">{msg.name}</p>
                  <p className="text-[10px] text-zinc-500">{msg.email}</p>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2">{msg.message}</p>
              </div>
            ))}
            {messages.length === 0 && <p className="text-zinc-500 text-center py-4">Aucun message</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuManagement = ({ items }: any) => {
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', price: 0, category: 'Plats principaux', description: '', imageUrl: '', isAvailable: true });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `menu/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setNewItem({ ...newItem, imageUrl: url });
      toast.success("Image téléchargée");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Erreur lors du téléchargement");
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.imageUrl) {
      toast.error("Veuillez ajouter une image");
      return;
    }
    try {
      await addDoc(collection(db, 'menu'), { ...newItem, createdAt: serverTimestamp() });
      setIsAdding(false);
      setNewItem({ name: '', price: 0, category: 'Plats principaux', description: '', imageUrl: '', isAvailable: true });
      toast.success("Plat ajouté au menu");
    } catch (error) {
      toast.error("Erreur lors de l'ajout");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Supprimer ce plat ?")) {
      await deleteDoc(doc(db, 'menu', id));
      toast.success("Plat supprimé");
    }
  };

  const toggleAvailability = async (id: string, current: boolean) => {
    await updateDoc(doc(db, 'menu', id), { isAvailable: !current });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif">Gestion du Menu</h2>
        <button onClick={() => setIsAdding(true)} className="btn-gold flex items-center gap-2 py-2">
          <Plus size={18} /> Ajouter un plat
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-6 overflow-hidden"
          >
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} placeholder="Nom du plat" className="input-field" required />
              <input type="number" value={newItem.price} onChange={e => setNewItem({...newItem, price: Number(e.target.value)})} placeholder="Prix" className="input-field" required />
              <select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="input-field">
                <option>Entrées</option>
                <option>Plats principaux</option>
                <option>Grillades</option>
                <option>Boissons</option>
                <option>Desserts</option>
              </select>
              <div className="space-y-2">
                <label className="text-xs text-zinc-500 block">Image du plat</label>
                <input type="file" onChange={handleImageUpload} className="input-field w-full text-xs" accept="image/*" />
                {uploading && <p className="text-[10px] text-gold animate-pulse">Téléchargement en cours...</p>}
                {newItem.imageUrl && <p className="text-[10px] text-green-400">Image prête ✓</p>}
              </div>
              <textarea value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} placeholder="Description" className="input-field md:col-span-2 h-24" />
              <div className="md:col-span-2 flex gap-4">
                <button type="submit" className="btn-gold flex-grow">Enregistrer</button>
                <button type="button" onClick={() => setIsAdding(false)} className="btn-outline">Annuler</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: any) => (
          <div key={item.id} className="glass-card overflow-hidden group">
            <div className="h-40 relative">
              <img src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => toggleAvailability(item.id, item.isAvailable)} className={`p-2 rounded-full ${item.isAvailable ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  <Check size={14} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold">{item.name}</h4>
                <span className="text-gold font-mono">{item.price}€</span>
              </div>
              <p className="text-xs text-zinc-500 line-clamp-2">{item.description}</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mt-3">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReservationManagement = ({ reservations }: any) => {
  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, 'reservations', id), { status });
    toast.success(`Réservation ${status}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Supprimer cette réservation ?")) {
      await deleteDoc(doc(db, 'reservations', id));
      toast.success("Réservation supprimée");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-serif">Réservations</h2>
      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 text-xs uppercase tracking-widest text-zinc-500">Client</th>
              <th className="p-4 text-xs uppercase tracking-widest text-zinc-500">Date & Heure</th>
              <th className="p-4 text-xs uppercase tracking-widest text-zinc-500">Pers.</th>
              <th className="p-4 text-xs uppercase tracking-widest text-zinc-500">Status</th>
              <th className="p-4 text-xs uppercase tracking-widest text-zinc-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res: any) => (
              <tr key={res.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <p className="font-medium">{res.name}</p>
                  <p className="text-xs text-zinc-500">{res.phone}</p>
                </td>
                <td className="p-4 text-sm">
                  {res.date} à {res.time}
                </td>
                <td className="p-4 text-sm">{res.guests}</td>
                <td className="p-4">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                    res.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 
                    res.status === 'cancelled' ? 'bg-red-500/20 text-red-400' : 
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {res.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  {res.status === 'pending' && (
                    <button onClick={() => updateStatus(res.id, 'confirmed')} className="p-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                      <Check size={14} />
                    </button>
                  )}
                  <button onClick={() => updateStatus(res.id, 'cancelled')} className="p-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors">
                    <X size={14} />
                  </button>
                  <button onClick={() => handleDelete(res.id)} className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reservations.length === 0 && <p className="text-center py-10 text-zinc-500">Aucune réservation trouvée</p>}
      </div>
    </div>
  );
};

const MessageManagement = ({ messages }: any) => {
  const handleDelete = async (id: string) => {
    if (window.confirm("Supprimer ce message ?")) {
      await deleteDoc(doc(db, 'messages', id));
      toast.success("Message supprimé");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-serif">Messages Clients</h2>
      <div className="grid grid-cols-1 gap-4">
        {messages.map((msg: any) => (
          <div key={msg.id} className="glass-card p-6 relative group">
            <button 
              onClick={() => handleDelete(msg.id)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={18} />
            </button>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold">
                {msg.name[0]}
              </div>
              <div>
                <h4 className="font-bold">{msg.name}</h4>
                <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Mail size={12} /> {msg.email}</span>
                  {msg.phone && <span className="flex items-center gap-1"><Phone size={12} /> {msg.phone}</span>}
                  <span className="flex items-center gap-1"><Clock size={12} /> {msg.createdAt?.toDate().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
              {msg.message}
            </p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-center py-20 text-zinc-500">Aucun message</p>}
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        navigate('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const qMenu = query(collection(db, 'menu'), orderBy('createdAt', 'desc'));
    const qRes = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
    const qMsg = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

    const unsubMenu = onSnapshot(qMenu, (s) => setMenuItems(s.docs.map(d => ({ id: d.id, ...d.data() } as any))));
    const unsubRes = onSnapshot(qRes, (s) => setReservations(s.docs.map(d => ({ id: d.id, ...d.data() } as any))));
    const unsubMsg = onSnapshot(qMsg, (s) => setMessages(s.docs.map(d => ({ id: d.id, ...d.data() } as any))));

    return () => {
      unsubMenu();
      unsubRes();
      unsubMsg();
    };
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-zinc-950 text-gold">Chargement...</div>;

  const sidebarLinks = [
    { name: 'Tableau de bord', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Menu', path: '/admin/menu', icon: <Utensils size={20} /> },
    { name: 'Réservations', path: '/admin/reservations', icon: <Calendar size={20} /> },
    { name: 'Galerie', path: '/admin/gallery', icon: <ImageIcon size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
    { name: 'Paramètres', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-white/5 p-6 hidden md:flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-ink font-bold">
            {user?.email?.[0].toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{user?.email}</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Administrateur</p>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === link.path ? 'bg-gold text-ink font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.icon}
              <span className="text-sm">{link.name}</span>
            </Link>
          ))}
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-auto">
          <LogOut size={20} />
          <span className="text-sm">Déconnexion</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardHome reservations={reservations} menuItems={menuItems} messages={messages} />} />
          <Route path="/menu" element={<MenuManagement items={menuItems} />} />
          <Route path="/reservations" element={<ReservationManagement reservations={reservations} />} />
          <Route path="/gallery" element={<div className="text-center py-20 text-zinc-500">Gestion de la galerie (Bientôt disponible)</div>} />
          <Route path="/messages" element={<MessageManagement messages={messages} />} />
          <Route path="/settings" element={<div className="text-center py-20 text-zinc-500">Paramètres du restaurant (Bientôt disponible)</div>} />
        </Routes>
      </main>
    </div>
  );
}
