import { Link } from "wouter";
import {
  defaultHomeContent,
  useHomeContent,
  type HomeContent,
} from "@/context/HomeContentContext";
import { useProducts } from "@/context/ProductContext";
import type { Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import {
  Copy,
  Download,
  Eye,
  EyeOff,
  ImagePlus,
  LockKeyhole,
  LogIn,
  LogOut,
  Package,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";

type ProductCategory = Product["category"];
type ProductForm = Omit<Product, "id"> & { id?: string };

const emptyProduct: ProductForm = {
  name: "",
  price: 0,
  category: "kitchen",
  image: "",
  description: "",
  badge: "",
  stock: 0,
  visible: true,
};

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "YalloMart@2026";
const ADMIN_SESSION_KEY = "yallo-mart-admin-authenticated";

function toForm(product: Product): ProductForm {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image,
    description: product.description,
    badge: product.badge ?? "",
    stock: product.stock ?? 0,
    visible: product.visible ?? true,
  };
}

function cleanForm(form: ProductForm): ProductForm {
  return {
    ...form,
    name: form.name.trim(),
    image: form.image.trim(),
    description: form.description.trim(),
    badge: form.badge?.trim() || undefined,
    price: Number(form.price) || 0,
    stock: Number(form.stock) || 0,
    visible: form.visible ?? true,
  };
}

function AdminTopBar({ onLogout }: { onLogout?: () => void }) {
  return (
    <header className="border-b border-slate-800 bg-slate-950 text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-extrabold tracking-wide">Yallo Mart Admin</p>
            <p className="text-xs text-slate-400">Store management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {onLogout && (
            <button
              onClick={onLogout}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-700 px-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          )}
          <Link
            href="/"
            className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
          >
            Back to store
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    allProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
    replaceProducts,
  } = useProducts();
  const { homeContent, updateHomeContent, resetHomeContent } = useHomeContent();
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyProduct);
  const [homeForm, setHomeForm] = useState<HomeContent>(homeContent);
  const [search, setSearch] = useState("");
  const [importValue, setImportValue] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return allProducts;

    return allProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });
  }, [allProducts, search]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      username.trim().toLowerCase() === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      setIsAuthenticated(true);
      setPassword("");
      toast({
        title: "Welcome back",
        description: "Admin access unlocked.",
      });
      return;
    }

    toast({
      title: "Access denied",
      description: "Username or password is incorrect.",
      variant: "destructive",
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <AdminTopBar />
        <div className="flex-grow flex items-center justify-center w-full px-4">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm rounded-lg border border-slate-800 bg-white p-8 shadow-2xl shadow-black/20"
          >
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-center text-2xl font-extrabold text-slate-950">
              Admin Login
            </h2>
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Username
                </span>
                <span className="mt-2 flex h-11 items-center gap-2 rounded-md border border-slate-200 px-3 focus-within:border-primary">
                  <UserRound className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                    autoComplete="username"
                  />
                </span>
              </label>
              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Password
                </span>
                <span className="mt-2 flex h-11 items-center gap-2 rounded-md border border-slate-200 px-3 focus-within:border-primary">
                  <LockKeyhole className="h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                    autoComplete="current-password"
                  />
                </span>
              </label>
              <button
                type="submit"
                className="h-11 w-full rounded-md bg-primary font-bold text-white hover:bg-primary/90"
              >
                <LogIn className="mr-2 inline h-4 w-4" />
                Access Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const visibleCount = allProducts.filter(
    (product) => product.visible !== false,
  ).length;
  const totalStock = allProducts.reduce(
    (total, product) => total + (product.stock ?? 0),
    0,
  );

  const selectProduct = (product: Product) => {
    setSelectedId(product.id);
    setForm(toForm(product));
  };

  const startNewProduct = () => {
    setSelectedId(null);
    setForm(emptyProduct);
  };

  const saveProduct = () => {
    const nextProduct = cleanForm(form);

    if (!nextProduct.name || !nextProduct.description || !nextProduct.image) {
      toast({
        title: "Missing information",
        description: "Product name, image, and description are required.",
        variant: "destructive",
      });
      return;
    }

    if (selectedId) {
      updateProduct(selectedId, nextProduct);
      toast({
        title: "Saved",
        description: `${nextProduct.name} has been updated.`,
      });
      return;
    }

    const createdProduct = addProduct(nextProduct);
    setSelectedId(createdProduct.id);
    setForm(toForm(createdProduct));
    toast({
      title: "Product added",
      description: `${createdProduct.name} is now in your store.`,
    });
  };

  const removeProduct = () => {
    if (!selectedId) return;

    deleteProduct(selectedId);
    startNewProduct();
    toast({
      title: "Deleted",
      description: "The product was removed from the store.",
    });
  };

  const duplicateProduct = () => {
    const nextProduct = cleanForm({
      ...form,
      id: undefined,
      name: `${form.name} Copy`,
    });
    const createdProduct = addProduct(nextProduct);
    setSelectedId(createdProduct.id);
    setForm(toForm(createdProduct));
    toast({
      title: "Copied",
      description: `${createdProduct.name} is ready to edit.`,
    });
  };

  const exportProducts = async () => {
    const json = JSON.stringify(allProducts, null, 2);

    try {
      await navigator.clipboard.writeText(json);
      toast({
        title: "Copied",
        description: "Catalog backup was copied to clipboard.",
      });
    } catch {
      setImportValue(json);
      toast({
        title: "Export ready",
        description: "Catalog backup is shown in the box below.",
      });
    }
  };

  const importProducts = () => {
    try {
      const parsed = JSON.parse(importValue);
      if (!Array.isArray(parsed)) {
        throw new Error("Catalog must be an array");
      }

      replaceProducts(parsed as Product[]);
      startNewProduct();
      toast({
        title: "Imported",
        description: `${parsed.length} products loaded.`,
      });
    } catch {
      toast({
        title: "Import failed",
        description: "Paste a valid catalog backup and try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({
        ...current,
        image: String(reader.result),
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleHomeImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setHomeForm((current) => ({
        ...current,
        image: String(reader.result),
      }));
    };
    reader.readAsDataURL(file);
  };

  const saveHome = () => {
    updateHomeContent({
      ...homeForm,
      eyebrow: homeForm.eyebrow.trim(),
      title: homeForm.title.trim(),
      accentTitle: homeForm.accentTitle.trim(),
      description: homeForm.description.trim(),
      buttonText: homeForm.buttonText.trim(),
      buttonLink: homeForm.buttonLink.trim() || "/shop",
      image: homeForm.image.trim(),
      imageAlt: homeForm.imageAlt.trim() || "Home hero image",
      bestSellerTitle: homeForm.bestSellerTitle.trim(),
      bestSellerSubtitle: homeForm.bestSellerSubtitle.trim(),
      bestSellerViewAllText: homeForm.bestSellerViewAllText.trim() || "View All",
      bestSellerViewAllLink: homeForm.bestSellerViewAllLink.trim() || "/shop",
      bestSellerVisible: homeForm.bestSellerVisible,
      categoryCardsVisible: homeForm.categoryCardsVisible,
      categoryCards: homeForm.categoryCards.map((card) => ({
        ...card,
        name: card.name.trim(),
        buttonText: card.buttonText.trim() || "Shop Now",
        href: card.href.trim() || "/shop",
        image: card.image.trim(),
        imageAlt: card.imageAlt.trim() || card.name.trim(),
      })),
    });
    toast({
      title: "Home page saved",
      description: "Your home banner has been updated.",
    });
  };

  const updateCategoryCard = (
    index: number,
    field: keyof HomeContent["categoryCards"][number],
    value: string,
  ) => {
    setHomeForm((current) => ({
      ...current,
      categoryCards: current.categoryCards.map((card, cardIndex) =>
        cardIndex === index
          ? {
              ...card,
              [field]: value,
            }
          : card,
      ),
    }));
  };

  const handleCategoryImageUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateCategoryCard(index, "image", String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AdminTopBar onLogout={handleLogout} />

      <main className="flex-grow">
        <div className="border-b border-slate-200 bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
                  <Package className="h-3.5 w-3.5" />
                  Admin Panel
                </div>
                <h1 className="mt-3 text-3xl font-extrabold text-slate-950">
                  Manage Your Products
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                  Select a product, change the details, then press Save. New products appear in the shop immediately.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                  <div className="text-2xl font-extrabold text-slate-950">
                    {allProducts.length}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    Products
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                  <div className="text-2xl font-extrabold text-slate-950">
                    {visibleCount}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    Showing
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                  <div className="text-2xl font-extrabold text-slate-950">
                    {totalStock}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    Stock
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pt-6">
          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-950">
                    Home Page Edit
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Edit the first home banner shown in your screenshot.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      resetHomeContent();
                      setHomeForm(defaultHomeContent);
                      toast({
                        title: "Home reset",
                        description: "Default home banner has been restored.",
                      });
                    }}
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset Home
                  </button>
                  <button
                    onClick={saveHome}
                    className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-white hover:bg-primary/90"
                  >
                    <Save className="h-4 w-4" />
                    Save Home
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-5 xl:grid-cols-[1fr_420px]">
              <div className="grid gap-4 md:grid-cols-2">
                <label>
                  <span className="text-sm font-bold text-slate-700">
                    Small Badge Text
                  </span>
                  <input
                    value={homeForm.eyebrow}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        eyebrow: event.target.value,
                      }))
                    }
                    className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                    placeholder="Quality Home Essentials"
                  />
                </label>

                <label>
                  <span className="text-sm font-bold text-slate-700">
                    Button Text
                  </span>
                  <input
                    value={homeForm.buttonText}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        buttonText: event.target.value,
                      }))
                    }
                    className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                    placeholder="Shop Collection"
                  />
                </label>

                <label>
                  <span className="text-sm font-bold text-slate-700">
                    Main Title
                  </span>
                  <input
                    value={homeForm.title}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                    placeholder="Shop Smart,"
                  />
                </label>

                <label>
                  <span className="text-sm font-bold text-slate-700">
                    Blue Title
                  </span>
                  <input
                    value={homeForm.accentTitle}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        accentTitle: event.target.value,
                      }))
                    }
                    className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                    placeholder="Live Better."
                  />
                </label>

                <label className="md:col-span-2">
                  <span className="text-sm font-bold text-slate-700">
                    Description
                  </span>
                  <textarea
                    value={homeForm.description}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        description: event.target.value,
                      }))
                    }
                    className="mt-2 min-h-24 w-full rounded-md border border-slate-200 p-3 text-sm outline-none focus:border-primary"
                    placeholder="Write home banner description"
                  />
                </label>

                <label>
                  <span className="text-sm font-bold text-slate-700">
                    Button Link
                  </span>
                  <input
                    value={homeForm.buttonLink}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        buttonLink: event.target.value,
                      }))
                    }
                    className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                    placeholder="/shop"
                  />
                </label>

                <label>
                  <span className="text-sm font-bold text-slate-700">
                    Image Alt Text
                  </span>
                  <input
                    value={homeForm.imageAlt}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        imageAlt: event.target.value,
                      }))
                    }
                    className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                    placeholder="Smart Home Collection"
                  />
                </label>

                <label className="md:col-span-2">
                  <span className="text-sm font-bold text-slate-700">
                    Hero Image Link
                  </span>
                  <input
                    value={homeForm.image}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        image: event.target.value,
                      }))
                    }
                    className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                    placeholder="/images/home-hero.jpg or https://..."
                  />
                  <label className="mt-3 inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                    <Upload className="h-4 w-4" />
                    Upload Home Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleHomeImageUpload}
                    />
                  </label>
                </label>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-950">Home Preview</h3>
                <div className="mt-4 rounded-lg bg-white p-5 shadow-sm">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {homeForm.eyebrow || "Badge text"}
                  </span>
                  <h4 className="mt-4 text-3xl font-extrabold leading-tight text-slate-950">
                    {homeForm.title || "Main title"}
                    <br />
                    <span className="text-primary">
                      {homeForm.accentTitle || "Blue title"}
                    </span>
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {homeForm.description || "Description preview"}
                  </p>
                  <button className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-bold text-white">
                    {homeForm.buttonText || "Button"}
                  </button>
                  <div className="mt-5 aspect-[4/3] overflow-hidden rounded-lg border border-slate-100 bg-white">
                    {homeForm.image ? (
                      <img
                        src={homeForm.image}
                        alt={homeForm.imageAlt || "Home preview"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm font-bold text-slate-400">
                        No home image
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="container mx-auto px-4 pt-5">
          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-950">
                    Best Seller Section Edit
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Edit the section title, subtitle, and View All button shown above product cards.
                  </p>
                </div>
                <button
                  onClick={saveHome}
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-white hover:bg-primary/90"
                >
                  <Save className="h-4 w-4" />
                  Save Section
                </button>
              </div>
            </div>

            <div className="grid gap-5 p-5 xl:grid-cols-[1fr_420px]">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="md:col-span-2">
                  <span className="text-sm font-bold text-slate-700">
                    Section Title
                  </span>
                  <input
                    value={homeForm.bestSellerTitle}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        bestSellerTitle: event.target.value,
                      }))
                    }
                    className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                    placeholder="Product That Make Daily Life Easy"
                  />
                </label>

                <label className="md:col-span-2">
                  <span className="text-sm font-bold text-slate-700">
                    Section Subtitle
                  </span>
                  <input
                    value={homeForm.bestSellerSubtitle}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        bestSellerSubtitle: event.target.value,
                      }))
                    }
                    className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                    placeholder="Best Seller Product This Week!"
                  />
                </label>

                <label>
                  <span className="text-sm font-bold text-slate-700">
                    View Button Text
                  </span>
                  <input
                    value={homeForm.bestSellerViewAllText}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        bestSellerViewAllText: event.target.value,
                      }))
                    }
                    className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                    placeholder="View All"
                  />
                </label>

                <label>
                  <span className="text-sm font-bold text-slate-700">
                    View Button Link
                  </span>
                  <input
                    value={homeForm.bestSellerViewAllLink}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        bestSellerViewAllLink: event.target.value,
                      }))
                    }
                    className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                    placeholder="/shop"
                  />
                </label>

                <label className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 md:col-span-2">
                  <span>
                    <span className="block text-sm font-bold text-slate-800">
                      Show This Section On Home
                    </span>
                    <span className="block text-xs text-slate-500">
                      Turn this off if you want to hide the best seller area.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={homeForm.bestSellerVisible}
                    onChange={(event) =>
                      setHomeForm((current) => ({
                        ...current,
                        bestSellerVisible: event.target.checked,
                      }))
                    }
                    className="h-5 w-5 accent-primary"
                  />
                </label>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-950">Section Preview</h3>
                <div className="mt-4 rounded-lg bg-white p-5 shadow-sm">
                  <div className="flex items-end justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <h4 className="text-2xl font-extrabold text-slate-950">
                        {homeForm.bestSellerTitle || "Section title"}
                      </h4>
                      <p className="mt-2 text-sm font-medium text-slate-500">
                        {homeForm.bestSellerSubtitle || "Section subtitle"}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {homeForm.bestSellerViewAllText || "View All"} →
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="aspect-[4/3] rounded-md bg-slate-100"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="container mx-auto px-4 pt-5">
          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-950">
                    Category Cards Edit
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Edit the Household, Kitchen, and Electronic cards shown on the home page.
                  </p>
                </div>
                <button
                  onClick={saveHome}
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-white hover:bg-primary/90"
                >
                  <Save className="h-4 w-4" />
                  Save Category Cards
                </button>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <label className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <span>
                  <span className="block text-sm font-bold text-slate-800">
                    Show Category Cards On Home
                  </span>
                  <span className="block text-xs text-slate-500">
                    Turn this off if you want to hide this whole section.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={homeForm.categoryCardsVisible}
                  onChange={(event) =>
                    setHomeForm((current) => ({
                      ...current,
                      categoryCardsVisible: event.target.checked,
                    }))
                  }
                  className="h-5 w-5 accent-primary"
                />
              </label>

              <div className="grid gap-5 xl:grid-cols-3">
                {homeForm.categoryCards.map((card, index) => (
                  <div
                    key={`${card.name}-${index}`}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="aspect-[4/5] overflow-hidden rounded-lg bg-white">
                      {card.image ? (
                        <img
                          src={card.image}
                          alt={card.imageAlt || card.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm font-bold text-slate-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="mt-4 space-y-3">
                      <label>
                        <span className="text-sm font-bold text-slate-700">
                          Card Title
                        </span>
                        <input
                          value={card.name}
                          onChange={(event) =>
                            updateCategoryCard(index, "name", event.target.value)
                          }
                          className="mt-2 h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                          placeholder="Household"
                        />
                      </label>

                      <label>
                        <span className="text-sm font-bold text-slate-700">
                          Button Text
                        </span>
                        <input
                          value={card.buttonText}
                          onChange={(event) =>
                            updateCategoryCard(
                              index,
                              "buttonText",
                              event.target.value,
                            )
                          }
                          className="mt-2 h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                          placeholder="Shop Now"
                        />
                      </label>

                      <label>
                        <span className="text-sm font-bold text-slate-700">
                          Card Link
                        </span>
                        <input
                          value={card.href}
                          onChange={(event) =>
                            updateCategoryCard(index, "href", event.target.value)
                          }
                          className="mt-2 h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                          placeholder="/household"
                        />
                      </label>

                      <label>
                        <span className="text-sm font-bold text-slate-700">
                          Image Link
                        </span>
                        <input
                          value={card.image}
                          onChange={(event) =>
                            updateCategoryCard(index, "image", event.target.value)
                          }
                          className="mt-2 h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                          placeholder="/images/category.jpg or https://..."
                        />
                      </label>

                      <label>
                        <span className="text-sm font-bold text-slate-700">
                          Image Alt Text
                        </span>
                        <input
                          value={card.imageAlt}
                          onChange={(event) =>
                            updateCategoryCard(
                              index,
                              "imageAlt",
                              event.target.value,
                            )
                          }
                          className="mt-2 h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                          placeholder="Household"
                        />
                      </label>

                      <label className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50">
                        <Upload className="h-4 w-4" />
                        Upload Card Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) =>
                            handleCategoryImageUpload(index, event)
                          }
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="container mx-auto grid gap-5 px-4 py-6 xl:grid-cols-[340px_1fr_300px]">
          <aside className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold text-slate-950">Product List</h2>
                  <p className="text-xs text-slate-500">
                    Click any item to edit it.
                  </p>
                </div>
                <button
                  onClick={startNewProduct}
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-3 text-sm font-bold text-white hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>

              <label className="mt-4 flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 focus-within:border-primary">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search product"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </label>
            </div>

            <div className="max-h-[700px] space-y-2 overflow-y-auto p-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`rounded-md border p-2 transition-colors ${
                    selectedId === product.id
                      ? "border-primary bg-primary/5"
                      : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <button
                    onClick={() => selectProduct(product)}
                    className="flex w-full items-center gap-3 text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-14 rounded-md bg-slate-100 object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 text-sm font-bold text-slate-900">
                        {product.name}
                      </span>
                      <span className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
                        ${product.price.toFixed(2)}
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 capitalize">
                          {product.category}
                        </span>
                      </span>
                    </span>
                    {product.visible === false ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-green-600" />
                    )}
                  </button>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => selectProduct(product)}
                      className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteProduct(product.id);
                        if (selectedId === product.id) {
                          startNewProduct();
                        }
                        toast({
                          title: "Deleted",
                          description: `${product.name} was removed.`,
                        });
                      }}
                      className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-red-200 bg-white text-xs font-bold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-950">
                    <Pencil className="h-5 w-5 text-primary" />
                    {selectedId ? "Edit Product" : "Add New Product"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Fill the important fields first: name, price, image, and description.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedId && (
                    <>
                      <button
                        onClick={duplicateProduct}
                        className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </button>
                      <button
                        onClick={removeProduct}
                        className="inline-flex h-10 items-center gap-2 rounded-md border border-red-200 px-3 text-sm font-bold text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </>
                  )}
                  <button
                    onClick={saveProduct}
                    className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-white hover:bg-primary/90"
                  >
                    <Save className="h-4 w-4" />
                    Save Product
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-2">
              <label className="lg:col-span-2">
                <span className="text-sm font-bold text-slate-700">
                  Product Name
                </span>
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                  placeholder="Example: Electric Spin Scrubber"
                />
              </label>

              <label>
                <span className="text-sm font-bold text-slate-700">
                  Price
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      price: Number(event.target.value),
                    }))
                  }
                  className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                />
              </label>

              <label>
                <span className="text-sm font-bold text-slate-700">
                  Stock Quantity
                </span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      stock: Number(event.target.value),
                    }))
                  }
                  className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                />
              </label>

              <label>
                <span className="text-sm font-bold text-slate-700">
                  Category
                </span>
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value as ProductCategory,
                    }))
                  }
                  className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                >
                  <option value="kitchen">Kitchen</option>
                  <option value="household">Household</option>
                  <option value="electronic">Electronic</option>
                </select>
              </label>

              <label>
                <span className="text-sm font-bold text-slate-700">
                  Badge
                </span>
                <input
                  value={form.badge ?? ""}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      badge: event.target.value,
                    }))
                  }
                  className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                  placeholder="Best Seller, New, Sale"
                />
              </label>

              <label className="lg:col-span-2">
                <span className="text-sm font-bold text-slate-700">
                  Image Link
                </span>
                <input
                  value={form.image}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      image: event.target.value,
                    }))
                  }
                  className="mt-2 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-primary"
                  placeholder="/images/product.jpg or https://..."
                />
                <label className="mt-3 inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                  <Upload className="h-4 w-4" />
                  Upload From Computer
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </label>

              <label className="lg:col-span-2">
                <span className="text-sm font-bold text-slate-700">
                  Product Description
                </span>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className="mt-2 min-h-32 w-full rounded-md border border-slate-200 p-3 text-sm outline-none focus:border-primary"
                  placeholder="Write what this product does and why customers should buy it."
                />
              </label>

              <label className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 lg:col-span-2">
                <span>
                  <span className="block text-sm font-bold text-slate-800">
                    Show Product In Store
                  </span>
                  <span className="block text-xs text-slate-500">
                    Turn this off if you want to hide the product.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={form.visible !== false}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      visible: event.target.checked,
                    }))
                  }
                  className="h-5 w-5 accent-primary"
                />
              </label>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="font-bold text-slate-950">Image Preview</h2>
              <div className="mt-3 aspect-square overflow-hidden rounded-lg bg-slate-100">
                {form.image ? (
                  <img
                    src={form.image}
                    alt={form.name || "Product preview"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-slate-400">
                    <ImagePlus className="h-10 w-10" />
                    <span className="mt-2 text-sm font-bold">No image yet</span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="font-bold text-slate-950">Store Preview</h2>
              <div className="mt-3 rounded-lg border border-slate-100 p-3">
                <div className="flex gap-3">
                  <img
                    src={
                      form.image ||
                      "https://placehold.co/160x160/f5f5f5/888888?text=Product"
                    }
                    alt={form.name || "Product preview"}
                    className="h-20 w-20 rounded-md bg-slate-100 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-bold text-slate-950">
                      {form.name || "Product name"}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase text-slate-400">
                      {form.category}
                    </p>
                    <p className="mt-2 text-lg font-extrabold text-primary">
                      ${Number(form.price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="font-bold text-slate-950">Backup Tools</h2>
              <p className="mt-1 text-xs text-slate-500">
                Use this only when you want to copy or restore product data.
              </p>
              <textarea
                value={importValue}
                onChange={(event) => setImportValue(event.target.value)}
                placeholder="Paste backup JSON here"
                className="mt-3 min-h-24 w-full rounded-md border border-slate-200 p-3 text-xs outline-none focus:border-primary"
              />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={exportProducts}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button>
                <button
                  onClick={importProducts}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  <Upload className="h-4 w-4" />
                  Import
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                resetProducts();
                startNewProduct();
                toast({
                  title: "Reset complete",
                  description: "Default products have been restored.",
                });
              }}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Default Products
            </button>
          </aside>
        </div>
      </main>

    </div>
  );
}
