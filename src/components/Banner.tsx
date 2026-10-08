import React from "react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-6">
      <div className="bg-[#f2f7f4] border border-gray-100 rounded-3xl p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Left Side Content */}
        <div className="flex-1 space-y-4 text-left z-10">
          {/* Date Badge */}
          <div className="inline-block bg-[#e2f0e8] text-[#008744] text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
            {formattedDate}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-block bg-[#008744] hover:bg-[#007038] text-white font-medium text-sm sm:text-base px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-95"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="w-48 sm:w-64 md:w-80 flex-shrink-0 flex justify-center items-center">
          <Image
            src="/bazar-hero.png"
            alt="বাজার ঝুড়ি"
            width={320}
            height={280}
            priority
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;