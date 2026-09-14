import React, { useState } from 'react';
import {
  Sprout,
  TrendingUp,
  Truck,
  ShieldCheck,
  BrainCircuit,
  Gavel,
  Languages,
  Store,
  ChevronRight,
  Activity,
  Menu,
  X
} from 'lucide-react';
import { MandiPrice } from '../types';
import { getTranslation } from '../utils/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mandiPrices: MandiPrice[];
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  onOpenSellModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  mandiPrices,
  selectedLanguage,
  setSelectedLanguage,
  onOpenSellModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = getTranslation(selectedLanguage);

  const languages = [
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
    { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
  ];

  const navItems = [
    { id: 'overview', label: t.navOverview, icon: Sprout },
    { id: 'marketplace', label: t.navMarketplace, icon: Store, badge: 'Retail & B2B' },
    { id: 'bidding', label: t.navBidding, icon: Gavel, badge: 'Live' },
    { id: 'ai', label: t.navAI, icon: BrainCircuit },
    { id: 'logistics', label: t.navLogistics, icon: Truck, badge: 'Adani & KS' },
    { id: 'escrow', label: t.navEscrow, icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#030805]/85 border-b border-emerald-500/20">
      {/* Live Agmarknet Mandi Ticker */}
      <div className="bg-emerald-950/40 border-b border-emerald-500/10 py-1 px-4 text-xs font-mono overflow-hidden whitespace-nowrap flex items-center">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase tracking-wider pr-4 border-r border-emerald-500/20 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Activity className="w-3.5 h-3.5" />
          <span>{t.apmcTicker}</span>
        </div>
        <div className="flex gap-8 animate-marquee items-center pl-4 text-slate-300">
          {mandiPrices.length > 0 ? (
            mandiPrices.map((m, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5">
                <span className="text-white font-medium">{m.crop}</span>
                <span className="text-slate-400">({m.mandi.split(' ')[0]})</span>:
                <span className="text-amber-400 font-semibold">₹{m.mandiPricePerKg}/kg</span>
                <span className="text-emerald-400">→ Farmlink: ₹{m.farmerAskingPriceAvg}/kg</span>
                <span className={m.trend.startsWith('+') ? 'text-emerald-400 text-[10px]' : 'text-rose-400 text-[10px]'}>
                  ({m.trend})
                </span>
                <span className="text-slate-600">|</span>
              </span>
            ))
          ) : (
            <span>Connecting to Agmarknet National Mandi Network...</span>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-500/40 group-hover:border-emerald-400 shadow-[0_0_20px_rgba(0,255,135,0.25)] transition-all">
              <Sprout className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-400/80 border-2 border-[#030805] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-white font-display">
                  FARM<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">LINK</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  SIH 2026
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">
                Decentralized Agri Protocol
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(0,255,135,0.15)]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full uppercase ${
                        item.badge === 'Live'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Vernacular Picker */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Vernacular Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-black/40 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold text-emerald-300">
                  {languages.find(l => l.code === selectedLanguage)?.native || 'English'}
                </span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#07150c] border border-emerald-500/40 shadow-2xl p-1.5 z-50 max-h-72 overflow-y-auto">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setSelectedLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex justify-between items-center transition-colors cursor-pointer ${
                        selectedLanguage === l.code
                          ? 'bg-emerald-500/25 text-emerald-300 font-bold border border-emerald-500/30'
                          : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-sm">{l.native}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({l.label})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* List Produce / Farmer Onboarding Button */}
            <button
              onClick={onOpenSellModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-[0_0_20px_rgba(0,255,135,0.35)] transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Sprout className="w-4 h-4 text-black" />
              <span>{t.btnListProduce}</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-2 rounded-xl bg-black/40 border border-white/10 text-emerald-400 text-xs font-bold"
            >
              {languages.find(l => l.code === selectedLanguage)?.native || 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-black/40 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07130b] border-b border-emerald-500/20 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenSellModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl text-center text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-md"
            >
              {t.btnListProduce}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
