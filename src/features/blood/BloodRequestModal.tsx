import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, Heart, Clock, MapPin, Building2, Phone, Droplet, ShieldCheck } from 'lucide-react';
import { ALL_BLOOD_GROUPS, getCompatibleDonorsForRecipient } from '../../lib/bloodCompatibility';
import { createBloodRequest, generateWhatsAppUrl } from '../../lib/storage';
import { BloodGroup, BloodRequest, UrgencyLevel, User } from '../../types';

interface BloodRequestModalProps {
  isOpen: boolean;
  currentUser: User | null;
  onClose: () => void;
  onRequestCreated: (request: BloodRequest) => void;
  onOpenAuth: () => void;
}

export const BloodRequestModal: React.FC<BloodRequestModalProps> = ({
  isOpen,
  currentUser,
  onClose,
  onRequestCreated,
  onOpenAuth,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Requirements, 2: Urgency, 3: Details & Contact, 4: Review

  // Form state
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('B+');
  const [unitsRequired, setUnitsRequired] = useState(2);
  const [city, setCity] = useState('Mysuru');
  const [locality, setLocality] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('immediate');
  const [notes, setNotes] = useState('');
  const [contactPhone, setContactPhone] = useState('+91 98450 12345');
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [contactConsent, setContactConsent] = useState(true);

  // Success state
  const [submittedRequest, setSubmittedRequest] = useState<BloodRequest | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const urgencyOptions: { value: UrgencyLevel; label: string; desc: string; badge: string; color: string }[] = [
    {
      value: 'immediate',
      label: 'As soon as possible',
      desc: 'Critical requirement, surgery or emergency trauma underway',
      badge: 'URGENT',
      color: 'border-red-500 bg-red-50/50 text-[#E5252A]',
    },
    {
      value: '24_hours',
      label: 'Within 24 hours',
      desc: 'Surgery or transfusion scheduled for today or tomorrow',
      badge: 'HIGH PRIORITY',
      color: 'border-amber-500 bg-amber-50/40 text-amber-800',
    },
    {
      value: '2_3_days',
      label: 'Within 2–3 days',
      desc: 'Upcoming treatment, chemotherapy, or planned procedure',
      badge: 'STANDARD',
      color: 'border-blue-400 bg-blue-50/40 text-blue-800',
    },
    {
      value: 'planning',
      label: 'Planning ahead',
      desc: 'Advance coordination for upcoming medical consultation',
      badge: 'PLANNED',
      color: 'border-slate-300 bg-slate-50 text-slate-700',
    },
  ];

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      if (!bloodGroup) {
        setError('Please select a required blood group.');
        return;
      }
      if (!city.trim()) {
        setError('Please specify the city or locality.');
        return;
      }
      if (unitsRequired < 1 || unitsRequired > 10) {
        setError('Units required must be between 1 and 10.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!contactPhone.trim()) {
        setError('Please provide a contact phone number so donors can reach you.');
        return;
      }
      if (!contactConsent) {
        setError('Please confirm consent to share this contact number with potential donors.');
        return;
      }
      setStep(4);
    }
  };

  const handleSubmit = () => {
    setError(null);

    const email = currentUser?.email || 'guest.requester@lifebridge.org';
    const cleanPatient = patientName.trim() || 'Patient in Need';

    const newReq = createBloodRequest({
      requesterEmail: email,
      patientName: cleanPatient,
      bloodGroup,
      unitsRequired,
      city: city.trim(),
      locality: locality.trim() || 'Central',
      hospitalName: hospitalName.trim() || 'City Hospital',
      urgency,
      notes: notes.trim(),
      contactPhone: contactPhone.trim(),
      whatsappEnabled,
    });

    setSubmittedRequest(newReq);
    onRequestCreated(newReq);
  };

  const handleResetAndClose = () => {
    setSubmittedRequest(null);
    setStep(1);
    onClose();
  };

  const compatibleDonors = getCompatibleDonorsForRecipient(bloodGroup);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#18212B]/5 my-8">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 text-[#697586] hover:text-[#18212B] hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close blood request modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Confirmed State Screen */}
        {submittedRequest ? (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 bg-red-50 text-[#E5252A] rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="inline-block px-3 py-1 bg-[#FEE2E2] text-[#E5252A] text-xs font-bold rounded-full mb-3">
              Request ID: {submittedRequest.id}
            </div>

            <h3 className="text-2xl font-extrabold text-[#18212B]">
              Blood Request Published!
            </h3>
            <p className="text-sm text-[#697586] max-w-md mx-auto mt-2">
              Your request for <strong className="text-[#E5252A]">{submittedRequest.unitsRequired} unit(s) of {submittedRequest.bloodGroup}</strong> in {submittedRequest.city} has been added to LifeBridge.
            </p>

            {/* Quick Summary Card */}
            <div className="mt-6 p-4 bg-[#FAFAF8] border border-[#E2E8F0] rounded-2xl text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#697586]">Hospital:</span>
                <span className="font-semibold text-[#18212B]">{submittedRequest.hospitalName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#697586]">Urgency:</span>
                <span className="font-semibold text-[#E5252A] capitalize">{submittedRequest.urgency.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#697586]">Compatible Donors:</span>
                <span className="font-semibold text-[#18212B]">{compatibleDonors.join(', ')}</span>
              </div>
            </div>

            {/* WhatsApp Direct Share */}
            {submittedRequest.whatsappEnabled && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={generateWhatsAppUrl(
                    submittedRequest.contactPhone,
                    `🚨 URGENT: Blood Request on LifeBridge (ID: ${submittedRequest.id})\nPatient: ${submittedRequest.patientName}\nBlood Group: ${submittedRequest.bloodGroup} (${submittedRequest.unitsRequired} Units)\nHospital: ${submittedRequest.hospitalName}, ${submittedRequest.city}\nPlease connect if you can donate or help share!`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20BE5B] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  Share Request on WhatsApp
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="px-5 py-3 bg-[#18212B] hover:bg-[#2D3748] text-white text-xs font-bold rounded-xl transition-all"
                >
                  Done & View Directory
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFE5E5] flex items-center justify-center text-[#E5252A]">
                  <Droplet className="w-4 h-4 fill-[#E5252A]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18212B]">
                  Request Blood on LifeBridge
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#697586]">
                Follow the 3 simple steps below to connect with voluntary donors in your locality.
              </p>

              {/* Progress Indicator */}
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#697586]">
                <span className={step >= 1 ? 'text-[#E5252A]' : ''}>1. Requirements</span>
                <span className="text-slate-300">→</span>
                <span className={step >= 2 ? 'text-[#E5252A]' : ''}>2. Urgency</span>
                <span className="text-slate-300">→</span>
                <span className={step >= 3 ? 'text-[#E5252A]' : ''}>3. Details</span>
                <span className="text-slate-300">→</span>
                <span className={step === 4 ? 'text-[#E5252A]' : ''}>Review</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#E5252A] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-[#E5252A] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: Blood Requirements */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-[#18212B] mb-2">
                    Required Blood Group <span className="text-[#E5252A]">*</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {ALL_BLOOD_GROUPS.map((group) => {
                      const isSelected = bloodGroup === group;
                      return (
                        <button
                          key={group}
                          type="button"
                          onClick={() => setBloodGroup(group)}
                          className={`py-2.5 rounded-xl font-bold text-sm transition-all border ${
                            isSelected
                              ? 'bg-[#E5252A] text-white border-[#E5252A] shadow-sm'
                              : 'bg-white text-[#18212B] border-[#E2E8F0] hover:border-[#E5252A]/40 hover:bg-[#FFF5F5]'
                          }`}
                        >
                          {group}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-[#697586] mt-2">
                    Compatible donor blood groups: <strong className="text-[#18212B]">{compatibleDonors.join(', ')}</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                      Units Required <span className="text-[#E5252A]">*</span>
                    </label>
                    <div className="flex items-center border border-[#E2E8F0] rounded-xl overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => setUnitsRequired(Math.max(1, unitsRequired - 1))}
                        className="px-3 py-2 text-sm font-bold text-[#697586] hover:bg-slate-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={unitsRequired}
                        onChange={(e) => setUnitsRequired(parseInt(e.target.value) || 1)}
                        className="w-full text-center py-2 text-sm font-bold text-[#18212B] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setUnitsRequired(Math.min(10, unitsRequired + 1))}
                        className="px-3 py-2 text-sm font-bold text-[#697586] hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#E5252A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                      City <span className="text-[#E5252A]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mysuru, Bengaluru"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#E5252A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                      Locality / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kuvempunagar, Hebbal"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#E5252A]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Urgency */}
            {step === 2 && (
              <div className="space-y-3 animate-fadeIn">
                <label className="block text-xs font-bold text-[#18212B]">
                  When do you need the blood? <span className="text-[#E5252A]">*</span>
                </label>
                <div className="space-y-2.5">
                  {urgencyOptions.map((opt) => {
                    const isSelected = urgency === opt.value;
                    return (
                      <div
                        key={opt.value}
                        onClick={() => setUrgency(opt.value)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? `${opt.color} shadow-sm border-2`
                            : 'bg-white border-[#E2E8F0] hover:border-slate-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'border-[#E5252A] bg-[#E5252A]' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#18212B]">{opt.label}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-current">
                              {opt.badge}
                            </span>
                          </div>
                          <p className="text-xs text-[#697586] mt-0.5">{opt.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-[11px] text-amber-800 flex items-start gap-2">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <span>
                    LifeBridge facilitates community connection. For urgent medical emergencies, immediately contact your hospital blood bank or call the 108 emergency hotline.
                  </span>
                </div>
              </div>
            )}

            {/* STEP 3: Details & Contact */}
            {step === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                    Hospital or Blood Bank Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="text"
                      placeholder="e.g. Apollo BGS Hospital, Kuvempunagar"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#E5252A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                    Contact Phone Number <span className="text-[#E5252A]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="tel"
                      placeholder="+91 98450 12345"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#E5252A]"
                    />
                  </div>
                  <p className="text-[11px] text-[#697586] mt-1">
                    Used strictly to facilitate donor communication via phone or WhatsApp.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#18212B] mb-1.5">
                    Additional Medical Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Scheduled for cardiac surgery at 9 AM. Replacement donor needed."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#E5252A]"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#18212B]">
                    <input
                      type="checkbox"
                      checked={whatsappEnabled}
                      onChange={(e) => setWhatsappEnabled(e.target.checked)}
                      className="w-4 h-4 text-[#E5252A] rounded border-slate-300 focus:ring-[#E5252A]"
                    />
                    Enable 1-Click WhatsApp Contact for potential donors
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[#697586]">
                    <input
                      type="checkbox"
                      checked={contactConsent}
                      onChange={(e) => setContactConsent(e.target.checked)}
                      className="w-4 h-4 text-[#E5252A] rounded border-slate-300 focus:ring-[#E5252A]"
                    />
                    I consent to sharing this contact number publicly for this blood request
                  </label>
                </div>
              </div>
            )}

            {/* STEP 4: Review Summary */}
            {step === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-[#FAFAF8] rounded-2xl border border-[#E2E8F0] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                    <span className="text-xs text-[#697586]">Required Blood:</span>
                    <span className="text-base font-extrabold text-[#E5252A]">
                      {unitsRequired} Unit(s) of {bloodGroup}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#697586] block">Patient:</span>
                      <strong className="text-[#18212B]">{patientName || 'Patient in Need'}</strong>
                    </div>
                    <div>
                      <span className="text-[#697586] block">Urgency:</span>
                      <strong className="text-[#E5252A] capitalize">{urgency.replace('_', ' ')}</strong>
                    </div>
                    <div>
                      <span className="text-[#697586] block">City & Area:</span>
                      <strong className="text-[#18212B]">{city}{locality ? `, ${locality}` : ''}</strong>
                    </div>
                    <div>
                      <span className="text-[#697586] block">Hospital:</span>
                      <strong className="text-[#18212B]">{hospitalName || 'Local Hospital'}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#697586] block">Contact Phone:</span>
                      <strong className="text-[#18212B]">{contactPhone} {whatsappEnabled ? '(WhatsApp Enabled)' : ''}</strong>
                    </div>
                  </div>

                  {notes && (
                    <div className="pt-2 border-t border-[#E2E8F0] text-xs">
                      <span className="text-[#697586] block">Notes:</span>
                      <p className="text-[#18212B] italic mt-0.5">{notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 p-3 bg-red-50/70 border border-red-200/50 rounded-xl text-xs text-[#18212B]">
                  <ShieldCheck className="w-5 h-5 text-[#E5252A] shrink-0" />
                  <span>
                    Your request will immediately be listed in the public discovery feed so willing donors can contact you directly via WhatsApp.
                  </span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((step - 1) as any)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#697586] hover:text-[#18212B] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#E5252A] hover:bg-[#CC1E23] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  Continue to Step {step + 1}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#E5252A] hover:bg-[#CC1E23] text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm & Publish Request
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
