
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import services from '@/services'
import { format } from "date-fns"
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import CopyToClipboard from './components/CopyToClipboard'


const MyReferals = () => {
    const { userId } = useAuth()


    const { data: referals } = useQuery({
        queryKey: ['referals', userId],
        queryFn: async () => {
            const res = await services.get('/users/referals', { params: { id: userId } })
            return res.data.data
        },
        enabled: !!userId
    })



    return (
        <>
            <h2 className="font-bold">My Referals Codes</h2>
            {
                referals &&
                referals.map(referal => (
                    <div key={referal.id} className="w-full flex justify-between items-start bg-secondary border border-border rounded-md p-2">
                        <span>
                            <span className='flex gap-2 items-center'>
                                <Link to={`/event/${referal.id}`}>
                                    <p className="hover:underline cursor-pointer ">{referal.name}</p>
                                </Link>
                                {
                                    new Date() > new Date(referal.date) && (
                                        <Badge className="hover:bg-red-500/50 bg-secondary text-red-500 border border-red-500">Expired</Badge>
                                    )
                                }
                            </span>
                            <p className="text-muted-foreground text-xs">{`${format(new Date(referal.date), "PPP")} ${referal.time}`}</p>
                        </span>
                        <span className="flex items-center gap-4 text-muted-foreground">
                            <p className={`${new Date() > new Date(referal.date) && 'line-through'} select-none`}>{referal.referalCode}</p>
                            <CopyToClipboard referalCode={referal.referalCode} />
                        </span>
                    </div>
                ))
            }
        </>
    )
}

export default MyReferals