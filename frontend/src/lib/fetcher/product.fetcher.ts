import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { FetcherOptions, Param } from "@/types/req.type";

export const useFetchProducts = (
  params: Param | {} = {},
  options?: FetcherOptions,
) => {
  const urlParams = new URLSearchParams(params).toString();

  return useQuery({
    ...options,
    queryKey: ["products", params],
    queryFn: async () => {
      const res = await api.get(`/api/products?${urlParams}`);
      return res.data;
    },
  });
};
