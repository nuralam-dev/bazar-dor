import Image from "next/image";
import Navbar from "./Navbar";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full bg-[#f8faf9] pt-4 pb-2 px-4 md:px-12 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Date */}
        <div className="flex items-center gap-3">
          <div className="bg-[#008744] p-2 rounded-2xl flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="বাজার দর"
              width={32}
              height={32}
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-black tracking-tight leading-none">
              বাজার দর
            </h1>
            <p className="text-xs md:text-sm text-gray-600 font-normal mt-1">{date}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="text-black font-semibold hover:text-[#008744] transition-colors text-sm md:text-base px-3 py-1.5 rounded-lg">
            সাইন ইন
          </button>
          <button className="bg-[#008744] hover:bg-[#007038] text-white font-medium px-4 md:px-5 py-2 rounded-xl text-sm md:text-base shadow-sm transition-all">
            সাইন আপ
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar />
    </header>
  );
};

export default Header;