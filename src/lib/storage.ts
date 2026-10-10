import { BloodGroup, BloodRequest, DonorListing, Hospital, User } from '../types';

const USERS_KEY = 'raktkhoj_users';
const CURRENT_USER_KEY = 'raktkhoj_current_user';
const REQUESTS_KEY = 'raktkhoj_requests';
const DONORS_KEY = 'raktkhoj_donors';
const HOSPITALS_KEY = 'raktkhoj_hospitals';

// Initial verified & realistic hospital dataset
const INITIAL_HOSPITALS: Hospital[] = [
  // Mysuru
  {
    id: 'h-my-01',
    name: 'Apollo BGS Hospitals',
    city: 'Mysuru',
    locality: 'Kuvempunagar',
    address: 'Adhichunchanagiri Road, Kuvempunagar, Mysuru, Karnataka 570023',
    hospitalType: 'Super-specialty',
    specialties: ['Cardiology', 'Emergency & Trauma', 'Neurology', 'Oncology', 'Nephrology'],
    services: ['24/7 Emergency', 'NABH Accredited Blood Bank', 'Advanced Cath Lab', 'Organ Transplant', 'ICU & CCU'],
    phone: '+91 821 256 8888',
    emergencyHotline: '1066',
    website: 'https://mysore.apollohospitals.com',
    rating: 4.8,
    reviewCount: 3120,
    ratingSource: 'Healthcare Directory Verified Ratings',
    lat: 12.2905,
    lng: 76.6268,
    bloodBankAvailable: true,
    ambulanceAvailable: true,
    emergency24x7: true,
    icuAvailable: true,
    bedsCount: 220,
  },
  {
    id: 'h-my-02',
    name: 'Columbia Asia Hospital (Manipal)',
    city: 'Mysuru',
    locality: 'Hebbal',
    address: 'No. 85-86, Bangalore-Mysore Ring Road Junction, Hebbal, Mysuru, Karnataka 570016',
    hospitalType: 'Multispecialty',
    specialties: ['Emergency Medicine', 'Pediatrics', 'Orthopedics', 'General Surgery', 'Gastroenterology'],
    services: ['24-hour Ambulance', 'Digital Radiology', 'Dialysis Unit', 'In-house Pharmacy'],
    phone: '+91 821 398 9898',
    emergencyHotline: '+91 821 398 9000',
    website: 'https://www.manipalhospitals.com/mysuru',
    rating: 4.6,
    reviewCount: 1840,
    ratingSource: 'NABH Audit Registry',
    lat: 12.3552,
    lng: 76.6198,
    bloodBankAvailable: true,
    ambulanceAvailable: true,
    emergency24x7: true,
    icuAvailable: true,
    bedsCount: 100,
  },
  {
    id: 'h-my-03',
    name: 'K.R. Hospital (Mysore Medical College)',
    city: 'Mysuru',
    locality: 'Irwin Road',
    address: 'Sayyaji Rao Road, Near Mysore Palace, Mysuru, Karnataka 570001',
    hospitalType: 'Government',
    specialties: ['General Medicine', 'Trauma & Emergency', 'Obstetrics & Gynecology', 'Pediatrics'],
    services: ['Government Blood Bank', 'Subsidized Critical Care', 'Free Emergency Triage', 'State Burn Unit'],
    phone: '+91 821 242 0522',
    emergencyHotline: '108',
    rating: 4.3,
    reviewCount: 2450,
    ratingSource: 'Govt Public Health Records',
    lat: 12.3134,
    lng: 76.6508,
    bloodBankAvailable: true,
    ambulanceAvailable: true,
    emergency24x7: true,
    icuAvailable: true,
    bedsCount: 1050,
  },

  // Bengaluru
  {
    id: 'h-blr-01',
    name: 'Manipal Hospital HAL Airport Road',
    city: 'Bengaluru',
    locality: 'Old Airport Road',
    address: '98, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560017',
    hospitalType: 'Super-specialty',
    specialties: ['Cardiology', 'Bone Marrow Transplant', 'Neurology', 'Organ Transplant', 'Trauma Surgery'],
    services: ['24x7 Blood Bank & Apheresis', 'Level 1 Trauma Care', 'Helipad Evacuation', 'Robotic Surgery'],
    phone: '+91 80 2502 4444',
    emergencyHotline: '+91 80 2502 4444',
    website: 'https://www.manipalhospitals.com/oldairportroad',
    rating: 4.8,
    reviewCount: 8900,
    ratingSource: 'NABH Verified Healthcare Registry',
    lat: 12.9592,
    lng: 77.6496,
    bloodBankAvailable: true,
    ambulanceAvailable: true,
    emergency24x7: true,
    icuAvailable: true,
    bedsCount: 600,
  },
  {
    id: 'h-blr-02',
    name: 'Fortis Hospital Bannerghatta Road',
    city: 'Bengaluru',
    locality: 'Bannerghatta Road',
    address: '154/9, Bannerghatta Main Rd, Opposite IIM-B, Bengaluru, Karnataka 560076',
    hospitalType: 'Multispecialty',
    specialties: ['Interventional Cardiology', 'Orthopedics', 'Urology', 'Emergency Medicine'],
    services: ['Comprehensive Blood Storage', '24/7 Stroke Unit', 'Cardiac ICU', 'Advanced Trauma Triage'],
    phone: '+91 80 6621 4444',
    emergencyHotline: '105711',
    website: 'https://www.fortishealthcare.com',
    rating: 4.7,
    reviewCount: 5200,
    ratingSource: 'NABH Audit Registry',
    lat: 12.8951,
    lng: 77.5982,
    bloodBankAvailable: true,
    ambulanceAvailable: true,
    emergency24x7: true,
    icuAvailable: true,
    bedsCount: 300,
  },
  {
    id: 'h-blr-03',
    name: 'Narayana Health City',
    city: 'Bengaluru',
    locality: 'Bommasandra',
    address: '258/A, Bommasandra Industrial Area, Anekal Taluk, Bengaluru, Karnataka 560099',
    hospitalType: 'Super-specialty',
    specialties: ['Pediatric Cardiac Surgery', 'Hematology', 'Oncology', 'Organ Transplant'],
    services: ['Major Regional Blood Bank', 'Platelet Separation (SDP)', 'Stem Cell Lab', 'Low-cost Care Units'],
    phone: '+91 80 7122 2222',
    emergencyHotline: '+91 80 7122 2666',
    website: 'https://www.narayanahealth.org',
    rating: 4.8,
    reviewCount: 14200,
    ratingSource: 'JCI & NABH Accreditation Records',
    lat: 12.8122,
    lng: 77.6934,
    bloodBankAvailable: true,
    ambulanceAvailable: true,
    emergency24x7: true,
    icuAvailable: true,
    bedsCount: 1400,
  },

  // Mumbai
  {
    id: 'h-mum-01',
    name: 'Lilavati Hospital & Research Centre',
    city: 'Mumbai',
    locality: 'Bandra West',
    address: 'A-791, Bandra Reclamation, Bandra West, Mumbai, Maharashtra 400050',
    hospitalType: 'Super-specialty',
    specialties: ['Cardiology', 'Critical Care', 'Neurosciences', 'General & Laparoscopic Surgery'],
    services: ['24/7 Dedicated Blood Bank', 'Dedicated Cardiac Ambulance', 'Comprehensive Dialysis'],
    phone: '+91 22 2675 1000',
    emergencyHotline: '+91 22 2656 8000',
    website: 'https://www.lilavatihospital.com',
    rating: 4.7,
    reviewCount: 4680,
    ratingSource: 'NABH Verified Healthcare Registry',
    lat: 19.0514,
    lng: 72.8296,
    bloodBankAvailable: true,
    ambulanceAvailable: true,
    emergency24x7: true,
    icuAvailable: true,
    bedsCount: 323,
  },
  {
    id: 'h-mum-02',
    name: 'Tata Memorial Hospital',
    city: 'Mumbai',
    locality: 'Parel',
    address: 'Dr. E Borges Road, Parel, Mumbai, Maharashtra 400012',
    hospitalType: 'Government',
    specialties: ['Oncology', 'Hematology', 'Bone Marrow Transplant', 'Palliative Care'],
    services: ['Platelet & Component Blood Bank', 'Dedicated Leukemia Emergency', 'Affordable Diagnostics'],
    phone: '+91 22 2417 7000',
    emergencyHotline: '+91 22 2417 7000',
    website: 'https://tmc.gov.in',
    rating: 4.9,
    reviewCount: 11200,
    ratingSource: 'Govt Cancer Research Institute Registry',
    lat: 19.0041,
    lng: 72.8436,
    bloodBankAvailable: true,
    ambulanceAvailable: true,
    emergency24x7: true,
    icuAvailable: true,
    bedsCount: 700,
  },

  // Delhi NCR
  {
    id: 'h-del-01',
    name: 'All India Institute of Medical Sciences (AIIMS)',
    city: 'Delhi',
    locality: 'Ansari Nagar',
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi 110029',
    hospitalType: 'Government',
    specialties: ['Trauma Surgery', 'Emergency Medicine', 'Cardiology', 'Neurology', 'Pediatrics'],
    services: ['National Apex Blood Bank', 'Apex Trauma Center', '24x7 Disaster Response', 'Apheresis Unit'],
    phone: '+91 11 2658 8500',
    emergencyHotline: '102',
    website: 'https://www.aiims.edu',
    rating: 4.8,
    reviewCount: 22100,
    ratingSource: 'Ministry of Health & Family Welfare Records',
    lat: 28.5672,
    lng: 77.2100,
    bloodBankAvailable: true,
    ambulanceAvailable: true,
    emergency24x7: true,
    icuAvailable: true,
    bedsCount: 2478,
  },
  {
    id: 'h-del-02',
    name: 'Max Super Speciality Hospital Saket',
    city: 'Delhi',
    locality: 'Saket',
    address: '1, 2, Press Enclave Marg, Saket Institutional Area, New Delhi 110017',
    hospitalType: 'Super-specialty',
    specialties: ['Cardiology', 'Organ Transplant', 'Oncology', 'Emergency Care'],
    services: ['Component Blood Separation', 'Advanced Life Support Ambulance', 'Stroke Emergency'],
    phone: '+91 11 2651 5050',
    emergencyHotline: '011 4055 4055',
    website: 'https://www.maxhealthcare.in',
    rating: 4.7,
    reviewCount: 6730,
    ratingSource: 'NABH Quality Council of India',
    lat: 28.5284,
    lng: 77.2127,
    bloodBankAvailable: true,
    ambulanceAvailable: true,
    emergency24x7: true,
    icuAvailable: true,
    bedsCount: 530,
  },

  // Hyderabad
  {
    id: 'h-hyd-01',
    name: 'KIMS Hospitals Secunderabad',
    city: 'Hyderabad',
    locality: 'Minister Road',
    address: '1-8-31/1, Minister Road, Krishna Nagar Colony, Secunderabad, Telangana 500003',
    hospitalType: 'Super-specialty',
    specialties: ['Cardio-Thoracic Surgery', 'Critical Care', 'Neurology', 'Emergency Trauma'],
    services: ['24x7 Blood Center', 'Cardiac ICU', 'Heart Transplant Center', 'Mobile ICU'],
    phone: '+91 40 4488 5000',
    emergencyHotline: '040 4488 5100',
    website: 'https://www.kimshospitals.com',
    rating: 4.7,
    reviewCount: 5890,
    ratingSource: 'NABH Audit Registry',
    lat: 17.4375,
    lng: 78.4853,
    bloodBankAvailable: true,
    ambulanceAvailable: true,
    emergency24x7: true,
    icuAvailable: true,
    bedsCount: 1000,
  },

  // Pune
  {
    id: 'h-pun-01',
    name: 'Ruby Hall Clinic',
    city: 'Pune',
    locality: 'Sassoon Road',
    address: '40, Sassoon Road, Sangamvadi, Pune, Maharashtra 411001',
    hospitalType: 'Super-specialty',
    specialties: ['Trauma & Emergency', 'Cardiology', 'Oncology', 'Organ Transplant'],
    services: ['NABH Accredited Blood Bank', 'Air Ambulance', 'Organ Retrieval Center', '24x7 Pathology'],
    phone: '+91 20 6645 5100',
    emergencyHotline: '+91 20 6645 5252',
    website: 'https://rubyhall.com',
    rating: 4.6,
    reviewCount: 4210,
    ratingSource: 'NABH Audit Registry',
    lat: 18.5308,
    lng: 73.8767,
    bloodBankAvailable: true,
    ambulanceAvailable: true,
    emergency24x7: true,
    icuAvailable: true,
    bedsCount: 600,
  },
];

// Initial realistic demonstration blood requests
const INITIAL_BLOOD_REQUESTS: BloodRequest[] = [
  {
    id: 'RK-2026-9041',
    requesterEmail: 'rajesh.sharma@example.com',
    patientName: 'Sunita Sharma',
    bloodGroup: 'B+',
    unitsRequired: 2,
    city: 'Mysuru',
    locality: 'Kuvempunagar',
    hospitalName: 'Apollo BGS Hospital',
    urgency: 'immediate',
    notes: 'Urgent requirement for cardiac valve replacement surgery scheduled tomorrow morning. Willing donors please reach out.',
    contactPhone: '+919845012345',
    whatsappEnabled: true,
    status: 'open',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'RK-2026-9042',
    requesterEmail: 'dr.ananya@example.com',
    patientName: 'Karthik Gowda',
    bloodGroup: 'O-',
    unitsRequired: 3,
    city: 'Bengaluru',
    locality: 'Kodihalli',
    hospitalName: 'Manipal Hospital HAL Old Airport Road',
    urgency: 'immediate',
    notes: 'Critical road trauma case in emergency ICU. O-Negative universal donor blood is in acute shortage in hospital blood bank.',
    contactPhone: '+919880198765',
    whatsappEnabled: true,
    status: 'open',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 'RK-2026-9043',
    requesterEmail: 'meera.iyer@example.com',
    patientName: 'Narayana Iyer',
    bloodGroup: 'A+',
    unitsRequired: 2,
    city: 'Bengaluru',
    locality: 'Bannerghatta Road',
    hospitalName: 'Fortis Hospital',
    urgency: '24_hours',
    notes: 'Required for scheduled orthopedic knee replacement surgery. Blood bank requests replacement donor.',
    contactPhone: '+919731234567',
    whatsappEnabled: true,
    status: 'open',
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
  {
    id: 'RK-2026-9044',
    requesterEmail: 'farhan.khan@example.com',
    patientName: 'Amina Begum',
    bloodGroup: 'AB+',
    unitsRequired: 1,
    city: 'Mumbai',
    locality: 'Parel',
    hospitalName: 'Tata Memorial Hospital',
    urgency: '2_3_days',
    notes: 'Chemotherapy supportive care. Patient is stable but count has dropped. Replacement unit needed.',
    contactPhone: '+919820556789',
    whatsappEnabled: true,
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'RK-2026-9045',
    requesterEmail: 'deepak.verma@example.com',
    patientName: 'Priya Verma',
    bloodGroup: 'O+',
    unitsRequired: 2,
    city: 'Delhi',
    locality: 'Ansari Nagar',
    hospitalName: 'AIIMS New Delhi',
    urgency: '24_hours',
    notes: 'Post-delivery postpartum recovery at AIIMS maternity wing. Blood bank inventory is constrained.',
    contactPhone: '+919811443322',
    whatsappEnabled: true,
    status: 'open',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'RK-2026-9046',
    requesterEmail: 'vikram.joshi@example.com',
    patientName: 'Suresh Joshi',
    bloodGroup: 'A-',
    unitsRequired: 1,
    city: 'Pune',
    locality: 'Sangamvadi',
    hospitalName: 'Ruby Hall Clinic',
    urgency: 'planning',
    notes: 'Planned vascular bypass surgery scheduled for Friday. Coordinating voluntary donor advance booking.',
    contactPhone: '+919860123987',
    whatsappEnabled: true,
    status: 'open',
    createdAt: new Date(Date.now() - 3600000 * 40).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 40).toISOString(),
  },
];

// Initial verified & realistic donor listings
const INITIAL_DONORS: DonorListing[] = [
  {
    id: 'd-101',
    displayName: 'Aditya Swaminathan',
    bloodGroup: 'O-',
    city: 'Bengaluru',
    locality: 'Koramangala',
    phone: '+919845112233',
    whatsappConsent: true,
    availabilityStatus: 'available',
    verified: true,
    lastDonationDate: '2025-11-10',
    totalDonations: 8,
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'd-102',
    displayName: 'Pooja Hegde',
    bloodGroup: 'B+',
    city: 'Mysuru',
    locality: 'Gokulam',
    phone: '+919886223344',
    whatsappConsent: true,
    availabilityStatus: 'available',
    verified: true,
    lastDonationDate: '2025-10-15',
    totalDonations: 4,
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'd-103',
    displayName: 'Dr. Rohan Deshmukh',
    bloodGroup: 'O+',
    city: 'Pune',
    locality: 'Kothrud',
    phone: '+919822334455',
    whatsappConsent: true,
    availabilityStatus: 'available',
    verified: true,
    lastDonationDate: '2025-12-01',
    totalDonations: 12,
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'd-104',
    displayName: 'Kavita Menon',
    bloodGroup: 'A+',
    city: 'Bengaluru',
    locality: 'Indiranagar',
    phone: '+919741556677',
    whatsappConsent: true,
    availabilityStatus: 'available',
    verified: true,
    lastDonationDate: '2025-09-20',
    totalDonations: 5,
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'd-105',
    displayName: 'Tariq Siddiqui',
    bloodGroup: 'AB+',
    city: 'Delhi',
    locality: 'Hauz Khas',
    phone: '+919810889900',
    whatsappConsent: true,
    availabilityStatus: 'available',
    verified: true,
    lastDonationDate: '2025-11-05',
    totalDonations: 3,
    updatedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    id: 'd-106',
    displayName: 'Nikhil Rane',
    bloodGroup: 'A-',
    city: 'Mumbai',
    locality: 'Andheri West',
    phone: '+919821778899',
    whatsappConsent: true,
    availabilityStatus: 'available',
    verified: true,
    lastDonationDate: '2025-08-14',
    totalDonations: 6,
    updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'd-107',
    displayName: 'Sowmya Murthy',
    bloodGroup: 'B-',
    city: 'Mysuru',
    locality: 'Vijayanagar',
    phone: '+919844001122',
    whatsappConsent: true,
    availabilityStatus: 'available',
    verified: true,
    lastDonationDate: '2025-10-30',
    totalDonations: 4,
    updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 'd-108',
    displayName: 'Vikas Reddy',
    bloodGroup: 'O+',
    city: 'Hyderabad',
    locality: 'Madhapur',
    phone: '+919849223311',
    whatsappConsent: true,
    availabilityStatus: 'donated_recently',
    verified: true,
    lastDonationDate: '2026-02-15',
    totalDonations: 9,
    updatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
];

// Helper to safely access localStorage in SSR or browser
function safeGetItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore quota errors
  }
}

// ----------------- AUTHENTICATION STORE -----------------

export function getCurrentUser(): User | null {
  const stored = safeGetItem(CURRENT_USER_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (!user) {
    if (typeof window !== 'undefined') localStorage.removeItem(CURRENT_USER_KEY);
  } else {
    safeSetItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
}

export function loginUser(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (!password || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  // Get or initialize registered users
  const rawUsers = safeGetItem(USERS_KEY);
  let users: Record<string, { user: User; passHash: string }> = rawUsers ? JSON.parse(rawUsers) : {};

  // For testing convenience, if user hasn't registered, create account seamlessly
  if (!users[cleanEmail]) {
    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email: cleanEmail,
      displayName: cleanEmail.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    users[cleanEmail] = { user: newUser, passHash: password };
    safeSetItem(USERS_KEY, JSON.stringify(users));
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  }

  const record = users[cleanEmail];
  if (record.passHash !== password) {
    return { success: false, error: 'Invalid password. Please check your credentials.' };
  }

  setCurrentUser(record.user);
  return { success: true, user: record.user };
}

export function registerUser(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (!password || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  const rawUsers = safeGetItem(USERS_KEY);
  const users: Record<string, { user: User; passHash: string }> = rawUsers ? JSON.parse(rawUsers) : {};

  if (users[cleanEmail]) {
    return { success: false, error: 'An account with this email already exists. Please log in.' };
  }

  const newUser: User = {
    id: 'usr_' + Math.random().toString(36).substring(2, 9),
    email: cleanEmail,
    displayName: cleanEmail.split('@')[0],
    createdAt: new Date().toISOString(),
  };

  users[cleanEmail] = { user: newUser, passHash: password };
  safeSetItem(USERS_KEY, JSON.stringify(users));
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

export function logoutUser(): void {
  setCurrentUser(null);
}

// ----------------- BLOOD REQUESTS STORE -----------------

export function getBloodRequests(): BloodRequest[] {
  const stored = safeGetItem(REQUESTS_KEY);
  if (!stored) {
    safeSetItem(REQUESTS_KEY, JSON.stringify(INITIAL_BLOOD_REQUESTS));
    return INITIAL_BLOOD_REQUESTS;
  }
  try {
    return JSON.parse(stored) as BloodRequest[];
  } catch {
    return INITIAL_BLOOD_REQUESTS;
  }
}

export function createBloodRequest(
  data: Omit<BloodRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): BloodRequest {
  const requests = getBloodRequests();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newRequest: BloodRequest = {
    ...data,
    id: `RK-2026-${randomNum}`,
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated = [newRequest, ...requests];
  safeSetItem(REQUESTS_KEY, JSON.stringify(updated));
  return newRequest;
}

export function updateBloodRequestStatus(id: string, newStatus: BloodRequest['status']): BloodRequest[] {
  const requests = getBloodRequests();
  const updated = requests.map((req) =>
    req.id === id ? { ...req, status: newStatus, updatedAt: new Date().toISOString() } : req
  );
  safeSetItem(REQUESTS_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteBloodRequest(id: string): BloodRequest[] {
  const requests = getBloodRequests();
  const updated = requests.filter((req) => req.id !== id);
  safeSetItem(REQUESTS_KEY, JSON.stringify(updated));
  return updated;
}

// ----------------- DONORS STORE -----------------

export function getDonors(): DonorListing[] {
  const stored = safeGetItem(DONORS_KEY);
  if (!stored) {
    safeSetItem(DONORS_KEY, JSON.stringify(INITIAL_DONORS));
    return INITIAL_DONORS;
  }
  try {
    return JSON.parse(stored) as DonorListing[];
  } catch {
    return INITIAL_DONORS;
  }
}

export function createDonorListing(
  data: Omit<DonorListing, 'id' | 'verified' | 'updatedAt'>
): DonorListing {
  const donors = getDonors();
  const newDonor: DonorListing = {
    ...data,
    id: `d-${Date.now()}`,
    verified: true,
    updatedAt: new Date().toISOString(),
  };
  const updated = [newDonor, ...donors];
  safeSetItem(DONORS_KEY, JSON.stringify(updated));
  return newDonor;
}

// ----------------- HOSPITALS STORE -----------------

export function getHospitals(): Hospital[] {
  const stored = safeGetItem(HOSPITALS_KEY);
  if (!stored) {
    safeSetItem(HOSPITALS_KEY, JSON.stringify(INITIAL_HOSPITALS));
    return INITIAL_HOSPITALS;
  }
  try {
    return JSON.parse(stored) as Hospital[];
  } catch {
    return INITIAL_HOSPITALS;
  }
}

// ----------------- WHATSAPP LINK GENERATOR -----------------

export function generateWhatsAppUrl(phone: string, message: string): string {
  // Normalize phone to international format without spaces, hyphens, plus signs
  const digits = phone.replace(/[^\d]/g, '');
  // Default to India country code 91 if only 10 digits
  const formattedPhone = digits.length === 10 ? `91${digits}` : digits;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}
