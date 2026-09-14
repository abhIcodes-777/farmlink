import React, { useState } from 'react';
import {
  BrainCircuit,
  TrendingUp,
  Camera,
  Scan,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  CloudSun,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

interface AIEngineViewProps {
  onGradingComplete?: (gradeResult: any) => void;
}

export const AIEngineView: React.FC<AIEngineViewProps> = () => {
  const [activeSubTab, setActiveSubTab] = useState<'forecasting' | 'grading'>('forecasting');
  const [selectedCrop, setSelectedCrop] = useState<'tomato' | 'onion' | 'apple'>('tomato');

  // CV Grading State
  const [scanning, setScanning] = useState(false);
  const [selectedSample, setSelectedSample] = useState<'high' | 'medium' | 'low'>('high');
  const [inspectionResult, setInspectionResult] = useState<any>({
    inspectionId: 'AI-CV-98214',
    cropType: 'Vine Tomatoes',
    grade: 'Grade A+ (Export Quality)',
    score: 96.8,
    defectPct: 1.2,
    colorUniformity: '98.5% Deep Crimson (Optimal Lycopene)',
    diameterUniformity: '58mm ± 3mm standard sphericity',
    pesticideResidueRisk: 'Undetectable (<0.01 ppb)',
    recommendedPriceBand: { minPerKg: 24, maxPerKg: 30, recommendedPerKg: 27 },
    suggestedMarketAction: 'Certify for Metro Premium Retail & Export B2B'
  });

  const sampleImages = {
    high: {
      url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      label: 'Sample A: High Quality Export Batch (Zero Blemishes, Deep Red)'
    },
    medium: {
      url: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=600&auto=format&fit=crop&q=80',
      label: 'Sample B: Domestic Wholesale Batch (Minor green shoulder, uneven size)'
    },
    low: {
      url: 'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=600&auto=format&fit=crop&q=80',
      label: 'Sample C: Processing Grade Batch (Cracks & blemishes for Puree/Paste)'
    }
  };

  const handleScanSample = (quality: 'high' | 'medium' | 'low') => {
    setSelectedSample(quality);
    setScanning(true);

    setTimeout(() => {
      setScanning(false);
      if (quality === 'high') {
        setInspectionResult({
          inspectionId: `AI-CV-${Math.floor(10000 + Math.random() * 90000)}`,
          cropType: 'Vine Tomatoes',
          grade: 'Grade A+ (Export Quality)',
          score: 97.2,
          defectPct: 0.9,
          colorUniformity: '99.1% Deep Crimson (High Lycopene Index)',
          diameterUniformity: '60mm ± 2mm Export Uniformity',
          pesticideResidueRisk: 'Zero Chemical Residue (<0.005 ppb)',
          recommendedPriceBand: { minPerKg: 26, maxPerKg: 32, recommendedPerKg: 29 },
          suggestedMarketAction: 'Top Tier Premium: Direct to High-End Supermarkets & Direct Farm-to-Door'
        });
      } else if (quality === 'medium') {
        setInspectionResult({
          inspectionId: `AI-CV-${Math.floor(10000 + Math.random() * 90000)}`,
          cropType: 'Desi Hybrid Tomatoes',
          grade: 'Grade B (Domestic Wholesale)',
          score: 83.5,
          defectPct: 6.5,
          colorUniformity: '87.4% Pink-Red with minor green shoulders',
          diameterUniformity: '52mm ± 6mm Mixed Sizing',
          pesticideResidueRisk: 'Well within FSSAI safe limits',
          recommendedPriceBand: { minPerKg: 19, maxPerKg: 23, recommendedPerKg: 21 },
          suggestedMarketAction: 'Direct to Local Restaurant B2B & Wholesale Mandi Lots'
        });
      } else {
        setInspectionResult({
          inspectionId: `AI-CV-${Math.floor(10000 + Math.random() * 90000)}`,
          cropType: 'Field Grown Tomatoes',
          grade: 'Grade C (Food Processing Puree)',
          score: 71.4,
          defectPct: 17.8,
          colorUniformity: '72.0% Irregular ripening & skin scars',
          diameterUniformity: '45mm ± 12mm High Variance',
          pesticideResidueRisk: 'Standard agricultural clearance',
          recommendedPriceBand: { minPerKg: 13, maxPerKg: 16, recommendedPerKg: 14.5 },
          suggestedMarketAction: 'Immediate Divert: Auto-route to Pune/Nashik Ketchup & Puree Processors'
        });
      }
    }, 1200);
  };

  // Forecast datasets
  const forecastData = {
    tomato: {
      crop: "Vine Tomato",
      region: "Nashik & Southern Corridor",
      currentPrice: 22.0,
      predictedPrice30d: 31.5,
      priceTrend: "+43.1% Surge Anticipated",
      signal: {
        type: "UNDERSUPPLY_DEFICIT",
        badge: "Regional Supply Deficit Alert",
        color: "text-amber-400 bg-amber-950/80 border-amber-500/40",
        message: "Southern monsoon delay has disrupted Andhra & Karnataka tomato nursery transplanting. Demand from Mumbai & Delhi will surge by +38% within 14 days."
      },
      points: [
        { label: "Day 1", demand: 120, price: 22.0, mandi: 18.0 },
        { label: "Day 5", demand: 135, price: 24.5, mandi: 19.5 },
        { label: "Day 10", demand: 160, price: 28.0, mandi: 21.0 },
        { label: "Day 15", demand: 195, price: 32.5, mandi: 23.0 },
        { label: "Day 20", demand: 215, price: 34.0, mandi: 24.5 },
        { label: "Day 25", demand: 185, price: 30.0, mandi: 22.0 },
        { label: "Day 30", demand: 155, price: 26.0, mandi: 20.0 }
      ],
      aiAdvisory: [
        "Avoid distress selling at current local APMC rates (₹18/kg).",
        "Stagger harvest between Day 12 and Day 22 to capture peak ₹32-34/kg window.",
        "Pre-book Adani Reefer Cold Transport early to lock in logistics space before rates surge."
      ]
    },
    onion: {
      crop: "Lasalgaon Red Onion",
      region: "Nashik Belt & Gujarat Border",
      currentPrice: 26.5,
      predictedPrice30d: 22.5,
      priceTrend: "-15.1% Temporary Dip",
      signal: {
        type: "OVERSUPPLY_WARNING",
        badge: "Local Glut / Oversupply Warning",
        color: "text-rose-400 bg-rose-950/80 border-rose-500/40",
        message: "Concurrent harvesting in MP and Ahmednagar will flood local open yards in 18 days. Distress sales expected if dumped in open APMC mandis."
      },
      points: [
        { label: "Day 1", demand: 450, price: 26.5, mandi: 21.0 },
        { label: "Day 5", demand: 460, price: 27.0, mandi: 21.5 },
        { label: "Day 10", demand: 430, price: 25.0, mandi: 19.5 },
        { label: "Day 15", demand: 390, price: 23.0, mandi: 18.0 },
        { label: "Day 20", demand: 370, price: 21.5, mandi: 17.0 },
        { label: "Day 25", demand: 410, price: 23.0, mandi: 18.5 },
        { label: "Day 30", demand: 440, price: 25.0, mandi: 19.5 }
      ],
      aiAdvisory: [
        "DYNAMIC DIVERSION SIGNAL: Divert 35% of harvested volume to Adani Agri Logistics Scientific Dry Silos.",
        "Store at ₹0.40/kg/month with guaranteed humidity control instead of selling during the Day 15-22 glut.",
        "Release in late October when festival demand triggers a +50% price rebound."
      ]
    },
    apple: {
      crop: "Royal Delicious Shimla Apple",
      region: "Himachal & J&K Orchards",
      currentPrice: 105.0,
      predictedPrice30d: 135.0,
      priceTrend: "+28.5% Premium Upside",
      signal: {
        type: "FESTIVAL_PEAK_EXPANSION",
        badge: "Festive Gifting Demand Peak",
        color: "text-emerald-400 bg-emerald-950/80 border-emerald-500/40",
        message: "Diwali & corporate festive gift box requirements will create insatiable demand for Grade A+ blemish-free fruit."
      },
      points: [
        { label: "Day 1", demand: 80, price: 105.0, mandi: 78.0 },
        { label: "Day 5", demand: 95, price: 114.0, mandi: 82.0 },
        { label: "Day 10", demand: 120, price: 125.0, mandi: 88.0 },
        { label: "Day 15", demand: 145, price: 138.0, mandi: 95.0 },
        { label: "Day 20", demand: 130, price: 132.0, mandi: 90.0 },
        { label: "Day 25", demand: 110, price: 124.0, mandi: 85.0 },
        { label: "Day 30", demand: 95, price: 118.0, mandi: 82.0 }
      ],
      aiAdvisory: [
        "Opt for Controlled Atmosphere (CA) packing directly at Kotgarh collection centers.",
        "Use Farmlink's green corridor reefer transport to reach Azadpur and Navi Mumbai in under 16 hours.",
        "List in 5kg gift-box retail format for maximum realization."
      ]
    }
  };

  const currentForecast = forecastData[selectedCrop];

  return (
    <section className="py-12 bg-[#020503] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>AI AGRI-INTELLIGENCE SUITE • SIH SOLUTION 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              AI Demand Forecasting & Quality Vision
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Equipping farmers with multi-factor predictive time series, dynamic diversion alerts to prevent distress sales, and instant camera-based optical crop grading.
            </p>
          </div>

          {/* Sub-tab navigation */}
          <div className="flex items-center bg-black/60 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveSubTab('forecasting')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === 'forecasting'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Demand Forecasting & Signals</span>
            </button>
            <button
              onClick={() => setActiveSubTab('grading')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSubTab === 'grading'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Computer Vision Crop Grading</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Demand Forecasting & Dynamic Pricing Signals */}
        {activeSubTab === 'forecasting' && (
          <div className="mt-8 space-y-8">
            {/* Crop Selector Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">SELECT COMMODITY:</span>
                {(['tomato', 'onion', 'apple'] as const).map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCrop(crop)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                      selectedCrop === crop
                        ? 'bg-emerald-400 text-black shadow-md'
                        : 'bg-black/60 text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CloudSun className="w-4 h-4 text-amber-400" />
                  <span>Weather Index: Monsoon Delay (+2.4°C Heatwave)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Festive Season Horizon: 30 Days</span>
                </span>
              </div>
            </div>

            {/* DYNAMIC PRICING SIGNAL ALERT BANNER */}
            <div className={`p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${currentForecast.signal.color}`}>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <div>
                  <div className="font-bold text-sm tracking-wide uppercase font-mono">
                    {currentForecast.signal.badge}
                  </div>
                  <p className="text-xs mt-0.5 opacity-90">
                    {currentForecast.signal.message}
                  </p>
                </div>
              </div>
              <div className="shrink-0 font-mono font-bold text-sm px-3 py-1 rounded bg-black/50 border border-white/20">
                {currentForecast.priceTrend}
              </div>
            </div>

            {/* Forecast Visualizer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Interactive 30-Day Curve Chart (Left 2 Columns) */}
              <div className="lg:col-span-2 astra-glass-card rounded-3xl p-6 border border-emerald-500/30">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      30-Day Demand & Price Vector Simulation
                    </h3>
                    <p className="text-xs text-slate-400">
                      Trained on 7 years of Agmarknet APMC arrivals, satellite soil moisture, and wholesale consumption.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-3 h-1 bg-emerald-400 rounded"></span>
                      Farmlink Price
                    </span>
                    <span className="flex items-center gap-1 text-rose-400">
                      <span className="w-3 h-1 bg-rose-400 rounded"></span>
                      Mandi APMC
                    </span>
                    <span className="flex items-center gap-1 text-cyan-400">
                      <span className="w-3 h-1 bg-cyan-400 rounded"></span>
                      Demand (MT)
                    </span>
                  </div>
                </div>

                {/* Graphical Bars & Curve */}
                <div className="mt-8 space-y-4">
                  {currentForecast.points.map((pt, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-300">
                        <span className="font-bold text-white w-16">{pt.label}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-cyan-300">Demand: {pt.demand} MT</span>
                          <span className="text-rose-400 line-through">Mandi: ₹{pt.mandi}/kg</span>
                          <span className="text-emerald-400 font-bold">Farmlink: ₹{pt.price}/kg</span>
                        </div>
                      </div>
                      <div className="relative h-3 w-full bg-black/60 rounded-full overflow-hidden flex">
                        {/* Demand bar (cyan) */}
                        <div
                          style={{ width: `${Math.min(100, (pt.demand / 500) * 100)}%` }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Confidence Interval: 94.2%</span>
                  <span className="text-emerald-400 font-mono">Algorithm: Prophet + LSTM Neural Auto-Regressive</span>
                </div>
              </div>

              {/* Actionable AI Strategic Advisory (Right Column) */}
              <div className="astra-glass rounded-3xl p-6 border border-emerald-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-white mb-4">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>AI Agronomist Strategic Advisory</span>
                  </div>

                  <div className="space-y-3.5">
                    {currentForecast.aiAdvisory.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-black/50 border border-emerald-500/20 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200">
                  <span className="font-bold block text-white mb-1">Pre-positioning Logistics:</span>
                  Farmlink automated dispatch has pre-assigned 4 Adani Reefer trucks and 12 Kisan Sabha mini-pools in this cluster to prevent harvest bottlenecks.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Computer Vision Quality & Grading Assist */}
        {activeSubTab === 'grading' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Image Scanner & Camera Simulator */}
            <div className="astra-glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Scan className="w-4 h-4 text-cyan-400" />
                  <span>Optical Quality & Grade Assessment Engine</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  Mobile Camera Assist
                </span>
              </div>

              {/* Sample Photo Selectors */}
              <div className="mt-4">
                <label className="text-xs text-slate-400 block mb-2 font-mono">
                  SELECT TEST INSPECTION PHOTO:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['high', 'medium', 'low'] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => handleScanSample(q)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all ${
                        selectedSample === q
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                          : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold capitalize">{q === 'high' ? 'Grade A+' : q === 'medium' ? 'Grade B' : 'Grade C'}</div>
                      <div className="text-[10px] opacity-75">{q === 'high' ? 'Export Blemish-free' : q === 'medium' ? 'Standard Wholesale' : 'Puree Processing'}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image with Neural Scanning Overlay */}
              <div className="relative mt-6 h-72 rounded-2xl overflow-hidden bg-black border border-white/20 group">
                <img
                  src={sampleImages[selectedSample].url}
                  alt="Crop Inspection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />

                {/* Neural Bounding Boxes & HUD overlay */}
                <div className="absolute inset-4 border border-cyan-400/50 rounded-xl pointer-events-none flex flex-col justify-between p-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400">
                    <span>SPECTRAL DEFECT SCAN: ACTIVE</span>
                    <span>RESOLUTION: 1080P RGB</span>
                  </div>

                  {/* Laser scanline animation */}
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f0ff] animate-bounce" />

                  <div className="flex justify-between items-center text-[10px] font-mono text-cyan-300">
                    <span>LYCOPENE INDEX: 98.4</span>
                    <span>DIAMETER: 58.2mm</span>
                  </div>
                </div>

                {scanning && (
                  <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                    <Scan className="w-10 h-10 text-cyan-400 animate-spin" />
                    <span className="text-xs font-mono text-cyan-300">Running Convolutional Defect Classifier...</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => handleScanSample(selectedSample)}
                  disabled={scanning}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>{scanning ? 'Analyzing Produce...' : 'Re-Run Computer Vision Scan'}</span>
                </button>
              </div>
            </div>

            {/* Right: Computer Vision Inspection Output Sheet */}
            <div className="astra-glass rounded-3xl p-6 sm:p-8 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      INSPECTION ID: {inspectionResult.inspectionId}
                    </span>
                    <h3 className="text-2xl font-bold font-display text-white mt-0.5">
                      {inspectionResult.grade}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-emerald-400 font-display">
                      {inspectionResult.score}%
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">QUALITY INDEX</span>
                  </div>
                </div>

                {/* Granular Inspection Metrics */}
                <div className="space-y-3.5 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex justify-between items-center">
                    <span className="text-slate-400">Defect / Blemish Percentage:</span>
                    <span className="text-emerald-400 font-bold">{inspectionResult.defectPct}%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex justify-between items-center">
                    <span className="text-slate-400">Color Spectrum Uniformity:</span>
                    <span className="text-slate-200">{inspectionResult.colorUniformity}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex justify-between items-center">
                    <span className="text-slate-400">Diameter Sphericity:</span>
                    <span className="text-slate-200">{inspectionResult.diameterUniformity}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex justify-between items-center">
                    <span className="text-slate-400">Pesticide Residue Risk:</span>
                    <span className="text-emerald-400 font-bold">{inspectionResult.pesticideResidueRisk}</span>
                  </div>
                </div>

                {/* Fair Price Recommendation */}
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-emerald-950/70 to-black border border-emerald-500/40">
                  <div className="text-[11px] uppercase font-mono text-emerald-400 font-semibold mb-1">
                    AI Suggested Fair Price Band
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white font-display">
                      ₹{inspectionResult.recommendedPriceBand.recommendedPerKg}/kg
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      (Range: ₹{inspectionResult.recommendedPriceBand.minPerKg} — ₹{inspectionResult.recommendedPriceBand.maxPerKg})
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-300">
                    <strong>Recommended Dispatch Action:</strong> {inspectionResult.suggestedMarketAction}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certificate cryptographically signed and stamped into Farmlink batch blockchain ledger.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
