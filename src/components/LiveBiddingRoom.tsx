import React, { useState, useEffect } from 'react';
import {
  Gavel,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Building2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { AuctionLot } from '../types';

interface LiveBiddingRoomProps {
  auctions: AuctionLot[];
  onPlaceBid: (auctionId: string, bidPerKg: number, bidderName: string) => Promise<boolean>;
}

export const LiveBiddingRoom: React.FC<LiveBiddingRoomProps> = ({
  auctions,
  onPlaceBid
}) => {
  const [activeAuctionId, setActiveAuctionId] = useState<string>(auctions[0]?.auctionId || '');
  const [customBid, setCustomBid] = useState<string>('');
  const [bidderName, setBidderName] = useState<string>('Grand Bistro Hospitality Corp');
  const [bidStatus, setBidStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [timers, setTimers] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const initialTimers: { [key: string]: number } = {};
    auctions.forEach(a => {
      initialTimers[a.auctionId] = a.endsInSeconds;
    });
    setTimers(initialTimers);

    const interval = setInterval(() => {
      setTimers(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(k => {
          if (next[k] > 0) next[k] -= 1;
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [auctions]);

  const selectedAuction = auctions.find(a => a.auctionId === activeAuctionId) || auctions[0];

  const formatTimer = (secs: number = 0) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleQuickBid = async (increment: number) => {
    if (!selectedAuction) return;
    const targetBid = Number((selectedAuction.currentHighestBidPerKg + increment).toFixed(2));
    await submitBid(targetBid);
  };

  const handleCustomBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAuction || !customBid) return;
    const bidVal = parseFloat(customBid);
    if (isNaN(bidVal) || bidVal <= selectedAuction.currentHighestBidPerKg) {
      setBidStatus(`Bid must be higher than current ₹${selectedAuction.currentHighestBidPerKg}/kg`);
      return;
    }
    await submitBid(bidVal);
    setCustomBid('');
  };

  const submitBid = async (amount: number) => {
    setLoading(true);
    setBidStatus(null);
    const success = await onPlaceBid(selectedAuction.auctionId, amount, bidderName);
    setLoading(false);
    if (success) {
      setBidStatus(`Success! Placed leading bid of ₹${amount}/kg`);
      setTimeout(() => setBidStatus(null), 4000);
    } else {
      setBidStatus('Bid placement failed. Please try again.');
    }
  };

  if (!selectedAuction) {
    return <div className="text-center py-20 text-slate-400">Loading live perishable bidding lots...</div>;
  }

  const secondsLeft = timers[selectedAuction.auctionId] ?? selectedAuction.endsInSeconds;

  return (
    <section className="py-12 bg-[#020503] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-400 text-xs font-mono mb-3 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>LIVE REVERSE-AUCTION PROTOCOL • PERISHABLES NEARING HARVEST</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              In-App Negotiation & Live Bidding Room
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Prevents harvest distress sales. Institutional buyers, hotel chains, and supermarket aggregators place competitive bids directly with farmers before harvest.
            </p>
          </div>

          {/* Active lots tab selector */}
          <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-2xl border border-white/10">
            {auctions.map((a) => (
              <button
                key={a.auctionId}
                onClick={() => setActiveAuctionId(a.auctionId)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeAuctionId === a.auctionId
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{a.crop.split(' ')[0]}</span>
                <span className="ml-1 text-[10px] font-mono text-slate-500">({(a.lotSizeKg / 1000).toFixed(1)}T)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Auction Arena */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Active Lot Console (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="astra-glass-card rounded-3xl p-6 sm:p-8 border border-rose-500/30 relative overflow-hidden">
              {/* Top Banner with Countdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-rose-400 uppercase tracking-wider block">
                    AUCTION LOT #{selectedAuction.auctionId}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-white mt-1">
                    {selectedAuction.crop}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-300 font-mono">
                    <span>Producer: {selectedAuction.farmer}</span>
                    <span>•</span>
                    <span className="text-amber-400">{selectedAuction.harvestTiming}</span>
                  </div>
                </div>

                {/* Countdown Timer HUD */}
                <div className="p-3.5 rounded-2xl bg-black/80 border border-rose-500/40 text-center shrink-0">
                  <div className="text-[10px] uppercase font-mono text-slate-400 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-rose-400" />
                    <span>BIDDING CLOSES IN</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400 mt-0.5 tracking-wider">
                    {formatTimer(secondsLeft)}
                  </div>
                </div>
              </div>

              {/* Price State Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[11px] text-slate-400 font-mono uppercase block">Total Lot Volume</span>
                  <div className="text-2xl font-extrabold text-white font-display mt-1">
                    {selectedAuction.lotSizeKg.toLocaleString()} kg
                  </div>
                  <span className="text-[11px] text-slate-400">Single consolidated dispatch</span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[11px] text-slate-400 font-mono uppercase block">Farmer Reserve Floor</span>
                  <div className="text-2xl font-extrabold text-slate-300 font-display mt-1">
                    ₹{selectedAuction.reservePricePerKg.toFixed(2)}/kg
                  </div>
                  <span className="text-[11px] text-slate-400">Minimum threshold</span>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/60 to-black border border-emerald-500/40 shadow-[0_0_20px_rgba(0,255,135,0.15)]">
                  <span className="text-[11px] text-emerald-400 font-mono uppercase block flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Current Leading Bid</span>
                  </span>
                  <div className="text-3xl font-extrabold text-emerald-400 font-display mt-1">
                    ₹{selectedAuction.currentHighestBidPerKg.toFixed(2)}/kg
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">
                    By {selectedAuction.leadingBidder}
                  </span>
                </div>
              </div>

              {/* Bidding Console Actions */}
              <div className="mt-8 p-5 rounded-2xl bg-black/60 border border-white/10">
                <div className="text-xs font-semibold text-slate-200 mb-3 flex items-center justify-between">
                  <span>Place Your Institutional Counter-Bid</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Bidding As: <strong className="text-white">{bidderName}</strong>
                  </span>
                </div>

                {/* Quick Bid Increment Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <button
                    disabled={loading}
                    onClick={() => handleQuickBid(0.5)}
                    className="py-2.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-xs font-mono font-bold text-emerald-300 transition-all cursor-pointer"
                  >
                    + ₹0.50 (₹{(selectedAuction.currentHighestBidPerKg + 0.5).toFixed(2)})
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleQuickBid(1.0)}
                    className="py-2.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-xs font-mono font-bold text-emerald-300 transition-all cursor-pointer"
                  >
                    + ₹1.00 (₹{(selectedAuction.currentHighestBidPerKg + 1.0).toFixed(2)})
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleQuickBid(2.0)}
                    className="py-2.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-xs font-mono font-bold text-emerald-300 transition-all cursor-pointer"
                  >
                    + ₹2.00 (₹{(selectedAuction.currentHighestBidPerKg + 2.0).toFixed(2)})
                  </button>
                </div>

                {/* Custom Bid Form */}
                <form onSubmit={handleCustomBidSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">₹</span>
                    <input
                      type="number"
                      step="0.1"
                      placeholder={`Enter custom bid > ₹${selectedAuction.currentHighestBidPerKg}`}
                      value={customBid}
                      onChange={(e) => setCustomBid(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-black border border-white/20 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
                  >
                    <Gavel className="w-4 h-4" />
                    <span>Submit Bid</span>
                  </button>
                </form>

                {bidStatus && (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{bidStatus}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Bid Stream & History (Right Column) */}
          <div className="astra-glass rounded-3xl p-6 border border-white/10 flex flex-col h-full">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Live Audit Bid Stream</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {selectedAuction.totalBidsPlaced} total bids
              </span>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[440px] pr-1">
              {selectedAuction.bidsHistory.map((bid, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                    idx === 0
                      ? 'bg-emerald-950/50 border-emerald-500/40 text-white'
                      : 'bg-black/40 border-white/5 text-slate-400'
                  }`}
                >
                  <div>
                    <div className="font-semibold flex items-center gap-1.5">
                      <Building2 className={`w-3.5 h-3.5 ${idx === 0 ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <span className="truncate max-w-[140px]">{bid.bidder}</span>
                      {idx === 0 && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-400 text-black font-bold">
                          LEADING
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {bid.time}
                    </div>
                  </div>

                  <div className="text-right font-mono font-bold text-sm text-emerald-400">
                    ₹{bid.bidPerKg.toFixed(2)}/kg
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Cryptographically verified smart contract bids. Winning bid funds held automatically in Escrow.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
