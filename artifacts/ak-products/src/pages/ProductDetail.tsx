import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useParams, Link } from "wouter";
import { useState } from "react";
import { ShoppingCart, Shield, Truck, RotateCcw, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NotFound from "./not-found";

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <NotFound />;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <Link href={`/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-full h-auto rounded-xl shadow-lg mix-blend-multiply"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col py-4">
            {product.badge && (
              <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                {product.badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>
            <div className="text-3xl font-bold text-primary mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description}
            </p>

            <div className="border-t border-b border-gray-100 py-6 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center border border-gray-300 rounded-md bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                >-</button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                >+</button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-primary text-white font-bold h-12 px-8 rounded-md shadow-md hover:bg-primary/90 flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Shield className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-semibold text-gray-900">1 Year Warranty</div>
                  <div className="text-xs">Guaranteed quality</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <Truck className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-semibold text-gray-900">Fast Shipping</div>
                  <div className="text-xs">Usually ships in 24h</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg sm:col-span-2">
                <RotateCcw className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-semibold text-gray-900">30-Day Returns</div>
                  <div className="text-xs">Not satisfied? Return it easily.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
