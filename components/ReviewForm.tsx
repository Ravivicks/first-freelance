import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { CommentSchema } from "@/lib/zod-schema";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import { useCreateReview } from "@/features/review/use-create-review";
import StarRatings from "react-star-ratings";
import { Separator } from "./ui/separator";

type CommentFormValues = z.infer<typeof CommentSchema>;

const CommentForm = () => {
  const { user } = useUser();
  const { id } = useParams();
  const mutation = useCreateReview(id as string);

  // Ensure id is treated as a string
  const productId = Array.isArray(id) ? id[0] : id || "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
    mode: "onBlur",
  });

  const rating = watch("rating");

  const onSubmit = (data: CommentFormValues) => {
    data.rating = rating || 0; // Ensure rating is set
    data.userId = user?.emailAddresses?.[0]?.emailAddress || "";
    data.productId = productId;
    data.firstName = user?.firstName as string;
    data.lastName = user?.lastName as string;
    data.userAvatar = user?.imageUrl as string;

    // Call mutation and check if it triggers
    mutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="hidden"
        {...register("userId")}
        value={user?.emailAddresses?.[0]?.emailAddress || ""}
      />
      <input type="hidden" {...register("productId")} value={productId} />
      <input
        type="hidden"
        {...register("firstName")}
        value={user?.firstName as string}
      />
      <input
        type="hidden"
        {...register("lastName")}
        value={user?.lastName as string}
      />
      <input
        type="hidden"
        {...register("userAvatar")}
        value={user?.imageUrl as string}
      />

      <div>
        <Separator className="w-1/2 my-3" />
        <Label htmlFor="rating" className="mr-2">
          Rating:
        </Label>
        <StarRatings
          rating={rating || 0}
          starRatedColor="gold"
          changeRating={(newRating) => setValue("rating", newRating)}
          numberOfStars={5}
          name="rating"
          starDimension="24px"
          starSpacing="4px"
        />
        {errors.rating && (
          <div className="text-red-500">{errors.rating.message}</div>
        )}
      </div>

      <div>
        <Label htmlFor="comment">Comment:</Label>
        <Textarea
          id="comment"
          {...register("comment")}
          placeholder="Write your comment here"
          className="mt-1 md:w-1/2 w-full"
        />
        {errors.comment && (
          <div className="text-red-500">{errors.comment.message}</div>
        )}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CommentForm;
