import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllReview } from "@/redux/review";
import Review from "./Review";

const ReviewList = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reviews);

  useEffect(() => {
    dispatch(getAllReview());
  }, []);

  return (
    <div className="">
      {reviews.map((review) => (
        <Review key={review.id} reviews={review} />
      ))}
    </div>
  );
};

export default ReviewList;
