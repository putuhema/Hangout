import { ArrowLeft } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"
import { Label } from "../../ui/label"
import SelectLocation from "./SelectLocation"
import { getDistricts, getRegencies } from "@/features/slice/eventAction"

const LocationField = ({ form }) => {
    const dispatch = useDispatch()
    const [locationRadio, setLocationRadio] = useState()
    const { provincies, regencies, districts } = useSelector((state) => state.events)

    const handleSelectOnChange = (label, value, fn) => {
        form.setValue(`location.${label}`, value)
        dispatch(fn(form.getValues(`location.${label}`)))
    }
    return (

        <FormField
            control={form.control}
            name="location"
            render={() => (
                <FormItem>
                    <FormLabel className="flex gap-2 items-center">
                        {
                            locationRadio === 'custom' && (
                                <span
                                    onClick={() => {
                                        setLocationRadio("online");
                                        form.setValue("location", {});
                                        form.setValue("location.isOnline", "online")
                                    }}
                                ><ArrowLeft className="w-4 h-4 cursor-pointer" /></span>
                            )
                        }
                        Event Location</FormLabel>
                    {
                        locationRadio !== 'custom' ? (
                            <FormControl>
                                <div className="flex items-center gap-2">
                                    <RadioGroup value={locationRadio} onValueChange={(value) => {
                                        setLocationRadio(value);
                                        form.setValue('location.isOnline', value)
                                    }}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="online" id="r1" />
                                            <Label htmlFor="r1">Online</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="custom" id="r2" />
                                            <Label htmlFor="r2">Pick A Location</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </FormControl>
                        ) : (
                            <div className="flex gap-2">
                                <SelectLocation
                                    label="provinces"
                                    locations={provincies}
                                    form={form}
                                    onChange={(value) => handleSelectOnChange("province", value, getRegencies)} />
                                {
                                    regencies.length > 0 && (
                                        <SelectLocation
                                            label="regency"
                                            locations={regencies}
                                            form={form}
                                            onChange={(value) => handleSelectOnChange("regency", value, getDistricts)}
                                        />
                                    )
                                }
                                {
                                    districts.length > 0 && (
                                        <SelectLocation
                                            label="district"
                                            locations={districts}
                                            form={form}
                                        />
                                    )
                                }
                            </div>
                        )
                    }
                    <FormMessage />
                </FormItem>
            )}
        />

    )
}

export default LocationField