import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRating, setRating } from "@/features/slice/review.slice";

const StarRating = () => {
  const dispatch = useDispatch();
  const rating = useSelector(getRating);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => dispatch(setRating(index))}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star text-xl">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
