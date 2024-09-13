import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import StarRating from "./StarRating";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import CommentForm from "./ReviewForm";
import { useGetReviewByProductId } from "@/features/review/use-get-reviews-by-product-id";
import { useParams } from "next/navigation";
import ReplyForm from "./ReplyForm";
import { IReply, IComment, ILike } from "@/types";
import { formatDate } from "@/lib/utils";
import { useUpdateLike } from "@/features/review/use-update-like";
import { useUser } from "@clerk/nextjs";

const Reviews = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyFormVisible, setReplyFormVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [reviewList, setReviewList] = useState<IComment[]>([]);
  const {
    data: reviews,
    refetch,
    isLoading,
  } = useGetReviewByProductId(id as string);
  const { mutate: updateLike } = useUpdateLike();

  useEffect(() => {
    if (reviews) {
      setReviewList(reviews);
    }
  }, [reviews]);

  const handleReplyToggle = (reviewId: string) => {
    setReplyingTo(reviewId);
    setReplyFormVisible((prev) => !prev);
  };

  const handleReplySuccess = (newReply: IReply) => {
    if (replyingTo) {
      setReviewList((prevReviews) =>
        prevReviews.map((review) =>
          review._id === replyingTo
            ? { ...review, replies: [...(review.replies || []), newReply] }
            : review
        )
      );
      setReplyFormVisible(false);
    }
  };

  const handleLikeClick = (
    reviewId: string,
    userId: string,
    isLiked: boolean,
    isUnlike: boolean
  ) => {
    let likeType: "like" | "unlike" | null = null;

    if (isLiked) {
      likeType = "unlike";
    } else if (isUnlike) {
      likeType = "like";
    } else {
      likeType = "like";
    }

    if (likeType) {
      updateLike(
        { reviewId, userId, likeType },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  };

  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const getLikeCount = (
    likes: ILike[] | undefined,
    type: "like" | "unlike"
  ) => {
    return (
      likes?.filter((like) => like.isLike === (type === "like")).length || 0
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const visibleReviews = showAll ? reviewList : reviewList.slice(0, 3);

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="p-4 md:p-6 lg:flex lg:justify-between lg:items-start">
      <div className="flex flex-col w-full gap-4">
        {visibleReviews?.map((review) => {
          const userEmail = user?.emailAddresses?.[0]?.emailAddress as string;
          const hasLiked = review.likes?.some(
            (like) => like.userId === userEmail && like.isLike
          );
          const hasUnliked = review.likes?.some(
            (like) => like.userId === userEmail && like.isUnlike
          );

          return (
            <div key={review._id} className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.userAvatar} />
                  <AvatarFallback className="font-bold">
                    {getInitials(review.firstName as string)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 md:gap-4 items-center">
                    <p className="text-sm md:text-base font-semibold capitalize">
                      {review.firstName} {review.lastName}
                    </p>
                    <span className="text-muted-foreground text-xs md:text-sm font-semibold">
                      {formatDate(review.createdAt as string)}
                    </span>
                  </div>
                  <StarRating size={4} rating={review.rating} />
                  <p className="text-sm font-bold">{review.comment}</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-3 items-center">
                      <p
                        className="text-xs md:text-sm text-muted-foreground font-semibold cursor-pointer hover:font-black"
                        onClick={() => handleReplyToggle(review._id as string)}
                      >
                        Reply
                      </p>
                      <div className="inline-flex text-sm items-center">
                        <ThumbsUp
                          className={`size-4 mr-1 cursor-pointer ${
                            hasLiked
                              ? "text-yellow-500"
                              : "text-muted-foreground"
                          }`}
                          onClick={() =>
                            handleLikeClick(
                              review._id as string,
                              userEmail,
                              hasLiked as boolean,
                              hasUnliked as boolean
                            )
                          }
                        />
                        <span className="font-semibold">
                          {getLikeCount(review.likes, "like")}
                        </span>
                      </div>
                      <div className="inline-flex text-sm items-center">
                        <ThumbsDown
                          className={`size-4 mr-1 cursor-pointer ${
                            hasUnliked
                              ? "text-red-500"
                              : "text-muted-foreground"
                          }`}
                          onClick={() =>
                            handleLikeClick(
                              review._id as string,
                              userEmail,
                              hasLiked as boolean,
                              hasUnliked as boolean
                            )
                          }
                        />
                        <span className="font-semibold">
                          {getLikeCount(review.likes, "unlike")}
                        </span>
                      </div>
                    </div>
                    {replyingTo === review._id && replyFormVisible && (
                      <div className="flex mt-4 md:mt-6 gap-4">
                        <ReplyForm
                          onReplySuccess={handleReplySuccess}
                          reviewId={replyingTo}
                        />
                      </div>
                    )}
                    {review.replies?.map((reply) => (
                      <div key={reply._id} className="ml-8 mt-4 border-l pl-4">
                        <p className="text-sm font-semibold">
                          {reply.firstName} {reply.lastName}
                        </p>
                        <p className="text-sm">{reply.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {!showAll && reviewList.length > 3 && (
          <button
            onClick={handleToggleShowAll}
            className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            See All Reviews
          </button>
        )}
        {showAll && (
          <button
            onClick={handleToggleShowAll}
            className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Show Less
          </button>
        )}
        <CommentForm />
      </div>

      <div className="w-full lg:w-1/4 mt-6 lg:mt-0">
        <div className="flex justify-between items-center">
          <StarRating size={7} rating={4.8} />
          <p className="font-bold text-lg md:text-xl">4.8</p>
        </div>
        <Separator className="my-3 h-1" />
        <div className="my-4 md:my-6 flex flex-col gap-3">
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-muted-foreground text-sm">5</p>
            <Progress value={100} className="bg-slate-100" />
            <p className="font-semibold text-sm">28</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-muted-foreground text-sm">4</p>
            <Progress value={60} className="bg-slate-100" />
            <p className="font-semibold text-sm">17</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-muted-foreground text-sm">3</p>
            <Progress value={40} className="bg-slate-100" />
            <p className="font-semibold text-sm">9</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-muted-foreground text-sm">2</p>
            <Progress value={20} className="bg-slate-100" />
            <p className="font-semibold text-sm">4</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="font-semibold text-muted-foreground text-sm">1</p>
            <Progress value={0} className="bg-slate-100" />
            <p className="font-semibold text-sm">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
