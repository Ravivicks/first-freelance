"use server";

import { EnquireProps, IPartnerBanner, IProduct } from "@/types";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import Enquiry from "../models/enquiry.model";
import PartnerBanner from "../models/banner.model";
import axios from "axios";

const CHUNK_SIZE = 500; // Adjust based on performance testing

export async function createBulkProducts(products: IProduct[]) {
  try {
    await connectToDB();

    // Process in chunks
    for (let i = 0; i < products.length; i += CHUNK_SIZE) {
      const chunk = products.slice(i, i + CHUNK_SIZE);

      // Insert chunk
      const result = await Product.insertMany(
        chunk.map((product) => product, { ordered: false })
      );
      if (!result) {
        return { error: "faild" };
      }
    }

    return { result: "All products created successfully" };
  } catch (error) {
    console.error("Error creating bulk products:", error);
  }
}

async function translateText(
  text: string,
  targetLanguage: string
): Promise<string> {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2`,
      null,
      {
        params: {
          q: text,
          target: targetLanguage,
          key: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY,
        },
      }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Failed to translate text");
  }
}

export async function getAllProducts(
  page: number,
  pageSize: number,
  filters: Record<string, any> = {},
  locale: string = "en" // Add locale as a parameter
): Promise<{
  products: IProduct[];
  totalCount: number;
  brands: { label: string; value: string }[];
  types: { label: string; value: string }[];
  categories: { label: string; value: string }[];
}> {
  try {
    await connectToDB();

    const filter: any = {};

    // Construct filters for querying
    if (filters.query) {
      filter.$or = [
        { title: { $regex: filters.query, $options: "i" } },
        { brand: { $regex: filters.query, $options: "i" } },
      ];
    }

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (key === "brand" && typeof filters[key] === "string") {
          filter[key] = { $in: filters[key].split(",") };
        } else {
          filter[key] = filters[key];
        }
      }
    });

    const skip = (page - 1) * pageSize;

    // Fetch total count and products in a single query
    const [totalCount, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter).skip(skip).limit(pageSize).lean(),
    ]);

    // Fetch distinct brands, types, and categories in parallel
    const [brands, types, categories] = await Promise.all([
      Product.distinct("brand"),
      Product.distinct("type"),
      Product.distinct("category"),
    ]).then(([brands, types, categories]) => [
      brands.map((brand) => ({ label: brand, value: brand })),
      types.map((type) => ({ label: type, value: type })),
      categories.map((category) => ({ label: category, value: category })),
    ]);

    // Prepare texts for batch translation
    const titles = products.map((product) => product.title);
    const descriptions = products.map((product) => product.description);

    // Translate titles and descriptions in parallel
    const [translatedTitles, translatedDescriptions] = await Promise.all([
      Promise.all(titles.map((title) => translateText(title, locale))),
      Promise.all(
        descriptions.map((description) => translateText(description, locale))
      ),
    ]);

    // Combine translated texts with original products
    const translatedProducts = products.map((product, index) => ({
      ...product,
      title: translatedTitles[index],
      description: translatedDescriptions[index],
    }));

    return {
      products: JSON.parse(JSON.stringify(translatedProducts)),
      totalCount,
      brands,
      types,
      categories,
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function getAllProductso() {
  try {
    connectToDB();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(
  productId: string,
  locale: string = "en" // Default to English
): Promise<IProduct | null> {
  try {
    await connectToDB();

    // Fetch the product
    const product = await Product.findOne({ _id: productId }).lean();
    if (!product) return null;

    // Create a list of fields that should be translated
    const fieldsToTranslate: Array<
      keyof Pick<IProduct, "title" | "description" | "productInformationTech">
    > = ["title", "description", "productInformationTech"];

    // Create a copy of the product
    const translatedProduct: IProduct = { ...product };

    // Translate each relevant field
    for (const field of fieldsToTranslate) {
      const fieldValue = product[field]; // Get the original value

      if (typeof fieldValue === "string") {
        // Only translate if the field is a string
        const translatedValue = await translateText(fieldValue, locale);
        translatedProduct[field] = translatedValue as any; // Cast to any since we're sure it's a string field
      }
    }

    return JSON.parse(JSON.stringify(translatedProduct));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createNewPartnerBanner(banner: IPartnerBanner) {
  try {
    await connectToDB();
    const result = await PartnerBanner.create(banner);
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating Banner:", error);
  }
}

export async function getBannerByBrand(
  brand: string
): Promise<IPartnerBanner | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const banner = await PartnerBanner.findOne({ brand: brand });
    return JSON.parse(JSON.stringify(banner));
  } catch (error) {
    console.log(error);
    return null;
  }
}
