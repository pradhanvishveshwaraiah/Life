import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { BloodRequestsPage } from './pages/BloodRequestsPage';
import { DonorsPage } from './pages/DonorsPage';
import { HospitalsPage } from './pages/HospitalsPage';
import { AuthModal } from './features/auth/AuthModal';
import { BloodRequestModal } from './features/blood/BloodRequestModal';
import { DonorRegistrationModal } from './features/blood/DonorRegistrationModal';
import { BloodCompatibilityModal } from './features/blood/BloodCompatibilityModal';
import { HospitalDetailModal } from './features/hospitals/HospitalDetailModal';
import {
  getCurrentUser,
  setCurrentUser,
  logoutUser,
  getBloodRequests,
  updateBloodRequestStatus,
  deleteBloodRequest,
  getDonors,
  getHospitals,
} from './lib/storage';
import { BloodGroup, BloodRequest, DonorListing, Hospital, User } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'requests' | 'donors' | 'hospitals' | 'compatibility'>('home');
  const [currentUser, setUser] = useState<User | null>(null);

  // Data states
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [donors, setDonors] = useState<DonorListing[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [donorModalOpen, setDonorModalOpen] = useState(false);
  const [compatibilityModalOpen, setCompatibilityModalOpen] = useState(false);
  const [selectedGroupForCompatibility, setSelectedGroupForCompatibility] = useState<BloodGroup>('O-');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  // Notification / Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Initial load
  useEffect(() => {
    setUser(getCurrentUser());
    setBloodRequests(getBloodRequests());
    setDonors(getDonors());
    setHospitals(getHospitals());
  }, []);

  // Handlers
  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: User) => {
    setUser(user);
    showToast(`Welcome back, ${user.displayName || user.email}!`);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    showToast('You have been logged out.');
  };

  const handleRequestCreated = (newReq: BloodRequest) => {
    setBloodRequests(getBloodRequests());
    showToast(`Request ${newReq.id} published successfully!`);
  };

  const handleDonorRegistered = (newDonor: DonorListing) => {
    setDonors(getDonors());
    showToast(`Welcome to the LifeBridge volunteer donor directory!`);
  };

  const handleStatusChange = (id: string, newStatus: BloodRequest['status']) => {
    const updated = updateBloodRequestStatus(id, newStatus);
    setBloodRequests(updated);
    showToast(`Blood request marked as ${newStatus}.`);
  };

  const handleDeleteRequest = (id: string) => {
    const updated = deleteBloodRequest(id);
    setBloodRequests(updated);
    showToast('Blood request removed.');
  };

  const handleOpenCompatibility = (group?: BloodGroup) => {
    if (group) setSelectedGroupForCompatibility(group);
    setCompatibilityModalOpen(true);
  };

  const handleSelectBloodGroupFilter = (group: BloodGroup) => {
    setSelectedGroupForCompatibility(group);
    setActiveTab('requests');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#18212B] font-sans antialiased selection:bg-[#FFE5E5] selection:text-[#E5252A]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18212B] text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-slideUp">
          <span className="w-2 h-2 rounded-full bg-[#E5252A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={(tab) => {
          if (tab === 'compatibility') {
            setCompatibilityModalOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onRequestBlood={() => setRequestModalOpen(true)}
        onBecomeDonor={() => setDonorModalOpen(true)}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            onNavigate={(tab) => {
              if (tab === 'compatibility') {
                setCompatibilityModalOpen(true);
              } else {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onRequestBlood={() => setRequestModalOpen(true)}
            onBecomeDonor={() => setDonorModalOpen(true)}
            bloodRequests={bloodRequests}
            hospitals={hospitals}
            currentUser={currentUser}
            onStatusChange={handleStatusChange}
            onDeleteRequest={handleDeleteRequest}
            onSelectHospital={(hosp) => setSelectedHospital(hosp)}
            onSelectBloodGroup={handleSelectBloodGroupFilter}
          />
        )}

        {activeTab === 'requests' && (
          <BloodRequestsPage
            bloodRequests={bloodRequests}
            currentUser={currentUser}
            onRequestBlood={() => setRequestModalOpen(true)}
            onBecomeDonor={() => setDonorModalOpen(true)}
            onStatusChange={handleStatusChange}
            onDeleteRequest={handleDeleteRequest}
            onOpenCompatibility={handleOpenCompatibility}
          />
        )}

        {activeTab === 'donors' && (
          <DonorsPage
            donors={donors}
            currentUser={currentUser}
            onBecomeDonor={() => setDonorModalOpen(true)}
            onRequestBlood={() => setRequestModalOpen(true)}
            onOpenCompatibility={handleOpenCompatibility}
          />
        )}

        {activeTab === 'hospitals' && (
          <HospitalsPage
            hospitals={hospitals}
            onSelectHospital={(hosp) => setSelectedHospital(hosp)}
          />
        )}
      </main>

      {/* Shared Trustworthy Footer */}
      <Footer
        onNavigate={(tab) => {
          if (tab === 'compatibility') {
            setCompatibilityModalOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onRequestBlood={() => setRequestModalOpen(true)}
        onBecomeDonor={() => setDonorModalOpen(true)}
      />

      {/* ----------------- MODALS ----------------- */}

      {/* Authentication Dialog */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* 3-Step Guided Take Blood Request Form */}
      <BloodRequestModal
        isOpen={requestModalOpen}
        currentUser={currentUser}
        onClose={() => setRequestModalOpen(false)}
        onRequestCreated={handleRequestCreated}
        onOpenAuth={() => handleOpenAuth('signup')}
      />

      {/* Become a Donor Registration Form */}
      <DonorRegistrationModal
        isOpen={donorModalOpen}
        currentUser={currentUser}
        onClose={() => setDonorModalOpen(false)}
        onDonorRegistered={handleDonorRegistered}
      />

      {/* Blood Compatibility Matrix Guide */}
      <BloodCompatibilityModal
        isOpen={compatibilityModalOpen}
        onClose={() => setCompatibilityModalOpen(false)}
        initialBloodGroup={selectedGroupForCompatibility}
      />

      {/* Hospital Specification & Directions Modal */}
      <HospitalDetailModal
        hospital={selectedHospital}
        onClose={() => setSelectedHospital(null)}
      />

    </div>
  );
}
