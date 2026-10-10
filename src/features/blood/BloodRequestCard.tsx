import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Building2, Clock, AlertCircle, CheckCircle, Trash2, Heart, Share2 } from 'lucide-react';
import { generateWhatsAppUrl } from '../../lib/storage';
import { BloodRequest, User } from '../../types';

interface BloodRequestCardProps {
  request: BloodRequest;
  currentUser: User | null;
  onStatusChange: (id: string, newStatus: BloodRequest['status']) => void;
  onDelete: (id: string) => void;
  onSelectBloodGroup?: (bg: BloodRequest['bloodGroup']) => void;
}

export const BloodRequestCard: React.FC<BloodRequestCardProps> = ({
  request,
  currentUser,
  onStatusChange,
  onDelete,
  onSelectBloodGroup,
}) => {
  const [copied, setCopied] = useState(false);
  const isOwner = currentUser?.email === request.requesterEmail;

  // Custom pre-filled message formatted for WhatsApp
  const defaultWhatsAppMsg = `Hello, I found your blood request (${request.id}) on LifeBridge for ${request.patientName} (${request.unitsRequired} Units of ${request.bloodGroup} at ${request.hospitalName}, ${request.city}). Are you still looking for blood? I may be able to help.`;

  const urgencyBadge = {
    immediate: { label: 'URGENT · Immediate Need', class: 'bg-red-100 text-[#E5252A] border-red-200' },
    '24_hours': { label: 'Within 24 Hours', class: 'bg-amber-100 text-amber-800 border-amber-200' },
    '2_3_days': { label: 'Within 2–3 Days', class: 'bg-blue-100 text-blue-800 border-blue-200' },
    planning: { label: 'Planning Ahead', class: 'bg-slate-100 text-slate-700 border-slate-200' },
  }[request.urgency];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Urgent Blood Need: ${request.bloodGroup} in ${request.city}`,
        text: `Blood request on LifeBridge: ${request.unitsRequired} unit(s) of ${request.bloodGroup} required at ${request.hospitalName}, ${request.city}.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `Blood Request on LifeBridge: ${request.unitsRequired} unit(s) of ${request.bloodGroup} needed at ${request.hospitalName}, ${request.city}. Contact: ${request.contactPhone}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#18212B]/8 hover:border-[#E5252A]/30 transition-all shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden relative group">
      <div>
        {/* Top Status & Urgency Header Bar */}
        <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-[#F1F5F9]">
          <span
            className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full border shrink-0 ${urgencyBadge.class}`}
          >
            {urgencyBadge.label}
          </span>

          <div className="flex items-center gap-2 shrink-0 text-[11px] text-[#697586]">
            <span className="font-mono text-[#94A3B8]">ID: {request.id}</span>
            <div className="flex items-center gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  request.status === 'open'
                    ? 'bg-emerald-500'
                    : request.status === 'contacted'
                    ? 'bg-amber-500'
                    : 'bg-slate-400'
                }`}
              />
              <span className="capitalize font-semibold text-[#18212B]">{request.status}</span>
            </div>
          </div>
        </div>

        {/* Patient & Blood Group Info Row */}
        <div className="flex items-center gap-3.5 mb-3.5">
          {/* Blood Type Badge */}
          <button
            onClick={() => onSelectBloodGroup?.(request.bloodGroup)}
            className="w-12 h-12 rounded-xl bg-[#FFEAEA] border border-[#FFCCD0] flex flex-col items-center justify-center text-[#E5252A] font-extrabold transition-transform hover:scale-105 shrink-0"
            title="Click to filter by this blood group"
          >
            <span className="text-base leading-none font-extrabold">{request.bloodGroup}</span>
            <span className="text-[9px] font-bold text-[#E5252A]/80 uppercase mt-0.5">Need</span>
          </button>

          {/* Patient Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-[#18212B] truncate" title={request.patientName}>
                {request.patientName}
              </h3>
              <span className="text-xs font-bold text-[#E5252A] shrink-0 whitespace-nowrap bg-red-50 px-2 py-0.5 rounded-md">
                {request.unitsRequired} {request.unitsRequired === 1 ? 'unit' : 'units'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#697586] mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#E5252A] shrink-0" />
              <span className="truncate">{request.city}{request.locality ? `, ${request.locality}` : ''}</span>
            </div>
          </div>
        </div>

        {/* Hospital & Location */}
        <div className="p-3 bg-[#FAFAF8] rounded-xl border border-[#F1F5F9] text-xs space-y-1 mb-4">
          <div className="flex items-center gap-2 text-[#18212B]">
            <Building2 className="w-3.5 h-3.5 text-[#697586] shrink-0" />
            <span className="font-semibold truncate">{request.hospitalName}</span>
          </div>
          {request.notes && (
            <p className="text-[#697586] italic text-[11px] line-clamp-2 leading-relaxed">
              "{request.notes}"
            </p>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-[#F1F5F9] space-y-2.5">
        <div className="flex items-center gap-2">
          {request.whatsappEnabled && request.contactPhone ? (
            <a
              href={generateWhatsAppUrl(request.contactPhone, defaultWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366] hover:bg-[#20BE5B] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Contact on WhatsApp</span>
            </a>
          ) : (
            <span
              className="flex-1 py-2.5 px-3 bg-slate-100 text-slate-400 text-xs font-semibold rounded-xl text-center"
              title="WhatsApp contact disabled by requester"
            >
              WhatsApp Unavailable
            </span>
          )}

          {/* Quick Call Button */}
          {request.contactPhone && (
            <a
              href={`tel:${request.contactPhone}`}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-[#18212B] rounded-xl transition-colors"
              title={`Call ${request.contactPhone}`}
              aria-label="Direct Phone Call"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-[#18212B] rounded-xl transition-colors relative"
            title="Share request"
          >
            <Share2 className="w-4 h-4" />
            {copied && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#18212B] text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
        </div>

        {/* Owner Management Controls */}
        {isOwner && (
          <div className="flex items-center justify-between text-xs pt-1.5 border-t border-dashed border-[#E2E8F0]">
            <span className="text-[11px] text-[#697586]">Manage (Owner):</span>
            <div className="flex items-center gap-2">
              {request.status === 'open' && (
                <button
                  onClick={() => onStatusChange(request.id, 'contacted')}
                  className="text-amber-700 hover:underline font-semibold text-[11px]"
                >
                  Mark Contacted
                </button>
              )}
              {request.status !== 'fulfilled' && (
                <button
                  onClick={() => onStatusChange(request.id, 'fulfilled')}
                  className="text-emerald-700 hover:underline font-semibold text-[11px]"
                >
                  Mark Fulfilled
                </button>
              )}
              <button
                onClick={() => onDelete(request.id)}
                className="text-red-600 hover:text-red-800 transition-colors p-1"
                title="Remove request"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
