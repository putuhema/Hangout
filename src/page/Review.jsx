import { getOneEvent } from "@/redux/event";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "@/components/star/StarRating";
import Container from "@/components/layout/Container";
import { getAllReview } from "@/redux/review";
import { getOneUser } from "@/redux/user";
import ReviewList from "@/components/review/ReviewList";
import repositories from "@/repositories/repositories";

const Review = () => {
  const dispatch = useDispatch();

  const { rating } = useSelector((state) => state.global);
  const event = useSelector((state) => state.event.events);
  const reviews = useSelector((state) => state.review.reviews);
  const { user, users } = useSelector((state) => state.user);
  const { name, location, time, date } = event;
  const comment = useRef("");

  const lastIndexUser = users.length;
  const lastIndexReview = reviews.length;

  const postAPI = async () => {
    const dataUser = {
      id: lastIndexUser,
      name: user.name,
      email: `${user.name}@mail.com`,
    };
    const dataReview = {
      id: lastIndexReview,
      rating: rating,
      comment: comment.current.value,
    };
    console.log(dataUser);
    await repositories.postAPI("users", dataUser);
    await repositories.postAPI("reviews", dataReview);
  };

  const submit = () => {
    postAPI();
  };

  useEffect(() => {
    dispatch(getOneEvent(0));
    dispatch(getAllReview());
    dispatch(getOneUser(0));
  }, [dispatch, reviews]);

  let ratingElement = rating !== 0 ? <label className="ms-2">({rating})</label> : <></>;

  return (
    <Container>
      <div className="w-4/5 mx-auto py-12">
        <div className="border lg:h-72 lg:w-11/12 bg-gray-50 mx-auto p-12 rounded-lg">
          <p className="text-6xl font-bold">{name}</p>
          <p className="my-6">{location}</p>
          <div className="">
            <p className="font-semibold">Time : {time} WIB</p>
            <p>{date}</p>
          </div>
        </div>
      </div>
      <hr className="" />
      <div className="w-4/5 mx-auto py-6">
        <h2 className="font-semibold text-3xl mb-8">Review</h2>

        <ReviewList />
      </div>
      <hr />
      <div className="w-4/5 mx-auto flex items-end mt-10">
        <div>
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
              className="border rounded-lg h-72 sm:h-48 sm:w-[20rem] lg:w-[40rem] md:w-[30rem]"
              name=""
              id=""
              // cols="60"
              // rows="8"
              placeholder="Leave review here"
              ref={comment}
            ></textarea>
          </div>
        </div>
        <div className="ms-6 lg:ms-20">
          <button
            className="bg-green-500 w-20 h-8 border rounded-lg hover:bg-green-400 ease-in-out duration-300"
            onClick={submit}
          >
            Send
          </button>
        </div>
      </div>
      <div className="h-24"></div>
    </Container>
  );
};

export default Review;
