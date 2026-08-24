import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Sparkles, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export function Header() {
  const { total, itemCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 -ml-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(true)}
          data-testid="button-mobile-menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Yallo Mart home">
          <div className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-white shadow-md shadow-orange-200 transition-transform duration-200 group-hover:scale-105">
            <div className="absolute inset-0 bg-white/15" />
            <Sparkles className="relative h-5 w-5" strokeWidth={2.5} />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-[22px] font-black tracking-[-0.06em] text-transparent transition-opacity group-hover:opacity-80">
              Yallo<span className="ml-1 font-semibold tracking-[-0.04em]">Mart</span>
            </span>
            <span className="mt-1 text-[8px] font-bold tracking-[0.18em] text-slate-400">EVERYDAY ESSENTIALS</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <Link href="/kitchen" className="hover:text-primary transition-colors">Kitchen</Link>
          <Link href="/household" className="hover:text-primary transition-colors">Household</Link>
          <Link href="/electronic" className="hover:text-primary transition-colors">Electronic</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="absolute right-0 flex items-center bg-gray-100 rounded-full pr-1 pl-3 py-1 w-48 sm:w-64 transition-all">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none text-sm w-full h-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  data-testid="input-search"
                />
                <button type="button" onClick={() => setIsSearchOpen(false)} className="p-1.5 text-gray-500 hover:text-gray-800">
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)} 
                className="p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-gray-50"
                aria-label="Search"
                data-testid="button-search-toggle"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          <Link href="/account" className="p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-gray-50">
            <User className="w-5 h-5" />
          </Link>

          <Link href="/cart" className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
            <div className="relative text-gray-600 group-hover:text-primary">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-xs leading-none">
              <span className="text-gray-500 font-medium">Cart</span>
              <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMobileMenu} />
          <div className="relative w-64 bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <span className="font-bold text-lg text-gray-900">Menu</span>
              <button onClick={closeMobileMenu} className="p-2 text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-4 font-medium text-gray-700">
              <Link href="/" className="py-2 border-b border-gray-100" onClick={closeMobileMenu}>Home</Link>
              <Link href="/shop" className="py-2 border-b border-gray-100" onClick={closeMobileMenu}>Shop</Link>
              <Link href="/kitchen" className="py-2 border-b border-gray-100" onClick={closeMobileMenu}>Kitchen</Link>
              <Link href="/household" className="py-2 border-b border-gray-100" onClick={closeMobileMenu}>Household</Link>
              <Link href="/electronic" className="py-2 border-b border-gray-100" onClick={closeMobileMenu}>Electronic</Link>
              <Link href="/about" className="py-2 border-b border-gray-100" onClick={closeMobileMenu}>About Us</Link>
              <Link href="/contact" className="py-2 border-b border-gray-100" onClick={closeMobileMenu}>Contact Us</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
