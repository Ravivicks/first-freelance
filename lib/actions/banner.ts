"use server";

import mongoose from "mongoose";
import { connectToDB } from "../mongoose";
import Banner from "../models/banner-file-model";

export async function getAllBanners(title?: string): Promise<any[]> {
  try {
    await connectToDB();

    if (mongoose.connection.readyState !== 1) {
      throw new Error("Mongoose connection is not established");
    }

    // Build the query based on whether a title is provided
    const query = title ? { title: new RegExp(title, "i") } : {};

    // Fetch banners from the database based on the query
    const banners = await Banner.find(query).exec();

    // Construct image URLs (GridFSBucket is not used in this example)
    const bannerWithImageUrls = banners.map((banner) => {
      const imageUrl = banner.imageId
        ? `/api/images/${banner.imageId}` // Adjust the path to your image retrieval endpoint
        : null;

      return {
        ...banner.toObject(),
        imageUrl,
      };
    });

    return JSON.parse(JSON.stringify(bannerWithImageUrls));
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw new Error("Failed to fetch banners");
  }
}
