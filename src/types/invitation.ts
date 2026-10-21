export interface InvitationConfig {
  babyName: string;
  parentsNames: string;
  welcomeCurvedText: string;
  mainBearTitle: string;
  subtitle: string;
  
  // Date details
  dayNumber: string;
  dayName: string;
  monthNumber: string;
  monthName: string;
  yearShort: string;
  fullDateTarget: string; // ISO date for countdown: 2026-11-29T14:00:00
  timeString: string;

  // Venue
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;

  // RSVP WhatsApp
  hostPhone: string;
  hostPhoneSecondary?: string;
  rsvpMessage: string;

  // Gifts
  giftNote: string;
  giftListUrl?: string;
  giftItems?: string[];
  closureTitle: string;
  closureText: string;
  rsvpInstruction?: string;

  // Custom audio
  musicUrl?: string;

  // Photo URLs (customizable with high quality defaults)
  parentPhoto1Url: string;
  parentPhoto2Url: string;
  ultrasoundPhotoUrl: string;
}

export interface GuestConfirmation {
  id: string;
  name: string;
  passes: number;
  message?: string;
  createdAt: string;
}
