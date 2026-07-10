import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <div className="bg-gray-50 border-b border-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">About Yallo Mart</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We are dedicated to providing high-quality, practical, and innovative household and kitchen products that simplify your daily life.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg prose-blue mx-auto text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Our Mission</h2>
          <p className="mb-6">
            At Yallo Mart, our mission is simple: to make everyday tasks easier and more enjoyable. We believe that a well-equipped home is a happy home. By sourcing and designing smart solutions for your kitchen, living spaces, and beyond, we aim to give you back the time you spend on chores so you can focus on what matters most.
          </p>

          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">We rigorously test all our products to ensure they meet high standards of durability, functionality, and safety. We don't sell anything we wouldn't use in our own homes.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accessible Value</h3>
              <p className="text-gray-600">Great tools shouldn't cost a fortune. We work hard to offer premium-feeling products at prices that make sense for everyday families.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="mb-6">
            Started with a simple realization that many kitchen gadgets on the market were either overpriced or underperforming, Yallo Mart was born out of a desire for balance. We wanted reliable, aesthetically pleasing tools that just worked.
          </p>
          <p>
            Today, we serve thousands of happy customers across the country, constantly expanding our catalog with smart electronics, organizational tools, and cooking essentials based on customer feedback and emerging home trends.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
