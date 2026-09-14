import React from 'react';
import { X, QrCode, ShieldCheck, MapPin, Calendar, CheckCircle2, ThermometerSnowflake, FileText } from 'lucide-react';
import { CropListing } from '../types';

interface TraceabilityModalProps {
  listing: CropListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TraceabilityModal: React.FC<TraceabilityModalProps> = ({
  listing,
  isOpen,
  onClose
}) => {
  if (!isOpen || !listing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="astra-glass-card rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-emerald-500/40 relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Digital Provenance & Batch Passport
              </h3>
              <p className="text-xs text-slate-400 font-mono">{listing.traceabilityHash}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code & Provenance Details */}
        <div className="mt-6 space-y-5 text-xs">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/60 border border-white/10">
            {/* Simulated High-Tech QR Code SVG */}
            <div className="w-24 h-24 bg-white p-2 rounded-xl shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-black" fill="currentColor">
                <rect x="0" y="0" width="30" height="30" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="10" y="10" width="10" height="10" />
                
                <rect x="70" y="0" width="30" height="30" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="80" y="10" width="10" height="10" />

                <rect x="0" y="70" width="30" height="30" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="10" y="80" width="10" height="10" />

                <rect x="40" y="10" width="10" height="20" />
                <rect x="55" y="5" width="10" height="10" />
                <rect x="35" y="40" width="30" height="20" />
                <rect x="70" y="45" width="20" height="15" />
                <rect x="40" y="70" width="15" height="25" />
                <rect x="65" y="75" width="25" height="15" />
              </svg>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                FARMLINK VERIFIED PRODUCE
              </span>
              <h4 className="font-bold text-white text-sm">{listing.cropName}</h4>
              <p className="text-slate-400 text-[11px]">{listing.farmerName}</p>
              <div className="font-mono text-[10px] text-cyan-300">
                Batch ID: FL-BTC-2026-NASHIK-99
              </div>
            </div>
          </div>

          {/* Verification Timeline Cards */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block">Farm Location & Geo-Tag</span>
                <span className="text-slate-400 text-[11px]">{listing.location} (20.1983° N, 73.8428° E)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 flex items-start gap-3">
              <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block">Harvest & Pick Timestamp</span>
                <span className="text-slate-400 text-[11px]">{listing.harvestDate}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 flex items-start gap-3">
              <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block">Soil & Chemical Residue Lab Test</span>
                <span className="text-slate-400 text-[11px]">{listing.soilReport}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-cyan-500/20 flex items-start gap-3">
              <ThermometerSnowflake className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-cyan-300 font-bold block">Adani Reefer Cold Chain Compliance</span>
                <span className="text-slate-400 text-[11px]">Continuous Pre-Cooling at 3.8°C. Zero thermal interruption logged.</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-2 text-emerald-300 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>FSSAI Certified • Verified by Local FPO Inspection Officer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
