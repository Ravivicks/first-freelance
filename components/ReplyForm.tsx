import React, { useState } from "react";
import { IReply } from "@/types";
import { useUpdateReview } from "@/features/review/use-update-reply"; // Adjust the import path as needed
import { useUser } from "@clerk/nextjs";

interface ReplyFormProps {
  onReplySuccess: (newReply: IReply) => void;
  reviewId: string;
}

const ReplyForm: React.FC<ReplyFormProps> = ({ onReplySuccess, reviewId }) => {
  const [reply, setReply] = useState<string>("");
  const updateReviewMutation = useUpdateReview();
  const { user } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReply: IReply = {
      userId: user?.emailAddresses?.[0]?.emailAddress as string, // Replace with actual user ID
      comment: reply,
      firstName: user?.firstName as string, // Replace with actual user's first name
      lastName: user?.lastName as string, // Replace with actual user's last name
    };

    updateReviewMutation.mutate(
      { reviewId, reply: newReply },
      {
        onSuccess: () => {
          onReplySuccess(newReply);
          setReply(""); // Clear the form
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write your reply here..."
        required
      />
      <button type="submit" disabled={updateReviewMutation.isPending}>
        {updateReviewMutation.isPending ? "Submitting..." : "Submit Reply"}
      </button>
      {updateReviewMutation.isError && (
        <div className="text-red-500">Failed to submit reply</div>
      )}
    </form>
  );
};

export default ReplyForm;
