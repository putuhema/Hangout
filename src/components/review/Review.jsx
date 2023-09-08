import StarRatingTemplate from "./star/StarRatingTemplate";

const Review = ({ review }) => {
  const { rating, comment, user } = review;

  let render = comment.length > 0 ? <p className="font font-semibold text-lg w-[150px]">Comment</p> : <></>;

  return (
    <div className="flex my-6">
      <div className="flex w-48 me-10 font text-lg">
        <img className="w-16 h-16 me-2 rounded-full " src={user.imageUrl} alt="" />
        <p className="w-48">{user.fullname}</p>
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <p className="font font-semibold text-lg w-[150px] ">Rating</p>
          <StarRatingTemplate rating={rating} />
          <p className="font text-lg ms-2">({rating})</p>
        </div>
        <div className="flex mt-2">
          <div>{render}</div>
          <p className="lg">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
