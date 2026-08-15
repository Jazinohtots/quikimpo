export interface ServiceItem {
  slug: string;
  icon: string;
  title: string;
  description: string;
  image: string;
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
    image: "https://picsum.photos/seed/quikimpo-air-freight/900/600",
    longDescription:
      "When a deal depends on cargo landing on time, air freight is the difference between winning and losing a customer. We move time-critical shipments through Jomo Kenyatta International Airport and partner hubs across China, the UAE, and Europe, with dedicated cargo agents who chase your airway bill the moment it's cut. What sets us apart is that we don't just book space and wait — we consolidate smaller shipments to cut cost, hold priority allocations with airlines during peak season, and pre-clear documentation before the aircraft even lands, so cargo isn't sitting idle at the bond. Our process runs from booking and export documentation, through customs pre-alert, to uplift and last-mile delivery to your door. For importers, it helps to know that most Nairobi-bound air cargo from China clears in 2–4 days transit, and that getting your commercial invoice and packing list right the first time is what actually saves you days at customs — not the flight itself.",
  },
  {
    slug: "sea-freight",
    icon: "🚢",
    title: "Sea Freight",
    description: "Full container load (FCL) and less than container load (LCL) ocean shipping on major East Africa trade lanes.",
    image: "https://picsum.photos/seed/quikimpo-sea-freight/900/600",
    longDescription:
      "Sea freight moves the bulk of East Africa's trade, and we run it the way high-volume importers need it run: predictably. Through direct relationships with shipping lines, we hold container allocation even in peak season when space on the China–Mombasa lane gets tight, and we run our own LCL consolidation service so small and medium businesses aren't forced to pay for a full container they don't need. Every booking is handled end-to-end — origin haulage, bill of lading, vessel booking, port handling at Mombasa, and inland delivery — with one team accountable for the whole route instead of passing you between agents. Worth knowing: FCL/LCL transit from China to Mombasa typically runs 24–30 days port to port, longer from August to November when global demand peaks, so we build buffer time into quotes rather than surprise clients with delays later.",
  },
  {
    slug: "land-freight",
    icon: "🚛",
    title: "Land Freight",
    description: "Cross-border road transport connecting Kenya, Uganda, Tanzania, and Rwanda with reliable transit times.",
    image: "https://picsum.photos/seed/quikimpo-land-freight/900/600",
    longDescription:
      "Regional road transport lives or dies on border efficiency, which is why we've built a vetted network of transporters and border clearing partners along the Northern and Central corridors linking Kenya, Uganda, Tanzania, Rwanda, and beyond. Unlike forwarders who simply hand cargo to whichever truck is available, we track every consignment with GPS and provide escorted transport for high-value or sensitive loads, so you always know where your goods are and when they'll arrive. The process runs from loading and export documentation in Kenya, through One-Stop Border Post processing at crossings like Malaba and Busia, to final delivery upcountry or across the border. It helps to know that border wait times — not distance — are usually the biggest driver of delay on these routes, which is why pre-clearing paperwork before the truck arrives at the post is one of the most valuable things a forwarder can do for you.",
  },
  {
    slug: "customs-clearance",
    icon: "📋",
    title: "Customs Clearance",
    description: "Documentation, duty calculation, and clearance handled with Kenyan and regional customs authorities.",
    image: "https://picsum.photos/seed/quikimpo-customs/900/600",
    longDescription:
      "Customs is where shipments quietly rack up demurrage charges, and it's the part of freight forwarding most businesses least understand. Our licensed clearing agents work daily inside KRA's iCMS and Simba systems, which means classification, duty computation, and declarations are handled by people who know the system's quirks — not a generic back-office team. We differentiate on speed of pre-alert: documents are prepared and submitted before the vessel or aircraft arrives, so clearance starts the moment cargo is available rather than after. The process covers HS code classification, import declaration forms (IDF), duty and tax computation, verification, and release, plus any required certificates like PVOC or Certificate of Conformity. A useful thing to know as an importer: getting the correct HS code and a compliant Certificate of Conformity sorted before shipping is what most often separates a same-week clearance from a multi-week storage bill.",
  },
  {
    slug: "warehousing",
    icon: "🏭",
    title: "Warehousing",
    description: "Secure short and long-term storage near key ports, with inventory management and cross-docking.",
    image: "https://picsum.photos/seed/quikimpo-warehousing/900/600",
    longDescription:
      "Storage isn't just a place to hold boxes — used well, it's a cash-flow tool. We operate both bonded and non-bonded warehousing near the port and airport, so importers can defer duty payment until goods are actually needed, rather than paying it all upfront the moment a container lands. Beyond storage, we run inventory management, cross-docking, and pick-and-pack support for businesses selling online or supplying multiple outlets, which most freight forwarders don't offer as a core service. Cargo arriving at our facility is logged, inspected, and shelved with a digital inventory record, and can move straight onto outbound transport without ever sitting in long-term storage if that's what the shipment needs. For growing importers, using bonded storage to release goods in smaller batches — rather than clearing an entire container at once — is a simple way to smooth out duty payments and working capital.",
  },
  {
    slug: "shipment-tracking",
    icon: "📦",
    title: "Shipment Tracking",
    description: "Real-time visibility into your cargo's status from booking to final delivery.",
    image: "https://picsum.photos/seed/quikimpo-tracking/900/600",
    longDescription:
      "Not knowing where your cargo is, or when it's actually arriving, is one of the most stressful parts of importing — so we treat visibility as a service in its own right, not an afterthought. Every shipment is logged against a tracking number the moment it's booked, with status updates as cargo moves through pickup, transit, port or airport handling, customs, and out-for-delivery, visible any time on our tracking page. What makes this different from a generic carrier tracking number is that our updates are tied to a real account manager who can explain what a status actually means for your delivery date, not just a timestamp with no context. The process is simple: book a shipment, receive your tracking number by email, and check progress whenever you need to, with proactive notice if a milestone — like customs clearance — is going to take longer than expected.",
  },
];
