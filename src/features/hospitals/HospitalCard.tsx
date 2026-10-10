import React from 'react';
import { MapPin, Phone, Star, Navigation, Building2, ShieldCheck, ExternalLink, Activity, AlertCircle } from 'lucide-react';
import { Hospital } from '../../types';

interface HospitalCardProps {
  hospital: Hospital;
  onViewDetails: (hospital: Hospital) => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onViewDetails }) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hospital.name}, ${hospital.address}`
  )}`;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#18212B]/8 hover:border-[#E5252A]/30 transition-all shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden relative group">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-red-50 text-[#E5252A] rounded-md border border-red-100">
                {hospital.hospitalType}
              </span>
              {hospital.bloodBankAvailable && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-50 text-rose-700 rounded-md border border-rose-200">
                  Blood Bank Onsite
                </span>
              )}
              {hospital.emergency24x7 && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 rounded-md border border-amber-200">
                  24/7 Emergency
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#18212B] mt-2 group-hover:text-[#E5252A] transition-colors line-clamp-1">
              {hospital.name}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-[#697586] mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#E5252A] shrink-0" />
              <span className="truncate">{hospital.locality}, {hospital.city}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 rounded-lg border border-amber-200/80 text-amber-800 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{hospital.rating.toFixed(1)}</span>
            </div>
            <span className="text-[10px] text-[#94A3B8] mt-0.5 font-medium">
              {hospital.reviewCount.toLocaleString()} reviews
            </span>
          </div>
        </div>

        {/* Address */}
        <p className="text-xs text-[#697586] line-clamp-2 leading-relaxed mb-3.5">
          {hospital.address}
        </p>

        {/* Specialties Tags */}
        <div className="mb-4">
          <span className="text-[11px] font-bold text-[#18212B] block mb-1.5">
            Key Medical Departments:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {hospital.specialties.slice(0, 4).map((spec) => (
              <span
                key={spec}
                className="px-2 py-0.5 bg-[#FAFAF8] text-[#18212B] text-[11px] font-medium rounded-md border border-[#E2E8F0]"
              >
                {spec}
              </span>
            ))}
            {hospital.specialties.length > 4 && (
              <span className="px-2 py-0.5 bg-slate-50 text-[#697586] text-[11px] rounded-md border border-slate-200">
                +{hospital.specialties.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="pt-3 border-t border-[#F1F5F9] space-y-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(hospital)}
            className="flex-1 py-2 px-3 text-xs font-bold text-[#18212B] bg-[#FAFAF8] hover:bg-slate-100 border border-[#E2E8F0] rounded-xl transition-colors text-center"
          >
            View Details & Services
          </button>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 text-xs font-bold text-white bg-[#E5252A] hover:bg-[#CC1E23] rounded-xl transition-all shadow-sm"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Directions</span>
          </a>
        </div>

        {/* Contact Strip */}
        <div className="flex items-center justify-between text-[11px] text-[#697586] pt-1">
          <a
            href={`tel:${hospital.emergencyHotline || hospital.phone}`}
            className="hover:text-[#E5252A] flex items-center gap-1 transition-colors"
          >
            <Phone className="w-3 h-3 text-[#E5252A]" />
            <span>Emergency: <strong className="text-[#18212B]">{hospital.emergencyHotline || hospital.phone}</strong></span>
          </a>
          <span className="text-[10px] text-[#94A3B8] italic truncate max-w-[140px]">
            {hospital.ratingSource}
          </span>
        </div>
      </div>
    </div>
  );
};
