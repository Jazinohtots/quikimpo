export interface ServiceItem {
  slug: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  detailImage: string;
  /** Longer, persuasive copy for the Services page: what it is, how QuikImpo
   * runs it differently, how the process works, and a useful piece of trade
   * knowledge for the reader. */
  longDescription: string;
}

// Matches templates/services.html and templates/home.html exactly.
export const services: ServiceItem[] = [
  {
    slug: "air-freight",
    icon: "✈️",
    title: "Air Freight",
    description: "Fast, time-critical air cargo to and from major hubs worldwide, with door-to-door or airport-to-airport options.",
    image: "/AirFr 1.png",
    detailImage: "/AirF 2.png",
    longDescription:
      "QuikImpo coordinates time-sensitive air cargo through a network of airlines, cargo handlers, clearing agents, and logistics partners connecting Kenya with China, the UAE, Europe, and other international markets. Our network allows us to coordinate shipments through different airports and cargo hubs rather than relying on a single gateway, giving businesses greater flexibility when planning international air freight.\n\nWe handle the key stages of the shipment, including booking, export documentation, cargo handling, customs clearance, arrival processing, and onward transportation. Where suitable, smaller shipments can be consolidated to help manage freight costs, while early preparation of documentation can help reduce avoidable delays when cargo arrives.\n\nOur team remains involved throughout the shipment rather than simply making a booking and leaving the rest to different providers. Commercial invoices, packing lists, airway bills, and other required documents are reviewed and coordinated according to the shipment requirements, helping keep the cargo moving through the relevant stages.\n\nWhether you are importing commercial goods, exporting products, or moving time-sensitive cargo, QuikImpo combines international air freight connections with local customs and logistics coordination to provide greater visibility, practical solutions, and dependable support from origin to final delivery.",
  },
  {
    slug: "sea-freight",
    icon: "🚢",
    title: "Sea Freight",
    description: "Full container load (FCL) and less than container load (LCL) ocean shipping on major East Africa trade lanes.",
    image: "/Sea F 1 .jpeg",
    detailImage: "/Sea F 2 .jpeg",
    longDescription:
      "QuikImpo coordinates FCL and LCL sea freight through shipping lines, freight partners, consolidation networks, clearing agents, and inland transportation providers connecting international origins with Kenya and the wider East African market.\n\nFor larger shipments, Full Container Load (FCL) solutions provide dedicated container capacity, while Less than Container Load (LCL) consolidation gives businesses with smaller volumes an alternative to paying for an entire container. Our team helps determine the appropriate option based on cargo volume, destination, timing, and shipment requirements.\n\nWe coordinate the shipment journey from origin collection and cargo consolidation through export documentation, vessel booking, shipping documentation, port handling, customs clearance, and inland delivery. Instead of leaving clients to coordinate different providers independently, QuikImpo stays involved across the important stages and provides updates as the shipment progresses.\n\nTransit times can change depending on the origin, shipping line, route, transshipment, port conditions, and seasonal demand. We therefore focus on realistic planning and clear communication so businesses can make better decisions around inventory, delivery schedules, and downstream operations.\n\nWhether you are importing a single shipment or managing regular commercial cargo, QuikImpo connects international ocean freight with customs, warehousing, and inland logistics to create a more coordinated supply chain.",
  },
  {
    slug: "land-freight",
    icon: "🚛",
    title: "Road Freight",
    description: "Cross-border road transport connecting Kenya, Uganda, Tanzania, and Rwanda with reliable transit times.",
    image: "/Road F 1.png",
    detailImage: "/Road F 2.png",
    longDescription:
      "QuikImpo coordinates road transportation, inland freight, and cross-border cargo movement through a network of transporters, clearing agents, and logistics partners serving Kenya, Uganda, Tanzania, Rwanda, and the wider East African region.\n\nOur network supports cargo moving between major cities, from ports and airports to final destinations, and across international borders. We coordinate cargo collection, loading, transport documentation, customs and border clearance, border processing, and final delivery through the relevant logistics partners.\n\nRather than simply assigning cargo to a truck and leaving the rest to the transporter, our team coordinates the different parties involved in the shipment and keeps clients informed about important stages of the journey. Where tracking and specialized transportation services are available, additional visibility and handling requirements can be arranged for suitable cargo.\n\nFor cross-border shipments, proper documentation and advance clearance preparation can make a significant difference to delivery times. Customs requirements, inspections, incomplete paperwork, and congestion at border points can all affect the movement of cargo. QuikImpo works with the relevant clearing and logistics partners to prepare the required documentation and coordinate border processes before the shipment reaches the next stage.\n\nFrom Kenya–Uganda and Kenya–Tanzania routes to wider East African destinations, we provide a connected road freight solution that brings transportation, customs, and final delivery together.",
  },
  {
    slug: "customs-clearance",
    icon: "📋",
    title: "Customs Clearance",
    description: "Documentation, duty calculation, and clearance handled with Kenyan and regional customs authorities.",
    image: "/Customs 1.png",
    detailImage: "/Customs 2.png",
    longDescription:
      "QuikImpo coordinates customs clearance and import documentation through experienced clearing professionals and logistics partners familiar with Kenya's customs and regulatory requirements.\n\nOur process can cover HS code classification, customs declarations, import documentation, duty and tax assessment, verification, regulatory compliance, and cargo release, depending on the shipment. Where applicable, we also coordinate requirements such as Pre-Export Verification of Conformity (PVoC), Certificates of Conformity (CoC), and other shipment-specific certificates through the relevant parties.\n\nWe focus on preparing documentation and identifying clearance requirements as early as possible rather than waiting until cargo has arrived before addressing potential issues. This can help reduce avoidable queries, documentation problems, and delays when cargo becomes available for clearance.\n\nCorrect HS classification, commercial invoices, packing lists, conformity certificates, and other required documents can have a significant impact on the customs process. Requirements vary according to the type of goods, origin, destination, and applicable regulations, which is why early preparation and proper coordination matter.\n\nBy connecting customs clearance with air freight, sea freight, road transportation, and warehousing, QuikImpo helps businesses manage the different stages surrounding their cargo while keeping the clearance process organized and transparent.",
  },
  {
    slug: "warehousing",
    icon: "🏭",
    title: "Warehousing",
    description: "Secure short and long-term storage near key ports, with inventory management and cross-docking.",
    image: "/Warehouse 1.png",
    detailImage: "/Warehouse 2.png",
    longDescription:
      "QuikImpo coordinates bonded and non-bonded warehousing, cargo storage, inventory management, consolidation, cross-docking, pick-and-pack, and distribution support through its logistics network, depending on the requirements of each shipment.\n\nOur warehousing solutions give importers and growing businesses greater flexibility in how and when inventory moves. Cargo can be received, documented, organized, stored, consolidated, and prepared for onward transportation according to the requirements of the business.\n\nWhere bonded warehousing is applicable, eligible goods can remain under customs control until they are released according to the relevant customs requirements. This can give businesses additional flexibility when managing imported inventory and coordinating the movement of goods into the market.\n\nFor companies supplying multiple locations, combining warehousing with transportation can simplify inventory movement and reduce unnecessary handling. Where available, inventory coordination and digital records can also provide better visibility of stock as goods move through the warehouse.\n\nRather than treating storage as an isolated service, QuikImpo connects warehousing with freight forwarding, customs clearance, inland transportation, and distribution. This gives businesses one coordinated logistics network for managing cargo from arrival through storage and onward delivery.",
  },
  {
    slug: "shipment-tracking",
    icon: "📦",
    title: "Shipment Tracking",
    description: "Real-time visibility into your cargo's status from booking to final delivery.",
    image: "/Tracking 1.png",
    detailImage: "/Tracking 2.png",
    longDescription:
      "QuikImpo gives clients greater visibility of their cargo through shipment tracking updates covering important stages of the logistics journey, including cargo collection, departure, transit, arrival, port or airport handling, customs clearance, and final delivery, depending on the shipment and available tracking information.\n\nOnce a tracking reference is available, clients can use the online shipment tracking service to check the progress of their cargo without having to rely entirely on phone calls or emails for basic shipment updates.\n\nOur difference is the human support behind the tracking information. A generic carrier status may tell you that cargo is in transit or awaiting clearance, but our team can help explain what the status means, what stage comes next, and whether there are documentation, customs, or transportation issues that may affect delivery.\n\nThe process is straightforward: your shipment is booked, a tracking reference is provided when available, and you can use the tracking page to follow its progress. Where a shipment requires additional attention, our logistics team remains available to provide context and coordinate with the relevant freight, customs, and transportation partners.\n\nBy combining digital shipment visibility with hands-on logistics coordination, QuikImpo gives importers and exporters a clearer view of their cargo while it is moving through the supply chain.",
  },
];
