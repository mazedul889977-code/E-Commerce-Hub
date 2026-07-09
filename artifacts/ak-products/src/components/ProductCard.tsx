import { Product } from "../data/products";
import { Link } from "wouter";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <Link 
      href={`/product/${product.id}`}
      className="group flex flex-col bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            {product.badge}
          </span>
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex justify-center">
          <button
            onClick={handleAdd}
            className="bg-primary text-white font-medium text-sm py-2 px-4 rounded-full shadow-md hover:bg-primary/90 flex items-center gap-2 w-full justify-center"
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
          {product.category}
        </span>
        <h3 className="font-medium text-sm text-gray-900 leading-tight mb-2 line-clamp-2 flex-grow">
          {product.name}
        </h3>
        <div className="font-bold text-lg text-primary mt-auto">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </Link>
  );
}
