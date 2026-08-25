import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductHeaderBar } from "@/components/ProductHeaderBar";
import { ProductGrid } from "@/components/ProductGrid";
import { useProducts } from "@/context/ProductContext";
import { useState, useMemo, useEffect } from "react";
import { useLocation, Link } from "wouter";

export default function Shop() {
  const { products } = useProducts();
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialSearch = searchParams.get("search") || "";
  
  const [filter, setFilter] = useState<"all" | "kitchen" | "household" | "electronic">("all");
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [location]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = filter === "all" || p.category === filter;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  const categories = [
    { id: "all", label: "All Products" },
    { id: "kitchen", label: "Kitchen" },
    { id: "household", label: "Household" },
    { id: "electronic", label: "Electronic" },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <div className="bg-gray-50 border-b border-gray-100 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop All Products</h1>
          <div className="text-sm text-gray-500 breadcrumbs">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Shop</span>
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === c.id 
                    ? "bg-gray-900 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-64">
            <input 
              type="search"
              placeholder="Filter products..."
              className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <ProductHeaderBar
          count={filteredProducts.length}
          title="Top Selling Products"
          subtitle="Customer favorites from every Yallo Mart category."
          variant="top"
        />

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={() => { setFilter("all"); setSearch(""); }}
              className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary/90"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
