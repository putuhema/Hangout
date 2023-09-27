import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Event name must be at least 2 character(s)",
    })
    .max(50),
  location: z.string(),
  date: z.date(),
  time: z.object({
    hours: z.string(),
    minutes: z.string(),
    type: z.string(),
  }),
  description: z.string().min(2),
  type: z.string(),
  price: z.string().optional(),
  category: z.string(),
  tags: z.string().max(10).array(),
  image: z.any()
    .refine(file => {
      return file.size <= MAX_FILE_SIZE
    }
      , "Max image size is 5MB.")
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg,.jpeg,.png and .webp formats are supported")
});


export const editFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Event name must be at least 2 character(s)",
    })
    .max(50),
  location: z.string(),
  date: z.date(),
  time: z.object({
    hours: z.string(),
    minutes: z.string(),
    type: z.string(),
  }),
  description: z.string().min(2),
  type: z.string(),
  price: z.string().optional(),
  category: z.string(),
  tags: z.object({
    id: z.number(),
    name: z.string().max(10)
  }).array(),
  image: z.any(),
  // .refine(file => {
  //   console.log(file)
  //   return file.size <= MAX_FILE_SIZE
  // }
  //   , "Max image size is 5MB.")
  // .refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg,.jpeg,.png and .webp formats are supported")
});


export const eventRegisterSchema = z.object({
  referal: z.string().optional(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
});

export const eventPromos = z.object({
  name: z.string(),
  amount: z.string(),
  limit: z.string(),
});

export const eventComment = z.object({
  review: z.string().min(2, {
    message: "Please write something ...",
  }),
});
