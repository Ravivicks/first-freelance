// import { convertCurrency } from "@/lib/actions/convertCurrency";
// import { formatCurrency } from "@/lib/utils";
import BestDeal from "@/components/BestDeal";
import CategoryWise from "@/components/CategoryWise";
import CircularNavbar from "@/components/CircularNavbar";
import FeaturedCategory from "@/components/FeaturedCategory";
import FeaturedPartner from "@/components/FeaturedPartner";
import FeaturedProduct from "@/components/FeaturedProduct";
import Hero from "@/components/Hero";
import ProductCarousal from "@/components/ProductCarousal";
import SingleProductView from "@/components/SingleProductView";
import Head from "next/head";

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
    <>
      <Head>
        <title>
          Automation Ecom Global - Your One Stop Shop for Automation Solutions
        </title>
        <meta
          name="description"
          content="Explore our range of automation products and services."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.automationecom.store" />
      </Head>

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
    </>
  );
}
