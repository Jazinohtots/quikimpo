import TestimonialsSection from "../components/TestimonialsSection";
import Seo from "../components/Seo";

export default function ClientReviews() {
  return (
    <>
      <Seo
        title="Client Reviews"
        description="Read reviews from businesses across Africa and beyond that trust QuikImpo to move their cargo."
        path="/reviews"
      />
      {/* Hero section */}
      <section className="bg-ink py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Reviews & Testimonials
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Hear from businesses across Africa and beyond who trust QuikImpo to move their cargo with confidence.
          </p>
        </div>
      </section>

      {/* Testimonials section */}
      <TestimonialsSection />
    </>
  );
}
