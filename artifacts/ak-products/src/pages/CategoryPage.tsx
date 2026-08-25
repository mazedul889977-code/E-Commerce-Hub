import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductHeaderBar } from "@/components/ProductHeaderBar";
import { ProductGrid } from "@/components/ProductGrid";
import { useProducts } from "@/context/ProductContext";
import { Link } from "wouter";

interface CategoryPageProps {
  category: "kitchen" | "household" | "electronic";
  title: string;
  description: string;
}

export default function CategoryPage({ category, title, description }: CategoryPageProps) {
  const { products } = useProducts();
  const categoryProducts = products.filter(p => p.category === category);
  const productHeaders = {
    kitchen: {
      title: "Kitchen Products",
      subtitle: "Useful kitchen essentials for smarter everyday cooking.",
    },
    household: {
      title: "Household Products",
      subtitle: "Simple tools that keep your home cleaner and easier to manage.",
    },
    electronic: {
      title: "Electronic Products",
      subtitle: "Smart electronics selected for modern home convenience.",
    },
  };
  const productHeader = productHeaders[category];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <div className="bg-gray-50 border-b border-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-sm text-gray-500 breadcrumbs mb-4 justify-center flex">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 capitalize">{category}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-12">
        <ProductHeaderBar
          count={categoryProducts.length}
          title={productHeader.title}
          subtitle={productHeader.subtitle}
          variant={category}
        />
        
        {categoryProducts.length > 0 ? (
          <ProductGrid products={categoryProducts} />
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Coming Soon</h3>
            <p className="text-gray-500">We are adding new products to this category.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
