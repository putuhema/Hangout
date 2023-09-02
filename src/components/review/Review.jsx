const Review = ({ reviews }) => {
  const { rating, comment } = reviews;

  return (
    <div className="sm:h-72 md:h-60 lg:h-36 h-[24rem] ps-4 my-6">
      <div className="flex font-semibold">
        <p className=" w-14">Rating</p>
        <p>{rating}</p>
      </div>
      <div className="">
        <p className="font-semibold">Comment</p>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Review;
