import { testimonials } from "../data/testimonials";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection() {
  return (
    <section className="bg-paper py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky">
            Reviews
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-4xl">
            Trusted to Move What Matters.
          </h2>
          <p className="mt-4 leading-relaxed text-text/70">
            From first quote to final delivery, our clients rely on QuikImpo for
            clear communication, dependable coordination, and logistics they can
            count on.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>

        {/* Note for development */}
        <div className="mt-8 text-center">
          <p className="text-xs text-text/50">
            These testimonials are for development purposes only. They will be replaced
            with verified customer feedback before launch.
          </p>
        </div>
      </div>
    </section>
  );
}
