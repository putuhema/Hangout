import { Star } from "lucide-react";
import { useState } from "react";

const ReviewStar = ({ handleRating, rating }) => {
  const [isHover, setIsHover] = useState(null);

  return (
    <div className="flex gap-2 items-center text-lg">
      <div className="flex items-center">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                className="hide"
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => {
                  handleRating(currentRating);
                }}
              />
              <Star
                fill={currentRating <= (isHover || rating) ? "#2563eb" : "none"}
                onMouseEnter={() => setIsHover(currentRating)}
                onMouseLeave={() => setIsHover(null)}
                className={`text-primary`}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewStar;
