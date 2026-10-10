import React, { useState } from 'react';
import { X, Heart, CheckCircle2, ShieldCheck, Phone, MapPin, AlertCircle } from 'lucide-react';
import { ALL_BLOOD_GROUPS } from '../../lib/bloodCompatibility';
import { createDonorListing } from '../../lib/storage';
import { BloodGroup, DonorAvailability, DonorListing, User } from '../../types';

interface DonorRegistrationModalProps {
  isOpen: boolean;
  currentUser: User | null;
  onClose: () => void;
  onDonorRegistered: (donor: DonorListing) => void;
}

export const DonorRegistrationModal: React.FC<DonorRegistrationModalProps> = ({
  isOpen,
  currentUser,
  onClose,
  onDonorRegistered,
}) => {
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [city, setCity] = useState(currentUser?.city || 'Mysuru');
  const [locality, setLocality] = useState('');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98451 99887');
  const [availabilityStatus, setAvailabilityStatus] = useState<DonorAvailability>('available');
  const [whatsappConsent, setWhatsappConsent] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!displayName.trim()) {
      setError('Please provide a public display name or initials.');
      return;
    }
    if (!city.trim()) {
      setError('Please enter your city.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide a valid contact number.');
      return;
    }

    const newDonor = createDonorListing({
      userId: currentUser?.id,
      displayName: displayName.trim(),
      bloodGroup,
      city: city.trim(),
      locality: locality.trim() || 'Central',
      phone: phone.trim(),
      whatsappConsent,
      availabilityStatus,
      totalDonations: 1,
    });

    setSuccess(true);
    onDonorRegistered(newDonor);
    setTimeout(() => {
      onClose();
      setSuccess(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#18212B]/5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#697586] hover:text-[#18212B] hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 animate-fadeIn">
            <div className="w-16 h-16 bg-red-50 text-[#E5252A] rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-[#18212B]">Thank You, Hero!</h3>
            <p className="text-sm text-[#697586] mt-2 max-w-sm mx-auto">
              You are now listed in the LifeBridge volunteer donor directory. You may receive WhatsApp messages when patients in {city} urgently require {bloodGroup} blood.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#FFE5E5] flex items-center justify-center text-[#E5252A]">
                <Heart className="w-5 h-5 fill-[#E5252A]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#18212B]">Register as a Blood Donor</h2>
                <p className="text-xs text-[#697586]">Join thousands willing to donate when an urgent need arises</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-[#E5252A] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                  Your Public Display Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma or Dr. R.S."
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#E5252A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                  Your Blood Group
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {ALL_BLOOD_GROUPS.map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setBloodGroup(g)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        bloodGroup === g
                          ? 'bg-[#E5252A] text-white border-[#E5252A] shadow-sm'
                          : 'bg-white text-[#18212B] border-[#E2E8F0] hover:border-[#E5252A]/30'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mysuru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#E5252A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                    Locality / Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gokulam"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#E5252A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98451 99887"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#E5252A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                  Current Availability Status
                </label>
                <select
                  value={availabilityStatus}
                  onChange={(e) => setAvailabilityStatus(e.target.value as DonorAvailability)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#E5252A]"
                >
                  <option value="available">Available to donate</option>
                  <option value="donated_recently">Donated recently (Cooling period)</option>
                  <option value="temporarily_unavailable">Temporarily unavailable</option>
                </select>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#18212B]">
                  <input
                    type="checkbox"
                    checked={whatsappConsent}
                    onChange={(e) => setWhatsappConsent(e.target.checked)}
                    className="w-4 h-4 text-[#E5252A] rounded border-slate-300 focus:ring-[#E5252A] mt-0.5"
                  />
                  <span>
                    I consent to receiving WhatsApp inquiries from families and hospitals when an urgent need for {bloodGroup} blood matches my location.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#E5252A] hover:bg-[#CC1E23] text-white text-sm font-bold rounded-xl transition-all shadow-sm mt-3"
              >
                Join as Voluntary Donor
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
