// import { convertCurrency } from "@/lib/actions/convertCurrency";
// import { formatCurrency } from "@/lib/utils";
import CategoryWise from "@/components/CategoryWise";
import CircularNavbar from "@/components/CircularNavbar";
import FeaturedCategory from "@/components/FeaturedCategory";
import FeaturedPartner from "@/components/FeaturedPartner";
import FeaturedProduct from "@/components/FeaturedProduct";
import Hero from "@/components/Hero";
import ProductCarousal from "@/components/ProductCarousal";
import SingleProductView from "@/components/SingleProductView";

export default async function Index() {
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
      <ProductCarousal />
      <FeaturedCategory />
      <SingleProductView />

      <FeaturedPartner />
      <CategoryWise title="Industry Automation  " />
      <FeaturedProduct />
    </div>
  );
}
