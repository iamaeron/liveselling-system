import { CountdownTimer } from "@/components/seller/timer-count";
import { DataTable } from "@/components/table";
import type { tableFeatureSet } from "@/components/table/table-features";
import { ActionIcon } from "@/components/ui/action-icon";
import { Button } from "@/components/ui/button";
import {
  Menu,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuTrigger,
} from "@/components/ui/menu";
import { useFetchStockHolds } from "@/lib/fetcher/stock-hold.fetcher";
import type { GetStockHoldsReturnValue } from "@shared/types/db.type";
import { MenuDotsIcon } from "@solar-icons/react/bold";
import { AddIcon, LinkMinimalistic2Icon } from "@solar-icons/react/linear";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<
  typeof tableFeatureSet,
  GetStockHoldsReturnValue
>();

const columns = columnHelper.columns([
  columnHelper.display({
    id: "rowNumber",
    header: "#",
    size: 48,
    cell: (info) => info.row.index + 1,
    meta: { align: "center" },
  }),
  columnHelper.accessor("customer.facebookName", {
    header: "Customer",
    sortFn: "text",
    size: 150,
  }),
  columnHelper.accessor("product.name", {
    header: "Product",
    sortFn: "text",
    size: 200,
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    sortFn: "text",
    size: 60,
  }),
  columnHelper.accessor((row) => row, {
    header: "Total Price",
    sortFn: "text",
    size: 200,
    cell: (info) => {
      const inf = info.getValue();
      const total = Number(inf.product.price) * inf.quantity;

      return (
        <span>
          {" "}
          <span className="text-muted-foreground">₱</span>
          {total}{" "}
          {inf.quantity > 1 && (
            <span className="text-muted-foreground">
              ({inf.product.price} each)
            </span>
          )}
        </span>
      );
    },
  }),
  columnHelper.accessor((row) => row.expiresAt, {
    header: "Expires In",
    sortFn: "text",
    size: 80,
    cell: (info) => (
      <CountdownTimer
        expiresAt={info.getValue()}
        onExpire={() => console.log(`Expired`)}
      />
    ),
  }),
  columnHelper.accessor((row) => row, {
    header: " ",
    size: 48,
    cell: (info) => (
      <div>
        <Menu>
          <MenuTrigger render={<ActionIcon variant="ghost" />}>
            <MenuDotsIcon size={16} />
          </MenuTrigger>
          <MenuPortal>
            <MenuPositioner align="end" sideOffset={6}>
              <MenuPopup>
                {/* <MenuGroupLabel>{info.getValue().}</MenuGroupLabel> */}
                <MenuItem>
                  <LinkMinimalistic2Icon size={16} />
                  Copy Portal Link
                </MenuItem>
                <MenuItem>
                  <LinkMinimalistic2Icon size={16} />
                  Send to Messenger
                </MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      </div>
    ),
  }),
]);

const SellerStockHolds = () => {
  const { data, isPending } = useFetchStockHolds();

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-semibold text-xl">Stock Holds</h1>
        <div className="text-sm text-muted-foreground">
          Track and manage items currently placed on temporary hold or reserved
          in buyer carts during live streams or orders.
        </div>
      </header>

      {isPending ? (
        <div>Loading ...</div>
      ) : (
        <DataTable
          columns={columns}
          data={data.stockHolds}
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

export default SellerStockHolds;
