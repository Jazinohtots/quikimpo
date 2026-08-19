export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  review: string;
  rating: number; // 1-5 stars
  initials: string;
}

/**
 * DEMO TESTIMONIALS
 * 
 * These are placeholder testimonials for development purposes.
 * They should be replaced with verified customer feedback before production launch.
 * Do not present these as verified customer reviews or imply these are actual QuikImpo customers.
 */
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "James Mwangi",
    role: "Import Business Owner",
    location: "Nairobi, Kenya",
    review:
      "QuikImpo made the entire shipping process much easier for us. Their communication was clear, and we always knew what was happening with our cargo.",
    rating: 5,
    initials: "JM",
  },
  {
    id: "testimonial-2",
    name: "Sarah Okonkwo",
    role: "Procurement Manager",
    location: "Lagos, Nigeria",
    review:
      "The service was good overall, though there were some delays during the customs process. The team was helpful when we reached out with concerns.",
    rating: 3,
    initials: "SO",
  },
  {
    id: "testimonial-3",
    name: "David Chen",
    role: "International Supplier",
    location: "Shanghai, China",
    review:
      "Working with QuikImpo gave us confidence shipping into Kenya. They handled the coordination on the ground and kept the process organized from origin to delivery.",
    rating: 5,
    initials: "DC",
  },
  {
    id: "testimonial-4",
    name: "Brian Otieno",
    role: "E-commerce Business Owner",
    location: "Mombasa, Kenya",
    review:
      "Before working with QuikImpo, freight was one of the most stressful parts of our business. Their team helped us understand the process and made our shipments much easier to manage.",
    rating: 4,
    initials: "BO",
  },
  {
    id: "testimonial-5",
    name: "Amina Hassan",
    role: "Operations Manager",
    location: "Dubai, UAE",
    review:
      "The shipment was handled efficiently and costs were transparent. Communication could have been more frequent, but overall a solid experience.",
    rating: 3,
    initials: "AH",
  },
  {
    id: "testimonial-6",
    name: "Michael Kamau",
    role: "Business Owner",
    location: "Dar es Salaam, Tanzania",
    review:
      "The team understands that every shipment matters to the business behind it. Their attention to coordination and documentation made the experience straightforward.",
    rating: 4,
    initials: "MK",
  },
];
