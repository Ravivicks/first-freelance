// import { convertCurrency } from "@/lib/actions/convertCurrency";
// import { formatCurrency } from "@/lib/utils";
import BestDeal from "@/components/BestDeal";
import CategoryWise from "@/components/CategoryWise";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HotDeal from "@/components/HotDeal";
import MenuBarNew from "@/components/MenuBarNew";
import ProductCarousal from "@/components/ProductCarousal";
import { ProductNew } from "@/components/ProductNew";
import SingleProductDetails from "@/components/SingleProductDetails";
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
    <div className="md:mx-16 mx-3">
      <div className="hidden md:block">
        <MenuBarNew />
      </div>
      <Hero />
      <div className="flex flex-col md:flex-row gap-4 w-full mb-16">
        <BestDeal />
        <HotDeal />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-3">Most Viewed Products</h1>
        {/* <ProductCarousal /> */}
        <ProductNew />
      </div>
      <CategoryWise title="Industry Automation  " />
      <div className="flex flex-col md:flex-row justify-center items-center">
        <SingleProductView />
        <SingleProductDetails />
      </div>
      <Footer />
      {/* <UsersTable />
      <Home /> */}
    </div>
  );
}
