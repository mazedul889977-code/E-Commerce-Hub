import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        <div className="prose prose-gray max-w-none text-gray-700">
          <p>Last updated: January 1, 2026</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2>2. Products and Pricing</h2>
          <p>All products and prices are subject to change without notice. We make every effort to display as accurately as possible the colors and images of our products, but we cannot guarantee that your computer monitor's display of any color will be accurate.</p>
          
          <h2>3. User Accounts</h2>
          <p>If you create an account on this site, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account.</p>
          
          <h2>4. Prohibited Uses</h2>
          <p>In addition to other prohibitions, you are prohibited from using the site or its content for any unlawful purpose, to solicit others to perform or participate in any unlawful acts, or to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances.</p>
          
          <h2>5. Limitation of Liability</h2>
          <p>AK Products USA shall not be liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products.</p>
          
          <h2>6. Governing Law</h2>
          <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the United States.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
