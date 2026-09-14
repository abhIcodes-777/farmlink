import React, { useState } from 'react';
import {
  Store,
  Filter,
  Search,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Truck,
  Plus,
  ArrowRight,
  TrendingUp,
  Tag,
  Scale,
  Sparkles,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';
import { CropListing } from '../types';

interface MarketplaceViewProps {
  listings: CropListing[];
  onSelectListingForOrder: (listing: CropListing, mode: 'retail' | 'bulk') => void;
  onOpenTraceability: (listing: CropListing) => void;
  onOpenSellModal: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  listings,
  onSelectListingForOrder,
  onOpenTraceability,
  onOpenSellModal
}) => {
  const [transactionMode, setTransactionMode] = useState<'retail' | 'bulk'>('retail');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedListingDetail, setSelectedListingDetail] = useState<CropListing | null>(null);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains'];

  // Filter listings
  const filteredListings = listings.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 bg-[#020503] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <Store className="w-3.5 h-3.5" />
              <span>FARMLINK ENGINE • DUAL TRANSACTION MODES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              Direct Farmer & FPO Marketplace
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Buy directly from verified producers with zero intermediary markups. Fully integrated transparent price discovery, quality certification, and cold chain fulfillment.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSellModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_20px_rgba(0,255,135,0.3)] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>List Crop (Farmer/FPO)</span>
            </button>
          </div>
        </div>

        {/* Transaction Mode Selector & Search Filter Bar */}
        <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Dual Transaction Mode Switcher */}
          <div className="flex items-center bg-black/60 p-1.5 rounded-2xl border border-emerald-500/30 w-full lg:w-auto">
            <button
              onClick={() => setTransactionMode('retail')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                transactionMode === 'retail'
                  ? 'bg-gradient-to-r from-emerald-500/30 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(0,255,135,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Store className="w-4 h-4 text-emerald-400" />
              <span>Direct Retail (Farm-to-Door)</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400">1–10 kg</span>
            </button>

            <button
              onClick={() => setTransactionMode('bulk')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                transactionMode === 'bulk'
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Bulk / B2B (Restaurants & Processors)</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400">50–10,000 kg</span>
            </button>
          </div>

          {/* Search and Category Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Category Chips */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search crops, location, FPOs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>
        </div>

        {/* 3-WAY TRANSPARENT PRICE DISCOVERY BANNER */}
        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-black to-cyan-950/30 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-white">Tri-Vector Price Discovery Transparency Matrix</span>
              <p className="text-slate-400 text-[11px]">
                Every listing displays the real-time Agmarknet Government Mandi price, Farmlink Platform Average, and Farmer Asking Price side by side.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] shrink-0">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
              <span>1. Mandi APMC Price</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/80"></span>
              <span>2. Platform Avg</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
              <span>3. Farmer Ask</span>
            </div>
          </div>
        </div>

        {/* Listing Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              className="astra-glass-card rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-black/60">
                <img
                  src={item.imageUrl}
                  alt={item.cropName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Grade & Score Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>{item.grade.split(' ')[0]} {item.grade.split(' ')[1]}</span>
                  <span className="text-slate-400">({item.cvGradingScore}%)</span>
                </div>

                {/* Organic / Traceability Tag */}
                {item.organicCertified && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[10px] font-semibold text-emerald-300">
                    🌿 Organic Verified
                  </div>
                )}

                {/* Farmer Info Bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white text-sm block">{item.farmerName}</span>
                    <span className="text-[11px] text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {item.location.split(',')[0]} ({item.distanceKm} km away)
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenTraceability(item);
                    }}
                    className="p-2 rounded-lg bg-black/60 hover:bg-emerald-500/20 border border-white/20 hover:border-emerald-400 text-slate-200 hover:text-emerald-300 transition-all"
                    title="View Batch Traceability Passport"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {item.cropName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Harvest & Shelf Life */}
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-300 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      {item.harvestDate}
                    </span>
                    <span>•</span>
                    <span>Shelf Life: {item.expectedShelfLifeDays} Days</span>
                  </div>

                  {/* TRANSPARENT PRICE DISCOVERY COMPARISON MATRIX */}
                  <div className="mt-4 p-3 rounded-xl bg-black/60 border border-white/10 space-y-1.5 font-mono text-xs">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-sans font-semibold">
                      Transparent Price Matrix (per kg)
                    </div>

                    <div className="flex justify-between items-center text-slate-300">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span>Mandi APMC Benchmark:</span>
                      </span>
                      <span className="text-amber-400 font-semibold">₹{item.mandiBenchmarkPrice.toFixed(1)}</span>
                    </div>

                    <div className="flex justify-between items-center text-slate-300">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span>Farmlink Platform Avg:</span>
                      </span>
                      <span className="text-cyan-400 font-semibold">
                        ₹{(item.mandiBenchmarkPrice * 1.3).toFixed(1)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/10 pt-1.5">
                      <span className="flex items-center gap-1 text-white font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Farmer Asking Price:</span>
                      </span>
                      <span className="text-emerald-400 font-extrabold text-sm">
                        ₹{transactionMode === 'retail' ? item.retailPricePerKg.toFixed(1) : item.bulkPricePerKg.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Action Bar */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[10px]">
                      {transactionMode === 'retail' ? 'Min Retail Order:' : 'Min Bulk Lot:'}
                    </span>
                    <strong className="text-white font-mono">
                      {transactionMode === 'retail' ? `${item.minOrderRetailKg} kg` : `${item.bulkMinOrderKg} kg`}
                    </strong>
                  </div>

                  <button
                    onClick={() => onSelectListingForOrder(item, transactionMode)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      transactionMode === 'retail'
                        ? 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-[0_0_15px_rgba(0,255,135,0.25)]'
                        : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    }`}
                  >
                    <span>{transactionMode === 'retail' ? 'Buy Farm-to-Door' : 'Order Bulk B2B'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
