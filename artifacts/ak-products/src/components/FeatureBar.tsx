import { Headphones, RotateCcw, Shield, Zap } from "lucide-react";

export function FeatureBar() {
  const features = [
    {
      icon: <Headphones className="w-6 h-6 text-primary" />,
      title: "Support 24/7",
      subtitle: "Dedicated 24/7 Support"
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-primary" />,
      title: "Easy Returns",
      subtitle: "Shop With Confidence"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure Payment",
      subtitle: "Safe & trusted checkout"
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Fast Delivery",
      subtitle: "Quick & reliable shipping"
    }
  ];

  return (
    <div className="bg-white border-y border-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="bg-primary/5 p-4 rounded-full group-hover:bg-primary/10 transition-colors">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
