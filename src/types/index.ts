export interface Order {
  orderId: string;
  buyerName: string;
  garmentType: "jersey" | "hoodie";
  stage: "pattern" | "fabric" | "logo" | "stitch" | "shipped";
  totalValue: number;
  unitVolume: number;
  timestamp: string;
}

export interface Alert {
  alertId: string;
  severity: "info" | "warning" | "critical";
  message: string;
  timeElapsed: string;
}

export interface ProductionLine {
  lineId: string;
  lineLabel: string;
  efficiency: number;
}
