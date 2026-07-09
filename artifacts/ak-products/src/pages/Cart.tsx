import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Link } from "wouter";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-12">
        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3 rounded-md shadow-md hover:bg-primary/90 transition-colors"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item.product.id} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="col-span-1 sm:col-span-6 flex gap-4 items-center">
                        <Link href={`/product/${item.product.id}`} className="shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border border-gray-100"
                          />
                        </Link>
                        <div className="flex flex-col">
                          <Link href={`/product/${item.product.id}`} className="font-semibold text-gray-900 hover:text-primary line-clamp-2">
                            {item.product.name}
                          </Link>
                          <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{item.product.category}</span>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 text-sm hover:text-red-700 flex items-center gap-1 mt-2 w-fit sm:hidden"
                          >
                            <Trash2 className="w-4 h-4" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-1 sm:col-span-2 text-left sm:text-center font-medium text-gray-900">
                        <span className="sm:hidden text-gray-500 font-normal mr-2">Price:</span>
                        ${item.product.price.toFixed(2)}
                      </div>
                      
                      <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                        <div className="flex items-center border border-gray-200 rounded-md bg-white">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                          >-</button>
                          <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                          >+</button>
                        </div>
                      </div>
                      
                      <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-end items-center font-bold text-gray-900">
                        <span className="sm:hidden text-gray-500 font-normal">Subtotal:</span>
                        ${(item.product.price * item.quantity).toFixed(2)}
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="hidden sm:block ml-4 text-gray-400 hover:text-red-500 transition-colors p-2"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">Order Summary</h3>
                
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-base">Total</span>
                    <span className="font-bold text-primary text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  className="w-full bg-primary text-white font-bold py-3.5 rounded-md shadow hover:bg-primary/90 transition-colors flex justify-center items-center gap-2"
                  onClick={() => alert("Checkout flow placeholder. Would integrate with Stripe/Payment Gateway here.")}
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
                
                <div className="mt-4 text-center">
                  <Link href="/shop" className="text-sm text-gray-500 hover:text-primary font-medium">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
