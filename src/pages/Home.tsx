import React from 'react';
import { ArrowRight, Heart, Users, Clock, Droplets, MapPin, Search, ShieldCheck, Phone, Building2, CheckCircle2 } from 'lucide-react';
import { HeroIllustration } from '../components/HeroIllustration';
import { BloodRequestCard } from '../features/blood/BloodRequestCard';
import { HospitalCard } from '../features/hospitals/HospitalCard';
import { BloodRequest, Hospital, User } from '../types';

interface HomeProps {
  onNavigate: (tab: 'home' | 'requests' | 'donors' | 'hospitals' | 'compatibility') => void;
  onRequestBlood: () => void;
  onBecomeDonor: () => void;
  bloodRequests: BloodRequest[];
  hospitals: Hospital[];
  currentUser: User | null;
  onStatusChange: (id: string, newStatus: BloodRequest['status']) => void;
  onDeleteRequest: (id: string) => void;
  onSelectHospital: (hospital: Hospital) => void;
  onSelectBloodGroup: (bg: BloodRequest['bloodGroup']) => void;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  onRequestBlood,
  onBecomeDonor,
  bloodRequests,
  hospitals,
  currentUser,
  onStatusChange,
  onDeleteRequest,
  onSelectHospital,
  onSelectBloodGroup,
}) => {
  // Urgent / top 3 blood requests
  const recentRequests = bloodRequests.slice(0, 3);
  // Curated 3 hospitals
  const featuredHospitals = hospitals.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 overflow-hidden">
      
      {/* ================= HERO SECTION (MATCHING REFERENCE IMAGE) ================= */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Description, Actions & Metrics */}
          <div className="md:col-span-6 space-y-5 sm:space-y-7 text-left z-10 order-last md:order-first">
            
            {/* Small introductory tracked label */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#697586] uppercase">
                DONATE · CONNECT · SAVE LIVES
              </span>
            </div>

            {/* Main display headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#18212B] leading-[1.1] sm:leading-[1.08] text-balance">
              Because every <br className="hidden sm:inline" />
              <span className="text-[#E5252A]">drop counts.</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-[#697586] leading-relaxed max-w-xl">
              LifeBridge connects people who need blood with willing donors, making it easier, faster and simpler to save lives.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={() => onNavigate('requests')}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-white bg-[#E5252A] rounded-full hover:bg-[#CC1E23] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Find Blood Requests</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBecomeDonor}
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-[#E5252A] bg-white border border-[#E5252A] rounded-full hover:bg-[#FFEAEA]/40 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-xs"
              >
                Become a Donor
              </button>
            </div>

            {/* Compact Metric Row (Divided by subtle vertical lines) */}
            <div className="pt-4 border-t border-[#18212B]/8 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
              
              {/* Metric 1 */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFE5E5] flex items-center justify-center text-[#E5252A] shrink-0">
                  <Droplets className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="text-sm sm:text-base lg:text-lg font-extrabold text-[#18212B] leading-none">
                    1000+
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#697586] mt-0.5 whitespace-nowrap">
                    Lives Helped
                  </div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-2 sm:gap-3 border-l border-[#18212B]/10 pl-2 sm:pl-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFE5E5] flex items-center justify-center text-[#E5252A] shrink-0">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="text-sm sm:text-base lg:text-lg font-extrabold text-[#18212B] leading-none">
                    500+
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#697586] mt-0.5 whitespace-nowrap">
                    Active Donors
                  </div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-2 sm:gap-3 border-l border-[#18212B]/10 pl-2 sm:pl-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFE5E5] flex items-center justify-center text-[#E5252A] shrink-0">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="text-sm sm:text-base lg:text-lg font-extrabold text-[#18212B] leading-none">
                    24/7
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#697586] mt-0.5 whitespace-nowrap">
                    Support
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Hero Illustration Matching Reference Image */}
          {/* order-first keeps the image in front of the text on smaller screens so it never navigates downwards */}
          <div className="md:col-span-6 flex justify-center md:justify-end order-first md:order-last">
            <HeroIllustration />
          </div>

        </div>
      </section>

      {/* ================= HOW LIFEBRIDGE WORKS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#E5252A] uppercase tracking-wider">
            Simple 3-Step Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18212B] mt-1">
            How LifeBridge Works
          </h2>
          <p className="text-xs sm:text-sm text-[#697586] mt-2">
            No endless paperwork. No hidden barriers. Instant connection when every second matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#18212B]/6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFEAEA] text-[#E5252A] flex items-center justify-center font-extrabold text-lg mb-5">
              01
            </div>
            <h3 className="text-lg font-bold text-[#18212B] mb-2">
              Post or Search Blood Needs
            </h3>
            <p className="text-xs sm:text-sm text-[#697586] leading-relaxed">
              Specify blood group, required units, city, and hospital. Requests publish instantly to the local network without mandatory signup to browse.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#18212B]/6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFEAEA] text-[#E5252A] flex items-center justify-center font-extrabold text-lg mb-5">
              02
            </div>
            <h3 className="text-lg font-bold text-[#18212B] mb-2">
              Discover Willing Donors
            </h3>
            <p className="text-xs sm:text-sm text-[#697586] leading-relaxed">
              Explore volunteer donors across all blood groups in your city. View availability status and check medical cross-compatibility.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#18212B]/6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#FFEAEA] text-[#E5252A] flex items-center justify-center font-extrabold text-lg mb-5">
              03
            </div>
            <h3 className="text-lg font-bold text-[#18212B] mb-2">
              Connect via WhatsApp Instantly
            </h3>
            <p className="text-xs sm:text-sm text-[#697586] leading-relaxed">
              One-click WhatsApp click-to-chat opens an editable, pre-filled message with essential patient and hospital details ready to send.
            </p>
          </div>

        </div>
      </section>

      {/* ================= URGENT BLOOD REQUESTS FEED ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-[#E5252A] text-xs font-bold rounded-full mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E5252A] animate-ping" />
              Live Blood Requests
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18212B]">
              Urgent Community Requests
            </h2>
            <p className="text-xs sm:text-sm text-[#697586] mt-1">
              Active patient requirements waiting for voluntary donors
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onRequestBlood}
              className="px-4 py-2 text-xs font-bold text-white bg-[#E5252A] rounded-full hover:bg-[#CC1E23] transition-colors shadow-sm"
            >
              + Post New Request
            </button>
            <button
              onClick={() => onNavigate('requests')}
              className="px-4 py-2 text-xs font-bold text-[#18212B] bg-white border border-[#E2E8F0] rounded-full hover:bg-slate-50 transition-colors"
            >
              View All ({bloodRequests.length}) →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentRequests.map((req) => (
            <BloodRequestCard
              key={req.id}
              request={req}
              currentUser={currentUser}
              onStatusChange={onStatusChange}
              onDelete={onDeleteRequest}
              onSelectBloodGroup={onSelectBloodGroup}
            />
          ))}
        </div>
      </section>

      {/* ================= PROMOTIONAL SPOTLIGHT: FIND BLOOD, FIND HOPE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FFEAEA] via-[#FFF3F3] to-[#FAFAF8] rounded-3xl p-8 sm:p-12 border border-[#FFCCD0]/70 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold text-[#E5252A] uppercase tracking-wider">
              Social Impact Network
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18212B]">
              Find Blood. Give Hope. Save a Family.
            </h3>
            <p className="text-sm text-[#697586] leading-relaxed">
              Over 12,000 blood donations are required daily across India. By listing yourself as a donor or sharing an open request, you directly bridge the gap between hope and healing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate('donors')}
              className="px-6 py-3.5 bg-[#18212B] hover:bg-[#2D3748] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-sm"
            >
              Browse Donor Directory
            </button>
            <button
              onClick={() => onNavigate('compatibility')}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-[#E5252A] border border-[#E5252A] text-xs sm:text-sm font-bold rounded-full transition-all"
            >
              Check Compatibility Chart
            </button>
          </div>
        </div>
      </section>

      {/* ================= DISCOVER HOSPITALS NEAR YOU ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#E5252A] uppercase tracking-wider">
              Healthcare Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18212B] mt-1">
              Discover Trusted Hospitals Near You
            </h2>
            <p className="text-xs sm:text-sm text-[#697586] mt-1">
              Essential for newcomers to Mysuru, Bengaluru, Mumbai, and other cities finding emergency care and specialty departments.
            </p>
          </div>

          <button
            onClick={() => onNavigate('hospitals')}
            className="px-5 py-2.5 text-xs font-bold text-[#18212B] bg-white border border-[#E2E8F0] rounded-full hover:bg-slate-50 transition-colors shrink-0"
          >
            Explore All Hospitals ({hospitals.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHospitals.map((hosp) => (
            <HospitalCard
              key={hosp.id}
              hospital={hosp}
              onViewDetails={onSelectHospital}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
