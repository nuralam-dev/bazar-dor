import Link from "next/link";
import { notFound } from "next/navigation";

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার হেলপার ফাংশন
const toBanglaNum = (num: number | string): string => {
  if (num === undefined || num === null) return "০";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[parseInt(digit)]);
};

// Unit নাম বাংলায় রূপান্তর
const getUnitBn = (unit: string): string => {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "প্রতি কেজি";
    case "liter":
    case "l":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
    case "pcs":
      return "প্রতি পিস";
    default:
      return `প্রতি ${unit}`;
  }
};

interface ProductDetailsProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsProps) {
  const { slug } = await params;

  let product = null;

  try {
    const res = await fetch(
      `https://api.api-store.workers.dev/api/bazardor/products/${slug}`,
      { next: { revalidate: 3600 } },
    );
    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }

  // ডাটা না পাওয়া গেলে ৪০৪ পেজ দেখাবে
  if (!product) {
    notFound();
  }

  // Market Calculation (Min, Max, Avg)
  const allMins = product.markets?.map((m: any) => m.min) || [product.today];
  const allMaxs = product.markets?.map((m: any) => m.max) || [product.today];

  const overallMinPrice = Math.min(...allMins);
  const overallMaxPrice = Math.max(...allMaxs);
  const avgPrice =
    product.today || Math.round((overallMinPrice + overallMaxPrice) / 2);

  // Change Badge Direction & Color
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 mb-6 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
      >
        ← হোম পেজে ফিরে যান
      </Link>

      {/* Top Header & Product Summary */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="text-6xl sm:text-7xl bg-emerald-50/80 p-5 rounded-2xl flex items-center justify-center shrink-0">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-emerald-100 text-[#008744] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <span>{product.categoryIcon}</span>
                <span>{product.categoryNameBn}</span>
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                {getUnitBn(product.unit)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
              {product.nameBn}
            </h1>

            <p className="text-gray-500 text-sm md:text-base">
              {product.nameBn}-এর আজকের বাজার দর, সর্বনিম্ন ও সর্বোচ্চ দামের
              বিস্তারিত তথ্য নিচে দেওয়া হলো।
            </p>
          </div>

          {/* Today's Price & Change Badge */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 sm:text-right w-full sm:w-auto">
            <p className="text-xs text-gray-500 font-medium mb-1">
              আজকের গড় দাম
            </p>
            <div className="text-2xl md:text-3xl font-extrabold text-gray-900">
              ৳ {toBanglaNum(product.today)}{" "}
              <span className="text-xs font-normal text-gray-500">
                / {getUnitBn(product.unit)}
              </span>
            </div>

            {/* Percentage Badge */}
            {product.change && (
              <div className="mt-2">
                <span
                  className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md ${
                    isUp
                      ? "bg-emerald-100 text-emerald-800"
                      : isDown
                        ? "bg-rose-100 text-rose-800"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {isUp && "▲ "}
                  {isDown && "▼ "}
                  {!isUp && !isDown && "— "}
                  {toBanglaNum(product.change.pct)}% (গতকাল থেকে)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Price Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-50/60 border border-emerald-100 p-5 rounded-2xl text-center">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">
            সর্বনিম্ন দাম
          </p>
          <p className="text-2xl md:text-3xl font-bold text-emerald-900">
            ৳ {toBanglaNum(overallMinPrice)}
          </p>
        </div>

        <div className="bg-blue-50/60 border border-blue-100 p-5 rounded-2xl text-center">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
            গড় দাম
          </p>
          <p className="text-2xl md:text-3xl font-bold text-blue-900">
            ৳ {toBanglaNum(avgPrice)}
          </p>
        </div>

        <div className="bg-rose-50/60 border border-rose-100 p-5 rounded-2xl text-center">
          <p className="text-xs font-semibold text-rose-700 uppercase tracking-wide mb-1">
            সর্বোচ্চ দাম
          </p>
          <p className="text-2xl md:text-3xl font-bold text-rose-900">
            ৳ {toBanglaNum(overallMaxPrice)}
          </p>
        </div>
      </div>

      {/* Market-wise Prices */}
      <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <span className="text-xs text-gray-500 bg-white border px-2.5 py-1 rounded-md">
            মোট বাজার: {toBanglaNum(product.markets?.length || 0)} টি
          </span>
        </div>

        {product.markets && product.markets.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {product.markets.map((m: any, index: number) => (
              <div
                key={index}
                className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50/80 transition"
              >
                <div>
                  <p className="font-semibold text-gray-900 text-base">
                    {m.market}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    বিভাগ: {m.division}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-base sm:text-lg font-bold text-gray-900">
                    ৳ {toBanglaNum(m.min)} - ৳ {toBanglaNum(m.max)}
                  </div>
                  <span className="text-xs text-gray-500 font-normal">
                    {getUnitBn(product.unit)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 text-sm">
            এই মুহূর্তে আলাদা কোনো বাজারের তথ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
}
