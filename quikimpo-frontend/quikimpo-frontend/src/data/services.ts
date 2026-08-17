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
      "When a deal depends on cargo arriving on time, air freight can make the difference between keeping a customer and losing an opportunity. QuikImpo helps businesses move time-sensitive shipments through a broad network of airports, cargo hubs, airlines, and logistics partners connecting Kenya with China, the UAE, Europe, and other international markets. Our established relationships with clearing agents, cargo handlers, and logistics partners allow us to coordinate air cargo beyond a single gateway, giving our clients greater flexibility when choosing routes and managing shipments across different destinations.\n\nWhat sets our approach apart is that we do more than book space and wait. Where suitable, we consolidate smaller shipments to help manage costs, work with our network to secure appropriate cargo capacity during busy periods, and prepare shipment documentation in advance to reduce avoidable delays. Our team coordinates the journey from booking and export documentation through customs clearance, cargo handling, arrival processing, and last-mile delivery, while keeping clients informed at the important stages. For importers and exporters, accurate documentation is just as important as choosing the right flight; getting commercial invoices, packing lists, and other required documents right from the beginning can help prevent unnecessary customs delays and keep cargo moving toward its final destination.",
  },
  {
    slug: "sea-freight",
    icon: "🚢",
    title: "Sea Freight",
    description: "Full container load (FCL) and less than container load (LCL) ocean shipping on major East Africa trade lanes.",
    image: "/Sea F 1 .jpeg",
    detailImage: "/Sea F 2 .jpeg",
    longDescription:
      "Sea freight is the backbone of much of East Africa's international trade, particularly for businesses moving larger volumes of goods across long-distance routes. At QuikImpo, we help businesses move cargo through established shipping lines, freight partners, consolidation networks, and logistics providers connecting international origins with Kenya and the wider East African market. Whether you need a full container or are looking for a more cost-effective option for a smaller shipment, our network allows us to coordinate the right solution around your cargo, destination, and requirements.\n\nWhat sets our approach apart is that we don't simply arrange a vessel booking and leave you to coordinate the rest. Our team stays involved across the shipment journey, coordinating origin collection, cargo consolidation where applicable, shipping documentation, vessel booking, port handling, customs clearance, and inland transportation through our network of trusted partners. For businesses importing from major global markets, understanding the difference between FCL (Full Container Load) and LCL (Less than Container Load) can make a significant difference to overall freight costs and planning. Transit times also vary depending on the origin, shipping line, route, port conditions, and season, which is why we focus on setting realistic expectations and keeping clients informed rather than promising a timeline that the supply chain cannot guarantee.",
  },
  {
    slug: "land-freight",
    icon: "🚛",
    title: "Road Freight",
    description: "Cross-border road transport connecting Kenya, Uganda, Tanzania, and Rwanda with reliable transit times.",
    image: "/Road F 1.png",
    detailImage: "/Road F 2.png",
    longDescription:
      "Regional road freight is essential to keeping trade moving across East Africa, but the success of a shipment often depends on more than the distance between two destinations. At QuikImpo, we coordinate cross-border road transportation and inland freight through a network of trusted transporters, clearing agents, and logistics partners serving routes across Kenya, Uganda, Tanzania, Rwanda, and the wider East African region. This network gives businesses greater flexibility when moving commercial cargo, whether it is travelling across the border, between major cities, or from a port or airport to its final destination.\n\nWhat sets our approach apart is the level of coordination behind every shipment. Rather than simply assigning cargo to a truck and leaving the rest to the transporter, our team works with the relevant logistics and clearing partners to coordinate loading, transport documentation, customs and border clearance, border processing, and final delivery. Where tracking and specialized handling are available for a shipment, we can also coordinate visibility and additional transport requirements for sensitive or high-value cargo. For cross-border freight, delays often occur at border points when documentation or clearance requirements have not been properly prepared in advance. That is why we focus on getting the necessary paperwork and logistics arrangements in place before the truck reaches the border, helping reduce avoidable delays and keep your cargo moving toward its destination.",
  },
  {
    slug: "customs-clearance",
    icon: "📋",
    title: "Customs Clearance",
    description: "Documentation, duty calculation, and clearance handled with Kenyan and regional customs authorities.",
    image: "/Customs 1.png",
    detailImage: "/Customs 2.png",
    longDescription:
      "Customs clearance is one of the most important stages in the freight-forwarding process, and delays here can quickly turn into additional storage, demurrage, and other unexpected costs. At QuikImpo, we coordinate customs clearance through experienced clearing professionals and logistics partners who understand Kenya's import and export requirements and the documentation involved in moving commercial cargo. Our approach focuses on getting the right information and paperwork prepared as early as possible so that the clearance process can begin promptly when the shipment becomes available.\n\nOur customs clearance process can include HS code classification, import documentation, duty and tax assessment, customs declarations, verification, regulatory compliance, and cargo release, depending on the nature and destination of the shipment. Where applicable, we also help coordinate documentation and regulatory requirements such as Pre-Export Verification of Conformity (PVoC), Certificates of Conformity (CoC), and other shipment-specific certificates through the relevant parties. Rather than treating customs as something that starts when cargo reaches the port or airport, we work to identify documentation and compliance requirements earlier in the shipment journey. For importers, getting the correct HS classification, commercial documentation, and required conformity certificates prepared before arrival can help prevent avoidable queries, delays, and storage costs. Our goal is to make customs clearance more predictable while keeping clients informed throughout the process.",
  },
  {
    slug: "warehousing",
    icon: "🏭",
    title: "Warehousing",
    description: "Secure short and long-term storage near key ports, with inventory management and cross-docking.",
    image: "/Warehouse 1.png",
    detailImage: "/Warehouse 2.png",
    longDescription:
      "Warehousing is more than a place to hold cargo—it can be an important part of managing inventory, cash flow, and the movement of goods through your supply chain. QuikImpo helps businesses coordinate warehousing and cargo storage solutions for imported and locally distributed goods, providing flexible options for businesses that need to store, organize, consolidate, or move inventory efficiently. Whether cargo needs temporary storage after arrival or requires coordinated distribution to multiple destinations, our logistics network helps connect storage with the next stage of transportation.\n\nOur warehousing approach can include bonded and non-bonded storage, inventory coordination, cargo consolidation, cross-docking, and pick-and-pack support, depending on the requirements of the shipment and available facility services. Cargo can be received, documented, organized, and prepared for onward transportation through the relevant warehouse and logistics partners, reducing unnecessary handling and helping businesses maintain better visibility of their stock. For importers, bonded warehousing can also provide a useful option where applicable, allowing eligible goods to remain under customs control until they are released according to the applicable requirements. By combining warehousing with freight forwarding, customs coordination, and inland transportation, QuikImpo helps businesses turn storage from a passive holding point into a more connected part of their supply chain.",
  },
  {
    slug: "shipment-tracking",
    icon: "📦",
    title: "Shipment Tracking",
    description: "Real-time visibility into your cargo's status from booking to final delivery.",
    image: "/Tracking 1.png",
    detailImage: "/Tracking 2.png",
    longDescription:
      "Not knowing where your cargo is or when it is expected to arrive can be one of the most frustrating parts of importing and exporting. At QuikImpo, we treat shipment tracking and cargo visibility as an essential part of freight forwarding, not an afterthought. Our tracking process gives clients a central way to follow important shipment milestones, from pickup and departure through transit, port or airport handling, customs clearance, and final delivery. By bringing shipment information together in one place, we help businesses stay informed and make better decisions while their cargo is in transit.\n\nWhat makes our approach different is that tracking is supported by real people who understand the shipment behind the tracking number. Instead of relying solely on a generic carrier status, clients can get context about what a particular milestone means for their shipment and what may happen next. Depending on the shipment and available tracking information, updates can cover key stages such as cargo collection, departure, arrival, customs processing, and out-for-delivery. The process is simple: once your shipment is booked and a tracking reference is available, you can use our online shipment tracking service to check its progress, while our team remains available to help explain delays, documentation requirements, or changes that may affect delivery.",
  },
];
