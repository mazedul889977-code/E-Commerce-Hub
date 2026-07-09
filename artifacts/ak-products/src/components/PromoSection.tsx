import { Link } from "wouter";

export function PromoSection() {
  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row border border-gray-100">
          <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
            <span className="text-primary font-bold tracking-widest text-sm mb-4 uppercase">
              Smart Home Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Elevate Your Kitchen <br/>and Living Experience.
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              A modern home deserves smarter tools. We provide premium kitchen electronics and household essentials crafted for efficiency and style. From meal prep to daily chores, our high-quality products are designed to save you time and simplify your life. Experience the perfect blend of innovation and convenience in every corner of your home.
            </p>
            <div>
              <Link 
                href="/shop"
                className="inline-block bg-gray-900 text-white font-bold px-8 py-3.5 rounded-md shadow-md hover:bg-primary transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="flex-1 relative min-h-[300px] md:min-h-full">
            <img 
              src="https://placehold.co/800x800/eeeeee/aaaaaa?text=Promo+Image" 
              alt="Promo Lifestyle" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
