import { Order, Alert, ProductionLine } from "../types";

export const initialOrders: Order[] = [
  {
    orderId: "ORD-001",
    buyerName: "Acme Corp",
    garmentType: "jersey",
    stage: "pattern",
    totalValue: 150000,
    unitVolume: 5000,
    timestamp: "2 hours ago"
  },
  {
    orderId: "ORD-002",
    buyerName: "Globex Industries",
    garmentType: "hoodie",
    stage: "fabric",
    totalValue: 120000,
    unitVolume: 3500,
    timestamp: "5 hours ago"
  },
  {
    orderId: "ORD-003",
    buyerName: "Initech Apparel",
    garmentType: "jersey",
    stage: "logo",
    totalValue: 90000,
    unitVolume: 2800,
    timestamp: "1 day ago"
  },
  {
    orderId: "ORD-004",
    buyerName: "Umbrella Logistics",
    garmentType: "hoodie",
    stage: "stitch",
    totalValue: 45000,
    unitVolume: 1500,
    timestamp: "2 days ago"
  },
  {
    orderId: "ORD-005",
    buyerName: "Hooli Wearables",
    garmentType: "jersey",
    stage: "shipped",
    totalValue: 180000,
    unitVolume: 6000,
    timestamp: "3 days ago"
  },
  {
    orderId: "ORD-006",
    buyerName: "Wayne Enterprise",
    garmentType: "hoodie",
    stage: "pattern",
    totalValue: 240000,
    unitVolume: 8000,
    timestamp: "12 mins ago"
  },
  {
    orderId: "ORD-007",
    buyerName: "Stark Industries",
    garmentType: "jersey",
    stage: "shipped",
    totalValue: 310000,
    unitVolume: 9500,
    timestamp: "4 hours ago"
  }
];

export const initialAlerts: Alert[] = [
  {
    alertId: "ALT-001",
    severity: "critical",
    message: "Follow up with acme corp - sourcing hold",
    timeElapsed: "Last touch 2 day ago"
  },
  {
    alertId: "ALT-002",
    severity: "warning",
    message: "Opportunity open rates below threshold",
    timeElapsed: "For campaign X update line"
  },
  {
    alertId: "ALT-003",
    severity: "info",
    message: "On track add improved templates",
    timeElapsed: "Improved email 2 active"
  }
];

export const initialLines: ProductionLine[] = [
  {
    lineId: "LN-001",
    lineLabel: "Pattern Design",
    efficiency: 85
  },
  {
    lineId: "LN-002",
    lineLabel: "Fabric Sourcing",
    efficiency: 76
  },
  {
    lineId: "LN-003",
    lineLabel: "Assembly Stitching",
    efficiency: 84
  }
];
