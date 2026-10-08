import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

export interface IProduct {
  id: string;
  nameBn: string;
  today: number;
  unit: string;
  icon?: string;
  changePercentage?: number;
  isUp?: boolean;
}

const PriceTicker = async () => {
  let products: IProduct[] = [];

  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      {
        next: { revalidate: 3600 },
      },
    );
    const data = await res.json();
    products = data.data || data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <div className="bg-[#f8faf9] border-y border-gray-200 py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        <MarqueeText
          className="flex items-center text-gray-800"
          direction="right"
          duration={30}
        >
          {products.map((item, ind) => {
            const isUp =
              item.isUp ??
              (item.changePercentage ? item.changePercentage >= 0 : true);

            return (
              <div
                key={item.id || ind}
                className="inline-flex items-center gap-2 px-6 border-r border-gray-200 text-sm md:text-base shrink-0"
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}

                <span className="font-semibold text-gray-900">
                  {item.nameBn}
                </span>

                <span className="text-gray-700">
                  {item.today} টাকা/{item.unit || "কেজি"}
                </span>

                {item.changePercentage !== undefined && (
                  <span
                    className={`inline-flex items-center gap-0.5 font-semibold text-xs md:text-sm ${
                      isUp ? "text-red-600" : "text-emerald-600"
                    }`}
                  >
                    <span>{isUp ? "▲" : "▼"}</span>
                    <span>{Math.abs(item.changePercentage)}%</span>
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
