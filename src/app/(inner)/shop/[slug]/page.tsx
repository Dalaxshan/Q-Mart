"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ShortService from "@/components/service/ShortService";
import RelatedProduct from "@/components/product/RelatedProduct";
import FooterThree from "@/components/footer/FooterThree";
import { useParams } from "next/navigation";

import { useCart } from "@/components/header/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productApi } from "@/app/api/products/client";
import HeaderTwo from "@/components/header/HeaderTwo";
import { formatPrice } from "@/app/lib/price-format";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type Relation = string | { name: string } | undefined;
type ImageInput = string | { url?: string; alt?: string };
type NumberLike = number | string | null | undefined;

interface GalleryImage {
  url: string;
  alt: string;
}

interface ProductVariant {
  _id?: string;
  id?: string;
  label: string;
  sku?: string;
  unit?: string;
  price?: NumberLike;
  salePrice?: NumberLike;
  stock?: number;
  images?: ImageInput[];
  weight?: number;
}

interface ProductDetail {
  _id: string;
  name: string;
  description?: string;
  shortDescription?: string;
  category?: Relation;
  brand?: Relation;
  images?: ImageInput[];
  price?: NumberLike;
  salePrice?: NumberLike;
  sku?: string;
  stock?: number;
  unit?: string;
  specifications?: { key: string; value: string; _id?: string }[];
  variants?: ProductVariant[];
  tags?: string[];
  rating?: number;
  reviewCount?: number;
}

type PageStatus = "loading" | "error" | "ready";
type TabKey = "details" | "specs" | "reviews";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const LOW_STOCK_AT = 5;
const MAX_QTY_WITHOUT_STOCK_INFO = 99;

const getRelationName = (relation: Relation): string =>
  typeof relation === "string" ? relation : (relation?.name ?? "");

const toNum = (value: NumberLike): number | undefined => {
  if (value === null || value === undefined || value === "") return undefined;
  const n = typeof value === "number" ? value : parseFloat(value);
  return Number.isFinite(n) ? n : undefined;
};

const fmt = (value: number | undefined): string =>
  value === undefined
    ? ""
    : formatPrice(value as unknown as Parameters<typeof formatPrice>[0]);

const variantKey = (v: ProductVariant): string =>
  v._id ?? v.id ?? v.sku ?? v.label;

const normalizeImages = (
  images: ImageInput[] | undefined,
  alt: string,
): GalleryImage[] =>
  (images ?? [])
    .map((img) =>
      typeof img === "string"
        ? { url: img, alt }
        : { url: img?.url ?? "", alt: img?.alt || alt },
    )
    .filter((img) => img.url);

const getPricing = (src: { price?: NumberLike; salePrice?: NumberLike }) => {
  const regular = toNum(src.price);
  const sale = toNum(src.salePrice);
  if (sale !== undefined && regular !== undefined && sale < regular) {
    return { current: sale, original: regular as number | undefined };
  }
  return {
    current: regular ?? sale,
    original: undefined as number | undefined,
  };
};

/* ------------------------------------------------------------------ */
/* UI pieces                                                           */
/* ------------------------------------------------------------------ */
function Stars({ rating = 0 }: { rating?: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 text-[13px] text-[#f5a623]"
      aria-hidden="true"
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          className={
            rating >= i
              ? "fas fa-star"
              : rating >= i - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
          }
        />
      ))}
    </span>
  );
}

/** Gallery: big image on top, thumbnails in a row underneath (all screen sizes). */
function Gallery({ images, name }: { images: GalleryImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const [lightbox, setLightbox] = useState(false);

  const count = images.length;
  const safeIndex = Math.min(active, Math.max(count - 1, 0));
  const current = images[safeIndex];

  const go = useCallback(
    (index: number) => {
      if (!count) return;
      setLoaded(false);
      setActive((index + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(safeIndex + 1);
      if (e.key === "ArrowLeft") go(safeIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, go, safeIndex]);

  if (!current) {
    return (
      <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 text-sm text-gray-400">
        <i className="fa-regular fa-image text-3xl" />
        No image available
      </div>
    );
  }

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({
      on: true,
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <div>
      <div
        className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl bg-white"
        onMouseMove={onMove}
        onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
        onClick={() => setLightbox(true)}
        role="button"
        tabIndex={0}
        aria-label="Open larger image"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLightbox(true);
          }
        }}
      >
        <img
          key={current.url}
          src={current.url}
          alt={current.alt}
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`h-full w-full object-contain transition-[opacity,transform] duration-300 ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: zoom.on ? "scale(1.8)" : "scale(1)",
            transformOrigin: `${zoom.x}% ${zoom.y}%`,
          }}
        />

        {count > 1 && (
          <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white">
            {safeIndex + 1} / {count}
          </span>
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                go(safeIndex - 1);
              }}
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 opacity-0 shadow transition group-hover:opacity-100 focus:opacity-100 max-lg:opacity-100"
            >
              <i className="fa-regular fa-chevron-left" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                go(safeIndex + 1);
              }}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 opacity-0 shadow transition group-hover:opacity-100 focus:opacity-100 max-lg:opacity-100"
            >
              <i className="fa-regular fa-chevron-right" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <ul
          className="m-0 mt-3 flex list-none gap-2 overflow-x-auto p-0 pb-1"
          aria-label={`${name} images`}
        >
          {images.map((img, i) => {
            const selected = i === safeIndex;
            return (
              <li key={`${img.url}-${i}`} className="m-0 shrink-0 p-0">
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show image ${i + 1} of ${count}`}
                  aria-pressed={selected}
                  className={`block h-16 w-16 overflow-hidden rounded-lg bg-white p-1 ring-2 transition sm:h-[72px] sm:w-[72px] ${
                    selected
                      ? "ring-[#629d23]"
                      : "ring-gray-200 hover:ring-gray-400"
                  }`}
                >
                  <img
                    src={img.url}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} image preview`}
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white hover:bg-white/30"
          >
            <i className="fa-regular fa-xmark" />
          </button>
          {count > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                go(safeIndex - 1);
              }}
              className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
            >
              <i className="fa-regular fa-chevron-left" />
            </button>
          )}
          <img
            src={current.url}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-lg bg-white object-contain"
          />
          {count > 1 && (
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                go(safeIndex + 1);
              }}
              className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
            >
              <i className="fa-regular fa-chevron-right" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function PageSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-[1696px] px-[15px] py-8"
      aria-busy="true"
      aria-label="Loading product"
    >
      <div className="grid animate-pulse gap-6 lg:grid-cols-2 xl:grid-cols-[1.15fr_1fr_340px]">
        <div className="aspect-square rounded-2xl bg-gray-200" />
        <div className="space-y-4 rounded-2xl bg-gray-100 p-6">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-8 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-20 w-full rounded bg-gray-200" />
        </div>
        <div className="h-72 rounded-2xl bg-gray-100" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
const CompareElements: React.FC = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [status, setStatus] = useState<PageStatus>("loading");
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);
  const [formError, setFormError] = useState("");
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("details");
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setSelectedVariantId(null);
    setQuantity(1);
    setFormError("");

    const fetchProduct = async () => {
      try {
        const fetched = (await productApi.getOneProduct(
          slug as string,
        )) as unknown as ProductDetail;
        if (cancelled) return;
        if (!fetched) {
          setStatus("error");
          return;
        }
        setProduct(fetched);
        setStatus("ready");
      } catch (error) {
        console.error("Error fetching product:", error);
        if (!cancelled) setStatus("error");
      }
    };

    void fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [slug, reloadKey]);

  useEffect(
    () => () => {
      if (addedTimer.current) clearTimeout(addedTimer.current);
    },
    [],
  );

  const variants = useMemo(() => product?.variants ?? [], [product]);
  const hasVariants = variants.length > 0;

  const selectedVariant = useMemo(
    () => variants.find((v) => variantKey(v) === selectedVariantId) ?? null,
    [variants, selectedVariantId],
  );

  const galleryImages = useMemo(() => {
    if (!product) return [];
    const parentImages = normalizeImages(product.images, product.name);
    if (selectedVariant) {
      const own = normalizeImages(
        selectedVariant.images,
        `${product.name} - ${selectedVariant.label}`,
      );
      if (own.length > 0) return own;
    }
    return parentImages;
  }, [product, selectedVariant]);

  if (status === "loading") {
    return (
      <div className="bg-gray-50">
        <HeaderTwo />
        <PageSkeleton />
      </div>
    );
  }

  if (status === "error" || !product) {
    return (
      <div>
        <HeaderTwo />
        <div className="mx-auto flex w-full max-w-[1696px] flex-col items-center gap-4 px-[15px] py-24 text-center">
          <i className="fa-regular fa-triangle-exclamation text-4xl text-gray-400" />
          <h2 className="m-0 text-xl font-semibold text-[#1f1f25]">
            We couldn&apos;t load this product
          </h2>
          <p className="m-0 text-gray-500">
            Please check your connection and try again.
          </p>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="rounded-lg bg-[#629d23] px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const categoryName = getRelationName(product.category);
  const brandName = getRelationName(product.brand);

  /* ---- pricing / stock for the current selection ---- */
  const pricing = (() => {
    if (selectedVariant) {
      const own = getPricing(selectedVariant);
      return own.current !== undefined ? own : getPricing(product);
    }
    return getPricing(product);
  })();

  let rangeMin: number | undefined;
  let rangeMax: number | undefined;
  if (hasVariants && !selectedVariant) {
    const prices = variants
      .map((v) => getPricing(v).current)
      .filter((p): p is number => p !== undefined);
    if (prices.length) {
      rangeMin = Math.min(...prices);
      rangeMax = Math.max(...prices);
    }
  }
  const showRange =
    rangeMin !== undefined && rangeMax !== undefined && rangeMin !== rangeMax;
  const displayPrice = rangeMin !== undefined ? rangeMin : pricing.current;

  const stock: number | undefined = hasVariants
    ? selectedVariant?.stock
    : product.stock;
  const needsSelection = hasVariants && !selectedVariant;
  const outOfStock = !needsSelection && stock !== undefined && stock <= 0;
  const maxQty =
    stock !== undefined ? Math.max(stock, 0) : MAX_QTY_WITHOUT_STOCK_INFO;
  const canBuy = !needsSelection && !outOfStock;

  const displaySku = selectedVariant?.sku ?? product.sku;
  const displayUnit = selectedVariant?.unit ?? product.unit;

  const stockInfo = (() => {
    if (needsSelection)
      return {
        text: "Choose an option to check availability",
        cls: "bg-gray-100 text-gray-600",
        icon: "fa-regular fa-circle-info",
      };
    if (stock === undefined)
      return {
        text: "In stock",
        cls: "bg-[#eef7e2] text-[#3f6a12]",
        icon: "fa-regular fa-circle-check",
      };
    if (stock <= 0)
      return {
        text: "Out of stock",
        cls: "bg-red-50 text-red-600",
        icon: "fa-regular fa-circle-xmark",
      };
    if (stock <= LOW_STOCK_AT)
      return {
        text: `Only ${stock} left in stock`,
        cls: "bg-amber-50 text-amber-700",
        icon: "fa-regular fa-triangle-exclamation",
      };
    return {
      text: `In stock · ${stock} available`,
      cls: "bg-[#eef7e2] text-[#3f6a12]",
      icon: "fa-regular fa-circle-check",
    };
  })();

  /* ---- handlers ---- */
  const selectVariant = (variant: ProductVariant) => {
    if ((variant.stock ?? 1) <= 0) return;
    setSelectedVariantId(variantKey(variant));
    setQuantity(1);
    setFormError("");
  };

  const changeQty = (next: number) => {
    if (Number.isNaN(next)) return;
    setQuantity(Math.min(Math.max(next, 1), Math.max(maxQty, 1)));
    setFormError("");
  };

  const handleAdd = async () => {
    setFormError("");

    if (needsSelection) {
      setFormError("Please select an option before adding to cart.");
      document
        .getElementById("variant-picker")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setAdding(true);
    try {
      // The API is the source of truth for price and stock: re-check right before adding.
      let latest: ProductDetail = product;
      let latestVariant: ProductVariant | null = selectedVariant;
      try {
        const fresh = (await productApi.getOneProduct(
          slug as string,
        )) as unknown as ProductDetail;
        if (fresh) {
          latest = fresh;
          setProduct(fresh);
          if (selectedVariant) {
            const key = variantKey(selectedVariant);
            latestVariant =
              fresh.variants?.find((v) => variantKey(v) === key) ?? null;
          }
        }
      } catch {
        // API hiccup: continue with the data already on the page
      }

      if (hasVariants && !latestVariant) {
        setSelectedVariantId(null);
        setFormError(
          "This option is no longer available. Please choose another.",
        );
        return;
      }

      const lineSource = latestVariant ?? latest;
      const available = lineSource.stock;
      if (available !== undefined && available <= 0) {
        setFormError("Sorry, this item is out of stock.");
        return;
      }
      if (available !== undefined && quantity > available) {
        setQuantity(available);
        setFormError(`Only ${available} left in stock. Quantity updated.`);
        return;
      }

      const variantPricing = latestVariant
        ? getPricing(latestVariant)
        : undefined;
      const linePricing =
        variantPricing && variantPricing.current !== undefined
          ? variantPricing
          : getPricing(latest);
      if (linePricing.current === undefined) {
        setFormError("The price for this item is unavailable right now.");
        return;
      }

      const variantImages = latestVariant
        ? normalizeImages(latestVariant.images, latest.name)
        : [];
      const image =
        variantImages[0]?.url ??
        normalizeImages(latest.images, latest.name)[0]?.url ??
        "";

      const cartItem = {
        _id: latest._id,
        productId: latest._id,
        variantId: latestVariant ? variantKey(latestVariant) : undefined,
        variantLabel: latestVariant?.label,
        image,
        title: latestVariant
          ? `${latest.name} (${latestVariant.label})`
          : latest.name,
        price: linePricing.current,
        quantity,
        sku: latestVariant?.sku ?? latest.sku,
        active: true,
      };

      addToCart(cartItem);
      setAdded(true);
      toast("Successfully Added To Cart!");
      if (addedTimer.current) clearTimeout(addedTimer.current);
      addedTimer.current = setTimeout(() => setAdded(false), 5000);
    } finally {
      setAdding(false);
    }
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "details", label: "Description" },
    ...(product.specifications?.length
      ? [{ key: "specs" as const, label: "Specifications" }]
      : []),
    { key: "reviews", label: `Reviews (${product.reviewCount ?? 0})` },
  ];

  const addLabel = adding
    ? "Adding..."
    : added
      ? "Added to Cart"
      : needsSelection
        ? "Select an Option"
        : outOfStock
          ? "Out of Stock"
          : "Add to Cart";

  const addBtnCls = `flex h-20 w-full items-center justify-center gap-2.5 rounded-lg text-[15px] font-semibold text-white transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#629d23]/30 ${
    outOfStock
      ? "cursor-not-allowed bg-gray-300"
      : added
        ? "bg-[#4a7a17]"
        : "bg-[#629d23] hover:brightness-110 active:scale-[0.99]"
  } ${adding ? "opacity-80" : ""}`;

  const addIcon = adding
    ? "fa-regular fa-spinner-third fa-spin"
    : added
      ? "fa-regular fa-check"
      : "fa-regular fa-cart-shopping";

  const facts = [
    brandName && { label: "Brand", value: brandName },
    displayUnit && { label: "Unit", value: displayUnit },
    displaySku && { label: "SKU", value: displaySku },
    selectedVariant?.weight !== undefined && {
      label: "Weight",
      value: `${selectedVariant.weight} kg`,
    },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="bg-gray-50">
      <HeaderTwo />

      {/* Breadcrumb */}
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="m-auto w-full max-w-[1696px] px-[15px]">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full shrink-0 px-[0.75rem]">
              <div className="navigator-breadcrumb-wrapper">
                <a href="/">Home</a>
                <i className="fa-regular fa-chevron-right" />
                {categoryName && (
                  <>
                    <a href="/shop">{categoryName}</a>
                    <i className="fa-regular fa-chevron-right" />
                  </>
                )}
                <a className="current" href="#">
                  {product.name}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="pb-24 lg:pb-12">
        <div className="mx-auto w-full max-w-[1696px] px-[15px] pt-2">
          {/* ===== Gallery | Info | Buy box ===== */}
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_340px]">
            {/* Gallery card (remounts per variation so the active thumbnail resets) */}
            <section
              className="rounded-2xl border border-gray-200 bg-white p-4 lg:row-span-2 xl:row-span-1"
              aria-label="Product images"
            >
              <Gallery
                key={selectedVariantId ?? "default"}
                images={galleryImages}
                name={product.name}
              />
            </section>

            {/* Info card */}
            <section
              className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 md:p-6"
              aria-label="Product information"
            >
              <div className="flex flex-wrap items-center gap-3">
                {categoryName && (
                  <span className="rounded-md bg-[#eef7e2] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#3f6a12]">
                    {categoryName}
                  </span>
                )}
                {/* {(product.reviewCount ?? 0) > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("reviews");
                      document.getElementById("product-tabs")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#629d23]"
                  >
                    <Stars rating={product.rating} />
                    <span>
                      {product.rating?.toFixed(1)} ({product.reviewCount})
                    </span>
                  </button>
                )} */}
              </div>

              <h1 className="m-0 mt-3 text-2xl font-bold leading-snug text-[#1f1f25] md:text-[28px]">
                {product.name}
              </h1>

              {product.shortDescription && (
                <p className="m-0 mt-3 text-[15px] leading-relaxed text-gray-600">
                  {product.shortDescription}
                </p>
              )}

              {facts.length > 0 && (
                <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
                  {facts.map((f) => (
                    <li
                      key={f.label}
                      className="m-0 rounded-lg bg-gray-50 px-3 py-1.5 text-[13px] ring-1 ring-gray-200"
                    >
                      <span className="text-gray-500">{f.label}: </span>
                      <span className="font-semibold text-[#1f1f25]">
                        {f.value}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Variations */}
              {hasVariants && (
                <div
                  id="variant-picker"
                  className="mt-6 border-t border-gray-100 pt-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1f1f25]">
                      Choose option
                      {selectedVariant && (
                        <span className="ml-2 font-normal text-gray-500">
                          {selectedVariant.label}
                        </span>
                      )}
                    </span>
                    {selectedVariant && (
                      <button
                        type="button"
                        onClick={() => setSelectedVariantId(null)}
                        className="text-xs font-medium text-gray-500 underline hover:text-[#629d23]"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div
                    role="group"
                    aria-label="Product options"
                    className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
                  >
                    {variants.map((variant) => {
                      const key = variantKey(variant);
                      const selected = key === selectedVariantId;
                      const soldOut = (variant.stock ?? 1) <= 0;
                      const vPrice = getPricing(variant).current;
                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={soldOut}
                          aria-pressed={selected}
                          onClick={() => selectVariant(variant)}
                          className={`relative rounded-lg border px-3 py-2.5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#629d23]/50 ${
                            selected
                              ? "border-[#629d23] bg-[#f4faec] ring-1 ring-[#629d23]"
                              : soldOut
                                ? "cursor-not-allowed border-dashed border-gray-300 bg-gray-50"
                                : "border-gray-300 bg-white hover:border-[#629d23]"
                          }`}
                        >
                          <span
                            className={`block text-sm font-semibold ${
                              soldOut
                                ? "text-gray-400 line-through"
                                : selected
                                  ? "text-[#3f6a12]"
                                  : "text-[#1f1f25]"
                            }`}
                          >
                            {variant.label}
                          </span>
                          <span
                            className={`mt-0.5 block text-xs ${soldOut ? "text-red-500" : "text-gray-500"}`}
                          >
                            {soldOut ? "Out of stock" : fmt(vPrice)}
                          </span>
                          {selected && (
                            <i
                              className="fa-solid fa-circle-check absolute right-2 top-2 text-[15px] text-[#629d23]"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {(product.tags?.length ?? 0) > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-5">
                  <span className="text-sm font-semibold text-[#1f1f25]">
                    Tags
                  </span>
                  {product.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Purchase card */}
            <aside
              className="h-fit rounded-2xl border border-gray-200 bg-white p-5 md:p-6 xl:sticky xl:top-28"
              aria-label="Purchase"
            >
              <div aria-live="polite">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {needsSelection
                    ? showRange
                      ? "Price range"
                      : "Price"
                    : "Price"}
                </span>
                {displayPrice !== undefined ? (
                  <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                    <span className="text-3xl font-bold text-[#DC2626]">
                      {fmt(displayPrice)}
                    </span>
                    {showRange && (
                      <span className="text-lg font-semibold text-gray-500">
                        – {fmt(rangeMax)}
                      </span>
                    )}
                    {!needsSelection && pricing.original !== undefined && (
                      <span className="text-base text-gray-400 line-through">
                        {fmt(pricing.original)}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="m-0 mt-1 text-lg text-gray-500">
                    Price unavailable
                  </p>
                )}
                {!needsSelection && displayUnit && (
                  <p className="m-0 mt-0.5 text-sm text-gray-500">
                    per {displayUnit}
                  </p>
                )}
              </div>

              <div
                className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${stockInfo.cls}`}
                aria-live="polite"
              >
                <i className={stockInfo.icon} />
                {stockInfo.text}
              </div>

              <div className="mt-5">
                <span className="mb-2 block text-sm font-semibold text-[#1f1f25]">
                  Quantity
                </span>
                <div
                  className={`inline-flex items-center rounded-lg p-2 border border-gray-300 ${canBuy ? "" : "pointer-events-none opacity-50"}`}
                  role="group"
                  aria-label="Quantity"
                >
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={!canBuy || quantity <= 1}
                    onClick={() => changeQty(quantity - 1)}
                    className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
                  >
                    <i className="fa-regular fa-minus" />
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={maxQty}
                    value={quantity}
                    disabled={!canBuy}
                    aria-label="Quantity"
                    onChange={(e) => changeQty(parseInt(e.target.value, 10))}
                    className="h-11 w-24 border-x border-gray-200 bg-transparent text-center text-base font-semibold text-[#1f1f25] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={!canBuy || quantity >= maxQty}
                    onClick={() => changeQty(quantity + 1)}
                    className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
                  >
                    <i className="fa-regular fa-plus" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => void handleAdd()}
                disabled={adding || outOfStock}
                className={`${addBtnCls} mt-5 h-20`}
              >
                <i className={addIcon} />
                {addLabel}
              </button>

              {formError && (
                <p
                  role="alert"
                  className="m-0 mt-3 flex items-start gap-2 text-sm font-medium text-red-600"
                >
                  <i className="fa-regular fa-circle-exclamation mt-0.5" />
                  {formError}
                </p>
              )}

              <ul className="m-0 mt-5 list-none space-y-2.5 border-t border-gray-100 p-0 pt-5 text-sm text-gray-600">
                <li className="m-0 flex items-center gap-2.5 p-0">
                  <i className="fa-regular fa-shield-check w-5 text-center text-[#629d23]" />
                  Guaranteed safe checkout
                </li>
              </ul>
              <Image
                src="/assets/images/shop/03.png"
                width={300}
                height={50}
                alt="Accepted payment methods"
                className="max-w-full pt-0"
              />
            </aside>
          </div>

          {/* ===== Offers ===== */}
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              {
                icon: "/assets/images/shop/01.svg",
                text: "Get 5% instant discount for the 1st  Order using QuickMart website.",
              },
              {
                icon: "/assets/images/shop/02.svg",
                text: "Flat LKR 250 off on Sampath Bank Credit Card EMI Transactions over LKR 30",
              },
              {
                icon: "/assets/images/shop/03.svg",
                text: "Free all Island Shipping on all orders over LKR 5,000",
              },
            ].map((offer) => (
              <div
                key={offer.icon}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4"
              >
                <Image src={offer.icon} width={40} height={20} alt="" />
                <p className="m-0 text-sm leading-snug text-gray-600">
                  {offer.text}
                </p>
              </div>
            ))}
          </div>

          {/* ===== Tabs ===== */}
          <section
            id="product-tabs"
            className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 md:p-6"
          >
            <div
              role="tablist"
              aria-label="Product information"
              className="flex gap-2 overflow-x-auto pb-1"
            >
              {tabs.map((tab) => {
                const selected = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    id={`tab-${tab.key}`}
                    aria-selected={selected}
                    aria-controls={`panel-${tab.key}`}
                    onClick={() => setActiveTab(tab.key)}
                    className={`whitespace-nowrap rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold transition  h-15  ${
                      selected
                        ? "bg-[#629d23] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              className="pt-6"
              role="tabpanel"
              id={`panel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
            >
              {activeTab === "details" && (
                <p className="m-0 max-w-4xl leading-relaxed text-gray-600">
                  {product.description ||
                    "No description available for this product."}
                </p>
              )}

              {activeTab === "specs" && (
                <table className="w-full max-w-3xl border-collapse text-sm">
                  <tbody>
                    {product.specifications?.map((spec, i) => (
                      <tr
                        key={spec._id ?? spec.key}
                        className={i % 2 === 0 ? "bg-gray-50" : ""}
                      >
                        <th
                          scope="row"
                          className="w-1/3 px-4 py-3 text-left font-semibold text-[#1f1f25]"
                        >
                          {spec.key}
                        </th>
                        <td className="px-4 py-3 text-gray-600">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "reviews" && (
                <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-[#dcebc9] bg-[#f7fbf2] p-6 text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#629d23]">
                      Overall rating
                    </span>
                    <div className="mt-3 text-5xl font-bold leading-none text-[#1f1f25]">
                      {(product.rating ?? 0).toFixed(1)}
                    </div>
                    <div className="mt-3">
                      <Stars rating={product.rating} />
                    </div>
                    <p className="m-0 mt-2 text-sm text-gray-500">
                      Based on <span className="font-semibold text-gray-700">{product.reviewCount ?? 0}</span>{" "}
                      {product.reviewCount === 1 ? "review" : "reviews"}
                    </p>
                  </div>

                  <form action="#" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div>
                        <h5 className="m-0 text-xl font-bold text-[#1f1f25]">
                          Share your experience
                        </h5>
                        <p className="m-0 mt-1 text-sm text-gray-500">
                          Your feedback helps other shoppers make better choices.
                        </p>
                      </div>
                      <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#f2f9ea] text-[#629d23] sm:flex">
                        <i className="fa-regular fa-message-quote" />
                      </span>
                    </div>

                    <fieldset className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <legend className="px-1 text-sm font-semibold text-[#1f1f25]">Your rating</legend>
                      <div className="flex items-center gap-3">
                        <span className="flex gap-1 text-lg text-[#f5a623]" aria-label="5 out of 5 stars">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <i key={i} className="fa-solid fa-star" />
                          ))}
                        </span>
                        <span className="text-xs text-gray-500">Excellent</span>
                      </div>
                    </fieldset>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-semibold text-[#1f1f25]">Name</span>
                        <input
                          type="text"
                          placeholder="Your name"
                          className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#629d23] focus:ring-4 focus:ring-[#629d23]/10"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-semibold text-[#1f1f25]">Email</span>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#629d23] focus:ring-4 focus:ring-[#629d23]/10"
                        />
                      </label>
                    </div>

                    <label className="mt-5 block">
                      <span className="mb-1.5 block text-sm font-semibold text-[#1f1f25]">Review</span>
                      <textarea
                        placeholder="Tell us what you liked about this product..."
                        rows={5}
                        className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm leading-relaxed outline-none transition placeholder:text-gray-400 focus:border-[#629d23] focus:ring-4 focus:ring-[#629d23]/10"
                      />
                    </label>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="m-0 text-xs text-gray-500">Your email address will not be published.</p>
                      <button
                        type="submit"
                        className="inline-flex h-20 items-center justify-center gap-2 rounded-xl bg-[#629d23] px-7 text-sm font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-[#629d23]/25"
                      >
                        <i className="fa-regular fa-paper-plane" />
                        Submit review
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Mobile / tablet sticky buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-gray-200 bg-white p-3 shadow-[0_-6px_20px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="min-w-0 shrink-0">
          <div className="text-xs text-gray-500">
            {needsSelection && showRange ? "From" : "Price"}
          </div>
          <div className="text-lg font-bold leading-tight text-[#DC2626]">
            {displayPrice !== undefined ? fmt(displayPrice) : "—"}
          </div>
        </div>
        <button
          type="button"
          onClick={() => void handleAdd()}
          disabled={adding || outOfStock}
          className={`${addBtnCls} flex-1`}
        >
          <i className={addIcon} />
          {addLabel}
        </button>
      </div>

      <RelatedProduct categoryName={categoryName} />
      <ShortService />
      <FooterThree />
      <ToastContainer />
    </div>
  );
};

export default CompareElements;
