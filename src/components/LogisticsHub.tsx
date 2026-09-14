import React, { useState } from 'react';
import {
  Truck,
  ThermometerSnowflake,
  Users,
  Navigation,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  Fuel,
  Leaf,
  ShieldAlert,
  Layers,
  ChevronRight,
  Sparkles,
  Phone,
  Activity,
  Gauge
} from 'lucide-react';
import { AdaniSilo, ActiveReefer, KisanSabhaPool, VRPSolution } from '../types';

interface LogisticsHubProps {
  adaniSilos: AdaniSilo[];
  activeReefers: ActiveReefer[];
  kisanSabhaPools: KisanSabhaPool[];
  onJoinPool: (poolId: string, farmerName: string, crop: string, weightKg: number) => Promise<boolean>;
}

export const LogisticsHub: React.FC<LogisticsHubProps> = ({
  adaniSilos,
  activeReefers,
  kisanSabhaPools,
  onJoinPool
}) => {
  const [activeSection, setActiveSection] = useState<'vrp' | 'adani' | 'kisansabha'>('vrp');

  // VRP State
  const [vrpRunning, setVrpRunning] = useState<boolean>(false);
  const [vrpResult, setVrpResult] = useState<VRPSolution>({
    success: true,
    totalDistanceKm: 142.8,
    unoptimizedDistanceKm: 211.3,
    distanceSavedPercent: 32.4,
    estimatedTransitTimeMins: 178,
    fuelSavedLiters: 19,
    co2AvoidedKg: 51,
    estimatedSpoilageRatePct: 0.6,
    traditionalSpoilageRatePct: 24.5,
    optimizedWaypoints: [
      { name: "Nashik Central Agri Logistics Depot", lat: 19.9975, lng: 73.7898, type: "DEPOT_START", action: "Fleet Departure & Telemetry Calibrated", cumulativeDistanceKm: 0, currentLoadKg: 0 },
      { name: "Patil Farm Gate (Dindori)", lat: 20.1983, lng: 73.8428, type: "FARM_PICKUP", crop: "Vine Tomatoes", demandKg: 2500, cumulativeDistanceKm: 24.5, currentLoadKg: 2500 },
      { name: "Kisan Sabha PACS Aggregation Point (Peth)", lat: 20.2541, lng: 73.5042, type: "FARM_PICKUP", crop: "Green Peas (Pooled)", demandKg: 2200, cumulativeDistanceKm: 61.2, currentLoadKg: 4700 },
      { name: "Godavari FPO Cluster (Niphad)", lat: 20.0768, lng: 74.1102, type: "FARM_PICKUP", crop: "Pink Onions", demandKg: 4000, cumulativeDistanceKm: 108.4, currentLoadKg: 8700 },
      { name: "Adani Agri Logistics CA Packhouse & Pre-Cooling", lat: 20.0371, lng: 73.8999, type: "COLD_CHAIN_GATEWAY", action: "Rapid Nitrogen Pre-Cooling to 3.8°C & Reefer Seal", cumulativeDistanceKm: 122.0, currentLoadKg: 8700 },
      { name: "Metro Retail Distribution Center (Thane)", lat: 19.2183, lng: 72.9781, type: "METRO_DELIVERY", dropKg: 8700, cumulativeDistanceKm: 142.8, remainingLoadKg: 0 }
    ]
  });

  // Kisan Sabha Pool Booking State
  const [selectedPoolId, setSelectedPoolId] = useState<string>(kisanSabhaPools[0]?.poolId || '');
  const [poolFarmerName, setPoolFarmerName] = useState<string>('Balu Chavan');
  const [poolCrop, setPoolCrop] = useState<string>('Capsicum (Shimla Mirch)');
  const [poolWeightKg, setPoolWeightKg] = useState<number>(250);
  const [poolStatusMessage, setPoolStatusMessage] = useState<string | null>(null);

  const handleRunVRPSolver = () => {
    setVrpRunning(true);
    setTimeout(() => {
      setVrpRunning(false);
    }, 1200);
  };

  const handlePoolBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPoolId || poolWeightKg <= 0) return;
    const success = await onJoinPool(selectedPoolId, poolFarmerName, poolCrop, poolWeightKg);
    if (success) {
      setPoolStatusMessage(`Spot booked successfully in Kisan Sabha Freight Pool! Saved ~51% in transport expenses.`);
      setTimeout(() => setPoolStatusMessage(null), 5000);
    }
  };

  return (
    <section className="py-12 bg-[#020503] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <Truck className="w-3.5 h-3.5" />
              <span>LOGISTICS PROTOCOL • ADANI AGRI LOGISTICS & KISAN SABHA PARTNERSHIP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
              Intelligent Agri-Logistics & Rural Freight Pooling
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Eliminating supply-chain spoilage through scientific bulk silo storage, automated SCADA grain preservation, temperature-controlled reefer corridors, and CSIR-CRRI Kisan Sabha village vehicle pooling.
            </p>
          </div>

          {/* Logistics sub-navigation */}
          <div className="flex items-center bg-black/60 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveSection('vrp')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSection === 'vrp'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>Dynamic VRP Solver</span>
            </button>
            <button
              onClick={() => setActiveSection('adani')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSection === 'adani'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ThermometerSnowflake className="w-4 h-4 text-cyan-400" />
              <span>Adani Silos & Reefer Fleet</span>
            </button>
            <button
              onClick={() => setActiveSection('kisansabha')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSection === 'kisansabha'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>Kisan Sabha Rural Pooling</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: Dynamic Vehicle Routing Problem (VRP) Solver */}
        {activeSection === 'vrp' && (
          <div className="mt-8 space-y-8">
            {/* Top VRP Optimization Telemetry Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="astra-glass p-5 rounded-2xl border border-emerald-500/30">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>DISTANCE OPTIMIZED</span>
                  <Fuel className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400 font-display mt-2">
                  {vrpResult.totalDistanceKm} km
                </div>
                <div className="mt-1 text-xs text-slate-300">
                  <span className="text-rose-400 line-through mr-1.5">{vrpResult.unoptimizedDistanceKm} km</span>
                  <span className="text-emerald-400 font-bold font-mono">(-{vrpResult.distanceSavedPercent}%)</span>
                </div>
              </div>

              <div className="astra-glass p-5 rounded-2xl border border-cyan-500/30">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>TRANSIT TIME SAVED</span>
                  <Clock className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-extrabold text-cyan-400 font-display mt-2">
                  {vrpResult.estimatedTransitTimeMins} mins
                </div>
                <div className="mt-1 text-xs text-slate-300 font-mono">
                  Continuous cold-chain highway transit
                </div>
              </div>

              <div className="astra-glass p-5 rounded-2xl border border-amber-500/30">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>PERISHABLE SPOILAGE</span>
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-extrabold text-amber-400 font-display mt-2">
                  {vrpResult.estimatedSpoilageRatePct}%
                </div>
                <div className="mt-1 text-xs text-slate-300">
                  vs <span className="text-rose-400">{vrpResult.traditionalSpoilageRatePct}%</span> in open trucks
                </div>
              </div>

              <div className="astra-glass p-5 rounded-2xl border border-emerald-500/30">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>CARBON AVOIDED</span>
                  <Leaf className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-400 font-display mt-2">
                  {vrpResult.co2AvoidedKg} kg CO₂
                </div>
                <div className="mt-1 text-xs text-slate-300 font-mono">
                  {vrpResult.fuelSavedLiters} Liters diesel conserved
                </div>
              </div>
            </div>

            {/* Interactive Route Waypoint Sequence Visualizer */}
            <div className="astra-glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Optimized Multi-Stop Aggregation & Cold Chain Corridor
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Consolidating farm-gate pickups across Dindori, Peth, and Niphad to Adani CA Packhouse and Thane Metro DC.
                  </p>
                </div>
                <button
                  onClick={handleRunVRPSolver}
                  disabled={vrpRunning}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black text-xs font-bold hover:opacity-90 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Navigation className={`w-4 h-4 ${vrpRunning ? 'animate-spin' : ''}`} />
                  <span>{vrpRunning ? 'Re-calculating Heuristics...' : 'Re-Run VRP Optimization'}</span>
                </button>
              </div>

              {/* Waypoint Steps Chain */}
              <div className="mt-8 space-y-4">
                {vrpResult.optimizedWaypoints.map((wp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-emerald-500/40 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {/* Waypoint Number Badge */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 ${
                        wp.type === 'DEPOT_START'
                          ? 'bg-slate-800 text-slate-300 border border-slate-600'
                          : wp.type === 'FARM_PICKUP'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : wp.type === 'COLD_CHAIN_GATEWAY'
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40 animate-pulse'
                          : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                      }`}>
                        {idx === 0 ? 'START' : idx === vrpResult.optimizedWaypoints.length - 1 ? 'END' : `W${idx}`}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{wp.name}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                            wp.type === 'FARM_PICKUP'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : wp.type === 'COLD_CHAIN_GATEWAY'
                              ? 'bg-cyan-500/20 text-cyan-300'
                              : 'bg-white/10 text-slate-300'
                          }`}>
                            {wp.type.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                          {wp.crop && <span className="text-emerald-400 font-semibold">Produce: {wp.crop}</span>}
                          {wp.action && <span>Action: {wp.action}</span>}
                          <span>Cumulative: {wp.cumulativeDistanceKm} km</span>
                        </div>
                      </div>
                    </div>

                    {/* Load telemetry */}
                    <div className="text-right font-mono text-xs">
                      {wp.demandKg && (
                        <div className="text-emerald-400 font-bold">+ {wp.demandKg.toLocaleString()} kg Loaded</div>
                      )}
                      {wp.dropKg && (
                        <div className="text-cyan-400 font-bold">- {wp.dropKg.toLocaleString()} kg Dispatched</div>
                      )}
                      {wp.currentLoadKg !== undefined && (
                        <div className="text-slate-400 text-[11px]">Truck Load: {wp.currentLoadKg.toLocaleString()} kg</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: Adani Agri Logistics Infrastructure & Active Reefer Fleet */}
        {activeSection === 'adani' && (
          <div className="mt-8 space-y-8">
            {/* Adani Intro Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#031b1c] to-black border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                  <ThermometerSnowflake className="w-4 h-4" />
                  <span>STRATEGIC PARTNER: ADANI AGRI LOGISTICS LIMITED (AALL)</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  Scientific Bulk Silos & Cold-Chain Reefer Network
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                  Commissioned grain silos equipped with automated SCADA temperature probes, nitrogen aeration, rail connectivity, and cryogenic multi-temp reefer vehicles.
                </p>
              </div>
              <div className="font-mono text-xs text-cyan-300 p-3 rounded-xl bg-black/60 border border-cyan-500/30 shrink-0">
                <div>BULK SILO CAPACITY: <strong>875,000 MT</strong></div>
                <div>COLD STORAGE VAULTS: <strong>120,000 MT</strong></div>
              </div>
            </div>

            {/* Silo Terminals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adaniSilos.map((silo) => (
                <div
                  key={silo.id}
                  className="astra-glass-card rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition-all"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 block">{silo.id}</span>
                      <h4 className="text-lg font-bold text-white mt-0.5">{silo.name}</h4>
                      <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {silo.state}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-cyan-400 font-display">
                        {(silo.capacityMT / 1000).toFixed(0)}k MT
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Total Capacity</span>
                    </div>
                  </div>

                  {/* Silo Sensors Telemetry */}
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-mono text-center">
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/10">
                      <span className="text-[10px] text-slate-400 block">INTERNAL TEMP</span>
                      <strong className="text-cyan-300 text-sm">{silo.internalSiloTempC}°C</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/10">
                      <span className="text-[10px] text-slate-400 block">HUMIDITY</span>
                      <strong className="text-emerald-400 text-sm">{silo.internalHumidityPct}%</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/10">
                      <span className="text-[10px] text-slate-400 block">UTILIZATION</span>
                      <strong className="text-amber-400 text-sm">{silo.currentUtilizationPct}%</strong>
                    </div>
                  </div>

                  {/* Commodities & Features */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="text-slate-500">Stored:</span>
                      {silo.commodities.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-slate-200">
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className="font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{silo.automationLevel.split(' ')[0]} SCADA</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Reefer Telemetry Tracker */}
            <div className="astra-glass rounded-3xl p-6 border border-cyan-500/30">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>Live Cold-Chain Reefer Fleet Telemetry</span>
                </div>
                <span className="text-xs font-mono text-cyan-400">
                  {activeReefers.length} Active Cryogenic Vehicles in Transit
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeReefers.map((truck) => (
                  <div
                    key={truck.vehicleId}
                    className="p-5 rounded-2xl bg-black/60 border border-cyan-500/20 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono text-cyan-400 font-bold">{truck.vehicleId}</span>
                        <div className="text-sm font-bold text-white mt-0.5">{truck.model}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono">
                        {truck.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1">
                      <div><strong>Cargo:</strong> {truck.cargo}</div>
                      <div><strong>Route:</strong> {truck.origin} → {truck.destination}</div>
                      <div><strong>Current Location:</strong> {truck.currentLocation}</div>
                    </div>

                    {/* Sensor Telemetry Badges */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#041209] border border-emerald-500/20 text-center font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">CHAMBER TEMP</span>
                        <span className="text-cyan-300 font-bold text-sm">{truck.currentTempC}°C</span>
                        <span className="text-[9px] text-slate-500 block">(Set: {truck.setpointTempC}°C)</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">DOOR SEAL</span>
                        <span className="text-emerald-400 font-bold text-xs">SEALED</span>
                        <span className="text-[9px] text-slate-500 block">Zero Breach</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">SPOILAGE RISK</span>
                        <span className="text-emerald-400 font-bold text-sm">{truck.spoilingRiskPct}%</span>
                        <span className="text-[9px] text-slate-500 block">ETA: {truck.etaMins}m</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                      <span>Driver: {truck.driverName}</span>
                      <span className="font-mono text-cyan-300 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {truck.contact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Kisan Sabha (CSIR-CRRI) Rural Vehicle Pooling */}
        {activeSection === 'kisansabha' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Active Pooling Hubs (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#211505] to-black border border-amber-500/30">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span>CSIR-CRRI KISAN SABHA INITIATIVE PARTNERSHIP</span>
                </div>
                <h3 className="text-2xl font-bold font-display text-white">
                  Village-Level Shared Freight Pooling (LTL)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Smallholder farmers with 200–500 kg lots cannot afford to hire an entire truck. Kisan Sabha connects local mini-truck operators and PACS hubs to aggregate loads, <strong className="text-amber-400">cutting individual freight costs by 50%+</strong>.
                </p>
              </div>

              {/* Pool Groups Cards */}
              <div className="space-y-4">
                {kisanSabhaPools.map((pool) => (
                  <div
                    key={pool.poolId}
                    className="astra-glass-card rounded-2xl p-6 border border-amber-500/20 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400 uppercase">{pool.poolId}</span>
                        <h4 className="text-base font-bold text-white">{pool.hubName}</h4>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Vehicle: {pool.vehicleType} • Operator: {pool.operatorName} ({pool.contact})
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-center font-mono">
                        <span className="text-[10px] text-slate-400 block">DEPARTURE</span>
                        <strong className="text-amber-400 text-xs">{pool.departureTime}</strong>
                      </div>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                        <span>Capacity Booked: {pool.bookedWeightKg} / {pool.totalCapacityKg} kg</span>
                        <span className="text-emerald-400 font-bold">{pool.availableWeightKg} kg Available</span>
                      </div>
                      <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/10">
                        <div
                          style={{ width: `${(pool.bookedWeightKg / pool.totalCapacityKg) * 100}%` }}
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all"
                        />
                      </div>
                    </div>

                    {/* Farmers already in pool */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs">
                      <span className="text-[11px] font-mono text-slate-400 block mb-2 uppercase">
                        Farmers Currently Sharing This Transport ({pool.farmersPooled.length}):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {pool.farmersPooled.map((f, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-[11px] flex items-center gap-1.5">
                            <strong>{f.name}</strong> ({f.crop}, {f.weightKg}kg)
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Cost Economics */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10 font-mono">
                      <div>
                        <span className="text-slate-400">Solo Private Rate:</span>
                        <span className="text-rose-400 line-through ml-1.5">₹{pool.costPerKgIndividualRs.toFixed(2)}/kg</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Pooled Shared Rate:</span>
                        <span className="text-emerald-400 font-bold ml-1.5">₹{pool.costPerKgPooledRs.toFixed(2)}/kg</span>
                      </div>
                      <span className="text-xs text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                        {pool.savingsPercent}% Cost Reduction
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Book Into Freight Pool Console */}
            <div className="astra-glass rounded-3xl p-6 border border-amber-500/30 h-fit">
              <div className="flex items-center gap-2 text-sm font-bold text-white mb-4">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Join / Reserve Freight Pool Spot</span>
              </div>

              <form onSubmit={handlePoolBooking} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-mono">SELECT POOLING HUB:</label>
                  <select
                    value={selectedPoolId}
                    onChange={(e) => setSelectedPoolId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400 font-mono"
                  >
                    {kisanSabhaPools.map((p) => (
                      <option key={p.poolId} value={p.poolId}>
                        {p.hubName.split(' ')[0]} - {p.availableWeightKg}kg Space Left
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-mono">FARMER NAME / PRODUCER ID:</label>
                  <input
                    type="text"
                    value={poolFarmerName}
                    onChange={(e) => setPoolFarmerName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-mono">CROP TYPE:</label>
                  <input
                    type="text"
                    value={poolCrop}
                    onChange={(e) => setPoolCrop(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-mono">WEIGHT TO POOL (KG):</label>
                  <input
                    type="number"
                    min="20"
                    max="500"
                    value={poolWeightKg}
                    onChange={(e) => setPoolWeightKg(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                {/* Instant Cost Calculation */}
                <div className="p-3.5 rounded-xl bg-black/60 border border-amber-500/20 font-mono text-xs space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Pooled Transport Cost:</span>
                    <strong className="text-emerald-400">₹{Math.round(poolWeightKg * 1.65)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Individual Private Cost:</span>
                    <span className="line-through text-rose-400">₹{Math.round(poolWeightKg * 3.40)}</span>
                  </div>
                  <div className="flex justify-between text-amber-400 font-bold pt-1 border-t border-white/5">
                    <span>Net Freight Money Saved:</span>
                    <span>₹{Math.round(poolWeightKg * 1.75)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
                >
                  Confirm & Reserve Shared Slot
                </button>

                {poolStatusMessage && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{poolStatusMessage}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
