import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NoReviews() {
  const t = useTranslations("noReviews");

  return (
    <Card className="w-full max-w-md border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{t("cardTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex justify-center mb-6">
          <MessageSquare className="w-16 h-16 text-gray-400" />
        </div>
        <p className="text-gray-600 mb-4">{t("noReviewsMessage")}</p>
        <div className="flex justify-center space-x-1 text-yellow-400 mb-4">
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
        </div>
        <p className="text-sm text-gray-500">{t("ratingPrompt")}</p>
      </CardContent>
      <CardFooter className="flex justify-center"></CardFooter>
    </Card>
  );
}
