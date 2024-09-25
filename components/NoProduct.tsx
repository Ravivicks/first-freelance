import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LucideIcon,
  PackageSearch,
  FileSearch,
  UserSearch,
  ShoppingCart,
} from "lucide-react";

interface NotFoundProps {
  type?: "product" | "page" | "user" | "order" | "filter";
  customMessage?: string;
  customIcon?: LucideIcon;
  returnLink: string;
  returnLinkText: string;
}

export default function NotFound({
  type = "product",
  customMessage,
  customIcon,
  returnLink,
  returnLinkText,
}: NotFoundProps) {
  const getIcon = (): LucideIcon => {
    if (customIcon) return customIcon;
    switch (type) {
      case "product":
        return PackageSearch;
      case "page":
        return FileSearch;
      case "user":
        return UserSearch;
      case "order":
        return ShoppingCart;
      default:
        return PackageSearch;
    }
  };

  const Icon = getIcon();

  const getMessage = (): string => {
    if (customMessage) return customMessage;
    switch (type) {
      case "product":
        return "We couldn't find the product you're looking for. It may have been removed or doesn't exist.";
      case "page":
        return "The page you're looking for doesn't exist or has been moved.";
      case "user":
        return "We couldn't find the user you're looking for. They may have been removed or don't exist.";
      case "order":
        return "We couldn't find the order you're looking for. It may have been cancelled or doesn't exist.";
      default:
        return "We couldn't find what you're looking for. It may have been removed or doesn't exist.";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto bg-background px-4">
      <div className="text-center">
        <Icon className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold tracking-tight text-primary mb-2">
          No {type.charAt(0).toUpperCase() + type.slice(1)} Found
        </h1>
        <p className="text-xl text-muted-foreground mb-8">{getMessage()}</p>
        <Button asChild variant="destructive">
          <Link href={returnLink}>{returnLinkText}</Link>
        </Button>
      </div>
    </div>
  );
}
