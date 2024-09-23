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

    // Fetch the product
    const product = await Product.findOne({ _id: productId }).lean();
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
