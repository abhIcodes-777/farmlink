import React, { useState } from 'react';
import { X, ShieldCheck, Truck, Store, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { CropListing } from '../types';

interface OrderModalProps {
  listing: CropListing | null;
  mode: 'retail' | 'bulk';
  isOpen: boolean;
  onClose: () => void;
  onCreateEscrowOrder: (orderData: any) => Promise<boolean>;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  listing,
  mode,
  isOpen,
  onClose,
  onCreateEscrowOrder
}) => {
  if (!isOpen || !listing) return null;

  const minKg = mode === 'retail' ? listing.minOrderRetailKg : listing.bulkMinOrderKg;
  const pricePerKg = mode === 'retail' ? listing.retailPricePerKg : listing.bulkPricePerKg;

  const [quantity, setQuantity] = useState<number>(minKg);
  const [buyerName, setBuyerName] = useState<string>(mode === 'retail' ? 'Anita Sharma (Flat 402, Green Glen)' : 'Bistro Greens Culinary Hub');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Andheri West, Mumbai, MH');
  const [isRecurringStandingOrder, setIsRecurringStandingOrder] = useState<boolean>(false);
  const [recurringSchedule, setRecurringSchedule] = useState<string>('Bi-weekly (Tue & Fri)');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const subtotal = Math.round(quantity * pricePerKg);
  const logisticsFee = Math.round(quantity * (mode === 'retail' ? 3.5 : 1.8));
  const escrowTotal = subtotal + logisticsFee;
  const retailEquivalent = Math.round(quantity * (pricePerKg * 1.45));
  const netSavings = retailEquivalent - escrowTotal;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderPayload = {
      buyerName,
      buyerType: mode === 'retail' ? 'Direct Consumer (Farm-to-Door)' : 'B2B Bulk Institutional',
      crop: `${listing.cropName} (${quantity} kg)`,
      totalAmountRs: escrowTotal,
      farmerName: listing.farmerName,
      farmerUpi: 'rajeshwar.patil@okhdfcbank'
    };

    const success = await onCreateEscrowOrder(orderPayload);
    setLoading(false);
    if (success) {
      setSuccessMsg(`Order placed and ₹${escrowTotal.toLocaleString('en-IN')} successfully funded in Smart Escrow!`);
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="astra-glass-card rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-emerald-500/40 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              mode === 'retail'
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                : 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-400'
            }`}>
              {mode === 'retail' ? <Store className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                {mode === 'retail' ? 'Direct Farm-to-Door Order' : 'B2B Standing / Bulk Order'}
              </h3>
              <p className="text-xs text-slate-400">{listing.cropName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Form */}
        <form onSubmit={handleOrderSubmit} className="mt-6 space-y-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1 font-mono">BUYER / COMPANY NAME:</label>
            <input
              type="text"
              required
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-mono">DELIVERY ADDRESS & CITY:</label>
            <input
              type="text"
              required
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-slate-400 mb-1 font-mono">
              <span>ORDER QUANTITY (KG):</span>
              <span className="text-emerald-400 font-bold">Min: {minKg} kg</span>
            </div>
            <input
              type="number"
              min={minKg}
              max={listing.quantityAvailableKg}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white font-mono text-sm focus:outline-none focus:border-emerald-400"
            />
          </div>

          {mode === 'bulk' && (
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRecurringStandingOrder}
                  onChange={(e) => setIsRecurringStandingOrder(e.target.checked)}
                  className="accent-cyan-400 w-4 h-4"
                />
                <span className="text-cyan-200 font-semibold">Make this a Recurring Standing Order</span>
              </label>
              {isRecurringStandingOrder && (
                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 block mb-1">RECURRENCE CADENCE:</span>
                  <select
                    value={recurringSchedule}
                    onChange={(e) => setRecurringSchedule(e.target.value)}
                    className="w-full p-2 rounded-lg bg-black border border-white/20 text-white font-mono text-xs"
                  >
                    <option value="Daily Fresh Drop (Mon-Sat)">Daily Fresh Drop (Mon-Sat)</option>
                    <option value="Bi-weekly (Tue & Fri)">Bi-weekly (Tue & Fri)</option>
                    <option value="Weekly (Every Monday)">Weekly (Every Monday)</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* ESCROW BREAKDOWN & SAVINGS */}
          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 font-mono text-xs space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Farm Gate Produce ({quantity} kg @ ₹{pricePerKg}/kg):</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Adani Reefer & Kisan Sabha Pooling:</span>
              <span>₹{logisticsFee.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-white/10 text-emerald-400 font-bold text-sm">
              <span>Total Escrow Deposit:</span>
              <span>₹{escrowTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-cyan-300 text-[11px]">
              <span>Estimated Consumer/Buyer Savings vs Mandi:</span>
              <span>-₹{netSavings.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2 shadow-lg"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'Funding Escrow...' : `Fund Escrow & Confirm Order (₹${escrowTotal.toLocaleString('en-IN')})`}</span>
          </button>

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
