// components/StarRating.tsx
import { Star } from "lucide-react";
import React from "react";
interface StarRatingProps {
  rating: number; // Rating can be a whole or half number
  size: number;
}
const StarRating: React.FC<StarRatingProps> = ({ rating, size }) => {
  const totalStars = 5; // Total number of stars
  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const currentRating = index + 1;
        const isHalfStar =
          rating % 1 !== 0 && currentRating === Math.ceil(rating);
        return (
          <span key={index} className="relative text-2xl cursor-default">
            <span
              className={`absolute left-0 overflow-hidden text-yellow-500 transition-all duration-200 ${
                isHalfStar ? "w-1/2" : "w-full"
              }`}
            >
              <Star className={`size-${size}`} />
            </span>
            <span className="text-gray-300">
              <Star className={`size-${size}`} />
            </span>
          </span>
        );
      })}
    </div>
  );
};
export default StarRating;
