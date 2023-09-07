import { useState } from "react"

import { ArrowLeft } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"
import { Label } from "../../ui/label"
import SelectLocation from "./SelectLocation"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"
import { useLocation } from "@/hooks/useLocation"

const LocationField = ({ form }) => {
    const [locationRadio, setLocationRadio] = useState()
    const [locationId, setLocationId] = useState({
        regency: "",
        province: ""
    })

    const { data: provincies } = useQuery(["provinces"], async () => {
        const res = await axios.get("http://putuhema.github.io/api-wilayah-indonesia/api/provinces.json")
        return res.data
    })
    const { data: regencies } = useLocation("regencies", locationId.province)
    const { data: districts } = useLocation("districts", locationId.regency)

    const handleSelectOnChange = (label, value) => {
        form.setValue(`location.${label}`, value)
        setLocationId({ ...locationId, [label]: value })
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
                                        setLocationId({})
                                        setLocationRadio("online");
                                        form.setValue("location", {});
                                        form.setValue("location.isOnline", "online")
                                    }}
                                ><ArrowLeft className="w-4 h-4 cursor-pointer" /></span>
                            )
                        }
                        Event Location </FormLabel>
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
                                    onChange={(value) => handleSelectOnChange("province", value)} />
                                {
                                    regencies ? (
                                        <SelectLocation
                                            label="regency"
                                            locations={regencies}
                                            form={form}
                                            onChange={(value) => handleSelectOnChange("regency", value)}
                                        />
                                    ) : <Skeleton className="h-10 w-[100px] p-4 self-end" />
                                }
                                {
                                    districts ? (
                                        <SelectLocation
                                            label="district"
                                            locations={districts}
                                            form={form}
                                        />
                                    ) : <Skeleton className="h-10 w-[100px] p-4 self-end" />
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