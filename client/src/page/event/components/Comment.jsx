import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import services from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import CommentSection from "./CommentSection";
import { useState } from "react";

const Comment = ({ review, isChild }) => {
  const [isReply, setIsReply] = useState(false);

  const { data, isFetched } = useQuery({
    queryKey: ["reply", review.id],
    queryFn: async () => {
      const res = await services.get(`/events/reply/${review.id}`);
      return res.data;
    },
    enabled: !!review.id,
    refetchInterval: 1000
  });


  const NestedComment = (data || []).map((review) => (
    <Comment key={review.id} review={review} isChild={true} />
  ));
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-start gap-2">
            <Avatar className={isChild && 'w-7 h-7'}>
              <AvatarImage src={review.user.imageUrl} alt={review.user.firstname} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>
              <span className="flex gap-2 items-center">
                <p className="text-muted-foreground">@{review.user.firstname}</p>
                {
                  !isChild && (
                    <div className="flex gap-1">
                      {review.rating &&
                        [...Array(5)].map((star, index) => {
                          const currentRating = index + 1;
                          return (
                            <label key={index}>
                              <input
                                className="hide"
                                type="radio"
                                name="rating"
                                value={currentRating}
                              />
                              <Star
                                fill={
                                  currentRating <= review.rating
                                    ? "#2563eb"
                                    : "none"
                                }
                                className={`text-primary w-4 h-4`}
                              />
                            </label>
                          );
                        })}
                    </div>
                  )
                }
              </span>
              <p>{review.comment}</p>
              <span className="flex gap-2 items-center">
                <ThumbsUp className="w-4 h-4" />
                <ThumbsDown className="w-4 h-4" />
                <p
                  onClick={() => setIsReply(!isReply)}
                  className="text-muted-foreground cursor-pointer"
                >
                  {isFetched && data.length > 0 ? data.length : ""} reply
                </p>
              </span>
            </span>
          </span>
        </div>

        {isReply && (
          <div className="ml-8">
            <CommentSection
              isChild={true}
              event={review.event}
              commentId={review.id}
            />
            {NestedComment}
          </div>
        )}
      </div>

    </>
  );
};

export default Comment;
