import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Clock,
  Truck,
  ShieldCheck,
  Scale,
  DollarSign,
  ArrowDown,
  Layers,
  Sparkles,
  RefreshCw,
  Cpu,
  MapPin,
  Calendar,
  QrCode,
  ArrowRight,
  Filter,
  Search,
  BookOpen
} from 'lucide-react';
import { getTranslation } from '../utils/translations';
import { CropListing } from '../types';

interface DisintermediationStoryProps {
  vegetableListings?: CropListing[];
  onSelectListingForOrder?: (listing: CropListing, mode: 'retail' | 'bulk') => void;
  onOpenTraceability?: (listing: CropListing) => void;
  selectedLanguage?: string;
}

export const DisintermediationStory: React.FC<DisintermediationStoryProps> = ({
  vegetableListings = [],
  onSelectListingForOrder,
  onOpenTraceability,
  selectedLanguage = 'en'
}) => {
  const t = getTranslation(selectedLanguage);
  // Simulator State
  const [selectedCrop, setSelectedCrop] = useState<'tomato' | 'onion' | 'apple' | 'potato' | 'basmati'>('tomato');
  const [harvestVolumeKg, setHarvestVolumeKg] = useState<number>(2000);

  // Vegetable Explorer Filter State
  const [vegCategoryFilter, setVegCategoryFilter] = useState<string>('All');
  const [vegSearch, setVegSearch] = useState<string>('');

  const cropData = {
    tomato: {
      name: "Vine Tomatoes",
      traditionalFarmerRate: 16.0,
      middlemenCut: 26.0,
      traditionalConsumerRate: 42.0,
      farmlinkFarmerRate: 26.5,
      farmlinkLogisticsFee: 3.5,
      farmlinkConsumerRate: 30.0,
      spoilageTraditionalPct: 28,
      spoilageFarmlinkPct: 1.2,
      traditionalPaymentDays: 24,
      farmlinkPaymentHours: 24
    },
    onion: {
      name: "Lasalgaon Red Onions",
      traditionalFarmerRate: 18.0,
      middlemenCut: 32.0,
      traditionalConsumerRate: 50.0,
      farmlinkFarmerRate: 28.0,
      farmlinkLogisticsFee: 4.0,
      farmlinkConsumerRate: 32.0,
      spoilageTraditionalPct: 22,
      spoilageFarmlinkPct: 1.5,
      traditionalPaymentDays: 28,
      farmlinkPaymentHours: 24
    },
    apple: {
      name: "Shimla Royal Apples",
      traditionalFarmerRate: 65.0,
      middlemenCut: 95.0,
      traditionalConsumerRate: 160.0,
      farmlinkFarmerRate: 110.0,
      farmlinkLogisticsFee: 12.0,
      farmlinkConsumerRate: 122.0,
      spoilageTraditionalPct: 18,
      spoilageFarmlinkPct: 0.8,
      traditionalPaymentDays: 35,
      farmlinkPaymentHours: 24
    },
    potato: {
      name: "Agra Table Potatoes",
      traditionalFarmerRate: 12.0,
      middlemenCut: 22.0,
      traditionalConsumerRate: 34.0,
      farmlinkFarmerRate: 19.0,
      farmlinkLogisticsFee: 3.0,
      farmlinkConsumerRate: 22.0,
      spoilageTraditionalPct: 15,
      spoilageFarmlinkPct: 0.9,
      traditionalPaymentDays: 21,
      farmlinkPaymentHours: 24
    },
    basmati: {
      name: "Basmati Paddy (Pusa 1121)",
      traditionalFarmerRate: 36.0,
      middlemenCut: 48.0,
      traditionalConsumerRate: 84.0,
      farmlinkFarmerRate: 52.0,
      farmlinkLogisticsFee: 5.0,
      farmlinkConsumerRate: 57.0,
      spoilageTraditionalPct: 10,
      spoilageFarmlinkPct: 0.3,
      traditionalPaymentDays: 30,
      farmlinkPaymentHours: 24
    }
  };

  const current = cropData[selectedCrop];

  // Calculated values
  const traditionalFarmerTotal = Math.round(harvestVolumeKg * current.traditionalFarmerRate);
  const farmlinkFarmerTotal = Math.round(harvestVolumeKg * current.farmlinkFarmerRate);
  const extraFarmerEarnings = farmlinkFarmerTotal - traditionalFarmerTotal;
  const farmerGainPct = Math.round(((current.farmlinkFarmerRate - current.traditionalFarmerRate) / current.traditionalFarmerRate) * 100);

  const traditionalConsumerTotal = Math.round(harvestVolumeKg * current.traditionalConsumerRate);
  const farmlinkConsumerTotal = Math.round(harvestVolumeKg * current.farmlinkConsumerRate);
  const consumerSavingsTotal = traditionalConsumerTotal - farmlinkConsumerTotal;
  const consumerSavingPct = Math.round(((current.traditionalConsumerRate - current.farmlinkConsumerRate) / current.traditionalConsumerRate) * 100);

  const traditionalSpoilageKg = Math.round((harvestVolumeKg * current.spoilageTraditionalPct) / 100);
  const farmlinkSpoilageKg = Math.round((harvestVolumeKg * current.spoilageFarmlinkPct) / 100);
  const produceSavedKg = traditionalSpoilageKg - farmlinkSpoilageKg;

  // Filter only vegetable listings
  const allVegetables = vegetableListings.filter(l => l.category.toLowerCase() === 'vegetables');
  const filteredVegetables = allVegetables.filter(item => {
    const matchesSearch = item.cropName.toLowerCase().includes(vegSearch.toLowerCase()) ||
                          item.location.toLowerCase().includes(vegSearch.toLowerCase()) ||
                          item.farmerName.toLowerCase().includes(vegSearch.toLowerCase());
    if (vegCategoryFilter === 'All') return matchesSearch;
    if (vegCategoryFilter === 'Organic') return matchesSearch && item.organicCertified;
    if (vegCategoryFilter === 'Salads & Leafy') return matchesSearch && (item.cropName.includes('Spinach') || item.cropName.includes('Palak') || item.cropName.includes('Coriander') || item.cropName.includes('Cucumber') || item.cropName.includes('Cabbage'));
    if (vegCategoryFilter === 'Root & Bulbs') return matchesSearch && (item.cropName.includes('Onion') || item.cropName.includes('Potato') || item.cropName.includes('Garlic') || item.cropName.includes('Ginger') || item.cropName.includes('Carrot') || item.cropName.includes('Beetroot'));
    if (vegCategoryFilter === 'Gourds & Peppers') return matchesSearch && (item.cropName.includes('Gourd') || item.cropName.includes('Pepper') || item.cropName.includes('Capsicum') || item.cropName.includes('Chilli') || item.cropName.includes('Tomato') || item.cropName.includes('Brinjal') || item.cropName.includes('Okra'));
    return matchesSearch;
  });

  const legacyIntermediaryLayers = [
    { name: "Village Aggregator / Kacha Arhtiya", cut: "8-12%", issue: "Monopoly village pricing, unfair tare weights, cash exploitation" },
    { name: "Commission Agent (Pakka Arhtiya)", cut: "6-9%", issue: "Auction cartelization, undocumented deduction cess" },
    { name: "APMC Mandi Yard Trader", cut: "10-15%", issue: "Delayed bidding, distress dumping of perishable lots" },
    { name: "Unrefrigerated Freight Transporter", cut: "12-18%", issue: "Open tarp trucks causing 25-30% thermal spoilage" },
    { name: "City Wholesaler & Sub-Dealer", cut: "12-15%", issue: "Artificial hoarding and price manipulation" },
    { name: "Local Neighborhood Retailer", cut: "15-22%", issue: "High markups to offset retail shrinkage and wastage" }
  ];

  const structuralFaultLines = [
    {
      title: "Fault Line 1: The 'Hatha' Secret Handshake Cartel",
      detail: "In traditional APMC mandi auctions, commission agents and licensed traders negotiate secret bids under cloth towels ('Hatha system') to artificially depress prices. Smallholders with no alternative transport have zero bargaining power and must accept below-cost bids to avoid taking rotting produce back home."
    },
    {
      title: "Fault Line 2: The 38°C Thermal Decay Desert",
      detail: "India produces over 330 million metric tons of horticulture, yet less than 4% is moved under cold chain. Open canopy trucks on sun-baked highways cause 25–30% respiration loss, softening, and fungal rot, driving distress dumps of tomatoes and chillies on highways."
    },
    {
      title: "Fault Line 3: The 35-Day Delayed Working Capital Trap",
      detail: "Arhtiyas purchase on informal credit, delaying payments by 3 to 5 weeks. Cash-starved farmers needing seeds, diesel, and fertilizer for the next sowing cycle are forced to borrow from the same agents at usurious 24–36% annual interest rates, creating inter-generational debt cycles."
    }
  ];

  return (
    <section className="py-20 bg-[#030704] text-slate-100 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.storyHeaderTag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            {t.storyTitle}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {t.storySub}
          </p>
        </div>

        {/* The 3 Deep Structural Fault Lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {structuralFaultLines.map((fault, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-black/60 border border-rose-500/25 hover:border-rose-500/50 transition-all space-y-3"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-mono text-xs font-bold">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-white text-base font-display">
                {fault.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {fault.detail}
              </p>
            </div>
          ))}
        </div>

        {/* The Two Paradigms: Legacy Broken Chain vs Farmlink Quantum Protocol */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Legacy Chain Card */}
          <div className="rounded-3xl bg-[#0d0708]/80 border border-rose-500/30 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-rose-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{t.legacyTitle}</h3>
                  <p className="text-xs text-rose-300/80 font-mono">5–7 Parasitic Middlemen Tiers</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-950/80 text-rose-400 border border-rose-500/30 text-xs font-mono">
                {t.legacyBadge}
              </span>
            </div>

            {/* Stepped breakdown of legacy layers */}
            <div className="mt-6 space-y-3.5">
              {legacyIntermediaryLayers.map((layer, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-black/40 border border-rose-500/15 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-semibold text-rose-200 flex items-center gap-2">
                      <span className="font-mono text-rose-400">Tier {idx + 1}:</span>
                      <span>{layer.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {layer.issue}
                    </div>
                  </div>
                  <span className="font-mono text-rose-400 font-bold shrink-0 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/20">
                    +{layer.cut}
                  </span>
                </div>
              ))}
            </div>

            {/* Legacy summary callout */}
            <div className="mt-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span>Farmer Realization:</span>
                <span className="font-bold text-rose-400">Only 28–33%</span>
              </div>
              <div className="flex justify-between">
                <span>Thermal Spoilage:</span>
                <span className="font-bold text-rose-400">25–30% Rotten</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Settlement:</span>
                <span className="font-bold text-rose-400">3–4 Weeks (Debt Trap)</span>
              </div>
            </div>
          </div>

          {/* Farmlink Quantum Protocol Card */}
          <div className="rounded-3xl bg-[#06150b]/80 border border-emerald-500/40 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(0,255,135,0.15)]">
            <div className="flex items-center justify-between pb-6 border-b border-emerald-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{t.farmlinkTitle}</h3>
                  <p className="text-xs text-emerald-400 font-mono">Algorithmic Direct Disintermediation</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
                {t.farmlinkBadge}
              </span>
            </div>

            {/* Farmlink core solutions */}
            <div className="mt-6 space-y-3.5">
              <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 text-xs">
                <div className="font-semibold text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direct Farmer / FPO Listing & Transparent Discovery</span>
                </div>
                <p className="text-slate-300 mt-1 pl-6">
                  Farmers set their asking price with live Agmarknet benchmark comparison. Consumers and bulk buyers purchase directly without commission cartels.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 text-xs">
                <div className="font-semibold text-emerald-300 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>Adani Cold Silos & Kisan Sabha Freight Pooling</span>
                </div>
                <p className="text-slate-300 mt-1 pl-6">
                  Replaces open tarp trucks with Adani scientific temperature-controlled silos/reefers and Kisan Sabha (CSIR-CRRI) shared rural vehicle pooling (LTL).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 text-xs">
                <div className="font-semibold text-emerald-300 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>AI Demand Forecasting & Dynamic VRP Routing</span>
                </div>
                <p className="text-slate-300 mt-1 pl-6">
                  LSTM models predict regional crop demand; dynamic VRP solvers consolidate multi-stop farm pickups to minimize transit time and carbon footprint.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 text-xs">
                <div className="font-semibold text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Smart Escrow & 24-Hr Instant UPI Payout</span>
                </div>
                <p className="text-slate-300 mt-1 pl-6">
                  Buyer payments locked in escrow; released automatically within 24 hours to farmer's UPI account upon OTP delivery check.
                </p>
              </div>
            </div>

            {/* Farmlink summary callout */}
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-200 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span>Farmer Realization:</span>
                <span className="font-bold text-emerald-400">85–90% (+38.4% Net Gain)</span>
              </div>
              <div className="flex justify-between">
                <span>Thermal Spoilage:</span>
                <span className="font-bold text-emerald-400">&lt; 1.2% (Cold-Chain Maintained)</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Settlement:</span>
                <span className="font-bold text-emerald-400">24–48 Hours (Instant UPI/DBT)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Middlemen vs Farmlink Margin & Freshness Simulator */}
        <div className="astra-glass-card rounded-3xl p-6 sm:p-10 border border-emerald-500/30 relative mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                <Scale className="w-4 h-4" />
                <span>Interactive Disintermediation Engine</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Simulate Your Produce: Traditional Middlemen vs Farmlink
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Select your crop variety and harvest volume to visualize real-time economic disintermediation.
              </p>
            </div>

            {/* Crop Selector Chips */}
            <div className="flex items-center gap-2 flex-wrap">
              {(['tomato', 'onion', 'apple', 'potato', 'basmati'] as const).map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCrop(crop)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                    selectedCrop === crop
                      ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(0,255,135,0.3)]'
                      : 'bg-black/40 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Volume Slider */}
          <div className="mt-8 mb-10">
            <div className="flex justify-between items-center text-xs font-mono text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <span>Harvest Lot Size:</span>
                <strong className="text-emerald-400 text-sm">{harvestVolumeKg.toLocaleString()} kg</strong>
                <span className="text-slate-400">({(harvestVolumeKg / 1000).toFixed(1)} Metric Tons)</span>
              </span>
              <span className="text-slate-400">Slider: 100 kg — 10,000 kg</span>
            </div>
            <input
              type="range"
              min="200"
              max="10000"
              step="100"
              value={harvestVolumeKg}
              onChange={(e) => setHarvestVolumeKg(Number(e.target.value))}
              className="w-full h-2.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-emerald-400 border border-emerald-500/20"
            />
          </div>

          {/* Comparison Grid Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Farmer Earnings Metric Card */}
            <div className="p-6 rounded-2xl bg-black/50 border border-emerald-500/30 relative overflow-hidden">
              <div className="text-xs font-mono text-slate-400 uppercase">Farmer Net Payout</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-400 font-display">
                  ₹{farmlinkFarmerTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  +{farmerGainPct}%
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-400 flex items-center justify-between border-t border-white/5 pt-2">
                <span>Traditional APMC Mandi:</span>
                <span className="text-rose-400 line-through">₹{traditionalFarmerTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="mt-1 text-xs text-emerald-300 font-semibold flex items-center justify-between">
                <span>Direct Farmer Profit Hike:</span>
                <span>+₹{extraFarmerEarnings.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* 2. Consumer Total Cost Metric Card */}
            <div className="p-6 rounded-2xl bg-black/50 border border-cyan-500/30 relative overflow-hidden">
              <div className="text-xs font-mono text-slate-400 uppercase">Consumer Total Spend</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-cyan-400 font-display">
                  ₹{farmlinkConsumerTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-cyan-400 font-mono font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  -{consumerSavingPct}%
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-400 flex items-center justify-between border-t border-white/5 pt-2">
                <span>Traditional Retail Cost:</span>
                <span className="text-rose-400 line-through">₹{traditionalConsumerTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="mt-1 text-xs text-cyan-300 font-semibold flex items-center justify-between">
                <span>Total Consumer Savings:</span>
                <span>-₹{consumerSavingsTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* 3. Spoilage & Freshness Metric Card */}
            <div className="p-6 rounded-2xl bg-black/50 border border-amber-500/30 relative overflow-hidden">
              <div className="text-xs font-mono text-slate-400 uppercase">Food Waste & Spoilage Avoided</div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-amber-400 font-display">
                  {produceSavedKg.toLocaleString()} kg
                </span>
                <span className="text-xs text-amber-400 font-mono font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                  Saved
                </span>
              </div>
              <div className="mt-2 text-xs text-slate-400 flex items-center justify-between border-t border-white/5 pt-2">
                <span>Traditional Open Rot:</span>
                <span className="text-rose-400">{traditionalSpoilageKg.toLocaleString()} kg ({current.spoilageTraditionalPct}%)</span>
              </div>
              <div className="mt-1 text-xs text-emerald-300 font-semibold flex items-center justify-between">
                <span>Farmlink Cold Chain Loss:</span>
                <span>{farmlinkSpoilageKg.toLocaleString()} kg ({current.spoilageFarmlinkPct}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DIRECT VEGETABLES DISINTERMEDIATION EXPLORER (MORE THAN 20 VEGETABLES)    */}
        {/* ========================================================================= */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.vegCatalogTitle}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold font-display text-white">
                {t.vegCatalogTitle}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                {t.vegCatalogSub}
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/40 px-3.5 py-2 rounded-xl border border-emerald-500/30 shrink-0">
              <span>{allVegetables.length || 25} {t.vegVerifiedCount}</span>
            </div>
          </div>

          {/* Filter Chips & Search Bar for Vegetables */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
              {['All', 'Salads & Leafy', 'Root & Bulbs', 'Gourds & Peppers', 'Organic'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setVegCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    vegCategoryFilter === cat
                      ? 'bg-emerald-400 text-black shadow-md'
                      : 'bg-black/50 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search vegetable, farmer..."
                value={vegSearch}
                onChange={(e) => setVegSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* 25+ Vegetables Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredVegetables.map((veg) => (
              <div
                key={veg.id}
                className="astra-glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-40 w-full overflow-hidden bg-black/60">
                  <img
                    src={veg.imageUrl}
                    alt={veg.cropName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Grade Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
                    {veg.grade.split(' ')[0]} {veg.grade.split(' ')[1]} ({veg.cvGradingScore}%)
                  </div>

                  {veg.organicCertified && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-500/50 text-[10px] font-semibold text-emerald-400">
                      🌿 Organic
                    </div>
                  )}

                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white">
                    <span className="font-bold truncate">{veg.farmerName}</span>
                    <button
                      onClick={() => onOpenTraceability && onOpenTraceability(veg)}
                      className="p-1 rounded bg-black/60 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-white/20"
                      title="QR Traceability Passport"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {veg.cropName}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{veg.location.split(',')[0]} ({veg.distanceKm} km)</span>
                    </p>

                    {/* Price Comparison Strip */}
                    <div className="mt-3 p-2.5 rounded-xl bg-black/70 border border-white/10 font-mono text-[11px] space-y-1">
                      <div className="flex justify-between text-slate-400 text-[10px]">
                        <span>{t.mandiRate}</span>
                        <span className="line-through text-rose-400">₹{veg.mandiBenchmarkPrice.toFixed(1)}/kg</span>
                      </div>
                      <div className="flex justify-between items-center text-white">
                        <span className="font-sans font-semibold text-[11px]">{t.farmlinkRate}</span>
                        <span className="text-emerald-400 font-extrabold text-xs">
                          ₹{veg.retailPricePerKg.toFixed(1)}/kg
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] text-cyan-300 pt-1 border-t border-white/10">
                        <span>Available Lot:</span>
                        <span>{veg.quantityAvailableKg.toLocaleString()} kg</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Button */}
                  <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                    <button
                      onClick={() => onSelectListingForOrder && onSelectListingForOrder(veg, 'retail')}
                      className="flex-1 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{t.btnBuyDirect}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onSelectListingForOrder && onSelectListingForOrder(veg, 'bulk')}
                      className="px-2.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-[11px] font-mono cursor-pointer"
                      title="Bulk Wholesale / B2B Order"
                    >
                      {t.btnB2B}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
