import React, { useState } from 'react';
import { Menu, X, Heart, User as UserIcon, LogOut, PlusCircle, Hospital as HospitalIcon, Users, Droplets } from 'lucide-react';
import { LifeBridgeLogo } from './LifeBridgeLogo';
import { User } from '../types';

interface NavbarProps {
  activeTab: 'home' | 'requests' | 'donors' | 'hospitals' | 'compatibility';
  onNavigate: (tab: 'home' | 'requests' | 'donors' | 'hospitals' | 'compatibility') => void;
  currentUser: User | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  onRequestBlood: () => void;
  onBecomeDonor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  currentUser,
  onOpenAuth,
  onLogout,
  onRequestBlood,
  onBecomeDonor,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'requests', label: 'Blood Requests' },
    { id: 'donors', label: 'Donors' },
    { id: 'hospitals', label: 'Nearby Hospitals' },
    { id: 'compatibility', label: 'Compatibility' },
  ] as const;

  const handleTabClick = (tabId: typeof navItems[number]['id']) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#18212B]/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleTabClick('home')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5252A] rounded-xl"
            aria-label="LifeBridge Home"
          >
            <LifeBridgeLogo size="md" />
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative px-3.5 py-2 text-sm font-semibold transition-colors rounded-lg ${
                    isActive
                      ? 'text-[#E5252A]'
                      : 'text-[#697586] hover:text-[#18212B] hover:bg-[#F3EFEA]/60'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E5252A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onRequestBlood}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#E5252A] rounded-full hover:bg-[#CC1E23] transition-colors shadow-sm"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Request Blood
                </button>
                <div className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0]">
                  <div className="w-8 h-8 rounded-full bg-[#FFE5E5] flex items-center justify-center text-[#E5252A] font-bold text-xs uppercase">
                    {currentUser.displayName ? currentUser.displayName.charAt(0) : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-[#18212B] max-w-[120px] truncate" title={currentUser.email}>
                    {currentUser.displayName || currentUser.email.split('@')[0]}
                  </span>
                  <button
                    onClick={onLogout}
                    className="p-1.5 text-[#697586] hover:text-[#E5252A] rounded-lg transition-colors"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-5 py-2 text-sm font-semibold text-[#E5252A] border border-[#E5252A]/40 rounded-full hover:bg-[#FFEAEA]/40 hover:border-[#E5252A] transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#E5252A] rounded-full hover:bg-[#CC1E23] transition-all shadow-sm hover:shadow"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#18212B] hover:text-[#E5252A] rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#18212B]/10 bg-[#FAFAF8] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-[#FFE5E5] text-[#E5252A]' : 'text-[#697586] hover:text-[#18212B]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#18212B]/10 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onRequestBlood();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-xs font-bold text-white bg-[#E5252A] rounded-full text-center"
              >
                + Request Blood
              </button>
              <button
                onClick={() => {
                  onBecomeDonor();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-xs font-bold text-[#E5252A] border border-[#E5252A] rounded-full text-center"
              >
                Become Donor
              </button>
            </div>

            {currentUser ? (
              <div className="flex items-center justify-between pt-2 px-1">
                <span className="text-xs text-[#697586] truncate">
                  Logged in as <strong className="text-[#18212B]">{currentUser.email}</strong>
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-[#E5252A] underline"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-sm font-semibold text-[#E5252A] border border-[#E5252A]/50 rounded-full text-center"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 text-sm font-semibold text-white bg-[#E5252A] rounded-full text-center"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
