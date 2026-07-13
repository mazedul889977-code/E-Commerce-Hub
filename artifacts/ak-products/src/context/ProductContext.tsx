import { products as defaultProducts, type Product } from "@/data/products";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "ak-products-catalog";
const STORAGE_VERSION_KEY = "ak-products-catalog-version";
const CATALOG_VERSION = "6";

type ProductDraft = Omit<Product, "id"> & { id?: string };

interface ProductContextValue {
  allProducts: Product[];
  products: Product[];
  addProduct: (product: ProductDraft) => Product;
  updateProduct: (id: string, product: ProductDraft) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;
  replaceProducts: (products: Product[]) => void;
}

const ProductContext = createContext<ProductContextValue | undefined>(
  undefined,
);

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    stock: product.stock ?? 0,
    visible: product.visible ?? true,
  };
}

function loadProducts(): Product[] {
  if (typeof window === "undefined") {
    return defaultProducts.map(normalizeProduct);
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return defaultProducts.map(normalizeProduct);
  }

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      return defaultProducts.map(normalizeProduct);
    }

    const loadedProducts = parsed
      .filter((product): product is Product => {
        return (
          product &&
          typeof product.id === "string" &&
          typeof product.name === "string" &&
          typeof product.price === "number" &&
          typeof product.category === "string" &&
          typeof product.image === "string" &&
          typeof product.description === "string"
        );
      })
      .map(normalizeProduct);

    const savedVersion = window.localStorage.getItem(STORAGE_VERSION_KEY);

    const defaultsById = new Map(
      defaultProducts.map((product) => [product.id, normalizeProduct(product)]),
    );
    const migratedProducts = loadedProducts.map((product) => {
      const currentDefault = defaultsById.get(product.id);
      let migratedProduct = product;

      if (currentDefault && product.image.includes("placehold.co")) {
        migratedProduct = { ...migratedProduct, image: currentDefault.image };
      }

      if (currentDefault?.collection && product.collection !== currentDefault.collection) {
        migratedProduct = {
          ...migratedProduct,
          collection: currentDefault.collection,
        };
      }

      return migratedProduct;
    });

    // Reconcile collection products even when an older catalog already has the
    // latest version marker. This restores items removed from localStorage.
    const collectionProducts = defaultProducts.filter(
      (product) =>
        product.collection === "smart-kitchen" ||
        product.collection === "smart-home",
    );
    const missingCollectionProducts = collectionProducts.filter(
      (product) => !migratedProducts.some((savedProduct) => savedProduct.id === product.id),
    );

    if (savedVersion !== CATALOG_VERSION || missingCollectionProducts.length > 0) {
      if (savedVersion !== CATALOG_VERSION) {
        migratedProducts.forEach((product, index) => {
          if (
            (product.collection === "smart-kitchen" ||
              product.collection === "smart-home") &&
            product.visible === false
          ) {
            migratedProducts[index] = { ...product, visible: true };
          }
        });
      }

      missingCollectionProducts.forEach((product) => {
        migratedProducts.push(normalizeProduct(product));
      });

      saveProducts(migratedProducts);
      return migratedProducts;
    }

    return loadedProducts;
  } catch {
    return defaultProducts.map(normalizeProduct);
  }
}

function saveProducts(products: Product[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.localStorage.setItem(STORAGE_VERSION_KEY, CATALOG_VERSION);
  }
}

function createProductId(name: string) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${slug || "product"}-${Date.now().toString(36)}`;
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [allProducts, setAllProducts] = useState<Product[]>(loadProducts);

  const persist = useCallback((nextProducts: Product[]) => {
    setAllProducts(nextProducts);
    saveProducts(nextProducts);
  }, []);

  const addProduct = useCallback(
    (product: ProductDraft) => {
      const nextProduct = normalizeProduct({
        ...product,
        id: product.id?.trim() || createProductId(product.name),
      });

      persist([nextProduct, ...allProducts]);
      return nextProduct;
    },
    [allProducts, persist],
  );

  const updateProduct = useCallback(
    (id: string, product: ProductDraft) => {
      persist(
        allProducts.map((item) =>
          item.id === id
            ? normalizeProduct({
                ...product,
                id,
              })
            : item,
        ),
      );
    },
    [allProducts, persist],
  );

  const deleteProduct = useCallback(
    (id: string) => {
      persist(allProducts.filter((product) => product.id !== id));
    },
    [allProducts, persist],
  );

  const resetProducts = useCallback(() => {
    persist(defaultProducts.map(normalizeProduct));
  }, [persist]);

  const replaceProducts = useCallback(
    (products: Product[]) => {
      persist(products.map(normalizeProduct));
    },
    [persist],
  );

  const value = useMemo(
    () => ({
      allProducts,
      products: allProducts.filter((product) => product.visible !== false),
      addProduct,
      updateProduct,
      deleteProduct,
      resetProducts,
      replaceProducts,
    }),
    [
      allProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      resetProducts,
      replaceProducts,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }

  return context;
}
