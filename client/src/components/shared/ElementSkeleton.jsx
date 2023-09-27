import { Skeleton } from "../ui/skeleton";

const QuerySkeleton = ({ data, element }) => {
  return data ? element : <Skeleton className="w-8 h-4" />;
};

export default QuerySkeleton;
