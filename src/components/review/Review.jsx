import StarRatingTemplate from "../star/StarRatingTemplate";

const Review = ({ reviews }) => {
  const { rating, comment } = reviews;
  const username = reviews?.user.name;
  // console.log(rating);
  return (
    <div className="flex my-10">
      <div className=" me-10 font font-semibold text-lg">
        <p className="lg:w-[10rem] w-[5rem]">{username}</p>
      </div>
      <div>
        <div className="flex">
          <p className="font font-semibold text-lg w-24">Rating</p>
          <StarRatingTemplate rating={rating} />
          <p className="font text-lg w-24 ms-2">({rating})</p>
        </div>
        <div className="">
          <p className="font font-semibold text-lg">Comment</p>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
