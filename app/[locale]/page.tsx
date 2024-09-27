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
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Automation Ecom Global",
    description: "A brief description of the page",
    url: "https://www.automationecom.store",
  };
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
        <meta
          name="google-site-verification"
          content="Explore our range of automation products and services."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.automationecom.store" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
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
