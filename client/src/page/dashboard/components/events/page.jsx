import DataTable from "./data-table"
import { columns } from "./column"
import { useAuth } from "@clerk/clerk-react"
import { useQueryCache } from "@/hooks/useQueryCache"


const Page = () => {
  const { userId } = useAuth()

  const { data, isFetched } = useQueryCache(`event/${userId}`, '/user', { id: userId }, !!userId)

  return (
    <div className="container mx-auto py-10">
      {
        isFetched && (
          <DataTable columns={columns} data={data} />
        )
      }
    </div>
  )
}

export default Page