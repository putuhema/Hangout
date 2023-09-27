import { getOneEvent } from "@/redux/event";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReview } from "@/redux/review";
import Container from "@/components/layout/Container";
import StarRating from "@/components/star/StarRating";
import ReviewList from "@/components/review/ReviewList";
import StarRatingTemplate from "@/components/star/StarRatingTemplate";
import Toast from "@/components/review/Toast";
import Note from "@/components/review/Note";
import repositories from "@/repositories/repositories";
import Quality from "@/components/review/Quality";
const Review = () => {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const { rating } = useSelector((state) => state.global);
  const event = useSelector((state) => state.event.events);
  const { reviews } = useSelector((state) => state.review);
  const { name, location, time, date } = event;
  const [comment, setComment] = useState("");

  const lastIndexReview = reviews.length;
  const postAPI = async () => {
    const dataReview = {
      id: lastIndexReview,
      rating: rating,
      comment: comment,
      userId: 0,
      eventId: 0,
    };

    await repositories.postAPI("reviews", dataReview);
  };
  const submit = async () => {
    if (rating > 0 && limit <= 150) {
      await postAPI();
    } else {
      setToggle(!toggle);
      setTimeout(() => {
        setToggle(false);
      }, 1000);
    }
    dispatch(getAllReview());
  };

  const leaveComment = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    dispatch(getOneEvent(0));
    dispatch(getAllReview());
  }, []);

  let averageRating = 0;
  if (reviews.length > 0) {
    averageRating = (
      reviews.map((rewiew) => rewiew.rating).reduce((a, b) => a + b) /
      lastIndexReview
    ).toFixed(1);
  }

  let limit = comment.length;
  let toMuch =
    limit > 150 ? (
      <Toast
        message="
  exceeds the max character"
      />
    ) : (
      <></>
    );

  let toast = toggle ? <Toast message="rating cannot be empty" /> : <></>;
  let ratingElement =
    rating !== 0 ? <label className="ms-2">({rating})</label> : <></>;

  return (
    <Container>
      <div className="w-4/5 mx-auto py-12">
        <div className="border lg:h-72  bg-gray-50 p-12 rounded-lg">
          <p className="text-6xl font-bold">{name}</p>
          <p className="my-6">{location}</p>
          <div className="">
            <p className="font-semibold">Time : {time} WIB</p>
            <p>{date}</p>
          </div>
        </div>
        <div className="flex mt-6  justify-between">
          <div className="flex items-center">
            <p className=" me-4">Average Rating</p>
            <StarRatingTemplate rating={averageRating} />
            <p className="ms-2">{averageRating}</p>
          </div>
          <div className="flex">
            <div>
              <p className="me-4 this">All Reviews</p>
              <Note style="hide" />
            </div>
            {/* {quality} */}
            <Quality average={averageRating} />
          </div>
        </div>
      </div>

      <hr />

      <div className="w-4/5 mx-auto py-6">
        <h2 className="font-semibold text-4xl mb-8">Reviews</h2>
        <ReviewList comments={comment} />
      </div>
      <hr />
      {toast}
      {toMuch}
      <div className="w-4/5 mx-auto flex items-end mt-10">
        <div className="w-full">
          <div className="flex ">
            <label className="w-32 text-lg">Rating</label>
            <StarRating />
            {ratingElement}
          </div>
          <div className="flex mt-2 ">
            <label className="w-32 text-lg" htmlFor="">
              Review
            </label>
            <textarea
              className="border rounded-lg h-72 sm:h-48 w-11/12 p-4"
              name=""
              id=""
              placeholder="Leave review here"
              onChange={leaveComment}
            ></textarea>
          </div>
          <span className="flex justify-end">{limit} / 150</span>
          <div className="flex justify-center">
            <button
              className="bg-green-500 px-8 py-2 ms-6 lg:ms-20 rounded-lg  hover:bg-green-400 ease-in-out duration-300"
              onClick={submit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="h-24"></div>
    </Container>
  );
};

export default Review;
