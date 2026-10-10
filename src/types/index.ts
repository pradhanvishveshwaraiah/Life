export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type UrgencyLevel = 'immediate' | '24_hours' | '2_3_days' | 'planning';

export type RequestStatus = 'open' | 'contacted' | 'fulfilled' | 'closed';

export type DonorAvailability = 'available' | 'donated_recently' | 'temporarily_unavailable';

export interface User {
  id: string;
  email: string;
  displayName: string;
  phone?: string;
  bloodGroup?: BloodGroup;
  city?: string;
  createdAt: string;
}

export interface BloodRequest {
  id: string;
  requesterEmail: string;
  patientName: string;
  bloodGroup: BloodGroup;
  unitsRequired: number;
  city: string;
  locality: string;
  hospitalName: string;
  urgency: UrgencyLevel;
  notes?: string;
  contactPhone: string;
  whatsappEnabled: boolean;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DonorListing {
  id: string;
  userId?: string;
  displayName: string;
  bloodGroup: BloodGroup;
  city: string;
  locality: string;
  phone: string;
  whatsappConsent: boolean;
  availabilityStatus: DonorAvailability;
  verified: boolean;
  lastDonationDate?: string;
  totalDonations?: number;
  updatedAt: string;
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  locality: string;
  address: string;
  hospitalType: 'Multispecialty' | 'Super-specialty' | 'Government' | 'Private' | 'Charitable';
  specialties: string[];
  services: string[];
  phone: string;
  emergencyHotline: string;
  website?: string;
  rating: number;
  reviewCount: number;
  ratingSource: string;
  lat: number;
  lng: number;
  bloodBankAvailable: boolean;
  ambulanceAvailable: boolean;
  emergency24x7: boolean;
  icuAvailable: boolean;
  bedsCount?: number;
}
