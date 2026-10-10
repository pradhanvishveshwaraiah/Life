import React, { useState } from 'react';
import { Search, Heart, ShieldCheck, MapPin, RefreshCw, UserPlus, Info } from 'lucide-react';
import { ALL_BLOOD_GROUPS } from '../lib/bloodCompatibility';
import { DonorCard } from '../features/blood/DonorCard';
import { BloodGroup, DonorAvailability, DonorListing, User } from '../types';

interface DonorsPageProps {
  donors: DonorListing[];
  currentUser: User | null;
  onBecomeDonor: () => void;
  onRequestBlood: () => void;
  onOpenCompatibility: (group?: BloodGroup) => void;
}

export const DonorsPage: React.FC<DonorsPageProps> = ({
  donors,
  currentUser,
  onBecomeDonor,
  onRequestBlood,
  onOpenCompatibility,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup | 'ALL'>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<DonorAvailability | 'ALL'>('ALL');

  const cities = Array.from(new Set(donors.map((d) => d.city)));

  const filteredDonors = donors.filter((donor) => {
    if (selectedGroup !== 'ALL' && donor.bloodGroup !== selectedGroup) {
      return false;
    }
    if (selectedCity !== 'ALL' && donor.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (statusFilter !== 'ALL' && donor.availabilityStatus !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = donor.displayName.toLowerCase().includes(q);
      const matchCity = donor.city.toLowerCase().includes(q);
      const matchLocality = donor.locality.toLowerCase().includes(q);
      const matchGroup = donor.bloodGroup.toLowerCase().includes(q);
      if (!matchName && !matchCity && !matchLocality && !matchGroup) {
        return false;
      }
    }
    return true;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGroup('ALL');
    setSelectedCity('ALL');
    setStatusFilter('ALL');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#18212B]/8">
        <div>
          <span className="text-xs font-bold text-[#E5252A] uppercase tracking-wider">
            Volunteer Donor Network
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18212B] tracking-tight mt-1">
            Registered Voluntary Donors
          </h1>
          <p className="text-xs sm:text-sm text-[#697586] mt-1.5 max-w-2xl leading-relaxed">
            Browse generous voluntary donors across India. Contact willing donors directly via WhatsApp with consent-based messaging.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBecomeDonor}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E5252A] hover:bg-[#CC1E23] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md hover:shadow-lg"
          >
            <UserPlus className="w-4 h-4" />
            <span>Join as Voluntary Donor</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#18212B]/6 shadow-sm space-y-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search donors by name, city, locality, or blood group..."
            className="w-full pl-11 pr-4 py-2.5 text-sm bg-[#FAFAF8] border border-[#E2E8F0] rounded-2xl focus:outline-none focus:border-[#E5252A] focus:bg-white transition-all"
          />
        </div>

        {/* Blood Group Filter Chips */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#18212B]">Filter by Blood Group:</span>
            <button
              onClick={() => onOpenCompatibility(selectedGroup !== 'ALL' ? selectedGroup : undefined)}
              className="text-[11px] text-[#E5252A] font-semibold hover:underline flex items-center gap-1"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Blood Compatibility Matrix</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedGroup('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectedGroup === 'ALL'
                  ? 'bg-[#18212B] text-white border-[#18212B]'
                  : 'bg-white text-[#697586] border-[#E2E8F0] hover:text-[#18212B]'
              }`}
            >
              All Blood Types
            </button>
            {ALL_BLOOD_GROUPS.map((group) => {
              const isSelected = selectedGroup === group;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-[#E5252A] text-white border-[#E5252A] shadow-xs'
                      : 'bg-white text-[#18212B] border-[#E2E8F0] hover:border-[#E5252A]/40'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>

        {/* City and Availability filters */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#697586] font-medium">City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="text-xs font-semibold text-[#18212B] bg-[#FAFAF8] border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              <option value="ALL">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#697586] font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs font-semibold text-[#18212B] bg-[#FAFAF8] border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="available">Available to donate</option>
              <option value="donated_recently">Donated recently (Cooling period)</option>
              <option value="temporarily_unavailable">Temporarily unavailable</option>
            </select>
          </div>

          {(selectedGroup !== 'ALL' || selectedCity !== 'ALL' || statusFilter !== 'ALL' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs text-[#E5252A] hover:underline font-semibold ml-auto"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#697586] px-1">
        <span>
          Showing <strong className="text-[#18212B]">{filteredDonors.length}</strong> volunteer donors
        </span>
        <span className="flex items-center gap-1 text-emerald-700">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy-preserving contact initiation</span>
        </span>
      </div>

      {/* Donors Grid */}
      {filteredDonors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <DonorCard
              key={donor.id}
              donor={donor}
              onFilterByBlood={(bg) => setSelectedGroup(bg)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#18212B]/6 p-8">
          <div className="w-16 h-16 bg-red-50 text-[#E5252A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#18212B]">
            No donor listings are available for these filters yet.
          </h3>
          <p className="text-xs sm:text-sm text-[#697586] max-w-md mx-auto mt-1.5">
            Try resetting your filters or list yourself as a voluntary donor to help patients in your city.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 text-xs font-bold text-[#18212B] bg-[#FAFAF8] border border-[#E2E8F0] rounded-full hover:bg-slate-100 transition-colors"
            >
              Clear All Filters
            </button>
            <button
              onClick={onBecomeDonor}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#E5252A] rounded-full hover:bg-[#CC1E23] transition-colors shadow-sm"
            >
              Register as Donor
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
