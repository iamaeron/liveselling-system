import { DataTable } from "@/components/table";
import type { tableFeatureSet } from "@/components/table/table-features";
import { ActionIcon } from "@/components/ui/action-icon";
import { Button } from "@/components/ui/button";
import { useFetchCustomers } from "@/lib/fetcher/customer.fetcher";
import type { GetCustomersReturnValue } from "@shared/types/db.type";
import { MenuDotsIcon } from "@solar-icons/react/bold";
import { ExportIcon } from "@solar-icons/react/linear";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<
  typeof tableFeatureSet,
  GetCustomersReturnValue
>();

const columns = columnHelper.columns([
  columnHelper.accessor((_, idx) => idx + 1, {
    id: "rowNumber",
    header: () => <span className="text-zinc-400">#</span>,
    size: 48,
    sortFn: "auto",
    cell: (info) => <span className="text-zinc-400">{info.row.index + 1}</span>,
    meta: { align: "center" },
  }),
  columnHelper.accessor("facebookName", {
    header: "Name",
    sortFn: "text",
    size: 320,
  }),
  columnHelper.accessor("orders", {
    header: "Bought Products",
    sortFn: "text",
    size: 100,
    cell: (info) => <span>{info.getValue().length}</span>,
  }),
  columnHelper.accessor("holds", {
    header: "On Hold",
    sortFn: "text",
    size: 100,
    cell: (info) => <span>{info.getValue().length}</span>,
  }),
  // columnHelper.accessor("code", {
  //   header: "Code",
  //   sortFn: "text",
  //   size: 60,
  //   cell: (info) => (
  //     <span className="font-semibold text-foreground">{info.getValue()}</span>
  //   ),
  // }),
  // columnHelper.accessor("price", {
  //   header: "Price",
  //   sortFn: "alphanumeric",
  //   cell: (info) => (
  //     <span>
  //       <span className="text-muted-foreground">₱</span>
  //       <NumberFormatter value={Number(info.getValue())} />
  //     </span>
  //   ),
  //   size: 140,
  // }),
  // columnHelper.accessor((row) => row, {
  //   header: "Stock",
  //   size: 100,
  //   cell: (info) => {
  //     const totalWithHeld = info
  //       .getValue()
  //       .holds.reduce((sum, prod) => sum + prod.quantity, 0);

  //     return <span>{info.getValue().stock - totalWithHeld}</span>;
  //   },
  // }),
  // columnHelper.accessor("holds", {
  //   header: "On Hold",
  //   cell: (info) => {
  //     const totalWithHeld = info
  //       .getValue()
  //       .reduce((sum, prod) => sum + prod.quantity, 0);

  //     return <span>{totalWithHeld}</span>;
  //   },
  //   size: 100,
  // }),
  columnHelper.display({
    header: " ",
    size: 48,
    cell: () => (
      <div>
        <ActionIcon variant="ghost">
          <MenuDotsIcon size={16} />
        </ActionIcon>
      </div>
    ),
  }),
]);

const SellerCustomers = () => {
  const { data, isPending } = useFetchCustomers();

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Customers</h1>
        <p className="text-sm text-muted-foreground">
          View customer profiles, purchase histories, contact details, and buyer
          interactions.
        </p>
      </header>

      {isPending ? (
        <div>Loading ...</div>
      ) : (
        <DataTable
          columns={columns}
          data={data.customers}
          searchPlaceholder="Search ..."
          pageSize={5}
          tableKey="people-table"
          rightAction={
            <Button>
              <ExportIcon size={16} strokeWidth={2} />
              Export
            </Button>
          }
        />
      )}
    </div>
  );
};

export default SellerCustomers;
