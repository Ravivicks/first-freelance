"use server";
import { IComment, IReply, IReview } from "@/types";
import { connectToDB } from "../mongoose";
import Review from "../models/review.model";

export async function createNewReview(review: IComment) {
  try {
    await connectToDB();
    const result = await Review.create(review);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating Review:", error);
  }
}

export async function getAllReviews(): Promise<IComment[] | any> {
  try {
    await connectToDB();

    const reviews = await Review.find();

    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch reviews");
  }
}

export async function getReviewByProductId(
  productId: string
): Promise<IComment[]> {
  try {
    await connectToDB();

    // Find reviews by productId, using lean for performance
    const reviews = await Review.find({ productId });

    // If no reviews found, return an empty array
    if (!reviews) return [];

    // Return plain JavaScript objects (lean returns plain objects)
    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Failed to fetch reviews");
  }
}

export async function updateReview(
  reviewId: string,
  reply: IReply
): Promise<IComment | null> {
  try {
    // Connect to the database
    await connectToDB();

    // Find the review by ID and push the new reply to the replies array
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        $push: { replies: reply }, // Add the reply to the `replies` array
      },
      { new: true, lean: true } // Return the updated review as a plain JS object
    ).exec();

    if (!updatedReview) {
      console.log(`Review with ID ${reviewId} not found`);
      return null;
    }

    // Return the updated review
    return JSON.parse(JSON.stringify(updatedReview));
  } catch (error) {
    console.log("Error updating review:", error);
    return null;
  }
}

export async function updateLikeCount(
  reviewId: string,
  userId: string,
  likeType: "like" | "unlike"
): Promise<IComment | null> {
  try {
    // Connect to the database
    await connectToDB();

    // Update the likes array based on likeType
    const update =
      likeType === "like"
        ? {
            $set: {
              "likes.$[elem].isLike": true,
              "likes.$[elem].isUnlike": false,
            },
          }
        : {
            $set: {
              "likes.$[elem].isLike": false,
              "likes.$[elem].isUnlike": true,
            },
          };

    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId, "likes.userId": userId },
      update,
      {
        arrayFilters: [{ "elem.userId": userId }],
        new: true,
        lean: true,
      }
    ).exec();

    if (!updatedReview) {
      // If no matching like entry found, add a new like/unlike entry
      const addUpdate =
        likeType === "like"
          ? { $push: { likes: { userId, isLike: true, isUnlike: false } } }
          : { $push: { likes: { userId, isLike: false, isUnlike: true } } };

      const updatedReviewWithNewLike = await Review.findByIdAndUpdate(
        reviewId,
        addUpdate,
        { new: true, lean: true }
      ).exec();

      return JSON.parse(JSON.stringify(updatedReviewWithNewLike));
    }

    // Return the updated review
    return JSON.parse(JSON.stringify(updatedReview));
  } catch (error) {
    console.log("Error updating like count:", error);
    return null;
  }
}
