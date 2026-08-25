import { BadgeCheck, ChefHat, Home, MonitorSmartphone, TrendingUp } from "lucide-react";

type ProductHeaderBarVariant = "top" | "kitchen" | "household" | "electronic";

interface ProductHeaderBarProps {
  count: number;
  title: string;
  subtitle?: string;
  variant?: ProductHeaderBarVariant;
}

const variantStyles = {
  top: {
    icon: TrendingUp,
    accent: "bg-orange-500",
    tint: "text-orange-500",
  },
  kitchen: {
    icon: ChefHat,
    accent: "bg-emerald-500",
    tint: "text-emerald-500",
  },
  household: {
    icon: Home,
    accent: "bg-sky-500",
    tint: "text-sky-500",
  },
  electronic: {
    icon: MonitorSmartphone,
    accent: "bg-violet-500",
    tint: "text-violet-500",
  },
};

export function ProductHeaderBar({
  count,
  title,
  subtitle,
  variant = "top",
}: ProductHeaderBarProps) {
  const style = variantStyles[variant];
  const Icon = style.icon;

  return (
    <div className="mb-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className={`h-1.5 ${style.accent}`} />
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-slate-950 text-white">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-950 sm:text-2xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm font-medium text-slate-500">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="inline-flex h-10 items-center gap-2 self-start rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-700 sm:self-center">
          <BadgeCheck className={`h-4 w-4 ${style.tint}`} />
          {count} Products
        </div>
      </div>
    </div>
  );
}
