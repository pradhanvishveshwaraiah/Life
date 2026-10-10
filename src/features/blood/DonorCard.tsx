import React from 'react';
import { MessageCircle, Phone, MapPin, Heart, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { generateWhatsAppUrl } from '../../lib/storage';
import { getCompatibleRecipientsForDonor } from '../../lib/bloodCompatibility';
import { DonorListing } from '../../types';

interface DonorCardProps {
  donor: DonorListing;
  onFilterByBlood?: (group: DonorListing['bloodGroup']) => void;
}

export const DonorCard: React.FC<DonorCardProps> = ({ donor, onFilterByBlood }) => {
  const isAvailable = donor.availabilityStatus === 'available';
  const recipients = getCompatibleRecipientsForDonor(donor.bloodGroup);

  const statusBadge = {
    available: { label: 'Ready to Donate', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    donated_recently: { label: 'Cooling Period (Recent Donation)', class: 'bg-amber-50 text-amber-800 border-amber-200' },
    temporarily_unavailable: { label: 'Temporarily Unavailable', class: 'bg-slate-100 text-slate-600 border-slate-200' },
  }[donor.availabilityStatus];

  const whatsappMessage = `Hello ${donor.displayName}, I found your voluntary donor profile on LifeBridge. We have an urgent requirement for ${donor.bloodGroup} blood in ${donor.city}. Are you available to donate?`;

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#18212B]/8 hover:border-[#E5252A]/30 transition-all shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden relative">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Blood Badge */}
            <button
              onClick={() => onFilterByBlood?.(donor.bloodGroup)}
              className="w-12 h-12 rounded-xl bg-[#FFEAEA] border border-[#FFCCD0] flex items-center justify-center text-[#E5252A] font-extrabold text-base hover:scale-105 transition-transform shrink-0"
              title="Click to filter by this blood group"
            >
              {donor.bloodGroup}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-[#18212B] truncate">{donor.displayName}</h3>
                {donor.verified && (
                  <span title="Verified Volunteer Donor" className="shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#E5252A]" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-[#697586] mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#E5252A] shrink-0" />
                <span className="truncate">{donor.city}{donor.locality ? `, ${donor.locality}` : ''}</span>
              </div>
            </div>
          </div>

          <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border shrink-0 ${statusBadge.class}`}>
            {statusBadge.label}
          </span>
        </div>

        {/* Stats & Medical Compatibility */}
        <div className="p-3 bg-[#FAFAF8] rounded-xl border border-[#F1F5F9] text-xs space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[#697586]">Lifetime Donations:</span>
            <span className="font-bold text-[#18212B] flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-[#E5252A] text-[#E5252A]" />
              {donor.totalDonations || 1} times
            </span>
          </div>
          <div className="text-[11px] text-[#697586] pt-1 border-t border-[#E2E8F0]/60">
            <span>Can donate red cells to: </span>
            <strong className="text-[#18212B]">{recipients.join(', ')}</strong>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-[#F1F5F9]">
        {donor.whatsappConsent ? (
          <div className="flex items-center gap-2">
            <a
              href={generateWhatsAppUrl(donor.phone, whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#25D366] hover:bg-[#20BE5B] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Contact Donor on WhatsApp</span>
            </a>
            <a
              href={`tel:${donor.phone}`}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-[#18212B] rounded-xl transition-colors"
              title="Call Donor"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="text-center py-2 text-xs text-[#697586] italic">
            Direct WhatsApp contact not permitted by donor
          </div>
        )}
      </div>
    </div>
  );
};
