import React from 'react';
import { Heart, ShieldCheck, Phone, MapPin, ExternalLink, Droplet } from 'lucide-react';
import { LifeBridgeLogo } from './LifeBridgeLogo';

interface FooterProps {
  onNavigate: (tab: 'home' | 'requests' | 'donors' | 'hospitals' | 'compatibility') => void;
  onRequestBlood: () => void;
  onBecomeDonor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestBlood, onBecomeDonor }) => {
  return (
    <footer className="bg-[#18212B] text-white pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <LifeBridgeLogo size="md" theme="dark" />

            <p className="text-xs text-slate-400 leading-relaxed">
              A healthcare social-impact platform bridging patients requiring blood with voluntary donors and trusted medical facilities across Indian cities.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#E5252A]" />
              <span>Consent-driven voluntary community network</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('requests')}
                  className="hover:text-white transition-colors"
                >
                  Blood Requests Discovery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('donors')}
                  className="hover:text-white transition-colors"
                >
                  Volunteer Donor Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('hospitals')}
                  className="hover:text-white transition-colors"
                >
                  Nearby Hospitals & Facilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('compatibility')}
                  className="hover:text-white transition-colors"
                >
                  Medical Compatibility Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              Urgent Assistance
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={onRequestBlood}
                className="w-full text-left py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-between"
              >
                <span>Request Blood Online</span>
                <span className="text-[#E5252A] font-bold">+</span>
              </button>

              <button
                onClick={onBecomeDonor}
                className="w-full text-left py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-between"
              >
                <span>Become a Donor</span>
                <Heart className="w-3.5 h-3.5 text-[#E5252A]" />
              </button>

              <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-xl text-[11px] text-red-200">
                <span className="font-bold block text-red-400 mb-0.5">Emergency Trauma Hotline</span>
                <span>Dial <strong>108</strong> (National Ambulance Service) or <strong>1066</strong> for critical response.</span>
              </div>
            </div>
          </div>

          {/* Coverage Cities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              Active City Hubs
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Hospital data curated and verified for newcomers and patients in:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {['Mysuru', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune'].map((c) => (
                <span
                  key={c}
                  className="px-2 py-0.5 bg-slate-800/80 text-slate-300 rounded-md border border-slate-700"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Mandatory Medical Disclaimer Banner */}
        <div className="pt-6 pb-6 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-300">Medical Notice & Platform Responsibility:</strong> LifeBridge is an independent social-impact discovery tool facilitating voluntary communication between blood seekers and willing donors. LifeBridge does not operate a physical blood bank and does not guarantee blood unit availability. Blood cross-matching, infectious screening, and clinical eligibility must always be confirmed by accredited healthcare professionals and blood transfusion banks prior to transfusion.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="pt-4 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} LifeBridge. Dedicated to saving lives through voluntary community action.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Preserved</span>
            <span>·</span>
            <span>No Unsolicited Sharing</span>
            <span>·</span>
            <span>Consent Verified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
