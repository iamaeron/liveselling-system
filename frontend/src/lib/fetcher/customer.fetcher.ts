import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/req.type";

export const useFetchCustomers = (
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["customers", params],
    queryFn: async () => {
      const res = await api.get(`/api/customers?${urlParams}`);
      return res.data;
    },
  });
};
