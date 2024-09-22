// import { convertCurrency } from "@/lib/actions/convertCurrency";
// import { formatCurrency } from "@/lib/utils";
import BestDeal from "@/components/BestDeal";
import CategoryWise from "@/components/CategoryWise";
import CircularNavbar from "@/components/CircularNavbar";
// import FeaturedCategory from "@/components/FeaturedCategory";
import FeaturedPartner from "@/components/FeaturedPartner";
// import FeaturedProduct from "@/components/FeaturedProduct";
import Hero from "@/components/Hero";
// import ProductCarousal from "@/components/ProductCarousal";
import SingleProductView from "@/components/SingleProductView";
import dynamic from "next/dynamic";

export default async function Index() {
  const ProductCarousal = dynamic(() => import("@/components/ProductCarousal"));
  const FeaturedProduct = dynamic(() => import("@/components/FeaturedProduct"));
  const FeaturedCategory = dynamic(
    () => import("@/components/FeaturedCategory")
  );
  // const amount = 1000; // USD
  // const fromCurrency = "USD";
  // const toCurrency = "INR";
  // const locale = "en-IN"; // Indian locale

  //   const convertedAmount = await convertCurrency(
  //     amount,
  //     fromCurrency,
  //     toCurrency
  //   );
  //   const formattedAmount = formatCurrency(convertedAmount, toCurrency, locale);

  return (
    <div>
      <CircularNavbar />
      <Hero />
      <BestDeal />
      <ProductCarousal />
      <FeaturedCategory />
      <SingleProductView />
      <FeaturedPartner />
      <CategoryWise />
      <FeaturedProduct />
    </div>
  );
}
