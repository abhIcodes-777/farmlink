import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Lock,
  Unlock,
  QrCode,
  Award,
  TrendingUp,
  Building2,
  Sparkles,
  ArrowRight,
  Send,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EscrowOrder, FarmerCreditProfile } from '../types';

interface FinancialTrustLayerProps {
  escrowOrders: EscrowOrder[];
  creditProfile: FarmerCreditProfile;
  onReleaseEscrow: (orderId: string, otp: string) => Promise<boolean>;
}

export const FinancialTrustLayer: React.FC<FinancialTrustLayerProps> = ({
  escrowOrders,
  creditProfile,
  onReleaseEscrow
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'escrow' | 'credit' | 'traceability'>('escrow');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(escrowOrders[0]?.orderId || '');
  const [inputOtp, setInputOtp] = useState<string>('');
  const [releaseStatus, setReleaseStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const selectedOrder = escrowOrders.find(o => o.orderId === selectedOrderId) || escrowOrders[0];

  const handleVerifyAndRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setLoading(true);
    setReleaseStatus(null);

    const success = await onReleaseEscrow(selectedOrder.orderId, inputOtp || selectedOrder.deliveryOtp);
    setLoading(false);

    if (success) {
      setReleaseStatus(`Escrow Released! ₹${selectedOrder.totalAmountRs.toLocaleString('en-IN')} instantly credited to ${selectedOrder.farmerUpi}`);
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ff87', '#00f0ff', '#fbbf24']
      });
      setInputOtp('');
    } else {
      setReleaseStatus('Invalid OTP or Verification Failed. Please verify credentials.');
    }
  };

  return (
    <section className="py-12 bg-[#020503] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>FINANCIAL TRUST & DECENTRALIZED SETTLEMENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              Smart Escrow Vault & Agri-Credit Passport
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Eliminating payment defaults and predatory debt traps through multi-stage smart escrow, instant 24-hour UPI payouts, and digital credit scoring for institutional loans.
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center bg-black/60 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveSubTab('escrow')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === 'escrow'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Escrow Vault</span>
            </button>
            <button
              onClick={() => setActiveSubTab('credit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === 'credit'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Farmer Credit Passport</span>
            </button>
          </div>
        </div>

        {/* SUBTAB 1: Escrow Vault & Fast UPI Payouts */}
        {activeSubTab === 'escrow' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Selected Order Vault Lifecycle */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order selector tabs */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {escrowOrders.map((ord) => (
                  <button
                    key={ord.orderId}
                    onClick={() => {
                      setSelectedOrderId(ord.orderId);
                      setReleaseStatus(null);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0 border transition-all ${
                      selectedOrderId === ord.orderId
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg'
                        : 'bg-black/40 text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    <span>{ord.orderId}</span>
                    <span className="ml-2 font-mono text-[10px] text-slate-400">₹{ord.totalAmountRs.toLocaleString()}</span>
                  </button>
                ))}
              </div>

              {/* Main Escrow Vault Card */}
              <div className="astra-glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase">
                      SMART ESCROW CONTRACT #{selectedOrder.orderId}
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white mt-1">
                      {selectedOrder.crop}
                    </h3>
                    <div className="text-xs text-slate-400 mt-1">
                      Buyer: <strong className="text-white">{selectedOrder.buyerName}</strong> • Producer: <strong className="text-white">{selectedOrder.farmerName}</strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/80 border border-emerald-500/40 text-center font-mono shrink-0">
                    <span className="text-[10px] text-slate-400 block">ESCROW VAULT VALUE</span>
                    <div className="text-2xl font-extrabold text-emerald-400 font-display">
                      ₹{selectedOrder.totalAmountRs.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-6 flex items-center justify-between p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    {selectedOrder.escrowStatus === 'RELEASED_TO_FARMER' ? (
                      <Unlock className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-amber-400" />
                    )}
                    <span className="text-slate-300">Contract Security State:</span>
                    <strong className={`font-mono uppercase ${
                      selectedOrder.escrowStatus === 'RELEASED_TO_FARMER' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {selectedOrder.escrowStatus.replace(/_/g, ' ')}
                    </strong>
                  </div>
                  <span className="font-mono text-cyan-400 text-[11px]">
                    Settlement: UPI / DBT Immediate
                  </span>
                </div>

                {/* 4-Step Escrow Timeline */}
                <div className="mt-8 space-y-4">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    CRYPTOGRAPHIC TIMELINE & MILESTONES:
                  </span>
                  {selectedOrder.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                        step.completed
                          ? 'bg-emerald-950/40 border-emerald-500/30 text-white'
                          : 'bg-black/40 border-white/5 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] ${
                          step.completed ? 'bg-emerald-400 text-black font-bold' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {idx + 1}
                        </div>
                        <span className="font-medium">{step.step}</span>
                      </div>
                      <span className="font-mono text-[11px] text-slate-400">
                        {step.timestamp}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Interactive Release Console */}
                {selectedOrder.escrowStatus !== 'RELEASED_TO_FARMER' ? (
                  <form onSubmit={handleVerifyAndRelease} className="mt-8 p-5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">Delivery OTP Confirmation & Release</span>
                      <span className="font-mono text-[11px] text-amber-400">
                        Demo OTP for this order: <strong>{selectedOrder.deliveryOtp}</strong>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter 4-digit buyer delivery OTP"
                        value={inputOtp}
                        onChange={(e) => setInputOtp(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-white/20 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono tracking-widest"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
                      >
                        <Unlock className="w-4 h-4" />
                        <span>{loading ? 'Releasing...' : 'Verify & Release Payout'}</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="mt-8 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Funds Successfully Settled to Farmer's Account ({selectedOrder.farmerUpi})</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-emerald-400">SETTLED IN 42 SECONDS</span>
                  </div>
                )}

                {releaseStatus && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{releaseStatus}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Traditional Mandi vs Farmlink Payout Speed Comparison */}
            <div className="astra-glass rounded-3xl p-6 border border-white/10 space-y-6 h-fit">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Mandi Payout Bottleneck vs Farmlink</span>
              </div>

              {/* Traditional Delay Card */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/20 text-xs space-y-2">
                <div className="text-rose-400 font-bold uppercase font-mono">Traditional APMC Mandi</div>
                <div className="text-2xl font-extrabold text-white font-display">
                  3–4 Weeks Delay
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Arhtiyas delay payments on credit; farmers forced into informal moneylenders at 24–36% APR interest to fund next sowing season.
                </p>
              </div>

              {/* Farmlink Direct Speed Card */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-2">
                <div className="text-emerald-400 font-bold uppercase font-mono">Farmlink Instant Protocol</div>
                <div className="text-2xl font-extrabold text-emerald-400 font-display">
                  &lt; 24 Hours
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Payment locked in escrow prior to dispatch. Auto-transferred to farmer's UPI/DBT upon arrival inspection. Zero credit debt.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-[11px] text-slate-400 space-y-1.5 font-mono">
                <div>FARMER VPA: <span className="text-slate-200">{selectedOrder.farmerUpi}</span></div>
                <div>ESCROW VAULT: <span className="text-slate-200">ICICI Bank Escrow Trustee</span></div>
                <div>TRANSACTION TAX: <span className="text-slate-200">Zero Commission Deductions</span></div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: Farmer Agri-Credit Passport */}
        {activeSubTab === 'credit' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Credit Score Gauge (Left Col) */}
            <div className="astra-glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 text-center flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">
                  AGRI-CIBIL CREDIT PASSPORT
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-1">
                  {creditProfile.name}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {creditProfile.farmerId}
                </span>

                {/* Big Score Meter */}
                <div className="my-8 relative flex items-center justify-center">
                  <div className="w-44 h-44 rounded-full border-4 border-cyan-500/20 flex flex-col items-center justify-center bg-black/60 shadow-[0_0_35px_rgba(0,240,255,0.2)]">
                    <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-emerald-400 font-display">
                      {creditProfile.creditScore}
                    </span>
                    <span className="text-xs font-mono text-slate-400">OUT OF 900</span>
                  </div>
                </div>

                <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold font-mono">
                  {creditProfile.rating}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400 font-mono">
                Eligible Zero-Collateral Credit: <strong className="text-emerald-400 text-sm">₹{creditProfile.eligibleCreditLimitRs.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Credit Signal Metrics & Institutional Loans (Right 2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">FULFILLMENTS</span>
                  <div className="text-2xl font-bold text-white mt-1">{creditProfile.totalFulfillments}</div>
                  <span className="text-[10px] text-emerald-400">100% Success</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">ON-TIME RATE</span>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">{creditProfile.onTimeDeliveryRate}</div>
                  <span className="text-[10px] text-slate-400">Transit Adherence</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">QUALITY SCORE</span>
                  <div className="text-2xl font-bold text-cyan-400 mt-1">{creditProfile.qualityConsistencyScore}</div>
                  <span className="text-[10px] text-slate-400">Optical CV Match</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block">DISPUTES</span>
                  <div className="text-2xl font-bold text-white mt-1">{creditProfile.escrowDisputeRate}</div>
                  <span className="text-[10px] text-emerald-400">Zero Flags</span>
                </div>
              </div>

              {/* Pre-Approved Institutional Credit Partners */}
              <div className="astra-glass rounded-3xl p-6 border border-emerald-500/30">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>Pre-Approved Low-Interest Institutional Loans</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">No Land Mortgage Required</span>
                </div>

                <div className="space-y-3">
                  {creditProfile.preApprovedLoanPartners.map((loan, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-white text-sm">{loan.bank}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">{loan.type}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right font-mono">
                          <span className="text-emerald-400 font-bold text-sm">{loan.interestRate}</span>
                          <span className="text-slate-500 block text-[10px]">Subsidized Rate</span>
                        </div>
                        <button className="px-4 py-2 rounded-xl bg-emerald-400 text-black font-bold text-xs hover:bg-emerald-300 transition-colors">
                          Apply Instant
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
