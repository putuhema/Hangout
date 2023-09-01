import { useState } from "react";
import styles from "./Star.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setRating } from "@/redux/global";

const StarRating = () => {
  const dispatch = useDispatch();
  const { rating } = useSelector((state) => state.global);
  // const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  console.log(rating);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type={styles.button}
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => dispatch(setRating(index))}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
