import DataTable from "./data-table";
import { columns } from "./column";
import { useAuth } from "@clerk/clerk-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const Page = () => {
  const { userId } = useAuth();
  const { data, isFetched } = useCurrentUser(userId)
  return (
    <div className="container mx-auto py-10">
      {isFetched && <DataTable columns={columns} data={data.event} />}
    </div>
  );
};

export default Page;
