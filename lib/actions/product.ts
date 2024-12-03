"use server";

import { IPartnerBanner, IProduct } from "@/types";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import PartnerBanner from "../models/banner.model";
import Esproduct from "../models/esproduct.model";
import Frproduct from "../models/frproduct.model";
import Itproduct from "../models/itproduct.model";
import Koproduct from "../models/koproduct.model";
import Ptproduct from "../models/ptproduct.model";

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

export async function getAllProducts(
  page: number,
  pageSize: number,
  filters: Record<string, any> = {},
  locale: string = "en"
): Promise<{
  products: IProduct[];
  totalCount: number;
  brands: { label: string; value: string }[];
  types: { label: string; value: string }[];
  categories: { label: string; value: string }[];
}> {
  try {
    await connectToDB();

    // Choose the model based on the locale
    const ProductModel =
      locale === "es"
        ? Esproduct
        : locale === "fr"
        ? Frproduct
        : locale === "it"
        ? Itproduct
        : locale === "ko"
        ? Koproduct
        : locale === "pt"
        ? Ptproduct
        : Product;

    const filter: any = {};

    // Construct query for search
    if (filters.query) {
      filter.$or = [
        { title: { $regex: filters.query, $options: "i" } },
        { brand: { $regex: filters.query, $options: "i" } },
      ];
    }

    // Handle filters like brand, subCategory, etc.
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (key === "brand" && typeof filters[key] === "string") {
          filter[key] = { $in: filters[key].split(",") };
        } else if (key === "category" && typeof filters[key] === "string") {
          filter[key] = { $in: filters[key].split(",") };
        } else if (key === "subCategory" && typeof filters[key] === "string") {
          filter[key] = filters[key]; // Ensure subCategory is used
        } else {
          filter[key] = filters[key];
        }
      }
    });

    const skip = (page - 1) * pageSize;

    // Fetch total count and products
    const [totalCount, products] = await Promise.all([
      ProductModel.countDocuments(filter),
      ProductModel.find(filter).skip(skip).limit(pageSize).lean(),
    ]);

    // Fetch distinct brands, types, and categories
    const [brands, types, categories] = await Promise.all([
      ProductModel.distinct("brand"),
      ProductModel.distinct("type"),
      ProductModel.distinct("category"),
    ]).then(([brands, types, categories]) => [
      brands.map((brand) => ({ label: brand, value: brand })),
      types.map((type) => ({ label: type, value: type })),
      categories.map((category) => ({ label: category, value: category })),
    ]);

    return {
      products: JSON.parse(JSON.stringify(products)),
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

    const ProductModel =
      locale === "es"
        ? Esproduct
        : locale === "fr"
        ? Frproduct
        : locale === "it"
        ? Itproduct
        : locale === "ko"
        ? Koproduct
        : locale === "pt"
        ? Ptproduct
        : Product;

    // Fetch the product
    const product = await ProductModel.findOne({ _id: productId }).lean();
    if (!product) return null;

    return JSON.parse(JSON.stringify(product));
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
