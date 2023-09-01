import { getOneEvent } from "@/redux/event";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "@/components/star/StarRating";

const Review = () => {
  const dispatch = useDispatch();

  const { rating } = useSelector((state) => state.global);
  const event = useSelector((state) => state.event.events);
  const { name } = event;
  const review = useRef("");

  useEffect(() => {
    dispatch(getOneEvent(1));
  }, [dispatch]);

  let ratingElement = rating !== 0 ? <label className="ms-2">({rating})</label> : <></>;

  return (
    <div className="w-3/4 mx-auto">
      <div className="border h-72 w-3/4 mx-auto bg-yellow-400">
        <span>poster</span>
      </div>
      <p className="text-4xl mt-6">{name}</p>
      <hr className="my-4" />
      <div className="flex items-end mt-20">
        <div>
          <div className="flex">
            <label className="w-32 text-lg">Rating</label>
            <StarRating />
            {ratingElement}
          </div>
          <div className="flex mt-2">
            <label className="w-32 text-lg" htmlFor="">
              Review
            </label>
            <textarea
              className="border rounded-lg"
              name=""
              id=""
              cols="60"
              rows="8"
              placeholder="Leave review here"
              ref={review}
            ></textarea>
          </div>
        </div>
        <div className="ms-20">
          <button className="bg-green-500 w-20 h-8 border rounded-lg hover:bg-green-400 ease-in-out duration-300">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
