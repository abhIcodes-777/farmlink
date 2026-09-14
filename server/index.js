import express from 'express';
import cors from 'cors';
import {
  MANDI_PRICES,
  INITIAL_LISTINGS,
  ADANI_LOGISTICS_NETWORK,
  KISAN_SABHA_NETWORK,
  ACTIVE_AUCTIONS,
  DEMAND_FORECASTS,
  INITIAL_ESCROW_ORDERS,
  FARMER_CREDIT_PROFILES
} from './data/mockData.js';
import { solveVRP } from './algorithms/vrpSolver.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// In-memory state
let listings = [...INITIAL_LISTINGS];
let auctions = [...ACTIVE_AUCTIONS];
let escrowOrders = [...INITIAL_ESCROW_ORDERS];
let kisanSabhaPools = JSON.parse(JSON.stringify(KISAN_SABHA_NETWORK.activePoolGroups));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    version: 'Astra-6.4',
    protocol: 'FARMLINK Agri-Disintermediation Engine',
    timestamp: new Date().toISOString()
  });
});

// 1. Mandi Prices Benchmark
app.get('/api/mandi-prices', (req, res) => {
  res.json({
    success: true,
    data: MANDI_PRICES,
    summary: {
      averagePlatformFarmerGain: "+32.8%",
      averageConsumerSaving: "-24.6%",
      activeTrackedMandis: 420
    }
  });
});

// 2. Marketplace Listings
app.get('/api/marketplace/listings', (req, res) => {
  const { category, mode } = req.query;
  let filtered = [...listings];
  if (category && category !== 'All') {
    filtered = filtered.filter(l => l.category.toLowerCase() === category.toLowerCase());
  }
  if (mode === 'bulk') {
    filtered = filtered.filter(l => l.bulkPricePerKg);
  }
  res.json({ success: true, count: filtered.length, data: filtered });
});

app.post('/api/marketplace/listings', (req, res) => {
  const newListing = {
    id: `FL-LST-${Math.floor(100 + Math.random() * 900)}`,
    farmerType: "Verified Farmer",
    distanceKm: Math.round(10 + Math.random() * 40),
    mandiBenchmarkPrice: 20.0,
    traceabilityHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
    soilReport: "Verified NPK Balanced, 0.0ppm pesticide residue",
    cvGradingScore: 94.5,
    biddingAllowed: req.body.biddingAllowed || false,
    standingOrderEligible: true,
    imageUrl: req.body.imageUrl || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    ...req.body
  };
  listings.unshift(newListing);
  res.status(201).json({ success: true, message: "Listing published to Farmlink Network", data: newListing });
});

// 3. Live Bidding Room
app.get('/api/bidding/active', (req, res) => {
  res.json({ success: true, data: auctions });
});

app.post('/api/bidding/place-bid', (req, res) => {
  const { auctionId, bidderName, bidPerKg } = req.body;
  const auction = auctions.find(a => a.auctionId === auctionId);
  if (!auction) {
    return res.status(404).json({ success: false, message: "Auction lot not found" });
  }
  if (bidPerKg <= auction.currentHighestBidPerKg) {
    return res.status(400).json({ success: false, message: `Bid must be higher than current highest bid of ₹${auction.currentHighestBidPerKg}/kg` });
  }

  auction.currentHighestBidPerKg = Number(bidPerKg);
  auction.leadingBidder = bidderName || "Anonymous Institutional Buyer";
  auction.totalBidsPlaced += 1;
  auction.bidsHistory.unshift({
    bidder: auction.leadingBidder,
    bidPerKg: Number(bidPerKg),
    time: "Just now"
  });

  res.json({ success: true, message: "Bid accepted!", data: auction });
});

// 4. AI Demand Forecasting & Dynamic Pricing Signals
app.get('/api/ai/forecast', (req, res) => {
  const { crop = 'tomato' } = req.query;
  const data = DEMAND_FORECASTS.crops[crop.toLowerCase()] || DEMAND_FORECASTS.crops.tomato;
  res.json({ success: true, cropKey: crop, data });
});

// 5. Computer Vision Produce Quality Grading Assist
app.post('/api/ai/grade', (req, res) => {
  const { cropType = "tomato", sampleQuality = "high" } = req.body;

  let grade = "Grade A+ (Export Quality)";
  let score = 96.8;
  let defectPct = 1.2;
  let colorUniformity = "98.5% Deep Crimson (Optimal Lycopene)";
  let recommendedPricePremium = "+22%";
  let shelfLifeDays = 9;

  if (sampleQuality === 'medium') {
    grade = "Grade B (Domestic Wholesale)";
    score = 84.2;
    defectPct = 6.8;
    colorUniformity = "88.0% Slight Green Shoulders";
    recommendedPricePremium = "+6%";
    shelfLifeDays = 6;
  } else if (sampleQuality === 'low') {
    grade = "Grade C (Food Processing / Puree)";
    score = 72.0;
    defectPct = 16.4;
    colorUniformity = "75.0% Irregular";
    recommendedPricePremium = "-12%";
    shelfLifeDays = 3;
  }

  res.json({
    success: true,
    inspectionId: `AI-CV-${Math.floor(10000 + Math.random() * 90000)}`,
    cropType,
    grade,
    score,
    defectPct,
    colorUniformity,
    diameterUniformity: "58mm ± 3mm standard sphericity",
    pesticideResidueRisk: "Undetectable (<0.01 ppb)",
    recommendedPriceBand: {
      minPerKg: Math.round((cropType === 'apple' ? 95 : 24) * (score / 100)),
      maxPerKg: Math.round((cropType === 'apple' ? 120 : 30) * (score / 100)),
      recommendedPerKg: Math.round((cropType === 'apple' ? 110 : 27) * (score / 100))
    },
    suggestedMarketAction: score > 90
      ? "Certify for Metro Premium Retail & Export B2B"
      : score > 80
      ? "Direct to Local Restaurant & Wholesale Lots"
      : "Immediate divert to Ketchup/Puree Food Processor via Farmlink Direct Dispatch"
  });
});

// 6. Logistics Hub: Adani Agri Logistics & Kisan Sabha Integration
app.get('/api/logistics/network', (req, res) => {
  res.json({
    success: true,
    adaniNetwork: ADANI_LOGISTICS_NETWORK,
    kisanSabhaSummary: {
      description: KISAN_SABHA_NETWORK.description,
      enrolledVehicles: KISAN_SABHA_NETWORK.totalRuralVehiclesEnrolled,
      activePools: kisanSabhaPools
    }
  });
});

app.post('/api/logistics/kisan-sabha/join-pool', (req, res) => {
  const { poolId, farmerName, crop, weightKg } = req.body;
  const pool = kisanSabhaPools.find(p => p.poolId === poolId);
  if (!pool) {
    return res.status(404).json({ success: false, message: "Pool not found" });
  }
  const weight = Number(weightKg);
  if (weight > pool.availableWeightKg) {
    return res.status(400).json({ success: false, message: `Exceeds available capacity of ${pool.availableWeightKg} kg` });
  }

  const costShared = Math.round(weight * pool.costPerKgPooledRs);
  pool.bookedWeightKg += weight;
  pool.availableWeightKg -= weight;
  pool.farmersPooled.push({
    name: farmerName || "New Farmer Member",
    crop: crop || "Fresh Harvest",
    weightKg: weight,
    costSharedRs: costShared
  });

  res.json({
    success: true,
    message: `Freight pool spot booked! You saved ₹${Math.round(weight * (pool.costPerKgIndividualRs - pool.costPerKgPooledRs))} compared to hiring a private vehicle.`,
    updatedPool: pool
  });
});

// 7. Dynamic VRP Route Optimization
app.post('/api/logistics/vrp-solve', (req, res) => {
  const {
    cluster = "nashik",
    depot = { name: "Nashik Central Agri Hub", lat: 19.9975, lng: 73.7898 },
    pickups = [
      { name: "Patil Farm Gate (Dindori)", lat: 20.1983, lng: 73.8428, demandKg: 2500, crop: "Tomatoes" },
      { name: "Godavari FPO Cluster (Niphad)", lat: 20.0768, lng: 74.1102, demandKg: 4000, crop: "Onions" },
      { name: "Shinde Organic Plot (Sinnar)", lat: 19.8456, lng: 73.9922, demandKg: 1800, crop: "Capsicum" },
      { name: "Kisan Sabha PACS Aggregation Point (Peth)", lat: 20.2541, lng: 73.5042, demandKg: 2200, crop: "Green Peas" }
    ],
    deliveries = [
      { name: "Bistro Greens Cold Hub (Thane)", lat: 19.2183, lng: 72.9781, dropKg: 3500 },
      { name: "Reliance Fresh Metro DC (Navi Mumbai)", lat: 19.0330, lng: 73.0297, dropKg: 4500 },
      { name: "Farmlink Farm-to-Door Dispatch (Bandra)", lat: 19.0596, lng: 72.8295, dropKg: 2500 }
    ]
  } = req.body;

  const result = solveVRP(depot, pickups, deliveries);
  res.json(result);
});

// 8. Escrow Vault & Financial Trust Layer
app.get('/api/escrow/orders', (req, res) => {
  res.json({ success: true, data: escrowOrders });
});

app.post('/api/escrow/create', (req, res) => {
  const { buyerName, crop, totalAmountRs, farmerName, farmerUpi } = req.body;
  const newOrder = {
    orderId: `FL-ESC-${Math.floor(8000 + Math.random() * 1000)}`,
    buyerName: buyerName || "Institutional Buyer",
    buyerType: "Smart Contract Escrow",
    farmerName: farmerName || "Rajeshwar Patil",
    crop: crop || "Farm Fresh Produce",
    totalAmountRs: Number(totalAmountRs) || 5000,
    escrowStatus: "HELD_IN_ESCROW",
    timeline: [
      { step: "Order & Buyer Funds Escrowed", timestamp: "Just now", completed: true },
      { step: "Dispatched in Cold Reefer", timestamp: "Pending Dispatch", completed: false },
      { step: "Arrival & Optical Quality Scan (OTP)", timestamp: "Pending Delivery", completed: false },
      { step: "Instant UPI Payout to Farmer", timestamp: "Auto-trigger on OTP", completed: false }
    ],
    farmerUpi: farmerUpi || "rajeshwar.patil@okhdfcbank",
    transportProvider: "Adani Agri Logistics & Kisan Sabha Network",
    deliveryOtp: `${Math.floor(1000 + Math.random() * 9000)}`,
    qualityCheckPassed: true
  };
  escrowOrders.unshift(newOrder);
  res.status(201).json({ success: true, data: newOrder });
});

app.post('/api/escrow/release', (req, res) => {
  const { orderId, otp } = req.body;
  const order = escrowOrders.find(o => o.orderId === orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: "Escrow order not found" });
  }

  if (otp && order.deliveryOtp && otp !== order.deliveryOtp) {
    return res.status(400).json({ success: false, message: "Invalid Delivery OTP code. Verification failed." });
  }

  order.escrowStatus = "RELEASED_TO_FARMER";
  order.timeline = [
    { step: "Order & Buyer Funds Escrowed", timestamp: "Completed", completed: true },
    { step: "Dispatched in Adani Cold Reefer", timestamp: "Completed", completed: true },
    { step: "Arrival & Optical Quality Scan (OTP)", timestamp: "Verified & Approved", completed: true },
    { step: `Instant UPI Payout to Farmer (₹${order.totalAmountRs.toLocaleString('en-IN')})`, timestamp: "Settled within 42 seconds to " + order.farmerUpi, completed: true }
  ];

  res.json({
    success: true,
    message: `Escrow Released! ₹${order.totalAmountRs.toLocaleString('en-IN')} instantly transferred to farmer's UPI account (${order.farmerUpi}) without intermediary commissions.`,
    order
  });
});

// 9. Agri-Credit Passport
app.get('/api/credit-profile/:farmerId', (req, res) => {
  const profile = FARMER_CREDIT_PROFILES["rajeshwar-patil"];
  res.json({ success: true, data: profile });
});

app.listen(PORT, () => {
  console.log(`[FARMLINK Backend] Astra-6 Server running on http://localhost:${PORT}`);
});
