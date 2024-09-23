"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, Loader2 } from "lucide-react";
import { IProduct } from "@/types";
import Link from "next/link";
import { useSearchOpen } from "@/hooks/use-search-open";
import { getAllProducts } from "@/lib/actions/product";
import { useTranslations } from "next-intl";

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { onClose } = useSearchOpen();

  const t = useTranslations("search");

  // Load products based on search term and pagination
  const fetchData = async (
    page: number,
    pageSize: number,
    filters: Record<string, any>
  ) => {
    setIsLoading(true);
    try {
      const { products, totalCount } = await getAllProducts(
        page,
        pageSize,
        filters
      );
      setSuggestions((prev) =>
        page === 1 ? products : [...prev, ...products]
      );
      setTotalPages(Math.ceil(totalCount / pageSize));
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more products
  const loadMore = async () => {
    if (isLoadingMore || currentPage >= totalPages) return;

    setIsLoadingMore(true);
    try {
      await fetchData(currentPage + 1, 20, { query: searchTerm });
      setCurrentPage(currentPage + 1);
    } catch (err) {
      console.error("Failed to load more products:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Handle input changes and trigger search when input length >= 3
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length >= 3) {
        fetchData(1, 20, { query: searchTerm });
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex > -1) {
      selectSuggestion(suggestions[selectedIndex]);
    }
  };

  const selectSuggestion = (product: IProduct) => {
    setSearchTerm(product.title);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (selectedIndex > -1 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex]?.focus();
    }
  }, [selectedIndex]);

  return (
    <div className="relative w-full mx-auto">
      <div className="relative">
        <Button
          size="icon"
          variant="ghost"
          className="absolute left-0 top-0 h-full"
          onClick={() => inputRef.current?.focus()}
        >
          <SearchIcon className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
        <Input
          type="text"
          placeholder={
            t
              ? t("placeHolder")
              : "Search products...(For Example : 6ES7288-1ST30-0AA0)"
          }
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="pl-10"
          ref={inputRef}
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-background border border-input rounded-md shadow-md mt-1">
          <ul className="md:max-h-[60vh] max-h-[33vh] overflow-y-auto">
            {suggestions.map((product, index) => (
              <Link
                href={`/products/${product._id}`}
                key={product._id}
                onClick={onClose}
              >
                <li
                  className={`px-4 py-2 cursor-pointer ${
                    index === selectedIndex
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }`}
                  onClick={() => setShowSuggestions(false)} // Close suggestions on click
                  onMouseEnter={() => setSelectedIndex(index)}
                  ref={(el) => {
                    suggestionRefs.current[index] = el;
                  }}
                  tabIndex={0}
                >
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-10 object-cover mr-3"
                    />
                    <div>
                      <div className="font-medium">{product.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.brand}
                      </div>
                      <div className="text-sm font-semibold">
                        {product.currency}
                        {product.currentPrice}
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
          {currentPage < totalPages && (
            <div className="p-2 border-t border-input">
              <Button
                onClick={loadMore}
                disabled={isLoadingMore}
                className="w-full"
              >
                {isLoadingMore ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Load More
              </Button>
            </div>
          )}
        </div>
      )}
      {isLoading && !isLoadingMore && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  );
}
