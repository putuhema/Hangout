import Container from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { FormatToIDR } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeft, Heart, Share, Star, Ticket } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import services, { baseUrl } from "@/services";

import { Separator } from "@/components/ui/separator";
import CommentSection from "./components/CommentSection";
import Comment from "./components/Comment";
import TransactionDialog from "./components/TransactionDialog";
import { categories } from "@/constant";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { id } from "date-fns/locale";

const EventDetails = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { userId } = useAuth()
  const { data: currentUser, isFetched: isCurrentUserFetched } = useCurrentUser(userId)
  const { data: event, isFetched } = useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const res = await services.get(`/events/${eventId}`);
      return res.data;
    },
    refetchInterval: 1000,
  });

  const category = isFetched ? categories.filter(
    (category) => category.value === event.category,
  )[0] : {};

  const eventRating = isFetched && event.reviews.length > 0
    ? event.reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) / event.reviews.filter(review => review.rating !== null).length
    : -1;


  let ratingEvaluate = "";
  if (eventRating > 0 && eventRating <= 1.0) {
    ratingEvaluate = "Very Poor";
  } else if (eventRating > 1 && eventRating <= 1.5) {
    ratingEvaluate = "Poor";
  } else if (eventRating > 1.5 && eventRating <= 2.0) {
    ratingEvaluate = "Below Average";
  } else if (eventRating > 2.0 && eventRating <= 2.5) {
    ratingEvaluate = "Average";
  } else if (eventRating > 2.5 && eventRating <= 3.0) {
    ratingEvaluate = "Good";
  } else if (eventRating > 3.0 && eventRating <= 3.5) {
    ratingEvaluate = "Above Average";
  } else if (eventRating > 3.5 && eventRating <= 4.0) {
    ratingEvaluate = "Exellent";
  } else if (eventRating > 4.0 && eventRating <= 4.5) {
    ratingEvaluate = "Outstanding";
  } else if (eventRating > 4.5 && eventRating <= 5.0) {
    ratingEvaluate = "Perfect";
  } else {
    ratingEvaluate = "No Rating";
  }

  const price = isFetched && event.type === "paid" ? Number(event.price) : 0;
  let discount = 0;

  if (isFetched && event.promo && event.promo.used <= event.promo.limit) {
    const promoAmount = Number(event.promo.amount);
    if (!isNaN(promoAmount) && promoAmount > 0) {
      discount = price - (price * promoAmount) / 100;
    }
  }


  // following 
  const followMutate = useMutation({
    mutationFn: (data) => {
      return services.post('/users/follow', data)
    }
  })
  const unfollowMutate = useMutation({
    mutationFn: (data) => {
      return services.post('/users/unfollow', data)
    }
  })
  const handleFollow = () => {
    followMutate.mutate({
      followingId: currentUser.id,
      followerId: event.user.id
    })
  }

  const handleUnfollow = () => {
    unfollowMutate.mutate({
      followingId: currentUser.id,
      followerId: event.user.id
    })
  }

  // FIX: following functionality
  const isFollowing =
    isCurrentUserFetched &&
    isFetched &&
    event.user.followers.some(follower => follower.followingId === currentUser.id);


  return (
    isFetched && (
      <Container>
        <div className="flex flex-col gap-4 pb-10">
          <span className="cursor-pointer" onClick={() => navigate(-1)}>
            <span className="flex items-center gap-2">
              <ArrowLeft className="text-primary w-4 h-4" />{" "}
              <p className="hover:underline text-muted-foreground hover:text-foreground">
                back
              </p>
            </span>
          </span>
          <div className="relative h-[350px] w-full">
            <div className="flex gap-2 z-10">
            </div>
            <img
              className="absolute inset-0 z-1 rounded-md h-full w-full object-cover"
              src={`${baseUrl}/${event.imagePath}`}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {format(new Date(event.date), "PPP", { locale: id })}
            </p>
            <div className="flex flex-col items-center">
              <span className="p-2 rounded-md flex items-center gap-2">
                <Star className="w-6 h-6 text-primary" />
                {eventRating > 0 ? eventRating.toFixed(2) : "-"}
              </span>
              <p className="text-xs text-muted-foreground">
                {ratingEvaluate + " Event"}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="order-2 md:order-1 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-2xl md:text-4xl">{event.name}</h2>
                <Link to={`/event/category/${category.value}`} className="flex gap-2 text-muted-foreground">
                  {category.icon}
                  <p className="">{category.text}</p>
                </Link>
              </div>
              <p>{event.description}</p>
              {isFetched && (
                <div className="w-full p-2 mt-4 rounded-md bg-secondary flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      className="object-cover rounded-full w-[30px] h-[30px] self-start"
                      src={event.user.imageUrl}
                    />
                    <span className="flex flex-col">
                      <p className="font-bold">{event.user.firstname}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.user.followers.length} Follower
                      </p>
                    </span>
                  </div>
                  {
                    !isFollowing ? (
                      <Button onClick={handleFollow} className="bg-primary rounded-full hover:bg-primary/80">
                        FOLLOW
                      </Button>
                    ) : (
                      <Button onClick={handleUnfollow} className="bg-primary rounded-full hover:bg-primary/80">
                        UNFOLLOW
                      </Button>
                    )

                  }
                </div>
              )}
              <div className="space-y-6 mt-6">
                <span className="block">
                  <p className="font-bold">Date & Time</p>
                  <span className="flex gap-2">
                    <p>{format(new Date(event.date), "PPP")}</p>
                    <span className="text-muted-foreground">{event.time}</span>
                  </span>
                </span>
                <span className="block">
                  <p className="font-bold">Location</p>
                  <p className="text-muted-foreground">{event.location}</p>
                </span>
                <span className="block">
                  {
                    event.tag.length > 0 && (
                      <>
                        <p className="font-bold">Tags</p>
                        <span className="space-x-2">
                          {event.tag.map((tag) => (
                            <Badge
                              className="cursor-pointer bg-primary hover:bg-primary/80"
                              key={tag.id}
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </span>
                      </>
                    )
                  }
                </span>
              </div>
            </div>
            <div className="order-1 md:order-2 flex flex-col self-start gap-4 w-full md:w-max">
              <span className="flex items-center gap-4 self-end">
                <Heart className="w-6 h-6 cursor-pointer" />
                <Share className="w-6 h-6 cursor-pointer" />
              </span>
              <div className="md:border md:border-border rounded-md w-full md:w-[250px] justify-between py-3 gap-2 md:px-6 md:py-4 flex flex-row md:flex-col items-center h-max">
                {discount > 0 ? (
                  <span>
                    <p className="font-bold">{FormatToIDR(discount)}</p>
                    <span className="flex gap-2">
                      <Badge className="text-xs bg-primary hover:bg-primary/80">{`${event.promo.amount}%`} </Badge>
                      <p className="line-through text-muted-foreground text-sm">
                        {FormatToIDR(price)}
                      </p>
                    </span>
                  </span>
                ) : (
                  <p className=" font-bold text-lg">
                    {event.type === "paid" ? FormatToIDR(price) : event.type}
                  </p>
                )}
                <Dialog>
                  <DialogTrigger>
                    <span className="flex items-center gap-2 hover:bg-secondary w-full order-2 md:order-1 border p-2 rounded-md">
                      <Ticket className="text-primary" />
                      <p>Get Ticket</p>
                    </span>

                    {
                      event.promo &&
                      event.promo.used <= event.promo.limit && (
                        <p className="text-xs my-2 text-muted-foreground">{event.promo.used} / {event.promo.limit} people used this promo</p>
                      )
                    }
                  </DialogTrigger>
                  <TransactionDialog
                    event={event}
                    user={isCurrentUserFetched && currentUser}
                    discount={discount}
                    price={price}
                  />
                </Dialog>
              </div>
            </div>
          </div>
          <div className="w-full my-8">
            {
              currentUser && (
                <CommentSection event={event} commentId={null} />
              )
            }
            <p>{`${event.reviews.length} Comments`}</p>
            <Separator className="my-6" />
            <div className="flex flex-col gap-4">
              {isFetched &&
                event.reviews.length > 0 &&
                event.reviews
                  .map((review) => (
                    <Comment key={review.id} review={review} isChild={false} />
                  ))}
            </div>
          </div>
        </div>
      </Container>
    )
  );
};

export default EventDetails;
