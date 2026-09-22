import { useTable } from "@tanstack/react-table";
import type { ColumnDef, RowData } from "@tanstack/react-table";
import { tableFeatureSet } from "./table-features";
import { Input } from "../ui/input";
import {
  AltArrowLeftIcon,
  AltArrowRightIcon,
  DoubleAltArrowLeftIcon,
  DoubleAltArrowRightIcon,
  MagnifierIcon,
} from "@solar-icons/react/linear";
import { ActionIcon } from "../ui/action-icon";

export interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<typeof tableFeatureSet, TData>[];
  data: TData[];
  searchPlaceholder?: string;
  pageSize?: number;
  emptyMessage?: string;
  tableKey?: string;
  rightAction?: React.ReactNode;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  searchPlaceholder = "Search...",
  pageSize = 10,
  emptyMessage = "No results.",
  tableKey = "data-table",
  rightAction,
}: DataTableProps<TData>) {
  const table = useTable({
    key: tableKey,
    features: tableFeatureSet,
    columns,
    data,
    initialState: {
      pagination: { pageIndex: 0, pageSize },
    },
  });

  const globalFilter = table.state.globalFilter as string | undefined;
  const rows = table.getRowModel().rows;

  return (
    <div className="w-full space-y-4">
      {/* Global search */}
      <div className="flex items-center justify-between">
        {/* <input
          className="w-full max-w-sm rounded-md border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
          /> */}
        <Input
          value={globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          placeholder={searchPlaceholder}
          className="max-w-xs"
          leftSection={<MagnifierIcon size={16} strokeWidth={2} />}
        />

        {rightAction}
      </div>

      {/* Table */}
      <div className="text-zinc-700 overflow-x-auto rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_0_0_rgba(0,0,0,0.03),0_2px_4px_0_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,1)] bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  const align = header.column.columnDef.meta?.align ?? "left";
                  return (
                    <th
                      key={header.id}
                      style={{ width: header.column.getSize() }}
                      className="px-3 py-2 text-left font-medium text-zinc-600"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            (canSort
                              ? "flex cursor-pointer select-none items-center gap-1 "
                              : "flex items-center gap-1 ") +
                            (align === "center"
                              ? "justify-center text-center"
                              : align === "right"
                                ? "justify-end text-right"
                                : "justify-start text-left")
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <table.FlexRender header={header} />
                          {canSort &&
                            ({ asc: "↑", desc: "↓" } as const)[
                              sortDir as "asc" | "desc"
                            ]}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-zinc-100 hover:bg-zinc-50"
                >
                  {row.getAllCells().map((cell) => {
                    const align = cell.column.columnDef.meta?.align ?? "left";
                    return (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className={
                          "overflow-hidden px-3 py-2 " +
                          (align === "center"
                            ? "text-center"
                            : align === "right"
                              ? "text-right"
                              : "text-left")
                        }
                      >
                        <table.FlexRender cell={cell} />
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-6 text-center text-zinc-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-zinc-600">
        <span>
          Page {table.state.pagination.pageIndex + 1} of{" "}
          {Math.max(table.getPageCount(), 1)} &middot; {rows.length} rows
        </span>
        <div className="flex items-center gap-1">
          {/* <button
            className="rounded-full border border-zinc-300 p-1 disabled:opacity-40"
            >
            «
            </button> */}
          <ActionIcon
            className="p-0.5"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            size="sm"
            variant="outline"
          >
            <DoubleAltArrowLeftIcon />
          </ActionIcon>

          <ActionIcon
            className="p-0.5"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            size="sm"
            variant="outline"
          >
            <AltArrowLeftIcon />
          </ActionIcon>
          {/* <button className="rounded-full border border-zinc-300 p-1 disabled:opacity-40">
            ‹
          </button> */}
          <ActionIcon
            className="p-0.5"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            size="sm"
            variant="outline"
          >
            <AltArrowRightIcon />
          </ActionIcon>

          <ActionIcon
            className="p-0.5"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            size="sm"
            variant="outline"
          >
            <DoubleAltArrowRightIcon />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
}
