import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

import { useHomeContent } from "@/context/HomeContentContext";

const SLIDE_INTERVAL_MS = 3000;

export function Hero() {
  const { homeContent } = useHomeContent();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      eyebrow: homeContent.eyebrow,
      title: homeContent.title,
      accentTitle: homeContent.accentTitle,
      description: homeContent.description,
      buttonText: homeContent.buttonText,
      buttonLink: homeContent.buttonLink,
      image: "/images/slides/kitchen.png",
      imageAlt: "Modern kitchen essentials",
    },
    {
      eyebrow: "A Tidy Home, Made Easy",
      title: "Organize More,",
      accentTitle: "Stress Less.",
      description:
        "Practical household essentials that help every room feel fresh, simple and put together.",
      buttonText: "Shop Household",
      buttonLink: "/household",
      image: "/images/slides/home-organization.png",
      imageAlt: "Organized household essentials",
    },
    {
      eyebrow: "Smarter Everyday Living",
      title: "Make Home",
      accentTitle: "Work Smarter.",
      description:
        "Discover intuitive technology and modern essentials designed for a more connected home.",
      buttonText: "Explore Electronics",
      buttonLink: "/electronic",
      image: "/images/slides/smart-home.png",
      imageAlt: "Smart home electronics",
    },
    {
      eyebrow: "Made For Everyday Moments",
      title: "Cook, Serve,",
      accentTitle: "Enjoy More.",
      description:
        "Thoughtful kitchen picks that bring more ease, warmth and joy to every meal.",
      buttonText: "Shop Kitchen",
      buttonLink: "/kitchen",
      image: "/images/slides/cooking.png",
      imageAlt: "Cookware and dining essentials",
    },
  ];

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  const changeSlide = (direction: "next" | "previous") => {
    setActiveSlide((current) =>
      direction === "next"
        ? (current + 1) % slides.length
        : (current - 1 + slides.length) % slides.length,
    );
  };

  const slide = slides[activeSlide];

  return (
    <section
      className="overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/30"
      aria-roledescription="carousel"
      aria-label="Featured Yallo Mart collections"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50 md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-h-[340px] flex-col justify-center px-7 py-10 sm:px-12 md:min-h-[490px] md:px-14">
            <span className="mb-5 inline-flex w-fit rounded-full bg-orange-50 px-3 py-1 text-sm font-bold tracking-wide text-orange-600">
              {slide.eyebrow}
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              {slide.title} <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                {slide.accentTitle}
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              {slide.description}
            </p>
            <div className="mt-8">
              <Link
                href={slide.buttonLink}
                className="inline-flex items-center rounded-xl bg-slate-900 px-6 py-3.5 font-bold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-orange-500"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden md:min-h-[490px]">
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.imageAlt}
              className="absolute inset-0 h-full w-full animate-in fade-in duration-700 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent" />

            <button
              type="button"
              onClick={() => changeSlide("previous")}
              className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:scale-105 hover:bg-white"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => changeSlide("next")}
              className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:scale-105 hover:bg-white"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Choose a slide">
              {slides.map((item, index) => (
                <button
                  key={item.image}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeSlide === index ? "w-7 bg-orange-500" : "w-2.5 bg-white/90 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-selected={activeSlide === index}
                  role="tab"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
