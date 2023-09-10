import services from "@/services";
import { useQuery } from "@tanstack/react-query";

const FindAllReview = () => {
  const { data, isSuccess } = useQuery(["reviews"], async () => {
    const res = await services.get(`/reviews`);
    return res.data;
  });
  return { data, isSuccess };
};

export const FindReviewByEvent = (eventId) => {
  const { data, isSuccess } = FindAllReview();

  let averageRating = 0;
  let reviews;
  if (isSuccess) {
    let count = 0;
    reviews = data;
    if (data.length > 0) {
      averageRating =
        reviews
          .map((res) => {
            if (res.eventId === eventId) {
              count++;
              return res.rating;
            }
          })
          .reduce((a, b) => {
            return a + b;
          }) / count;
    } else {
      averageRating = 0;
    }
  }
  return { reviews, averageRating };
};

export const FindUserByEvent = () => {
  const { data, isSuccess } = FindAllReview();
  let reviews;
  if (isSuccess) {
    reviews = data;
  }
  const userId = reviews.map((review) => review.user).map((user) => user.id);

  return userId;
};
