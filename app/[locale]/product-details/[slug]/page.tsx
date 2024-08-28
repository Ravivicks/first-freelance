"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useProductsStore } from "@/stores/useProductStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiSelect } from "@/components/MultiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import CheckBoxList from "@/components/CheckBoxList";
import { Button } from "@/components/ui/button";
import { Filter, FilterIcon } from "lucide-react";
import { useFilterOpen } from "@/hooks/use-filter-open";

const conditionList = [
  { value: "any-condition", label: "Any Condition" },
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
  { value: "not-specified", label: "Not Specified" },
];
const deliveryOptionsList = [
  { value: "free-international", label: "free-international" },
  { value: "local-pickup", label: "local-pickup" },
];

const PartnerProductDetails = () => {
  const { slug } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const type = searchParams.get("type");
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");

  const decodedBrand = slug ? decodeURIComponent(slug as string) : undefined;

  const {
    products,
    isLoading,
    error,
    fetchData,
    currentPage,
    setPage,
    totalPages,
    totalCount,
    brands,
    types,
    categories,
  } = useProductsStore();

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(type || "");
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);
  const [selectedConditions, setSelectedCondition] = useState<string[]>([]);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<
    string[]
  >([]);

  const { onOpen } = useFilterOpen();
  useEffect(() => {
    const initializeTabsAndFetchData = async () => {
      try {
        await fetchData(1, 20, {
          type: type,
          brand: brand,
          category: category,
        });
        setInitialFetchCompleted(true);
      } catch (error) {
        console.error("Error fetching data and initializing tabs:", error);
      }
    };
    initializeTabsAndFetchData();
  }, [type, brand, category, fetchData, initialFetchCompleted]);

  const loadMore = async () => {
    if (isLoadingMore || currentPage >= totalPages) return;

    setIsLoadingMore(true);

    try {
      await fetchData(currentPage + 1, 20, {
        type: type,
        brand: brand,
        category: category,
      });
      setPage(currentPage + 1);
    } catch (err) {
      console.error("Failed to load more products:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (!initialFetchCompleted) return; // Ensure loadMore only triggers after initial fetch

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && !isLoading) {
          loadMore(); // Only call loadMore if the entry is intersecting
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [isLoadingMore, isLoading]); // Add dependencies to control when the observer should act

  return (
    <div>
      <Breadcrumbs slug={decodedBrand} />
      <div className="h-[250px] relative mb-10">
        <Image src={"/images/b1.png"} alt="banner" fill />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="pr-5 hidden md:block">
          <h1 className="font-bold text-lg">Filter By</h1>
          <Separator className="my-2" />
          <CheckBoxList data={brands} title="Brands" searchParam="brand" />
          <Separator className="my-2" />
          <CheckBoxList
            data={categories}
            title="Category"
            searchParam="category"
          />
        </div>
        <div className="flex-1">
          <div className="my-3">
            <p className="font-semibold text-xs ml-1">{totalCount} Results</p>
          </div>
          <Tabs value={activeTab} className="w-full">
            <div className="flex justify-between mb-5">
              <div className="flex gap-2">
                <TabsList>
                  {types.map((type) => (
                    <TabsTrigger
                      key={type.value}
                      value={type.value}
                      onClick={() => {
                        setActiveTab(type.value);
                        router.push(
                          pathname + "?" + createQueryString("type", type.value)
                        );
                      }}
                    >
                      {type.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <div className="hidden md:block">
                  <MultiSelect
                    options={conditionList}
                    onValueChange={setSelectedCondition}
                    defaultValue={selectedConditions}
                    placeholder="Conditions"
                    animation={2}
                    maxCount={3}
                  />
                </div>
                <div className="hidden md:block">
                  <MultiSelect
                    options={deliveryOptionsList}
                    onValueChange={setSelectedDeliveryOption}
                    defaultValue={selectedDeliveryOption}
                    placeholder="Delivery Options"
                    animation={2}
                    maxCount={3}
                  />
                </div>
              </div>
              <Button onClick={onOpen} className="block md:hidden">
                <Filter />
              </Button>
              <div className="hidden md:block">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-match">Best Match</SelectItem>
                    <SelectItem value="ending-soon">
                      Time: Ending soon
                    </SelectItem>
                    <SelectItem value="newly-listed">
                      Time: Newly Listed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {types.map((type) => (
              <TabsContent key={type.value} value={type.value}>
                <div className="flex gap-3 flex-wrap mb-16">
                  {products
                    .filter((product) => product.type === type.value)
                    .map((product, index) => (
                      <div
                        className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/5 flex-grow h-auto"
                        key={index}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  {products.filter((product) => product.type === type.value)
                    .length === 0 && (
                    <div className="text-center font-semibold">
                      No data available
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          {/* Sentinel Element */}
          <div ref={sentinelRef} style={{ height: "20px" }} />
          {isLoadingMore && (
            <div className="text-center font-semibold">
              Loading more products...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerProductDetails;
