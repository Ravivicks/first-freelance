import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";

export interface Item {
  label: string;
  value: string;
}

interface Items {
  data: { label: string; value: string }[];
  title: string;
  searchParam: string;
}

export default function CheckBoxList({ data, searchParam, title }: Items) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false); // State to toggle showing all items
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCheckboxChange = (itemLabel: string) => {
    setCheckedItems((prev) => {
      const updatedItems = prev.includes(itemLabel)
        ? prev.filter((label) => label !== itemLabel)
        : [...prev, itemLabel];

      // Update the searchParams with the new list of brands
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (updatedItems.length > 0) {
        newSearchParams.set(searchParam, updatedItems.join(","));
      } else {
        newSearchParams.delete(searchParam);
      }

      // Update the URL without a full reload
      router.replace(`?${newSearchParams.toString()}`);

      return updatedItems;
    });
  };

  const displayedItems = showAll ? data : data.slice(0, 5);

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {displayedItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`id - ${index}`}
              checked={checkedItems.includes(item.label)} // Use label for checking
              onCheckedChange={() => handleCheckboxChange(item.label)} // Use label here
            />
            <Label
              htmlFor={`id - ${index}`} // Updated to match the Checkbox id
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.label}
            </Label>
          </li>
        ))}
      </ul>
      {data.length > 5 && (
        <button
          className="text-blue-500 text-sm font-medium mt-2"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
