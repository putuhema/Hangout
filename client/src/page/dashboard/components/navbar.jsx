import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import services from "@/services"
import { SignOutButton, useAuth } from "@clerk/clerk-react"
import { useQuery } from "@tanstack/react-query"
import { LogOut } from "lucide-react"

const Navbar = () => {
    const { userId, isLoaded, isSignedIn } = useAuth()
    const userSignIn = isLoaded && isSignedIn
    const { data: user, isFetched } = useQuery({
        queryKey: ["user", userId],
        queryFn: async () => {
            const res = await services.get(`/users/${userId}`)
            return res.data
        },
        enabled: !!userId
    })

    return (
        <nav className="shadow-sm w-full p-2 px-4 flex items-center justify-between bg-background text-foreground border-b border-border">
            <p className="font-bold text-xl">Dashboard</p>
            <div className={`${userSignIn && 'p-1 rounded-md w-12 h-12 ml-8'}`}>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className="ring-2 ring-border">
                            <AvatarImage className="object-cover" src={isFetched && user.imageUrl} />
                            <AvatarFallback>PM</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="">
                            <div className="flex gap-2 items-center">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={isFetched && user.imageUrl} />
                                    <AvatarFallback>PM</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p>{isFetched && `${user.first_name} ${user.last_name}`}</p>
                                    <p className="text-gray-400 text-xs">{isFetched && user.email}</p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex gap-2 items-center mt-6">
                            <LogOut className="w-4 h-4" />
                            <SignOutButton />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


            </div>
        </nav>
    )
}

export default Navbar