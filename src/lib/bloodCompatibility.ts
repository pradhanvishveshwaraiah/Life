import { BloodGroup } from '../types';

export interface CompatibilityInfo {
  group: BloodGroup;
  canDonateTo: BloodGroup[];
  canReceiveFrom: BloodGroup[];
  isUniversalDonor?: boolean;
  isUniversalRecipient?: boolean;
  prevalencePercentage: number;
}

export const BLOOD_COMPATIBILITY_MAP: Record<BloodGroup, CompatibilityInfo> = {
  'O-': {
    group: 'O-',
    canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-'],
    isUniversalDonor: true,
    prevalencePercentage: 7,
  },
  'O+': {
    group: 'O+',
    canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O+', 'O-'],
    prevalencePercentage: 38,
  },
  'A-': {
    group: 'A-',
    canDonateTo: ['A-', 'A+', 'AB-', 'AB+'],
    canReceiveFrom: ['A-', 'O-'],
    prevalencePercentage: 6,
  },
  'A+': {
    group: 'A+',
    canDonateTo: ['A+', 'AB+'],
    canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
    prevalencePercentage: 34,
  },
  'B-': {
    group: 'B-',
    canDonateTo: ['B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['B-', 'O-'],
    prevalencePercentage: 2,
  },
  'B+': {
    group: 'B+',
    canDonateTo: ['B+', 'AB+'],
    canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
    prevalencePercentage: 9,
  },
  'AB-': {
    group: 'AB-',
    canDonateTo: ['AB-', 'AB+'],
    canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
    prevalencePercentage: 1,
  },
  'AB+': {
    group: 'AB+',
    canDonateTo: ['AB+'],
    canReceiveFrom: ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
    isUniversalRecipient: true,
    prevalencePercentage: 3,
  },
};

export const ALL_BLOOD_GROUPS: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

/**
 * Check if donor blood is compatible with recipient
 */
export function isBloodCompatible(donor: BloodGroup, recipient: BloodGroup): boolean {
  return BLOOD_COMPATIBILITY_MAP[donor].canDonateTo.includes(recipient);
}

/**
 * Get all blood types that can donate to this recipient
 */
export function getCompatibleDonorsForRecipient(recipient: BloodGroup): BloodGroup[] {
  return BLOOD_COMPATIBILITY_MAP[recipient].canReceiveFrom;
}

/**
 * Get all blood types this donor can give to
 */
export function getCompatibleRecipientsForDonor(donor: BloodGroup): BloodGroup[] {
  return BLOOD_COMPATIBILITY_MAP[donor].canDonateTo;
}
