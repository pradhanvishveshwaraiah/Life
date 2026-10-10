import React, { useState } from 'react';
import { Search, MapPin, Building2, Filter, RefreshCw, Star, ShieldCheck, Phone, Stethoscope, HeartPulse } from 'lucide-react';
import { HospitalCard } from '../features/hospitals/HospitalCard';
import { Hospital } from '../types';

interface HospitalsPageProps {
  hospitals: Hospital[];
  onSelectHospital: (hospital: Hospital) => void;
}

export const HospitalsPage: React.FC<HospitalsPageProps> = ({
  hospitals,
  onSelectHospital,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [bloodBankOnly, setBloodBankOnly] = useState(false);
  const [emergencyOnly, setEmergencyOnly] = useState(false);

  // Available cities & specialties
  const cities = ['Mysuru', 'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'];
  const specialties = [
    'Cardiology',
    'Emergency & Trauma',
    'Oncology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Hematology',
    'Organ Transplant',
  ];
  const hospitalTypes = ['Multispecialty', 'Super-specialty', 'Government'];

  const filteredHospitals = hospitals.filter((hosp) => {
    if (selectedCity !== 'ALL' && hosp.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (selectedType !== 'ALL' && hosp.hospitalType !== selectedType) {
      return false;
    }
    if (selectedSpecialty !== 'ALL' && !hosp.specialties.some((s) => s.toLowerCase() === selectedSpecialty.toLowerCase())) {
      return false;
    }
    if (bloodBankOnly && !hosp.bloodBankAvailable) {
      return false;
    }
    if (emergencyOnly && !hosp.emergency24x7) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = hosp.name.toLowerCase().includes(q);
      const matchCity = hosp.city.toLowerCase().includes(q);
      const matchLocality = hosp.locality.toLowerCase().includes(q);
      const matchSpecialty = hosp.specialties.some((s) => s.toLowerCase().includes(q));
      const matchServices = hosp.services.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchCity && !matchLocality && !matchSpecialty && !matchServices) {
        return false;
      }
    }
    return true;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('ALL');
    setSelectedSpecialty('ALL');
    setSelectedType('ALL');
    setBloodBankOnly(false);
    setEmergencyOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#18212B]/8">
        <span className="text-xs font-bold text-[#E5252A] uppercase tracking-wider">
          Healthcare Discovery & Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18212B] tracking-tight mt-1">
          Find the Right Hospital for Your Needs
        </h1>
        <p className="text-xs sm:text-sm text-[#697586] mt-1.5 max-w-2xl leading-relaxed">
          Explore hospitals, compare their services, and discover healthcare facilities in cities across India. Designed for newcomers and residents requiring emergency care and verified clinical specialties.
        </p>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#18212B]/6 shadow-sm space-y-4">
        
        {/* Main Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by hospital name, locality, department (e.g. Cardiology Mysuru, Apollo, Trauma)..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-[#FAFAF8] border border-[#E2E8F0] rounded-2xl focus:outline-none focus:border-[#E5252A] focus:bg-white transition-all"
          />
        </div>

        {/* City Filter Pills */}
        <div>
          <span className="text-xs font-bold text-[#18212B] block mb-2">Select City Hub:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCity('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectedCity === 'ALL'
                  ? 'bg-[#18212B] text-white border-[#18212B]'
                  : 'bg-white text-[#697586] border-[#E2E8F0] hover:text-[#18212B]'
              }`}
            >
              All Cities ({hospitals.length})
            </button>
            {cities.map((city) => {
              const isSelected = selectedCity.toLowerCase() === city.toLowerCase();
              const count = hospitals.filter((h) => h.city.toLowerCase() === city.toLowerCase()).length;
              return (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-[#E5252A] text-white border-[#E5252A] shadow-xs'
                      : 'bg-white text-[#18212B] border-[#E2E8F0] hover:border-[#E5252A]/40'
                  }`}
                >
                  {city} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Specialty Filter Pills */}
        <div>
          <span className="text-xs font-bold text-[#18212B] block mb-2">Clinical Specialty:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedSpecialty('ALL')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                selectedSpecialty === 'ALL'
                  ? 'bg-[#FFE5E5] text-[#E5252A] border-[#FFCCD0]'
                  : 'bg-[#FAFAF8] text-[#697586] border-[#E2E8F0] hover:text-[#18212B]'
              }`}
            >
              All Specialties
            </button>
            {specialties.map((spec) => {
              const isSelected = selectedSpecialty === spec;
              return (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-[#FFE5E5] text-[#E5252A] border-[#FFCCD0]'
                      : 'bg-[#FAFAF8] text-[#18212B] border-[#E2E8F0] hover:border-[#E5252A]/40'
                  }`}
                >
                  {spec}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Toggles: Blood Bank, 24/7 Emergency */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#F1F5F9] text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#18212B]">
            <input
              type="checkbox"
              checked={bloodBankOnly}
              onChange={(e) => setBloodBankOnly(e.target.checked)}
              className="w-4 h-4 text-[#E5252A] rounded border-slate-300 focus:ring-[#E5252A]"
            />
            Has On-Campus Blood Bank
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#18212B]">
            <input
              type="checkbox"
              checked={emergencyOnly}
              onChange={(e) => setEmergencyOnly(e.target.checked)}
              className="w-4 h-4 text-[#E5252A] rounded border-slate-300 focus:ring-[#E5252A]"
            />
            24/7 Emergency & Trauma Active
          </label>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[#697586]">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#FAFAF8] border border-[#E2E8F0] rounded-xl px-2.5 py-1 text-xs font-semibold text-[#18212B] focus:outline-none"
            >
              <option value="ALL">All Types</option>
              {hospitalTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {(selectedCity !== 'ALL' || selectedSpecialty !== 'ALL' || selectedType !== 'ALL' || bloodBankOnly || emergencyOnly || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#E5252A] hover:underline font-semibold"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#697586] px-1">
        <span>
          Showing <strong className="text-[#18212B]">{filteredHospitals.length}</strong> accredited hospital facilities
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E5252A]" />
          <span>Accreditation & NABH verified ratings</span>
        </span>
      </div>

      {/* Hospital Cards Grid */}
      {filteredHospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hosp) => (
            <HospitalCard
              key={hosp.id}
              hospital={hosp}
              onViewDetails={onSelectHospital}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#18212B]/6 p-8">
          <div className="w-16 h-16 bg-red-50 text-[#E5252A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#18212B]">
            No hospitals matched your search.
          </h3>
          <p className="text-xs sm:text-sm text-[#697586] max-w-md mx-auto mt-1.5">
            Try selecting another city or broadening your department filter.
          </p>
          <div className="mt-6">
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#E5252A] rounded-full hover:bg-[#CC1E23] transition-colors shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
