import { DollarSign } from "lucide-react"

const Overview = () => {
    return (
        <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="border rounded-md p-4 bg-background">
                <span className="flex justify-between">
                    <p>Total Revenue</p>
                    <DollarSign className="w-4 h-4" />
                </span>
                <p className="font-bold text-xl">Rp. 20.000.000,-</p>
                <p className="font-bold text-xs text-muted-foreground">+ 120% from last month</p>
            </div>
            <div className="border rounded-md p-4 bg-background">
                <span className="flex justify-between">
                    <p>Total Revenue</p>
                    <DollarSign className="w-4 h-4" />
                </span>
                <p className="font-bold text-xl">Rp. 20.000.000,-</p>
                <p className="font-bold text-xs text-muted-foreground">+ 120% from last month</p>
            </div>
            <div className="border rounded-md p-4 bg-background">
                <span className="flex justify-between">
                    <p>Total Revenue</p>
                    <DollarSign className="w-4 h-4" />
                </span>
                <p className="font-bold text-xl">Rp. 20.000.000,-</p>
                <p className="font-bold text-xs text-muted-foreground">+ 120% from last month</p>

            </div>
            <div className="border rounded-md p-4 bg-background">
                <span className="flex justify-between">
                    <p>Total Revenue</p>
                    <DollarSign className="w-4 h-4" />
                </span>
                <p className="font-bold text-xl">Rp. 20.000.000,-</p>
                <p className="font-bold text-xs text-muted-foreground">+ 120% from last month</p>
            </div>
        </div>
    )
}

export default Overview