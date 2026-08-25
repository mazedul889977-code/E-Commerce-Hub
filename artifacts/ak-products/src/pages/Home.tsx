import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { FeatureBar } from "@/components/FeatureBar";
import { CategoryCards } from "@/components/CategoryCards";
import { PromoSection } from "@/components/PromoSection";
import { ProductHeaderBar } from "@/components/ProductHeaderBar";
import { ProductGrid } from "@/components/ProductGrid";
import { useHomeContent } from "@/context/HomeContentContext";
import { useProducts } from "@/context/ProductContext";

export default function Home() {
  const { products } = useProducts();
  const { homeContent } = useHomeContent();
  const bestSellers = products.filter(p => p.badge === "Best Seller");
  const smartKitchen = products.filter(p => p.collection === "smart-kitchen").slice(0, 8);
  const smartHome = products.filter(p => p.collection === "smart-home").slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeatureBar />
        
        {homeContent.bestSellerVisible && (
          <section className="bg-white py-16">
            <div className="container mx-auto px-4">
              <ProductHeaderBar
                count={bestSellers.length}
                title="Top Selling Products"
                subtitle="Best products and customer favorites picked for your everyday needs."
                variant="top"
                viewAllLink={homeContent.bestSellerViewAllLink}
                viewAllText={homeContent.bestSellerViewAllText}
              />
              <ProductGrid products={bestSellers} bare />
            </div>
          </section>
        )}

        <CategoryCards />

        <ProductGrid 
          products={smartKitchen} 
          title="Smart Kitchen" 
          viewAllLink="/kitchen"
        />

        <ProductGrid 
          products={smartHome} 
          title="Smart Home" 
          viewAllLink="/electronic"
        />

        <PromoSection />
      </main>
      <Footer />
    </div>
  );
}
