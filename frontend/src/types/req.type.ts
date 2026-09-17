import type { UndefinedInitialDataOptions } from "@tanstack/react-query";

export type Param = {
  [k: string]: string;
};

export type FetcherOptions = Omit<
  UndefinedInitialDataOptions<any, Error, any, any>,
  "queryKey" | "queryFn"
>;
