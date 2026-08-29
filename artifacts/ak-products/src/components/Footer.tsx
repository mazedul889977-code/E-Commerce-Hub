import { Link } from "wouter";
import { Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-300 py-12 mt-12 border-t border-gray-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="bg-primary text-white p-1.5 rounded">
              <Home className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
              Yallo Mart
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400 pr-4">
            Your trusted shop for high quality kitchen gadgets and home appliances. 
            Simplifying your daily life with smart solutions.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Important Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/account" className="hover:text-white transition-colors">My Account</Link></li>
            <li><Link href="/admin" className="hover:text-white transition-colors">Admin Login</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund and Returns Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Categories</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/kitchen" className="hover:text-white transition-colors">Kitchen Essentials</Link></li>
            <li><Link href="/household" className="hover:text-white transition-colors">Household Items</Link></li>
            <li><Link href="/electronic" className="hover:text-white transition-colors">Smart Electronics</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
          </ul>
        </div>

      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-gray-800 text-sm text-center text-gray-500">
        <p>&copy; 2026 Yallo Mart. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
