import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'sonner';
import { Calendar, Users, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const reservationSchema = z.object({
  name: z.string().min(2, "Le nom est trop court"),
  email: z.string().email("Email invalide"),
  phone: z.string()
    .transform(v => v.replace(/\s+/g, ''))
    .refine(v => {
      const senegalPhoneRegex = /^(?:\+221|00221)?(7[05678]|33)\d{7}$/;
      return senegalPhoneRegex.test(v);
    }, "Numéro de téléphone invalide (Sénégal)"),
  date: z.string().min(1, "Veuillez choisir une date"),
  time: z.string().min(1, "Veuillez choisir une heure"),
  guests: z.number().min(1, "Minimum 1 personne").max(20, "Maximum 20 personnes"),
  message: z.string().optional(),
});

type ReservationForm = z.infer<typeof reservationSchema>;

export default function Reservation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2
    }
  });

  const onSubmit = async (data: ReservationForm) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reservations'), {
        ...data,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      toast.success(t('reservation.success_message'));
      reset();
    } catch (error) {
      console.error("Error submitting reservation:", error);
      toast.error(t('reservation.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-zinc-950 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center text-gold mx-auto mb-8">
            <Calendar size={40} />
          </div>
          <h1 className="text-4xl mb-6">{t('reservation.success_title')}</h1>
          <p className="text-zinc-400 mb-10 leading-relaxed">
            {t('reservation.success_message')}
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="btn-gold w-full"
          >
            {t('reservation.success_button')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-5xl md:text-7xl mb-8">{t('reservation.title')}</h1>
          <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
            {t('reservation.subtitle')}
          </p>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-xl mb-1">{t('reservation.info_phone')}</h4>
                <p className="text-zinc-400">+221 33 957 00 00</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-xl mb-1">{t('reservation.info_email')}</h4>
                <p className="text-zinc-400">reservations@asmalounge.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 md:p-12"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <User size={14} /> {t('reservation.form_name')}
                </label>
                <input
                  {...register('name')}
                  className="input-field w-full"
                  placeholder={t('reservation.form_placeholder_name')}
                />
                {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Mail size={14} /> {t('reservation.form_email')}
                </label>
                <input
                  {...register('email')}
                  className="input-field w-full"
                  placeholder={t('reservation.form_placeholder_email')}
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Phone size={14} /> {t('reservation.form_phone')}
                </label>
                <input
                  {...register('phone')}
                  className="input-field w-full"
                  placeholder={t('reservation.form_placeholder_phone')}
                />
                {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Users size={14} /> {t('reservation.form_guests')}
                </label>
                <input
                  type="number"
                  {...register('guests', { valueAsNumber: true })}
                  className="input-field w-full"
                />
                {errors.guests && <p className="text-red-400 text-xs">{errors.guests.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Calendar size={14} /> {t('reservation.form_date')}
                </label>
                <input
                  type="date"
                  {...register('date')}
                  className="input-field w-full"
                />
                {errors.date && <p className="text-red-400 text-xs">{errors.date.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Clock size={14} /> {t('reservation.form_time')}
                </label>
                <select {...register('time')} className="input-field w-full">
                  <option value="">{t('reservation.form_select_time')}</option>
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30</option>
                  <option value="20:00">20:00</option>
                  <option value="20:30">20:30</option>
                  <option value="21:00">21:00</option>
                </select>
                {errors.time && <p className="text-red-400 text-xs">{errors.time.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <MessageSquare size={14} /> {t('reservation.form_message')}
              </label>
              <textarea
                {...register('message')}
                className="input-field w-full h-32 resize-none"
                placeholder={t('reservation.form_placeholder_message')}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold w-full py-4 text-lg"
            >
              {isSubmitting ? t('reservation.form_sending') : t('reservation.form_submit')}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
