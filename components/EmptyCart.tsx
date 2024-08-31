import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Your Cart is Empty</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <ShoppingCart className="w-24 h-24 text-muted-foreground" />
        <p className="text-center text-muted-foreground">
          {`Looks like you haven't added anything to your cart yet.`}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild variant="destructive">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
