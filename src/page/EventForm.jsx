import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Plus, X, ArrowLeft } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "@/schema"
import { useDispatch } from "react-redux"
import { getProvincies, postEvent } from "@/features/slice/eventAction"

import Container from "@/components/layout/Container"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useNavigate } from "react-router-dom"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { categories } from "../../constant"
import PickedTime from "@/components/event/forms/PickedTime"
import DateAndTime from "@/components/event/forms/DateAndTime"
import LocationField from "@/components/event/forms/LocationField"

const EventForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [type, setType] = useState('free')

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            location: {
                isOnline: "",
                province: "",
                regency: "",
                district: "",
                address: ""
            },
            date: new Date(),
            time: {
                hours: "0",
                minutes: "0",
                type: ""
            },
            description: "",
            // picturepath: "",
            type: "",
            price: 0,
            tags: []
        }
    })


    useEffect(() => {
        dispatch(getProvincies())
    }, [dispatch])

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            form.reset({
                name: "",
                location: {
                    isOnline: "",
                    province: "",
                    regency: "",
                    district: "",
                    address: ''
                },
                date: new Date(),
                time: {
                    hours: "0",
                    minutes: "0",
                    type: ""
                },
                description: "",
                // picturepath: "",
                type: "",
                price: 0,
                tags: []
            })
        }
    }, [form.formState, form])

    const onSubmit = (values) => {
        setTags([])
        dispatch(postEvent({
            ...values,
            date: new Date(values.date),
            time: `${values.time.hours}:${values.time.minutes} ${values.time.type.toUpperCase()}`,
            id: uuidv4()
        }))

    }

    const handleAddTag = () => {
        setTag("")
        setTags([...tags, tag])
        form.setValue("tags", [...form.getValues('tags'), tag])
    }

    // console.log(form.watch())
    return (
        <Container>
            <div className="w-full border rounded-md p-4">
                <span className="flex gap-4">
                    <span className="cursor-pointer" onClick={() => navigate(-1)}>
                        <ArrowLeft />
                    </span>
                    <h2 className="font-bold text-lg mb-6">Lets create your event</h2>
                </span>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
                        <div className="flex gap-4 w-full">
                            <div className="w-full space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-3">
                                            <FormLabel htmlFor="name">Event Name</FormLabel>
                                            <FormControl>
                                                <Input id="name" placeholder="What is your event called" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <LocationField form={form} />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Event Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Tell us about the event" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="w-full space-y-4">
                                <div className="flex gap-4">
                                    {
                                        type === 'paid' ? (
                                            <FormField
                                                control={form.control}
                                                name="price"
                                                render={({ field }) => (
                                                    <FormItem className="w-full flex flex-col gap-2">
                                                        <span className="flex gap-2">
                                                            <span
                                                                onClick={() => setType('free')}
                                                            ><ArrowLeft className="w-4 h-4 cursor-pointer" /></span>
                                                            <FormLabel htmlFor="price">Event Price</FormLabel>
                                                        </span>
                                                        <FormControl>
                                                            <div className="flex border rounded-md">
                                                                <span className="block p-2 bg-gray-100  text-gray-500">Rp.</span>
                                                                <Input className="border-none" id="price" {...field} placeholder="how much your event cost" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        ) : (
                                            <FormField
                                                control={form.control}
                                                name="type"
                                                render={() => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Event Type</FormLabel>
                                                        <FormControl>
                                                            <Select onValueChange={(value) => { setType(value); form.setValue("type", value) }}
                                                                value={type}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select Event Type" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="free">Free</SelectItem>
                                                                        <SelectItem value="paid">Paid</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )
                                    }
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Event Category</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={(e) => {
                                                        field.onChange(e)
                                                    }} defaulValue={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Event Category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {
                                                                    categories.map(category => (
                                                                        <SelectItem key={category.value} value={category.value}>{category.text}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex gap-4 justify-between">
                                    <DateAndTime form={form} />
                                    <PickedTime form={form} />
                                </div>
                                {/* <FormField
                                    control={form.control}
                                    name="picturepath"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="picture"
                                                    type="file"
                                                    {...field}
                                                    value={field.picturepath}
                                                    onChange={(event) => {
                                                        field.onChange(event.target.files[0].name)
                                                    }} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}

                                <div className="flex flex-col text-sm gap-3 h-max">
                                    <label htmlFor="tag">tag(s)</label>
                                    <div className="flex gap-2">
                                        <span className="border w-max rounded-md flex">
                                            <Input className="border-none focus-visible:rounded-none py-1 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-gray-200 focus-visible:outline-none w-[100px] " id="tag" type="text"
                                                value={tag}
                                                onChange={(e) => setTag(e.target.value)}
                                                placeholder="ex. Book"
                                            />
                                            <span onClick={handleAddTag} className="p-2 cursor-pointer bg-gray-100 text-gray-500"><Plus size={20} /></span>
                                        </span>
                                        <span className="flex flex-wrap max-w[400px] gap-2 h-max">{
                                            tags.map((tag, i) => (
                                                <Badge key={i} className="flex gap-2 justify-between">
                                                    <span>{tag}</span>
                                                    <span className="cursor-pointer" onClick={() => {
                                                        setTags(preTags => preTags.filter((_, index) => i !== index))
                                                        form.setValue('tags', form.getValues("tags").filter((_, index) => i !== index))
                                                    }}>
                                                        <X size={15} />
                                                    </span>
                                                </Badge>
                                            ))
                                        }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="mt-4" type="submit">Create Event</Button>
                    </form>
                </Form>
            </div>
        </Container>
    )
}


export default EventForm