// src/components/SkeletonGrid.tsx
import React from "react";

const SkeletonGrid = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-pulse">
      {/* হেডার/টাইটেল স্কেলিটন */}
      <div className="h-7 bg-gray-200 rounded-md w-48 mb-4"></div>

      {/* প্রোডাক্ট কার্ড গ্রিড স্কেলিটন */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-[#f8faf9] border border-gray-200/60 rounded-2xl p-5 h-32 flex flex-col justify-between"
          >
            {/* আইকন ও টাইটেল */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-2xl shrink-0"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>

            {/* দাম ও পার্সেন্টেজ */}
            <div className="flex justify-between items-end pt-2 border-t border-gray-100">
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded w-12"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded-lg w-14"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonGrid;