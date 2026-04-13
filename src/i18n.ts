import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        menu: 'Menu',
        reservation: 'Réservation',
        gallery: 'Galerie',
        about: 'À Propos',
        contact: 'Contact',
        reserve: 'Réserver'
      },
      footer: {
        description: "Une expérience culinaire d'exception où tradition et modernité se rencontrent. Savourez nos spécialités dans une ambiance élégante et raffinée.",
        contact: 'Contact',
        hours: 'Horaires',
        rights: 'Tous droits réservés.',
        payment: 'Moyens de paiement'
      },
      common: {
        mon_fri: 'Lun - Ven',
        sat: 'Samedi',
        sun: 'Dimanche',
        closed: 'Fermé',
        discover_menu: 'Découvrir la carte',
        book_table: 'Réserver une table'
      },
      home: {
        hero_subtitle: 'Saly, Sénégal',
        hero_title: "L'excellence culinaire au cœur de Saly",
        about_title: "Une oasis de saveurs à Saly Portudal",
        about_p1: "Asma Lounge vous accueille dans un cadre idyllique à Saly, Sénégal. Notre restaurant est une invitation au voyage, mêlant l'élégance d'un lounge moderne à la chaleur de l'hospitalité sénégalaise.",
        about_p2: "Que ce soit pour un déjeuner d'affaires, un dîner romantique ou une soirée entre amis, nous vous offrons une expérience gastronomique inégalée avec des produits frais et une créativité sans limite.",
        specialties_title: 'Nos Spécialités',
        specialties_subtitle: 'Une fusion de saveurs locales et internationales'
      },
      about: {
        subtitle: 'Notre Histoire',
        title: 'Une passion pour l\'excellence',
        p1: 'Fondé en 2015, Asma Lounge est né d\'une volonté simple : créer un lieu où la gastronomie rencontre l\'art de vivre. Ce qui n\'était au départ qu\'un petit établissement familial est devenu une référence incontournable pour les amateurs de cuisine raffinée.',
        p2: 'Notre nom, "Asma", symbolise la pureté et l\'élévation, des valeurs qui guident chaque aspect de notre service, de la sélection des ingrédients à la présentation finale de nos plats.',
        mission: 'Notre Mission',
        mission_text: 'Offrir une expérience culinaire mémorable en sublimant les produits du terroir avec créativité et respect des traditions.',
        vision: 'Notre Vision',
        vision_text: 'Devenir l\'ambassadeur d\'une gastronomie moderne et responsable, reconnue pour son excellence et son authenticité.',
        values: 'Nos Valeurs',
        values_text: 'Qualité, intégrité, passion et hospitalité sont les piliers sur lesquels repose chaque interaction avec nos clients.',
        team_title: 'L\'équipe derrière le goût'
      },
      contact: {
        title: 'Contactez-nous',
        subtitle: 'Une question, une suggestion ou une demande particulière ? Notre équipe est à votre écoute.',
        info_title: 'Coordonnées',
        address: 'Adresse',
        phone: 'Téléphone',
        email: 'Email',
        hours_title: 'Horaires d\'ouverture',
        form_name: 'Nom complet',
        form_email: 'Email',
        form_phone: 'Téléphone (optionnel)',
        form_message: 'Votre message',
        form_placeholder_name: 'Votre nom',
        form_placeholder_email: 'votre@email.com',
        form_placeholder_phone: '06 12 34 56 78',
        form_placeholder_message: 'Comment pouvons-nous vous aider ?',
        form_submit: 'Envoyer le message',
        form_sending: 'Envoi en cours...',
        success: 'Votre message a été envoyé avec succès.',
        error: 'Une erreur est survenue lors de l\'envoi.'
      },
      menu: {
        title: 'Notre Carte',
        subtitle: 'Découvrez une sélection de plats raffinés préparés avec passion par notre chef et son équipe.',
        no_items: 'Aucun plat disponible dans cette catégorie pour le moment.',
        categories: {
          starters: 'Entrées',
          main_courses: 'Plats principaux',
          grills: 'Grillades',
          drinks: 'Boissons',
          desserts: 'Desserts'
        }
      },
      reservation: {
        title: 'Réserver une table',
        subtitle: 'Vivez une expérience culinaire unique. Pour les groupes de plus de 10 personnes, veuillez nous contacter directement par téléphone.',
        info_phone: 'Téléphone',
        info_email: 'Email',
        form_name: 'Nom complet',
        form_email: 'Email',
        form_phone: 'Téléphone',
        form_guests: 'Nombre de personnes',
        form_date: 'Date',
        form_time: 'Heure',
        form_message: 'Message (optionnel)',
        form_placeholder_name: 'Jean Dupont',
        form_placeholder_email: 'jean@example.com',
        form_placeholder_phone: '06 12 34 56 78',
        form_placeholder_message: 'Demandes particulières, allergies...',
        form_select_time: 'Choisir une heure',
        form_submit: 'Confirmer la réservation',
        form_sending: 'Envoi en cours...',
        success_title: 'Merci !',
        success_message: 'Votre demande de réservation a été envoyée avec succès. Notre équipe vous contactera prochainement par email ou téléphone pour confirmer votre table.',
        success_button: 'Faire une autre réservation',
        error: 'Une erreur est survenue lors de la réservation.'
      },
      gallery: {
        title: 'Galerie',
        subtitle: 'Plongez dans l\'univers d\'Asma Lounge à travers nos photos.',
        filters: {
          all: 'Tout',
          restaurant: 'Restaurant',
          food: 'Cuisine',
          ambiance: 'Ambiance',
          events: 'Événements'
        }
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        menu: 'Menu',
        reservation: 'Reservation',
        gallery: 'Gallery',
        about: 'About',
        contact: 'Contact',
        reserve: 'Book a Table'
      },
      footer: {
        description: "An exceptional culinary experience where tradition and modernity meet. Savor our specialties in an elegant and refined atmosphere.",
        contact: 'Contact',
        hours: 'Opening Hours',
        rights: 'All rights reserved.',
        payment: 'Payment Methods'
      },
      common: {
        mon_fri: 'Mon - Fri',
        sat: 'Saturday',
        sun: 'Sunday',
        closed: 'Closed',
        discover_menu: 'Discover the Menu',
        book_table: 'Book a Table'
      },
      home: {
        hero_subtitle: 'Saly, Senegal',
        hero_title: "Culinary excellence in the heart of Saly",
        about_title: "An oasis of flavors in Saly Portudal",
        about_p1: "Asma Lounge welcomes you to an idyllic setting in Saly, Senegal. Our restaurant is an invitation to travel, blending the elegance of a modern lounge with the warmth of Senegalese hospitality.",
        about_p2: "Whether for a business lunch, a romantic dinner, or an evening with friends, we offer an unparalleled gastronomic experience with fresh products and limitless creativity.",
        specialties_title: 'Our Specialties',
        specialties_subtitle: 'A fusion of local and international flavors'
      },
      about: {
        subtitle: 'Our Story',
        title: 'A passion for excellence',
        p1: 'Founded in 2015, Asma Lounge was born from a simple desire: to create a place where gastronomy meets the art of living. What started as a small family establishment has become an essential reference for lovers of refined cuisine.',
        p2: 'Our name, "Asma", symbolizes purity and elevation, values that guide every aspect of our service, from the selection of ingredients to the final presentation of our dishes.',
        mission: 'Our Mission',
        mission_text: 'To offer a memorable culinary experience by sublimating local products with creativity and respect for traditions.',
        vision: 'Our Vision',
        vision_text: 'To become the ambassador of a modern and responsible gastronomy, recognized for its excellence and authenticity.',
        values: 'Our Values',
        values_text: 'Quality, integrity, passion, and hospitality are the pillars upon which every interaction with our customers rests.',
        team_title: 'The team behind the taste'
      },
      contact: {
        title: 'Contact Us',
        subtitle: 'A question, a suggestion or a special request? Our team is at your disposal.',
        info_title: 'Contact Details',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        hours_title: 'Opening Hours',
        form_name: 'Full Name',
        form_email: 'Email',
        form_phone: 'Phone (optional)',
        form_message: 'Your message',
        form_placeholder_name: 'Your name',
        form_placeholder_email: 'your@email.com',
        form_placeholder_phone: '06 12 34 56 78',
        form_placeholder_message: 'How can we help you?',
        form_submit: 'Send message',
        form_sending: 'Sending...',
        success: 'Your message has been sent successfully.',
        error: 'An error occurred while sending.'
      },
      menu: {
        title: 'Our Menu',
        subtitle: 'Discover a selection of refined dishes prepared with passion by our chef and his team.',
        no_items: 'No dishes available in this category at the moment.',
        categories: {
          starters: 'Starters',
          main_courses: 'Main Courses',
          grills: 'Grills',
          drinks: 'Drinks',
          desserts: 'Desserts'
        }
      },
      reservation: {
        title: 'Book a Table',
        subtitle: 'Experience a unique culinary journey. For groups of more than 10 people, please contact us directly by phone.',
        info_phone: 'Phone',
        info_email: 'Email',
        form_name: 'Full Name',
        form_email: 'Email',
        form_phone: 'Phone',
        form_guests: 'Number of people',
        form_date: 'Date',
        form_time: 'Time',
        form_message: 'Message (optional)',
        form_placeholder_name: 'John Doe',
        form_placeholder_email: 'john@example.com',
        form_placeholder_phone: '06 12 34 56 78',
        form_placeholder_message: 'Special requests, allergies...',
        form_select_time: 'Choose a time',
        form_submit: 'Confirm reservation',
        form_sending: 'Sending...',
        success_title: 'Thank you!',
        success_message: 'Your reservation request has been sent successfully. Our team will contact you shortly by email or phone to confirm your table.',
        success_button: 'Make another reservation',
        error: 'An error occurred during reservation.'
      },
      gallery: {
        title: 'Gallery',
        subtitle: 'Immerse yourself in the world of Asma Lounge through our photos.',
        filters: {
          all: 'All',
          restaurant: 'Restaurant',
          food: 'Food',
          ambiance: 'Ambiance',
          events: 'Events'
        }
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        menu: 'Menú',
        reservation: 'Reserva',
        gallery: 'Galería',
        about: 'Sobre Nosotros',
        contact: 'Contacto',
        reserve: 'Reservar'
      },
      footer: {
        description: "Una experiencia culinaria excepcional donde la tradición y la modernidad se encuentran. Saboree nuestras especialidades en un ambiente elegante y refinado.",
        contact: 'Contacto',
        hours: 'Horarios',
        rights: 'Todos los derechos reservados.',
        payment: 'Métodos de pago'
      },
      common: {
        mon_fri: 'Lun - Vie',
        sat: 'Sábado',
        sun: 'Domingo',
        closed: 'Cerrado',
        discover_menu: 'Descubrir el Menú',
        book_table: 'Reservar una mesa'
      },
      home: {
        hero_subtitle: 'Saly, Senegal',
        hero_title: "Excelencia culinaria en el corazón de Saly",
        about_title: "Un oasis de sabores en Saly Portudal",
        about_p1: "Asma Lounge le da la bienvenida a un entorno idílico en Saly, Senegal. Nuestro restaurante es una invitación a viajar, mezclando la elegancia de un lounge moderno con la calidez de la hospitalidad senegalesa.",
        about_p2: "Ya sea para un almuerzo de negocios, una cena romántica o una noche con amigos, le ofrecemos una experiencia gastronómica inigualable con productos frescos y una creatividad sin límites.",
        specialties_title: 'Nuestras Especialidades',
        specialties_subtitle: 'Una fusión de sabores locales e internacionales'
      },
      about: {
        subtitle: 'Nuestra Historia',
        title: 'Una pasión por la excelencia',
        p1: 'Fundado en 2015, Asma Lounge nació de un deseo sencillo: crear un lugar donde la gastronomía se encuentre con el arte de vivir. Lo que comenzó como un pequeño establecimiento familiar se ha convertido en una referencia imprescindible para los amantes de la cocina refinada.',
        p2: 'Nuestro nombre, "Asma", simboliza la pureza y la elevación, valores que guían cada aspecto de nuestro servicio, desde la selección de ingredientes hasta la presentación final de nuestros platos.',
        mission: 'Nuestra Misión',
        mission_text: 'Ofrecer una experiencia culinaria memorable sublimando los productos locales con creatividad y respeto por las tradiciones.',
        vision: 'Nuestra Visión',
        vision_text: 'Convertirnos en el embajador de una gastronomía moderna y responsable, reconocida por su excelencia y autenticidad.',
        values: 'Nuestros Valores',
        values_text: 'Calidad, integridad, pasión y hospitalidad son los pilares sobre los que descansa cada interacción con nuestros clientes.',
        team_title: 'El equipo detrás del sabor'
      },
      contact: {
        title: 'Contáctenos',
        subtitle: '¿Una pregunta, una sugerencia o una petición especial? Nuestro equipo está a su disposición.',
        info_title: 'Datos de contacto',
        address: 'Dirección',
        phone: 'Teléfono',
        email: 'Correo electrónico',
        hours_title: 'Horarios de apertura',
        form_name: 'Nombre completo',
        form_email: 'Correo electrónico',
        form_phone: 'Teléfono (opcional)',
        form_message: 'Su mensaje',
        form_placeholder_name: 'Su nombre',
        form_placeholder_email: 'su@email.com',
        form_placeholder_phone: '06 12 34 56 78',
        form_placeholder_message: '¿Cómo podemos ayudarle?',
        form_submit: 'Enviar mensaje',
        form_sending: 'Enviando...',
        success: 'Su mensaje ha sido enviado con éxito.',
        error: 'Se ha producido un error al enviar.'
      },
      menu: {
        title: 'Nuestra Carta',
        subtitle: 'Descubra una selección de platos refinados preparados con pasión por nuestro chef y su equipo.',
        no_items: 'No hay platos disponibles en esta categoría por el momento.',
        categories: {
          starters: 'Entrantes',
          main_courses: 'Platos principales',
          grills: 'Parrilladas',
          drinks: 'Bebidas',
          desserts: 'Postres'
        }
      },
      reservation: {
        title: 'Reservar una mesa',
        subtitle: 'Viva una experiencia culinaria única. Para grupos de más de 10 personas, póngase en contacto con nosotros directamente por teléfono.',
        info_phone: 'Teléfono',
        info_email: 'Correo electrónico',
        form_name: 'Nombre completo',
        form_email: 'Correo electrónico',
        form_phone: 'Teléfono',
        form_guests: 'Número de personas',
        form_date: 'Fecha',
        form_time: 'Hora',
        form_message: 'Mensaje (opcional)',
        form_placeholder_name: 'Juan Pérez',
        form_placeholder_email: 'juan@example.com',
        form_placeholder_phone: '06 12 34 56 78',
        form_placeholder_message: 'Peticiones especiales, alergias...',
        form_select_time: 'Elegir una hora',
        form_submit: 'Confirmar reserva',
        form_sending: 'Enviando...',
        success_title: '¡Gracias!',
        success_message: 'Su solicitud de reserva ha sido enviada con éxito. Nuestro equipo se pondrá en contacto con usted en breve por correo electrónico o teléfono para confirmar su mesa.',
        success_button: 'Hacer otra reserva',
        error: 'Se ha producido un error durante la reserva.'
      },
      gallery: {
        title: 'Galería',
        subtitle: 'Sumérjase en el universo de Asma Lounge a través de nuestras fotos.',
        filters: {
          all: 'Todo',
          restaurant: 'Restaurante',
          food: 'Cocina',
          ambiance: 'Ambiente',
          events: 'Eventos'
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
