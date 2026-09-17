import type { tableFeatureSet } from "@/components/table/table-features";
import { useFetchProducts } from "@/lib/fetcher/product.fetcher";
import { createColumnHelper } from "@tanstack/react-table";
import type { GetProductsReturnValue } from "@shared/types/db.type";
import { DataTable } from "@/components/table";
import { ActionIcon } from "@/components/ui/action-icon";
import { MenuDotsIcon } from "@solar-icons/react/bold";
import { Button } from "@/components/ui/button";
import { AddIcon } from "@solar-icons/react/linear";

const columnHelper = createColumnHelper<
  typeof tableFeatureSet,
  GetProductsReturnValue
>();

const columns = columnHelper.columns([
  columnHelper.display({
    id: "rowNumber",
    header: "#",
    size: 48,
    cell: (info) => info.row.index + 1,
    meta: { align: "center" },
  }),
  columnHelper.accessor("name", {
    header: "Name",
    sortFn: "text",
    size: 320,
  }),
  columnHelper.accessor("code", {
    header: "Code",
    sortFn: "text",
    size: 60,
    cell: (info) => (
      <span className="font-semibold text-foreground">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    sortFn: "alphanumeric",
    cell: (info) => (
      <span>
        <span className="text-muted-foreground">₱</span>
        {info.getValue()}
      </span>
    ),
    size: 140,
  }),
  columnHelper.accessor("stock", {
    header: "Stock",
    cell: (info) => <span>{info.getValue()}</span>,
    size: 100,
  }),
  columnHelper.accessor("holds", {
    header: "On Hold",
    cell: (info) => <span>{info.getValue().length}</span>,
    size: 100,
  }),
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

const SellerProducts = () => {
  const { data, isPending } = useFetchProducts();

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">
          Products & Codes
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage product inventory, pricing, stock levels, and map custom
          comment trigger codes.
        </p>
      </header>

      {isPending ? (
        <div>Loading ...</div>
      ) : (
        <DataTable
          columns={columns}
          data={data.products}
          searchPlaceholder="Search ..."
          pageSize={5}
          tableKey="people-table"
          rightAction={
            <Button>
              <AddIcon size={16} strokeWidth={2} />
              Add Product
            </Button>
          }
        />
      )}
    </div>
  );
};

export default SellerProducts;
