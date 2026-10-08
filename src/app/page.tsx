import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import PriceOverview from "@/components/PriceOverview";

const homePage = () => {
  return (
    <div>
      <Banner></Banner>
      <PriceOverview></PriceOverview>
      <AllProducts></AllProducts>
    </div>
  );
};

export default homePage;
