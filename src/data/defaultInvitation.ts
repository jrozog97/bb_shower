import { InvitationConfig } from '../types/invitation';

export const defaultInvitationConfig: InvitationConfig = {
  babyName: 'Benjamín',
  parentsNames: 'Alejandra y Andrés',
  welcomeCurvedText: '¡Un hermoso bebé está a punto de llegar!',
  mainBearTitle: 'Apenas podemos esperar tu llegada',
  subtitle: 'Mientras Diosito prepara el día de mi llegada con mucho amor...',
  
  dayNumber: '29',
  dayName: 'Domingo',
  monthNumber: '11',
  monthName: 'Noviembre',
  yearShort: '26',
  fullDateTarget: '2026-11-29T14:00:00',
  timeString: '2:00 PM a 7:00 PM',

  venueName: 'Salón San Juan Suba',
  venueAddress: 'Calle 151b # 103f-41',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Calle+151b+%23+103f-41+Suba+Bogota',

  hostPhone: '573163366206',
  rsvpMessage: '¡Hola Alejandra y Andrés! Me encantaría confirmar mi asistencia al Baby Shower de Benjamín 🧸✨',

  giftNote: 'Tu presencia es nuestro regalo más valioso. Si deseas tener un detalle para consentir a Benjamín, te agradecemos mucho tu cariño:',
  giftItems: [
    '✉️ Lluvia de Sobres (Aporte para el ajuar de Benjamín en el cofre del salón)',
    '🍼 Pañales etapas 1, 2 y 3',
    '🌿 Toallitas húmedas para recién nacido',
    '🧸 Ropita suave de 0 a 6 meses',
  ],
  closureTitle: 'Te Esperamos',
  closureText: 'Con mucho amor',

  // Curated high-aesthetic soft photography
  parentPhoto1Url: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=700&q=80',
  parentPhoto2Url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=700&q=80',
  ultrasoundPhotoUrl: '/assets/aistudio/image_067f9cf5.png',
};
