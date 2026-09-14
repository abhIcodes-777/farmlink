export interface MandiPrice {
  crop: string;
  category: string;
  mandi: string;
  mandiPricePerKg: number;
  platformAvgPrice: number;
  farmerAskingPriceAvg: number;
  retailMarketPrice: number;
  trend: string;
  dailyArrivalQuintals: number;
  unit: string;
  lastUpdated: string;
}

export interface CropListing {
  id: string;
  cropName: string;
  category: string;
  farmerName: string;
  farmerType: string;
  location: string;
  distanceKm: number;
  quantityAvailableKg: number;
  minOrderRetailKg: number;
  retailPricePerKg: number;
  bulkPricePerKg: number;
  bulkMinOrderKg: number;
  mandiBenchmarkPrice: number;
  harvestDate: string;
  expectedShelfLifeDays: number;
  grade: string;
  organicCertified: boolean;
  cvGradingScore: number;
  biddingAllowed: boolean;
  standingOrderEligible: boolean;
  soilReport: string;
  traceabilityHash: string;
  imageUrl: string;
  description: string;
}

export interface AuctionBid {
  bidder: string;
  bidPerKg: number;
  time: string;
}

export interface AuctionLot {
  auctionId: string;
  crop: string;
  lotSizeKg: number;
  farmer: string;
  harvestTiming: string;
  reservePricePerKg: number;
  currentHighestBidPerKg: number;
  leadingBidder: string;
  totalBidsPlaced: number;
  endsInSeconds: number;
  bidsHistory: AuctionBid[];
}

export interface AdaniSilo {
  id: string;
  name: string;
  state: string;
  coordinates: { lat: number; lng: number };
  totalSilos: number;
  capacityMT: number;
  currentUtilizationPct: number;
  automationLevel: string;
  ambientTempC: number;
  internalSiloTempC: number;
  internalHumidityPct: number;
  nitrogenPurged: boolean;
  railSidingConnected: boolean;
  commodities: string[];
}

export interface ActiveReefer {
  vehicleId: string;
  model: string;
  driverName: string;
  contact: string;
  currentLocation: string;
  origin: string;
  destination: string;
  status: string;
  setpointTempC: number;
  currentTempC: number;
  doorStatus: string;
  gpsCoords: { lat: number; lng: number };
  speedKmph: number;
  cargo: string;
  etaMins: number;
  spoilingRiskPct: number;
}

export interface FarmerPooled {
  name: string;
  crop: string;
  weightKg: number;
  costSharedRs: number;
}

export interface KisanSabhaPool {
  poolId: string;
  hubName: string;
  vehicleType: string;
  operatorName: string;
  contact: string;
  departureTime: string;
  totalCapacityKg: number;
  bookedWeightKg: number;
  availableWeightKg: number;
  farmersPooled: FarmerPooled[];
  destinationHub: string;
  costPerKgIndividualRs: number;
  costPerKgPooledRs: number;
  savingsPercent: number;
}

export interface VRPWaypoint {
  name: string;
  lat: number;
  lng: number;
  type: string;
  action?: string;
  demandKg?: number;
  dropKg?: number;
  crop?: string;
  cumulativeDistanceKm?: number;
  currentLoadKg?: number;
  remainingLoadKg?: number;
}

export interface VRPSolution {
  success: boolean;
  totalDistanceKm: number;
  unoptimizedDistanceKm: number;
  distanceSavedPercent: number;
  estimatedTransitTimeMins: number;
  fuelSavedLiters: number;
  co2AvoidedKg: number;
  estimatedSpoilageRatePct: number;
  traditionalSpoilageRatePct: number;
  optimizedWaypoints: VRPWaypoint[];
}

export interface EscrowOrder {
  orderId: string;
  buyerName: string;
  buyerType: string;
  farmerName: string;
  crop: string;
  totalAmountRs: number;
  escrowStatus: "HELD_IN_ESCROW" | "IN_TRANSIT_QUALITY_LOCKED" | "RELEASED_TO_FARMER";
  timeline: { step: string; timestamp: string; completed: boolean }[];
  farmerUpi: string;
  transportProvider: string;
  deliveryOtp: string;
  qualityCheckPassed: boolean;
}

export interface FarmerCreditProfile {
  farmerId: string;
  name: string;
  creditScore: number;
  rating: string;
  totalFulfillments: number;
  onTimeDeliveryRate: string;
  qualityConsistencyScore: string;
  cumulativeTurnoverRs: number;
  escrowDisputeRate: string;
  eligibleCreditLimitRs: number;
  preApprovedLoanPartners: { bank: string; interestRate: string; type: string }[];
  cropInsuranceCoverage: string;
}
