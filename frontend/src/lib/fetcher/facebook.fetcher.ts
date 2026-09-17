import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/req.type";

export const useFetchUserPage = (
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["page", params],
    queryFn: async () => {
      const res = await api.get(`/api/facebook/page?${urlParams}`);
      return res.data;
    },
  });
};
