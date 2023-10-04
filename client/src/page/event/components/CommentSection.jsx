import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { eventComment } from "@/schema";
import { useAuth, useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import services from "@/services";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ReviewStar from "./ReviewStar";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const CommentSection = ({ event, isChild, commentId }) => {
  const queryClient = useQueryClient()
  const { userId } = useAuth();
  const { data: currentUser, isFetched } = useCurrentUser(userId)
  const { user, isSignedIn } = useUser();
  const [rating, setRating] = useState(null);
  const form = useForm({
    resolver: zodResolver(eventComment),
    defaultValues: {
      review: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (comment) => services.post("/events/reviews", comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", String(event.id)] })
      queryClient.invalidateQueries({ queryKey: ["reply", commentId] })
    }
  });

  const onSubmit = (values) => {
    mutate({
      ...values,
      rating: rating,
      eventId: event.id,
      userCommentId: isFetched && currentUser.id,
      parentId: commentId,
    });
  };

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({
        review: "",
      });
      setRating(null);
    }
  }, [form, form.formState]);

  const handleRating = (value) => {
    setRating(value);
  };
  return (
    <div className="p-2 flex gap-4">
      <Avatar className="w-7 h-7">
        <AvatarImage
          src={isSignedIn ? user.imageUrl : ""}
          alt={isSignedIn ? user.fullName : "user avatar"}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
          className="w-full flex flex-col gap-2"
        >
          {!isChild && (
            <ReviewStar rating={rating} handleRating={handleRating} />
          )}
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="w-full resize-none focus:ring-blue-500 focus:border-blue-500 focus:outline-primary form-textarea"
                    rows={isChild ? "1" : "3"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="self-end flex items-center gap-2">
            <Button className="bg-secondary hover:bg-secondary text-muted-foreground border rounded-full">
              Cancel
            </Button>
            <Button className="bg-primary hover:bg-primary/80 rounded-full">
              {isLoading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : isChild ? (
                "Reply"
              ) : (
                "Comment"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CommentSection;
