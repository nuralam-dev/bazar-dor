import Link from "next/link";

export interface INav {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  let data: INav[] = [];

  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/categories",
      {
        next: { revalidate: 3600 },
      },
    );
    data = await res.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <nav className=" mt-4 pt-2 border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 overflow-x-auto no-scrollbar py-1">
          {data?.map((item) => (
            <Link
              key={item.id || item.slug}
              href={`/${item.slug}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm md:text-base font-medium text-gray-700 hover:text-[#008744] hover:bg-emerald-50 transition-all shrink-0"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;