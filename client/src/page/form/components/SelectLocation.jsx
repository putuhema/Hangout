import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SelectLocation = ({ label, form, locations, onChange }) => {

    return (
        <>
            <FormField
                control={form.control}
                name={`location.${label}`}
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>{label}</FormLabel>
                        <Select onValueChange={onChange || field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue className="text-muted-foreground" placeholder={label} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className="h-[200px]">
                                {
                                    locations.map(location => (
                                        <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}


export default SelectLocation