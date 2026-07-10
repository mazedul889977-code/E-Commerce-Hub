import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { FeatureBar } from "@/components/FeatureBar";
import { CategoryCards } from "@/components/CategoryCards";
import { PromoSection } from "@/components/PromoSection";
import { ProductGrid } from "@/components/ProductGrid";
import { useHomeContent } from "@/context/HomeContentContext";
import { useProducts } from "@/context/ProductContext";

export default function Home() {
  const { products } = useProducts();
  const { homeContent } = useHomeContent();
  const bestSellers = products.filter(p => p.badge === "Best Seller");
  const smartKitchen = products.filter(p => p.category === "kitchen").slice(0, 8);
  const smartHome = products.filter(p => p.category === "electronic").slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeatureBar />
        
        {homeContent.bestSellerVisible && (
          <ProductGrid
            products={bestSellers}
            title={homeContent.bestSellerTitle}
            subtitle={homeContent.bestSellerSubtitle}
            viewAllLink={homeContent.bestSellerViewAllLink}
            viewAllText={homeContent.bestSellerViewAllText}
          />
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
