import { useHomeContent } from "@/context/HomeContentContext";
import { Link } from "wouter";

export function CategoryCards() {
  const { homeContent } = useHomeContent();
  const categories = homeContent.categoryCards;

  if (!homeContent.categoryCardsVisible || !categories.length) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href} className="group relative block rounded-2xl overflow-hidden aspect-[4/5] bg-gray-100">
              <img 
                src={cat.image} 
                alt={cat.imageAlt || cat.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full text-center">
                <h3 className="text-white text-3xl font-bold mb-3">{cat.name}</h3>
                <span className="inline-block bg-white text-gray-900 font-semibold px-6 py-2.5 rounded-full text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                  {cat.buttonText}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
