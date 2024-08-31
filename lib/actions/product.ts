"use server";

import { EnquireProps, IPartnerBanner, IProduct } from "@/types";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import Enquiry from "../models/enquiry.model";
import PartnerBanner from "../models/banner.model";

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
  filters: Record<string, any> = {} // Accepts any key-value pairs
): Promise<{
  products: IProduct[];
  totalCount: number;
  brands: { label: string; value: string }[];
  types: { label: string; value: string }[];
  categories: { label: string; value: string }[];
}> {
  try {
    await connectToDB();

    // Create a filter object
    const filter: any = {};

    if (filters.query) {
      filter.brand = { $regex: filters.query, $options: "i" };
    }

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        // Check if the key is 'brand' and it's a comma-separated string
        if (key === "brand" && typeof filters[key] === "string") {
          // Split the string by commas and use it as an array in the filter
          filter[key] = { $in: filters[key].split(",") };
        } else {
          filter[key] = filters[key];
        }
      }
    });

    const skip = (page - 1) * pageSize;

    // Fetch the total count of products that match the filter
    const totalCount = await Product.countDocuments(filter);

    // Fetch products with filtering and pagination
    const products = await Product.find(filter)
      .skip(skip)
      .limit(pageSize)
      .lean();

    // Fetch the list of distinct brand names in the entire database (ignoring the filter)
    const distinctBrands = await Product.distinct("brand");

    // Format the brands into the desired { label: "brand", value: "brand" } structure
    const brands = distinctBrands.map((brand) => ({
      label: brand,
      value: brand,
    }));
    // Fetch the list of distinct type names in the entire database (ignoring the filter)
    const distinctTypes = await Product.distinct("type");

    // Format the brands into the desired { label: "type", value: "type" } structure
    const types = distinctTypes.map((type) => ({
      label: type,
      value: type,
    }));
    // Fetch the list of distinct category names in the entire database (ignoring the filter)
    const distinctCategories = await Product.distinct("category");

    // Format the brands into the desired { label: "category", value: "category" } structure
    const categories = distinctCategories.map((category) => ({
      label: category,
      value: category,
    }));

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
  productId: string
): Promise<IProduct | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const product = await Product.findOne({ _id: productId });
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
