"use client";

import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

// API Response অনুযায়ী Interface
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
}

const PriceTicker = () => {
  const [products, setProducts] = React.useState<IProduct[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products"
        );
        const data = await res.json();
        // API থেকে array বা data property আসবে
        setProducts(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products || products.length === 0) return null;

  return (
    <div className="bg-[#f8faf9] border-y border-gray-200 py-2.5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        <MarqueeText
          className="flex items-center text-gray-800"
          direction="right"
          duration={15}
        >
          {products.map((item, ind) => {
            
            const isUp = item.change?.dir === "up";
            const changePct = item.change?.pct;

            
            const displayUnit = item.unit === "kg" ? "কেজি" : item.unit;

            return (
              <div
                key={item.id || ind}
                className="inline-flex items-center gap-2 px-6 border-r border-gray-200 text-sm md:text-base shrink-0"
              >
                
                {(item.categoryIcon || item.image) && (
                  <span className="text-lg">
                    {item.categoryIcon || item.image}
                  </span>
                )}

               
                <span className="font-semibold text-gray-900">
                  {item.nameBn}
                </span>

               
                <span className="text-gray-700">
                  {item.today} টাকা/{displayUnit}
                </span>

               
                {changePct !== undefined && changePct !== null && (
                  <span
                    className={`inline-flex items-center gap-0.5 font-semibold text-xs md:text-sm ${
                      isUp ? "text-red-600" : "text-emerald-600"
                    }`}
                  >
                    <span>{isUp ? "▲" : "▼"}</span>
                    <span>{Math.abs(changePct)}%</span>
                  </span>
                )}
              </div>
            );
          })}
        </MarqueeText>
      </div>
    </div>
  );
};

export default PriceTicker;