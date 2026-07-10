import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "ak-products-home-content";

export interface HomeContent {
  eyebrow: string;
  title: string;
  accentTitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  imageAlt: string;
  bestSellerTitle: string;
  bestSellerSubtitle: string;
  bestSellerViewAllText: string;
  bestSellerViewAllLink: string;
  bestSellerVisible: boolean;
  categoryCardsVisible: boolean;
  categoryCards: CategoryCardContent[];
}

export interface CategoryCardContent {
  name: string;
  buttonText: string;
  href: string;
  image: string;
  imageAlt: string;
}

export const defaultHomeContent: HomeContent = {
  eyebrow: "Quality Home Essentials",
  title: "Shop Smart,",
  accentTitle: "Live Better.",
  description:
    "Discover premium kitchen gadgets and smart home appliances designed to simplify your daily life and elevate your space.",
  buttonText: "Shop Collection",
  buttonLink: "/shop",
  image: "https://placehold.co/800x600/ffffff/dddddd?text=Smart+Home+Kitchen",
  imageAlt: "Smart Home Collection",
  bestSellerTitle: "Product That Make Daily Life Easy",
  bestSellerSubtitle: "Best Seller Product This Week!",
  bestSellerViewAllText: "View All",
  bestSellerViewAllLink: "/shop",
  bestSellerVisible: true,
  categoryCardsVisible: true,
  categoryCards: [
    {
      name: "Household",
      buttonText: "Shop Now",
      href: "/household",
      image: "/images/categories/household.png",
      imageAlt: "Modern household essentials",
    },
    {
      name: "Kitchen",
      buttonText: "Shop Now",
      href: "/kitchen",
      image: "/images/categories/kitchen.png",
      imageAlt: "Modern kitchen essentials",
    },
    {
      name: "Electronic",
      buttonText: "Shop Now",
      href: "/electronic",
      image: "/images/categories/electronics.png",
      imageAlt: "Smart home electronics",
    },
  ],
};

interface HomeContentContextValue {
  homeContent: HomeContent;
  updateHomeContent: (content: HomeContent) => void;
  resetHomeContent: () => void;
}

const HomeContentContext = createContext<HomeContentContextValue | undefined>(
  undefined,
);

function loadHomeContent(): HomeContent {
  if (typeof window === "undefined") {
    return defaultHomeContent;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultHomeContent;

    return {
      ...defaultHomeContent,
      ...JSON.parse(saved),
    };
  } catch {
    return defaultHomeContent;
  }
}

function saveHomeContent(content: HomeContent) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }
}

export function HomeContentProvider({ children }: { children: ReactNode }) {
  const [homeContent, setHomeContent] = useState<HomeContent>(loadHomeContent);

  const updateHomeContent = useCallback((content: HomeContent) => {
    setHomeContent(content);
    saveHomeContent(content);
  }, []);

  const resetHomeContent = useCallback(() => {
    setHomeContent(defaultHomeContent);
    saveHomeContent(defaultHomeContent);
  }, []);

  const value = useMemo(
    () => ({
      homeContent,
      updateHomeContent,
      resetHomeContent,
    }),
    [homeContent, updateHomeContent, resetHomeContent],
  );

  return (
    <HomeContentContext.Provider value={value}>
      {children}
    </HomeContentContext.Provider>
  );
}

export function useHomeContent() {
  const context = useContext(HomeContentContext);

  if (!context) {
    throw new Error("useHomeContent must be used inside HomeContentProvider");
  }

  return context;
}
