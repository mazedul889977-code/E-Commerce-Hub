import {
  BadgeCheck,
  ChefHat,
  Home,
  MonitorSmartphone,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";

type ProductHeaderBarVariant = "top" | "kitchen" | "household" | "electronic";

interface ProductHeaderBarProps {
  count: number;
  title: string;
  subtitle?: string;
  variant?: ProductHeaderBarVariant;
  viewAllLink?: string;
  viewAllText?: string;
}

const variantStyles = {
  top: {
    icon: TrendingUp,
    kicker: "Best Products",
    accent: "from-orange-500 via-amber-400 to-rose-500",
    iconBg: "bg-orange-500",
    tint: "text-orange-500",
    softBg: "bg-orange-50",
  },
  kitchen: {
    icon: ChefHat,
    kicker: "Fresh Picks",
    accent: "from-emerald-500 via-teal-400 to-lime-400",
    iconBg: "bg-emerald-500",
    tint: "text-emerald-500",
    softBg: "bg-emerald-50",
  },
  household: {
    icon: Home,
    kicker: "Home Essentials",
    accent: "from-sky-500 via-cyan-400 to-blue-500",
    iconBg: "bg-sky-500",
    tint: "text-sky-500",
    softBg: "bg-sky-50",
  },
  electronic: {
    icon: MonitorSmartphone,
    kicker: "Smart Selection",
    accent: "from-violet-500 via-fuchsia-400 to-indigo-500",
    iconBg: "bg-violet-500",
    tint: "text-violet-500",
    softBg: "bg-violet-50",
  },
};

export function ProductHeaderBar({
  count,
  title,
  subtitle,
  variant = "top",
  viewAllLink,
  viewAllText = "View All",
}: ProductHeaderBarProps) {
  const style = variantStyles[variant];
  const Icon = style.icon;

  return (
    <div className="mb-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className={`h-1.5 bg-gradient-to-r ${style.accent}`} />
      <div className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${style.iconBg} text-white shadow-lg shadow-black/20`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className={`mb-2 inline-flex items-center gap-2 rounded-md ${style.softBg} px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide ${style.tint}`}>
                <Sparkles className="h-3.5 w-3.5" />
                {style.kicker}
              </div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-300">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 self-start sm:self-center">
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white shadow-sm backdrop-blur">
              <BadgeCheck className={`h-5 w-5 ${style.tint}`} />
              <div>
                <div className="text-2xl font-black leading-none">{count}</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-300">
                  Products
                </div>
              </div>
            </div>
            {viewAllLink && (
              <Link
                href={viewAllLink}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-extrabold text-slate-950 transition-colors hover:bg-slate-100"
              >
                {viewAllText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
