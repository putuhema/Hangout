import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"

const PickedTime = ({ form }) => {

    return (
        <FormField
            control={form.control}
            name="time"
            render={() => (
                <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                        <div className="flex gap-2">
                            <Select onValueChange={(hours) => form.setValue("time.hours", hours)} defaulValue={form.getValues("time.hours")}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="hours" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectGroup className="h-[100px] overflow-y-auto">
                                        {
                                            Array.from(Array(12).keys()).map(hour => (
                                                <SelectItem key={hour} value={String(hour + 1).padStart(2, "0")}>{String(hour + 1).padStart(2, "0")}</SelectItem>
                                            )
                                            )
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select onValueChange={(minutes) => form.setValue("time.minutes", minutes)} defaulValue={form.getValues("time.minutes")}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="minutes" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectGroup className="h-[100px] overflow-y-auto">
                                        {
                                            Array.from(Array(61).keys()).map(minutes => (
                                                <SelectItem key={minutes} value={String(minutes + 1).padStart(2, "0")}>{String(minutes).padStart(2, "0")}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select onValueChange={(type) => form.setValue("time.type", type)} defaulValue={form.getValues("time.type")}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="PM" />
                                </SelectTrigger>
                                <SelectContent >
                                    <SelectGroup>
                                        <SelectItem value="pm">PM</SelectItem>
                                        <SelectItem value="am">AM</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}


export default PickedTime