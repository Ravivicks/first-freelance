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
import { Input } from "./ui/input"; // Import the input component

type CommentFormValues = z.infer<typeof CommentSchema>;

const CommentForm = () => {
  const { user } = useUser();
  const { id } = useParams();
  const mutation = useCreateReview(id as string);

  // Ensure id is treated as a string
  const productId = Array.isArray(id) ? id[0] : id || "";

  // Default form values, including firstName and lastName when the user is logged in
  const defaultValues = {
    userId: user?.emailAddresses?.[0]?.emailAddress || "guestuser@gmail.com",
    productId,
    userAvatar: user?.imageUrl || "guest",
    firstName: user?.firstName || "", // Set default firstName
    lastName: user?.lastName || "", // Set default lastName
    rating: 0, // Default rating
    comment: "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues, // Use the defaultValues object here
    mode: "onBlur",
  });

  const rating = watch("rating");

  const onSubmit = (data: CommentFormValues) => {
    data.rating = rating || 0; // Ensure rating is set

    if (user) {
      // If the user is logged in, use Clerk user details
      data.userId = user?.emailAddresses?.[0]?.emailAddress || "";
      data.firstName = user?.firstName as string;
      data.lastName = user?.lastName as string;
      data.userAvatar = user?.imageUrl as string;
    } else {
      // If the user is not logged in, clear user details
      data.userId = "guestuser@gmail.com";
      data.userAvatar = "guest";
    }

    data.productId = productId;

    // Call mutation and check if it triggers
    mutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
      onError: () => {
        alert("Failed to submit the review");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:w-1/2">
      <input type="hidden" {...register("userId")} />
      <input type="hidden" {...register("productId")} />
      <input type="hidden" {...register("userAvatar")} />

      <div>
        <Separator className="my-3" />
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

      {!user && (
        <>
          {/* Name fields for non-logged-in users */}
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="flex-grow">
              <Label htmlFor="firstName">First Name:</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder="Enter your first name"
                className="mt-1 w-full"
              />
              {errors.firstName && (
                <div className="text-red-500">{errors.firstName.message}</div>
              )}
            </div>

            <div className="flex-grow">
              <Label htmlFor="lastName">Last Name:</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                placeholder="Enter your last name"
                className="mt-1 w-full"
              />
              {errors.lastName && (
                <div className="text-red-500">{errors.lastName.message}</div>
              )}
            </div>
          </div>
        </>
      )}

      <div>
        <Label htmlFor="comment">Comment:</Label>
        <Textarea
          id="comment"
          {...register("comment")}
          placeholder="Write your comment here"
          className="mt-1 w-full"
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
