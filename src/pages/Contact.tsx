import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, Clock, Send, User, MessageSquare } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("Email invalide"),
  phone: z.string()
    .optional()
    .transform(v => v ? v.replace(/\s+/g, '') : v)
    .refine(v => {
      if (!v) return true;
      const senegalPhoneRegex = /^(?:\+221|00221)?(7[05678]|33)\d{7}$/;
      return senegalPhoneRegex.test(v);
    }, "Numéro de téléphone invalide (Sénégal)"),
  message: z.string().min(10, "Le message est trop court"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'messages'), {
        ...data,
        createdAt: serverTimestamp(),
      });
      toast.success(t('contact.success'));
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl mb-6">{t('contact.title')}</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-serif mb-8 text-gold">{t('contact.info_title')}</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="text-gold shrink-0" size={24} />
                  <div>
                    <p className="font-medium">{t('contact.address')}</p>
                    <p className="text-zinc-400">Saly, Sénégal (Près de la station Shell)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-gold shrink-0" size={24} />
                  <div>
                    <p className="font-medium">{t('contact.phone')}</p>
                    <p className="text-zinc-400">+221 33 957 00 00</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-gold shrink-0" size={24} />
                  <div>
                    <p className="font-medium">{t('contact.email')}</p>
                    <p className="text-zinc-400">contact@asmalounge.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-serif mb-8 text-gold">{t('contact.hours_title')}</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-zinc-400">
                  <span>{t('common.mon_fri')}</span>
                  <span className="text-white">12:00 - 23:00</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>{t('common.sat')}</span>
                  <span className="text-white">12:00 - 00:00</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>{t('common.sun')}</span>
                  <span className="text-red-400">{t('common.closed')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 md:p-12"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                      <User size={14} /> {t('contact.form_name')}
                    </label>
                    <input
                      {...register('name')}
                      className="input-field w-full"
                      placeholder={t('contact.form_placeholder_name')}
                    />
                    {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                      <Mail size={14} /> {t('contact.form_email')}
                    </label>
                    <input
                      {...register('email')}
                      className="input-field w-full"
                      placeholder={t('contact.form_placeholder_email')}
                    />
                    {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <Phone size={14} /> {t('contact.form_phone')}
                  </label>
                  <input
                    {...register('phone')}
                    className="input-field w-full"
                    placeholder={t('contact.form_placeholder_phone')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <MessageSquare size={14} /> {t('contact.form_message')}
                  </label>
                  <textarea
                    {...register('message')}
                    className="input-field w-full h-48 resize-none"
                    placeholder={t('contact.form_placeholder_message')}
                  />
                  {errors.message && <p className="text-red-400 text-xs">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full py-4 flex items-center justify-center gap-3 text-lg"
                >
                  {isSubmitting ? t('contact.form_sending') : (
                    <>
                      {t('contact.form_submit')} <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-24 h-[500px] rounded-3xl overflow-hidden border border-white/10 grayscale contrast-125">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.568434789547!2d-17.0059251!3d14.4446482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec18b98dd5c9c6b%3A0xd6b9ca8fde097274!2sAsma%20Lounge!5e0!3m2!1sfr!2sfr!4v1711900000000!5m2!1sfr!2sfr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
