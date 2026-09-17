// table-features.ts
//
// TanStack Table v9 makes every feature opt-in and tree-shakable. You declare
// the set of features + row model factories ONCE with `tableFeatures()`, then
// reuse that same object (and its inferred type) across every table + column
// definition in your app so everything stays type-safe together.
//
// Add/remove entries here to add/remove capabilities from every table that
// imports `tableFeatureSet`.

export interface AppColumnMeta {
  /** Text alignment for this column's header + cells. Defaults to 'left'. */
  align?: "left" | "center" | "right";
}

import {
  tableFeatures,
  rowSortingFeature,
  rowPaginationFeature,
  columnFilteringFeature,
  columnSizingFeature,
  globalFilteringFeature,
  createSortedRowModel,
  createPaginatedRowModel,
  createFilteredRowModel,
  sortFn_alphanumeric,
  sortFn_text,
  filterFn_includesString,
  metaHelper,
} from "@tanstack/react-table";

export const tableFeatureSet = tableFeatures({
  // Features (add capability + state to the table)
  rowSortingFeature,
  rowPaginationFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  columnSizingFeature,

  // Row model factories (only pay for the ones you register)
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filteredRowModel: createFilteredRowModel(),

  // Named function registries — register only what you use.
  // Reference these by key (e.g. sortFn: 'alphanumeric') or just pass a
  // function directly on a column's `sortFn`/`filterFn` without registering.
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
  },
  filterFns: {
    includesString: filterFn_includesString,
  },

  columnMeta: metaHelper<AppColumnMeta>(),
});

// Handy alias to keep column-definition files free of the verbose generic.
export type AppTableFeatures = typeof tableFeatureSet;
