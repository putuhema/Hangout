import { cn } from "@/lib/utils"
import { Button } from "../../../components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "../../../components/ui/calendar"

const DateAndTime = ({ form }) => {

    return (
        <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
                <FormItem className="flex gap-3 flex-col">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default DateAndTime