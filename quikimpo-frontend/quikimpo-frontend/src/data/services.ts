export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

// Matches templates/services.html and templates/home.html exactly.
export const services: ServiceItem[] = [
  {
    icon: "✈️",
    title: "Air Freight",
    description: "Fast, time-critical air cargo to and from major hubs worldwide, with door-to-door or airport-to-airport options.",
  },
  {
    icon: "🚢",
    title: "Sea Freight",
    description: "Full container load (FCL) and less than container load (LCL) ocean shipping on major East Africa trade lanes.",
  },
  {
    icon: "🚛",
    title: "Land Freight",
    description: "Cross-border road transport connecting Kenya, Uganda, Tanzania, and Rwanda with reliable transit times.",
  },
  {
    icon: "📋",
    title: "Customs Clearance",
    description: "Documentation, duty calculation, and clearance handled with Kenyan and regional customs authorities.",
  },
  {
    icon: "🏭",
    title: "Warehousing",
    description: "Secure short and long-term storage near key ports, with inventory management and cross-docking.",
  },
  {
    icon: "📦",
    title: "Shipment Tracking",
    description: "Real-time visibility into your cargo's status from booking to final delivery.",
  },
];
