import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/req.type";

export const useFetchStockHolds = (
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["stock-holds", params],
    queryFn: async () => {
      const res = await api.get(`/api/stock-holds?${urlParams}`);
      return res.data;
    },
  });
};
