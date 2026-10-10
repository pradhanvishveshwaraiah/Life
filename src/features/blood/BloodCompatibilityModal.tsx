import React, { useState } from 'react';
import { X, Droplets, ArrowUpRight, ArrowDownLeft, ShieldAlert, Check } from 'lucide-react';
import { ALL_BLOOD_GROUPS, BLOOD_COMPATIBILITY_MAP } from '../../lib/bloodCompatibility';
import { BloodGroup } from '../../types';

interface BloodCompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBloodGroup?: BloodGroup;
}

export const BloodCompatibilityModal: React.FC<BloodCompatibilityModalProps> = ({
  isOpen,
  onClose,
  initialBloodGroup = 'O-',
}) => {
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>(initialBloodGroup);

  if (!isOpen) return null;

  const info = BLOOD_COMPATIBILITY_MAP[selectedGroup];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#18212B]/5 max-h-[90vh] overflow-y-auto">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#697586] hover:text-[#18212B] hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close compatibility modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#FFE5E5] flex items-center justify-center text-[#E5252A]">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#18212B]">
              Blood Compatibility Guide
            </h2>
            <p className="text-xs sm:text-sm text-[#697586]">
              Clinical compatibility matrix for whole blood and red blood cells
            </p>
          </div>
        </div>

        {/* Group Selector */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-[#18212B] mb-2 uppercase tracking-wider">
            Select Blood Group to Check:
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {ALL_BLOOD_GROUPS.map((group) => {
              const isSelected = selectedGroup === group;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`py-3 rounded-xl font-extrabold text-sm transition-all border ${
                    isSelected
                      ? 'bg-[#E5252A] text-white border-[#E5252A] shadow-md scale-105'
                      : 'bg-white text-[#18212B] border-[#E2E8F0] hover:border-[#E5252A]/40 hover:bg-red-50/20'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>

        {/* Group Details Card */}
        <div className="p-5 bg-[#FAFAF8] rounded-2xl border border-[#E2E8F0] mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-[#E5252A]">{selectedGroup}</span>
              <div>
                <span className="text-xs font-semibold text-[#18212B] block">Blood Type Profile</span>
                <span className="text-[11px] text-[#697586]">Approx. {info.prevalencePercentage}% of population</span>
              </div>
            </div>

            {info.isUniversalDonor && (
              <span className="px-3 py-1 bg-red-100 text-[#E5252A] font-bold text-xs rounded-full border border-red-200">
                Universal Red Cell Donor
              </span>
            )}
            {info.isUniversalRecipient && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full border border-emerald-200">
                Universal Recipient
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Can Donate To */}
            <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E5252A] mb-2">
                <ArrowUpRight className="w-4 h-4" />
                <span>Can Give Red Cells To:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {info.canDonateTo.map((target) => (
                  <span
                    key={target}
                    className="px-2.5 py-1 bg-red-50 text-[#E5252A] font-bold text-xs rounded-lg border border-red-200"
                  >
                    {target}
                  </span>
                ))}
              </div>
            </div>

            {/* Can Receive From */}
            <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-2">
                <ArrowDownLeft className="w-4 h-4" />
                <span>Can Receive Red Cells From:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {info.canReceiveFrom.map((src) => (
                  <span
                    key={src}
                    className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-lg border border-emerald-200"
                  >
                    {src}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Medical disclaimer */}
        <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">Medical Practice Advisory:</span>
            <p className="text-[11px] leading-relaxed text-amber-800">
              The above represents general ABO and Rh(D) erythrocyte compatibility. Actual transfusions must always undergo professional cross-matching, antibody screening, and laboratory verification by certified blood bank officers before administration.
            </p>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#18212B] hover:bg-[#2D3748] text-white text-xs font-bold rounded-xl transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
