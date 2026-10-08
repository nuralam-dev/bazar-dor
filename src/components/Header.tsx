import Image from "next/image";
import Navbar from "./Navbar";



const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <header className="w-full bg-[#f8faf9] py-4 px-6 md:px-12 border-b border-gray-100">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div>
        <Image
          src="/logo.png"
          alt="বাজার দর"
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded-2xl bg-[#008744] p-2"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl font-bold text-black tracking-tight leading-none">
          বাজার দর
        </h1>
        <p className="text-xs md:text-sm text-gray-600 font-normal mt-1">{date}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-black font-semibold hover:text-[#008744] transition-colors text-sm md:text-base px-2 py-1">
        সাইন ইন
      </button>
      <button className="bg-[#008744] hover:bg-[#007038] text-white font-medium px-5 py-2 rounded-xl text-sm md:text-base shadow-md transition-all">
        সাইন আপ
      </button>
    </div>
  </div>
 <Navbar></Navbar>
</header>
  );
};

export default Header;
