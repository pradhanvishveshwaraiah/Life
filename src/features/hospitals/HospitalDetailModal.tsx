import React from 'react';
import { X, MapPin, Phone, Globe, Star, Navigation, Building2, Check, ShieldCheck, Clock, HeartHandshake, Ambulance } from 'lucide-react';
import { Hospital } from '../../types';

interface HospitalDetailModalProps {
  hospital: Hospital | null;
  onClose: () => void;
}

export const HospitalDetailModal: React.FC<HospitalDetailModalProps> = ({ hospital, onClose }) => {
  if (!hospital) return null;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hospital.name}, ${hospital.address}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#18212B]/5 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#697586] hover:text-[#18212B] hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close hospital details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hospital Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-red-100 text-[#E5252A] rounded-full border border-red-200">
              {hospital.hospitalType}
            </span>
            <div className="flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 rounded-full border border-amber-200 text-amber-800 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{hospital.rating.toFixed(1)} / 5.0</span>
              <span className="text-[#94A3B8] font-normal">({hospital.reviewCount.toLocaleString()} reviews)</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18212B]">
            {hospital.name}
          </h2>

          <div className="flex items-start gap-2 text-xs text-[#697586] mt-2">
            <MapPin className="w-4 h-4 text-[#E5252A] shrink-0 mt-0.5" />
            <span>{hospital.address}</span>
          </div>
        </div>

        {/* Key Facilities Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          <div className="p-3 bg-[#FAFAF8] rounded-2xl border border-[#E2E8F0] text-center">
            <Clock className="w-4 h-4 text-[#E5252A] mx-auto mb-1" />
            <span className="text-[11px] font-bold text-[#18212B] block">Emergency</span>
            <span className="text-[10px] text-emerald-700 font-semibold">{hospital.emergency24x7 ? '24/7 Active' : 'Limited'}</span>
          </div>

          <div className="p-3 bg-[#FAFAF8] rounded-2xl border border-[#E2E8F0] text-center">
            <ShieldCheck className="w-4 h-4 text-[#E5252A] mx-auto mb-1" />
            <span className="text-[11px] font-bold text-[#18212B] block">Blood Bank</span>
            <span className="text-[10px] text-emerald-700 font-semibold">{hospital.bloodBankAvailable ? 'On-campus' : 'External'}</span>
          </div>

          <div className="p-3 bg-[#FAFAF8] rounded-2xl border border-[#E2E8F0] text-center">
            <Ambulance className="w-4 h-4 text-[#E5252A] mx-auto mb-1" />
            <span className="text-[11px] font-bold text-[#18212B] block">Ambulance</span>
            <span className="text-[10px] text-emerald-700 font-semibold">{hospital.ambulanceAvailable ? 'Available' : 'On Request'}</span>
          </div>

          <div className="p-3 bg-[#FAFAF8] rounded-2xl border border-[#E2E8F0] text-center">
            <Building2 className="w-4 h-4 text-[#E5252A] mx-auto mb-1" />
            <span className="text-[11px] font-bold text-[#18212B] block">Bed Capacity</span>
            <span className="text-[10px] text-[#18212B] font-semibold">{hospital.bedsCount ? `${hospital.bedsCount}+ Beds` : 'Verified'}</span>
          </div>
        </div>

        {/* Clinical Specialties */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-[#18212B] mb-2.5">
            Clinical Specialties & Centres of Excellence
          </h3>
          <div className="flex flex-wrap gap-2">
            {hospital.specialties.map((spec) => (
              <span
                key={spec}
                className="px-3 py-1 bg-white text-[#18212B] text-xs font-semibold rounded-xl border border-[#E2E8F0] shadow-2xs"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Medical Services Provided */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-[#18212B] mb-2.5">
            Key Medical Services & Infrastructure
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {hospital.services.map((srv) => (
              <div key={srv} className="flex items-center gap-2 text-[#18212B]">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{srv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Navigation Card */}
        <div className="p-4 bg-[#FAFAF8] rounded-2xl border border-[#E2E8F0] mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#18212B]">Geo Coordinates</span>
            <span className="text-xs font-mono text-[#697586]">
              {hospital.lat.toFixed(4)}° N, {hospital.lng.toFixed(4)}° E
            </span>
          </div>
          <p className="text-[11px] text-[#697586] mb-3">
            Source Verified by: <strong className="text-[#18212B]">{hospital.ratingSource}</strong>. Accurate for newcomers looking for trustworthy medical assistance.
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#E5252A] hover:bg-[#CC1E23] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps / Turn-by-Turn Navigation</span>
          </a>
        </div>

        {/* Contact Hotline Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            <a
              href={`tel:${hospital.emergencyHotline || hospital.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-[#E5252A] hover:bg-red-100 font-bold text-xs rounded-xl border border-red-200 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Emergency: {hospital.emergencyHotline || hospital.phone}</span>
            </a>
            {hospital.website && (
              <a
                href={hospital.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#697586] hover:text-[#18212B] underline"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Official Website</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#697586] hover:text-[#18212B] py-2 px-3"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
