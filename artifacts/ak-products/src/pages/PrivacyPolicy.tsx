import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none text-gray-700">
          <p>Last updated: January 1, 2026</p>
          
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, make a purchase, or contact us for support. This may include your name, email address, shipping address, and payment information.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to process your transactions, communicate with you about your orders, and improve our services. We may also send you promotional emails if you have opted in to receive them.</p>
          
          <h2>3. Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except to trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
          
          <h2>4. Cookies</h2>
          <p>We use cookies to enhance your experience, gather general visitor information, and track visits to our website. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies.</p>
          
          <h2>5. Security</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or access your personal information.</p>
          
          <h2>6. Contact Us</h2>
          <p>If you have any questions regarding this privacy policy, you may contact us using the information on our Contact Us page.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
