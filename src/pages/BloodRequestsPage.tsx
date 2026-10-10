import React, { useState } from 'react';
import { Search, Filter, Droplet, PlusCircle, Heart, MapPin, AlertCircle, RefreshCw } from 'lucide-react';
import { ALL_BLOOD_GROUPS, getCompatibleDonorsForRecipient } from '../lib/bloodCompatibility';
import { BloodRequestCard } from '../features/blood/BloodRequestCard';
import { BloodGroup, BloodRequest, UrgencyLevel, User } from '../types';

interface BloodRequestsPageProps {
  bloodRequests: BloodRequest[];
  currentUser: User | null;
  onRequestBlood: () => void;
  onBecomeDonor: () => void;
  onStatusChange: (id: string, newStatus: BloodRequest['status']) => void;
  onDeleteRequest: (id: string) => void;
  onOpenCompatibility: (group?: BloodGroup) => void;
}

export const BloodRequestsPage: React.FC<BloodRequestsPageProps> = ({
  bloodRequests,
  currentUser,
  onRequestBlood,
  onBecomeDonor,
  onStatusChange,
  onDeleteRequest,
  onOpenCompatibility,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup | 'ALL'>('ALL');
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyLevel | 'ALL'>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'open' | 'contacted' | 'all'>('open');

  // Unique cities from requests
  const cities = Array.from(new Set(bloodRequests.map((r) => r.city)));

  // Filtered requests
  const filteredRequests = bloodRequests.filter((req) => {
    // Status filter
    if (statusFilter !== 'all' && req.status !== statusFilter) {
      return false;
    }

    // Blood group filter
    if (selectedGroup !== 'ALL' && req.bloodGroup !== selectedGroup) {
      return false;
    }

    // Urgency filter
    if (selectedUrgency !== 'ALL' && req.urgency !== selectedUrgency) {
      return false;
    }

    // City filter
    if (selectedCity !== 'ALL' && req.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }

    // Text search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCity = req.city.toLowerCase().includes(q);
      const matchLocality = req.locality.toLowerCase().includes(q);
      const matchHospital = req.hospitalName.toLowerCase().includes(q);
      const matchPatient = req.patientName.toLowerCase().includes(q);
      const matchNotes = req.notes?.toLowerCase().includes(q);
      const matchGroup = req.bloodGroup.toLowerCase().includes(q);
      if (!matchCity && !matchLocality && !matchHospital && !matchPatient && !matchNotes && !matchGroup) {
        return false;
      }
    }

    return true;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGroup('ALL');
    setSelectedUrgency('ALL');
    setSelectedCity('ALL');
    setStatusFilter('open');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header with dual journeys: Take Blood vs Give Blood */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#18212B]/8">
        <div>
          <span className="text-xs font-bold text-[#E5252A] uppercase tracking-wider">
            Blood Discovery & Coordination
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18212B] tracking-tight mt-1">
            Find Blood. Help Save a Life.
          </h1>
          <p className="text-xs sm:text-sm text-[#697586] mt-1.5 max-w-2xl leading-relaxed">
            Discover real-time blood requests across hospitals or post an urgent requirement. Connect directly with willing donors via WhatsApp.
          </p>
        </div>

        {/* The Two Primary Action Journeys */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={onRequestBlood}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E5252A] hover:bg-[#CC1E23] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md hover:shadow-lg"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Take Blood (Request Blood)</span>
          </button>

          <button
            onClick={onBecomeDonor}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-[#E5252A] border border-[#E5252A] text-xs sm:text-sm font-bold rounded-full transition-all shadow-xs"
          >
            <Heart className="w-4 h-4 text-[#E5252A]" />
            <span>Give Blood (Join as Donor)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#18212B]/6 shadow-sm space-y-4">
        
        {/* Search input & status selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hospital, city, area, or patient name..."
              className="w-full pl-11 pr-4 py-2.5 text-sm bg-[#FAFAF8] border border-[#E2E8F0] rounded-2xl focus:outline-none focus:border-[#E5252A] focus:bg-white transition-all"
            />
          </div>

          {/* Status selector tabs */}
          <div className="flex p-1 bg-[#F5F2ED] rounded-2xl">
            <button
              onClick={() => setStatusFilter('open')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                statusFilter === 'open' ? 'bg-white text-[#18212B] shadow-xs' : 'text-[#697586]'
              }`}
            >
              Open Requests
            </button>
            <button
              onClick={() => setStatusFilter('contacted')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                statusFilter === 'contacted' ? 'bg-white text-[#18212B] shadow-xs' : 'text-[#697586]'
              }`}
            >
              Contacted
            </button>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                statusFilter === 'all' ? 'bg-white text-[#18212B] shadow-xs' : 'text-[#697586]'
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* Blood Group Filter Chips */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#18212B]">Filter by Blood Group:</span>
            {selectedGroup !== 'ALL' && (
              <button
                onClick={() => onOpenCompatibility(selectedGroup)}
                className="text-[11px] text-[#E5252A] font-semibold hover:underline"
              >
                View who can donate to {selectedGroup} →
              </button>
            )}
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

        {/* Secondary filters: City and Urgency */}
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
            <span className="text-xs text-[#697586] font-medium">Urgency:</span>
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value as any)}
              className="text-xs font-semibold text-[#18212B] bg-[#FAFAF8] border border-[#E2E8F0] rounded-xl px-2.5 py-1.5 focus:outline-none"
            >
              <option value="ALL">All Urgencies</option>
              <option value="immediate">Immediate / Urgent</option>
              <option value="24_hours">Within 24 Hours</option>
              <option value="2_3_days">Within 2–3 Days</option>
              <option value="planning">Planning Ahead</option>
            </select>
          </div>

          {(selectedGroup !== 'ALL' || selectedUrgency !== 'ALL' || selectedCity !== 'ALL' || searchQuery || statusFilter !== 'open') && (
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
          Showing <strong className="text-[#18212B]">{filteredRequests.length}</strong> matching blood requests
        </span>
        <span className="italic">
          Direct WhatsApp contact enabled on verified requests
        </span>
      </div>

      {/* Blood Requests Grid */}
      {filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((req) => (
            <BloodRequestCard
              key={req.id}
              request={req}
              currentUser={currentUser}
              onStatusChange={onStatusChange}
              onDelete={onDeleteRequest}
              onSelectBloodGroup={(bg) => setSelectedGroup(bg)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#18212B]/6 p-8">
          <div className="w-16 h-16 bg-red-50 text-[#E5252A] rounded-full flex items-center justify-center mx-auto mb-4">
            <Droplet className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#18212B]">
            No blood requests match your filters yet.
          </h3>
          <p className="text-xs sm:text-sm text-[#697586] max-w-md mx-auto mt-1.5">
            Try changing the blood group or city filters, or be the first to create a request for your patient.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 text-xs font-bold text-[#18212B] bg-[#FAFAF8] border border-[#E2E8F0] rounded-full hover:bg-slate-100 transition-colors"
            >
              Clear All Filters
            </button>
            <button
              onClick={onRequestBlood}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#E5252A] rounded-full hover:bg-[#CC1E23] transition-colors shadow-sm"
            >
              + Create Blood Request
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
