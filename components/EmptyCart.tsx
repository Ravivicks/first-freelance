import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartDetails } from "@/hooks/use-cart-details";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function EmptyCart() {
  const { onClose } = useCartDetails();
  const t = useTranslations("emptyCart");
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <ShoppingCart className="w-24 h-24 text-muted-foreground" />
        <p className="text-center text-muted-foreground">{t("description")}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild variant="destructive" onClick={onClose}>
          <Link href="/">{t("action")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
