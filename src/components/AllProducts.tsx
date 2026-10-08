"use client";

import { useEffect, useState } from "react";

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

const AllProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products",
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


  const categories = [
    { slug: "all", nameBn: "সব পণ্য" },
    ...Array.from(
      new Map(
        products.map((item) => [
          item.category,
          { slug: item.category, nameBn: item.categoryNameBn },
        ]),
      ).values(),
    ),
  ];

  
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.nameBn
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500 font-medium">
        পণ্য লোড হচ্ছে...
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
     
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            সকল পণ্য
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            মোট ৩৩ টি দেখানো হচ্ছে
          </p>
        </div>

        
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="পণ্য খুঁজুন (যেমন: চাল, পেঁয়াজ)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008744] bg-white"
          />
        </div>
      </div>

      
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium shrink-0 transition-all ${
              selectedCategory === cat.slug
                ? "bg-[#008744] text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.nameBn}
          </button>
        ))}
      </div>

      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

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
          <h3 className="font-bold text-gray-900 text-base leading-tight">
            {item.nameBn}
          </h3>
          <p className="text-xs text-gray-500 font-normal mt-0.5">
            প্রতি {displayUnit}
          </p>
        </div>
      </div>

     
      <div className="flex items-end justify-between pt-2 border-t border-gray-200/50">
        <div>
          <span className="text-xs text-gray-500 block mb-0.5">আজকের দাম</span>
          <span className="text-lg font-bold text-gray-900">
            {item.today} টাকা
          </span>
        </div>

        {item.change?.pct !== undefined && item.change?.pct !== null && (
          <div
            className={`flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-lg ${
              isUp ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
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

export default AllProducts;
