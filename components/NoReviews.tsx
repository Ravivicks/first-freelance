import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Star } from "lucide-react";

export default function NoReviews() {
  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Card className="w-full max-w-md border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">No Reviews Yet</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex justify-center mb-6">
          <MessageSquare className="w-16 h-16 text-gray-400" />
        </div>
        <p className="text-gray-600 mb-4">
          This product hasn't received any reviews yet. Be the first to share
          your thoughts!
        </p>
        <div className="flex justify-center space-x-1 text-yellow-400 mb-4">
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
        </div>
        <p className="text-sm text-gray-500">
          Your review helps other shoppers make informed decisions.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center"></CardFooter>
    </Card>
    // </div>
  );
}
