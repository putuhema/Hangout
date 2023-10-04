import services from "@/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useCurrentUser = (externalId) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["user", externalId],
    queryFn: async () => {
      const cache = queryClient.getQueryData(["user"]);
      if (cache) {
        return cache;
      }
      const res = await services.get(`/users/${externalId}`);
      return res.data;
    },
    enabled: Boolean(externalId),
  });

  return { data, isLoading, isFetched };
};
