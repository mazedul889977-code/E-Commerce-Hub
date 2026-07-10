import { useHomeContent } from "@/context/HomeContentContext";
import { Link } from "wouter";

export function Hero() {
  const { homeContent } = useHomeContent();

  return (
    <div className="bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 md:pr-10 text-center md:text-left z-10">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide">
            {homeContent.eyebrow}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {homeContent.title} <br className="hidden md:block"/>
            <span className="text-primary">{homeContent.accentTitle}</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            {homeContent.description}
          </p>
          <div className="pt-4">
            <Link 
              href={homeContent.buttonLink}
              className="inline-block bg-primary text-white font-bold px-8 py-3.5 rounded-md shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
            >
              {homeContent.buttonText}
            </Link>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl transform scale-110"></div>
          <img 
            src={homeContent.image}
            alt={homeContent.imageAlt}
            className="w-full h-auto rounded-2xl shadow-xl border border-gray-100 relative z-10"
          />
        </div>
      </div>
    </div>
  );
}
