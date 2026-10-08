"use client";

import React, { useEffect, useState } from "react";

// Interface data API kee
export interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface IProduct {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  unit: string;
  image?: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: {
    dir: "up" | "down" | string;
    pct: number;
  };
  markets?: IMarket[];
}

const PriceOverview = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products"
        );
        const data = await res.json();
        const productList = Array.isArray(data) ? data : data.data || [];
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Fe'amaa jira...</div>;
  }

  // Gatiin isaanii 6 dabalan fi 6 hir'atan qofa muranii fudhachuu (.slice(0, 6))
  const priceIncreased = products
    .filter((item) => item.change?.dir === "up")
    .slice(0, 6);

  const priceDecreased = products
    .filter((item) => item.change?.dir === "down")
    .slice(0, 6);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Kutaa 1: Gatiin Har'a Dabale (6 Qofa) */}
      {priceIncreased.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-red-600 font-bold text-lg md:text-xl">
            <span>▲</span>
            <h2>আজ দাম বেড়েছে</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {priceIncreased.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Kutaa 2: Gatiin Har'a Hir'ate (6 Qofa) */}
      {priceDecreased.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg md:text-xl">
            <span>▼</span>
            <h2>আজ দাম কমেছে</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {priceDecreased.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

// Kaardii Oomisha Tokkoo
const ProductCard = ({ item }: { item: IProduct }) => {
  const isUp = item.change?.dir === "up";
  const displayUnit = item.unit === "kg" ? "কেজি" : item.unit;

  return (
    <div className="bg-[#f8faf9] border border-gray-100 rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#f0f4f1] flex items-center justify-center text-2xl shrink-0">
          {item.categoryIcon || item.image || "📦"}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base md:text-lg leading-tight">
            {item.nameBn}
          </h3>
          <p className="text-xs text-gray-500 font-normal mt-0.5">
            প্রতি {displayUnit}
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between pt-2">
        <div>
          <span className="text-xs text-gray-500 block mb-0.5">
            আজকের দাম
          </span>
          <span className="text-lg md:text-xl font-bold text-gray-900">
            {item.today} টাকা
          </span>
        </div>

        {item.change?.pct !== undefined && (
          <div
            className={`flex items-center gap-1 font-bold text-xs md:text-sm px-2.5 py-1 rounded-lg ${
              isUp
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-600"
            }`}
          >
            <span>{isUp ? "▲" : "▼"}</span>
            <span>{Math.abs(item.change.pct)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceOverview;