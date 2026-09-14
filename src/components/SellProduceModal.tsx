import React, { useState } from 'react';
import { X, Sprout, Sparkles, Scale, CheckCircle2, ArrowRight } from 'lucide-react';
import { CropListing } from '../types';

interface SellProduceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (newListing: Partial<CropListing>) => Promise<boolean>;
}

export const SellProduceModal: React.FC<SellProduceModalProps> = ({
  isOpen,
  onClose,
  onAddListing
}) => {
  const [cropName, setCropName] = useState('Vine-Ripened Cherry Tomatoes');
  const [category, setCategory] = useState('Vegetables');
  const [farmerName, setFarmerName] = useState('Kisan Vikas Collective (Nashik)');
  const [location, setLocation] = useState('Niphad, Nashik, Maharashtra');
  const [quantityKg, setQuantityKg] = useState(1500);
  const [askingPricePerKg, setAskingPricePerKg] = useState(25);
  const [harvestDate, setHarvestDate] = useState('Harvesting in 2 Days');
  const [grade, setGrade] = useState('Grade A+ (Export Quality)');
  const [organicCertified, setOrganicCertified] = useState(true);
  const [biddingAllowed, setBiddingAllowed] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const mandiBenchmark = 18.5; // Typical benchmark

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const listingData: Partial<CropListing> = {
      cropName,
      category,
      farmerName,
      location,
      quantityAvailableKg: quantityKg,
      minOrderRetailKg: 2,
      retailPricePerKg: askingPricePerKg + 4,
      bulkPricePerKg: askingPricePerKg,
      bulkMinOrderKg: 100,
      harvestDate,
      grade,
      organicCertified,
      biddingAllowed,
      description: `Direct harvest from ${location}. Harvested with scientific pre-cooling access.`
    };

    const success = await onAddListing(listingData);
    setLoading(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="astra-glass-card rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-emerald-500/40 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Farmer / FPO Produce Onboarding
              </h3>
              <p className="text-xs text-slate-400">List crops with real-time price discovery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1 font-mono">CROP & VARIETY NAME:</label>
            <input
              type="text"
              required
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1 font-mono">CATEGORY:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-400 font-mono"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-mono">TOTAL HARVEST LOT (KG):</label>
              <input
                type="number"
                required
                min="50"
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-400 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1 font-mono">FARMER OR FPO NAME:</label>
              <input
                type="text"
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-mono">FARM LOCATION / VILLAGE:</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1 font-mono">EXPECTED HARVEST DATE:</label>
              <input
                type="text"
                required
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-mono">QUALITY GRADE:</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Grade A+ (Export Quality)">Grade A+ (Export Quality)</option>
                <option value="Grade A (Standard Premium)">Grade A (Standard Premium)</option>
                <option value="Grade B (Domestic Wholesale)">Grade B (Domestic Wholesale)</option>
              </select>
            </div>
          </div>

          {/* ASKING PRICE WITH AI MANDI COMPARISON */}
          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2 font-mono">
            <div className="flex justify-between items-center text-slate-300">
              <label className="text-white font-bold">YOUR ASKING PRICE (₹/KG):</label>
              <input
                type="number"
                step="0.5"
                required
                value={askingPricePerKg}
                onChange={(e) => setAskingPricePerKg(Number(e.target.value))}
                className="w-24 p-1.5 rounded-lg bg-black border border-emerald-400 text-right font-extrabold text-emerald-400 text-sm"
              />
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Local Mandi Benchmark: <strong className="text-amber-400">₹{mandiBenchmark}/kg</strong></span>
              <span className="text-emerald-400 font-bold">
                +{Math.round(((askingPricePerKg - mandiBenchmark) / mandiBenchmark) * 100)}% over APMC rate
              </span>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={organicCertified}
                onChange={(e) => setOrganicCertified(e.target.checked)}
                className="accent-emerald-400 w-4 h-4"
              />
              <span className="text-slate-300 font-medium">Organic / Chemical Residue Free</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={biddingAllowed}
                onChange={(e) => setBiddingAllowed(e.target.checked)}
                className="accent-cyan-400 w-4 h-4"
              />
              <span className="text-slate-300 font-medium">Enable Live Pre-Harvest Bidding</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-black font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2 shadow-lg mt-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Publishing to Network...' : 'Publish Listing to Farmlink Protocol'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
