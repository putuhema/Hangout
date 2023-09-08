import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRating } from "@/features/slice/review.slice";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import StarRating from "./star/StarRating";
import services from "@/services";
import Toast from "./Toast";

const Post = ({ event }) => {
  const rating = useSelector(getRating);
  const [comment, setComment] = useState("");
  const [toggle, setToggle] = useState(false);
  const [validate, setValidate] = useState(false);
  const max = 400;

  const { data, isSuccess } = useQuery(["reviews"], async () => {
    const res = await services.get(`/reviews`);
    return res.data;
  });

  let reviews;
  if (isSuccess) {
    reviews = data;
  }
  const userId = reviews.map((review) => review.user).map((user) => user.id);
  const mutation = useMutation({
    mutationFn: async (addReview) => {
      return services.post("/reviews", addReview);
    },
  });

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (limit <= max && rating > 0) {
      if (userId == event.user.id) {
        setValidate(!validate);
        setTimeout(() => {
          setValidate(false);
        }, 2000);
      } else {
        mutation.mutate({
          id: uuidv4(),
          rating: rating,
          comment: comment,
          user: {
            id: event.user.id,
            fullname: event.user.fullname,
            imageUrl: event.user.imageUrl,
            follower: 0,
          },
          eventId: event.id,
          date: new Date(e.timeStamp),
        });
      }
    } else {
      setToggle(!toggle);
      setTimeout(() => {
        setToggle(false);
      }, 2000);
    }
  };

  let ratingElement = rating !== 0 ? <label className="ms-2">({rating})</label> : <></>;
  let limit = comment.length;
  let toastLimit = limit > max ? <Toast message={`max char ${max}`} /> : <></>;
  let toastRating = toggle ? <Toast message="rating cannot be empty" /> : <></>;
  let toastReview = validate ? <Toast message="you have submitted a review" /> : <></>;
  return (
    <div>
      {toastLimit}
      {toastRating}
      {toastReview}
      <h2 className="font-semibold text-4xl mb-8">Reviews</h2>
      <form onSubmit={onSubmit} action="">
        <div className="flex items-center">
          <p className="w-48 font-semibold">Rating</p>
          <StarRating />
          {ratingElement}
        </div>
        <div className="flex mt-2">
          <div>
            <p className="w-48 font-semibold">Comment</p>
          </div>
          <textarea
            className="border lg:w-full lg:h-48 rounded-lg px-6 py-4"
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <span>
            {limit} / {max}
          </span>
        </div>
        <div className="flex justify-center">
          <Button>Send</Button>
        </div>
      </form>
      <div className="w-4/5 mx-auto py-12"></div>
    </div>
  );
};

export default Post;
