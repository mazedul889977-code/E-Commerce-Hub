import { Product } from "../data/products";
import { ProductCard } from "./ProductCard";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  bare?: boolean;
}

export function ProductGrid({ products, title, subtitle, viewAllLink, viewAllText = "View All", bare = false }: ProductGridProps) {
  if (!products.length) return null;

  const grid = (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );

  if (bare) {
    return grid;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        {(title || subtitle) && (
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              {title && (
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-gray-500 mt-2 font-medium">
                  {subtitle}
                </p>
              )}
            </div>
            {viewAllLink && (
              <Link 
                href={viewAllLink}
                className="text-primary font-semibold hover:text-primary/80 flex items-center gap-1 group"
              >
                {viewAllText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        )}

        {grid}
      </div>
    </section>
  );
}
