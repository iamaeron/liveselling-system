import CopyCheckoutLinkMenuItem from "@/components/seller/copy-checkout-link-menu-item";
import { CountdownTimer } from "@/components/seller/timer-count";
import { DataTable } from "@/components/table";
import type { tableFeatureSet } from "@/components/table/table-features";
import { ActionIcon } from "@/components/ui/action-icon";
import { Button } from "@/components/ui/button";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { NumberFormatter } from "@/components/ui/number-formatter";
import { useFetchStockHolds } from "@/lib/fetcher/stock-hold.fetcher";
import type { GetStockHoldsReturnValue } from "@shared/types/db.type";
import { MenuDotsIcon } from "@solar-icons/react/bold";
import {
  AlarmAddIcon,
  ChatRoundIcon,
  ExportIcon,
  RepeatIcon,
  Tuning2Icon,
  UndoLeftRoundIcon,
} from "@solar-icons/react/linear";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<
  typeof tableFeatureSet,
  GetStockHoldsReturnValue
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
          <NumberFormatter value={total} />{" "}
          {inf.quantity > 1 && (
            <span className="text-muted-foreground">
              (<NumberFormatter value={Number(inf.product.price)} /> each)
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
    cell: (row) => {
      return (
        <div>
          <Menu>
            <MenuTrigger render={<ActionIcon variant="ghost" />}>
              <MenuDotsIcon size={16} />
            </MenuTrigger>
            <MenuPortal>
              <MenuPositioner align="end" sideOffset={6}>
                <MenuPopup className="min-w-56">
                  <CopyCheckoutLinkMenuItem
                    fbId={row.getValue().customer.facebookPsid}
                  />
                  <MenuItem>
                    <ChatRoundIcon
                      strokeWidth={2}
                      size={16}
                      className="text-zinc-600"
                    />
                    View Comment on Facebook
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem>
                    <AlarmAddIcon
                      strokeWidth={2}
                      size={16}
                      className="text-zinc-600"
                    />
                    Extend Reservation Time
                  </MenuItem>
                  <MenuItem>
                    <RepeatIcon
                      strokeWidth={2}
                      size={16}
                      className="text-zinc-600"
                    />
                    Convert to Manual Order
                  </MenuItem>
                  <MenuItem>
                    <Tuning2Icon
                      strokeWidth={2}
                      size={16}
                      className="text-zinc-600"
                    />
                    Adjust Quantity
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem className="text-rose-700">
                    <UndoLeftRoundIcon strokeWidth={2} size={16} />
                    Release Hold
                  </MenuItem>
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
        </div>
      );
    },
  }),
]);

const SellerStockHolds = () => {
  const { data, isPending } = useFetchStockHolds();
  console.log(data);
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
              <ExportIcon size={16} strokeWidth={2} />
              Export
            </Button>
          }
        />
      )}
    </div>
  );
};

export default SellerStockHolds;
