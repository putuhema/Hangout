import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUser } from "@/redux/user";
import { getAllReview } from "@/redux/review";
import Review from "./Review";
import User from "./User";

const ReviewList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const reviews = useSelector((state) => state.review.reviews);

  // console.log(users);
  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllReview());
  }, [users]);

  return (
    <div className="flex">
      <div>
        {users.map((user) => (
          <User key={user.id} users={user} />
        ))}
      </div>
      <div>
        {reviews.map((review) => (
          <Review key={review.id} reviews={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
