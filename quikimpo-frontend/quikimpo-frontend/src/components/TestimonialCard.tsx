import { Star } from "lucide-react";
import { Testimonial } from "../data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="rounded-xl border border-line bg-white p-6 shadow-sm transition hover:shadow-md md:p-7">
      {/* Star rating */}
      <div className="flex gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="fill-amber text-amber"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Quote text */}
      <p className="mt-4 text-sm leading-relaxed text-text/75">
        <span className="text-sky font-bold">"</span>
        {testimonial.review}
        <span className="text-sky font-bold">"</span>
      </p>

      {/* Customer info */}
      <div className="mt-5 flex items-center gap-3 pt-5 border-t border-line">
        {/* Avatar with initials */}
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky/10 text-sm font-bold text-sky">
          {testimonial.initials}
        </div>

        {/* Name, role, location */}
        <div className="text-sm">
          <p className="font-bold text-ink">{testimonial.name}</p>
          <p className="text-text/60">{testimonial.role}</p>
          <p className="text-xs text-text/50">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
