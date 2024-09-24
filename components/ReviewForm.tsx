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
import { useTranslations } from "next-intl"; // Import the translations hook

type CommentFormValues = z.infer<typeof CommentSchema>;

const CommentForm = () => {
  const { user } = useUser();
  const { id } = useParams();
  const mutation = useCreateReview(id as string);
  const t = useTranslations("commentForm"); // Use translations for commentForm

  const productId = Array.isArray(id) ? id[0] : id || "";

  const defaultValues = {
    userId: user?.emailAddresses?.[0]?.emailAddress || "guestuser@gmail.com",
    productId,
    userAvatar: user?.imageUrl || "guest",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    rating: 0,
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
    defaultValues,
    mode: "onBlur",
  });

  const rating = watch("rating");

  const onSubmit = (data: CommentFormValues) => {
    data.rating = rating || 0;

    if (user) {
      data.userId = user?.emailAddresses?.[0]?.emailAddress || "";
      data.firstName = user?.firstName as string;
      data.lastName = user?.lastName as string;
      data.userAvatar = user?.imageUrl as string;
    } else {
      data.userId = "guestuser@gmail.com";
      data.userAvatar = "guest";
    }

    data.productId = productId;

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
          {t("ratingLabel")}
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
          <div className="text-red-500">{t("error.rating")}</div>
        )}
      </div>

      {!user && (
        <>
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="flex-grow">
              <Label htmlFor="firstName">{t("firstNameLabel")}</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder={t("firstNamePlaceholder")}
                className="mt-1 w-full"
              />
              {errors.firstName && (
                <div className="text-red-500">{errors.firstName.message}</div>
              )}
            </div>

            <div className="flex-grow">
              <Label htmlFor="lastName">{t("lastNameLabel")}</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                placeholder={t("lastNamePlaceholder")}
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
        <Label htmlFor="comment">{t("commentLabel")}</Label>
        <Textarea
          id="comment"
          {...register("comment")}
          placeholder={t("commentPlaceholder")}
          className="mt-1 w-full"
        />
        {errors.comment && (
          <div className="text-red-500">{errors.comment.message}</div>
        )}
      </div>

      <Button type="submit">{t("submitButton")}</Button>
    </form>
  );
};

export default CommentForm;
