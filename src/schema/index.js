import * as z from "zod"


export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Event name must be at least 2 character(s)"
    }).max(50),
    location: z.object({
        isOnline: z.string(),
        province: z.string().optional(),
        regency: z.string().optional(),
        district: z.string().optional(),
        address: z.string().optional()
    }),
    date: z.date(),
    time: z.object({
        hours: z.string(),
        minutes: z.string(),
        type: z.string()
    }),
    description: z.string().min(2),
    type: z.string(),
    price: z.string().optional(),
    category: z.string(),
    tags: z.string().array(),
})


export const eventRegisterSchema = z.object({
    referal: z.string().optional(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
})