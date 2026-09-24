import { ActionIcon } from "@/components/ui/action-icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox, CheckboxIndicator } from "@/components/ui/checkbox";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NumberFormatter } from "@/components/ui/number-formatter";
import { useFetchCart } from "@/lib/fetcher/cart.fetcher";
import { BagHeartIcon } from "@solar-icons/react/bold";
import { AltArrowUpIcon, ArrowRightIcon } from "@solar-icons/react/linear";
import { CheckIcon } from "@solar-icons/react/linear/check";
import { cn } from "cn";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const BuyerCart = () => {
  const [searchParams] = useSearchParams();
  const { data, isPending } = useFetchCart({
    token: searchParams.get("token"),
  });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (!isPending) {
      data.stockHolds.forEach((stock: any) =>
        setSelectedItems((s) => [...s, stock.id]),
      );
    }
  }, [isPending, data]);

  const handleToggleSelect = (selected: boolean, item: any) => {
    if (selected) {
      setSelectedItems((s) => [...s, item.id]);
    } else {
      const newItems = selectedItems.filter((s) => s !== item.id);
      setSelectedItems(newItems);
    }
  };

  const handleToggleAll = (selected: boolean) => {
    if (data?.stockHolds) {
      if (selected) {
        setSelectedItems([]);
        data.stockHolds.forEach((item: any) => {
          setSelectedItems((s) => [...s, item.id]);
        });
      } else {
        setSelectedItems([]);
      }
    }
  };

  console.log(selectedItems, data?.stockHolds.length);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6 py-2 justify-between">
        <div className="flex items-center gap-2">
          <BagHeartIcon strokeWidth={2} size={30} className="text-pink-600" />
          <span className="font-bold text-lg font-serif text-pink-600">
            Velo
          </span>
        </div>

        {isPending ? (
          <div className="h-3 rounded bg-zinc-200 w-10"></div>
        ) : (
          <div className="flex gap-2 text-sm items-center">
            <div className="text-right font-medium">{data.seller.name}</div>
            <Avatar className="size-5">
              <AvatarFallback>K</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>

      {searchParams.get("token") ? (
        <div>
          <header className="mb-6">
            <h1 className="text-xl font-semibold text-foreground">Your Cart</h1>
            <p className="text-sm text-muted-foreground">
              Kindly double check all the items you grabbed before checking out.
              Thank you!
            </p>
          </header>

          <main>
            {isPending ? (
              <div>Loading ...</div>
            ) : (
              <div className="pb-70">
                <div className="py-2 px-4 rounded gap-6 mb-6 bg-zinc-100">
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <div className="flex text-sm text-zinc-900">
                    {data.customer.facebookName}
                  </div>
                </div>

                <div className="text-zinc-900 bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="px-3 w-10">
                          <div className="flex justify-center">
                            <Checkbox
                              onCheckedChange={handleToggleAll}
                              checked={
                                selectedItems.length === data.stockHolds.length
                              }
                            >
                              <CheckboxIndicator />
                            </Checkbox>
                          </div>
                        </th>
                        <th className="px-3 py-2 text-left font-normal  text-zinc-600">
                          <div className="flex cursor-pointer select-none items-center gap-1 justify-start text-left">
                            Name
                          </div>
                        </th>

                        <th className="px-3 py-2 text-left font-normal  text-zinc-600">
                          <div className="flex cursor-pointer select-none items-center gap-1 justify-start text-left">
                            Quantity
                          </div>
                        </th>

                        <th className="px-3 py-2 text-left font-normal  text-zinc-600">
                          <div className="flex cursor-pointer select-none items-center gap-1 justify-start text-left">
                            Price
                          </div>
                        </th>

                        <th className="px-3 py-2 text-left font-normal  text-zinc-600">
                          <div className="flex cursor-pointer select-none items-center gap-1 justify-start text-left">
                            Total
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.stockHolds.map((stockHold: any) => (
                        <tr
                          key={stockHold.id}
                          className="border-t border-zinc-100 hover:bg-zinc-50"
                        >
                          <td className="w-10">
                            <div className="flex justify-center">
                              <Checkbox
                                onCheckedChange={(e) =>
                                  handleToggleSelect(e, stockHold)
                                }
                                checked={selectedItems.includes(stockHold.id)}
                              >
                                <CheckboxIndicator />
                              </Checkbox>
                            </div>
                          </td>
                          <td className="overflow-hidden px-3 py-2 text-left">
                            <span className="font-medium">
                              {stockHold.product.name}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <span>{stockHold.quantity}</span>
                          </td>
                          <td className="px-3 py-2">
                            <span className="text-muted-foreground">₱</span>
                            <NumberFormatter
                              value={Number(stockHold.product.price)}
                            />
                          </td>
                          <td className="px-3 py-2 text-pink-600 font-medium">
                            <span>₱</span>
                            <NumberFormatter
                              value={
                                Number(stockHold.quantity) *
                                Number(stockHold.product.price)
                              }
                            />
                          </td>

                          <td className="py-2 text-pink-600 font-medium">
                            <Button
                              variant="ghost"
                              className="px-2 py-1 font-normal text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-100"
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-10 border-t pt-4 border-zinc-100">
                  <h1 className="pl-2 text-base font-semibold text-foreground">
                    Contact
                  </h1>

                  <div>
                    <Field name="receiver_name" className="mt-4">
                      <FieldLabel>Receiver Name</FieldLabel>
                      <FieldControl render={<Input placeholder="John Doe" />} />
                    </Field>

                    <Field name="receiver_name" className="mt-4">
                      <FieldLabel>Phone No.</FieldLabel>
                      <FieldControl
                        render={<Input placeholder="0912 345 6789" />}
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-10 border-t pt-4 border-zinc-100">
                  <h1 className="pl-2 text-base font-semibold text-foreground">
                    Address
                  </h1>

                  <div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Combobox items={["React", "Solid", "Vue", "Svelte"]}>
                          <ComboboxLabel>Framework</ComboboxLabel>
                          <ComboboxInputGroup>
                            <ComboboxInput placeholder="Search..." />
                            <ComboboxTrigger>
                              <ComboboxIcon />
                            </ComboboxTrigger>
                          </ComboboxInputGroup>
                          <ComboboxPortal>
                            <ComboboxPositioner sideOffset={4}>
                              <ComboboxPopup>
                                <ComboboxEmpty>
                                  <div className="py-4">No results found.</div>
                                </ComboboxEmpty>
                                <ComboboxList>
                                  {(item: string) => (
                                    <ComboboxItem
                                      key={item}
                                      value={item}
                                      className="gap-1 pl-1"
                                    >
                                      <div className="w-5">
                                        <ComboboxItemIndicator>
                                          <CheckIcon
                                            size={18}
                                            strokeWidth={2}
                                          />
                                        </ComboboxItemIndicator>
                                      </div>
                                      <div className="flex-1">{item}</div>
                                    </ComboboxItem>
                                  )}
                                </ComboboxList>
                              </ComboboxPopup>
                            </ComboboxPositioner>
                          </ComboboxPortal>
                        </Combobox>
                      </div>
                      <div className="flex-1"></div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Field name="receiver_name" className="flex-1 mt-4">
                        <FieldLabel>Bldg No.</FieldLabel>
                        <FieldControl
                          render={<Input placeholder="John Doe" />}
                        />
                      </Field>

                      <Field name="receiver_name" className="flex-1 mt-4">
                        <FieldLabel>Street</FieldLabel>
                        <FieldControl
                          render={<Input placeholder="0912 345 6789" />}
                        />
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t pt-4 border-zinc-100">
                  <h1 className="pl-2 text-base font-semibold text-foreground">
                    Payment
                  </h1>

                  <div>
                    <Field name="receiver_name" className="mt-4">
                      <FieldLabel>Proof of Payment</FieldLabel>
                      <FieldControl render={<Input type="file" />} />
                      <FieldDescription>
                        Your payment will be verified by the seller.
                      </FieldDescription>
                    </Field>
                  </div>
                </div>

                <PricingInfo
                  stockHolds={data.stockHolds}
                  selectedItems={selectedItems}
                />
              </div>
            )}
          </main>
        </div>
      ) : (
        <div>Hmmm.. you don't seem to have any orders.</div>
      )}
    </div>
  );
};

export default BuyerCart;

const PricingInfo = ({
  stockHolds,
  selectedItems,
}: {
  stockHolds: { [k: string]: string }[];
  selectedItems: string[];
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const filteredStockHolds = stockHolds.filter((s) =>
      selectedItems.includes(s.id),
    );

    const newSub = filteredStockHolds.reduce(
      (sum: any, st: any) => sum + st.product.price * st.quantity,
      0,
    );
    setSubtotal(newSub);

    const newTotal = newSub + 200 - 0;
    setTotalPrice(newTotal);
  }, [selectedItems]);

  return (
    <div
      className={cn(
        "fixed bottom-6 max-w-2xl left-1/2 -translate-x-1/2 bg-linear-to-t from-pink-50 to-white border-4 border-white backdrop-blur-sm rounded-xl w-full shadow-2xl shadow-black/10 pb-6 pt-2 mt-10 px-16",
      )}
    >
      {collapsed ? null : (
        <div className="pb-2">
          <div className="flex items-end">
            <p className="text-sm text-muted-foreground text-right flex-3">
              Subtotal:
            </p>
            <div className="flex-1 flex justify-end">
              <span className="flex text-zinc-700 items-baseline">
                <span className="text-muted-foreground">₱</span>
                <NumberFormatter value={Number(subtotal)} />
              </span>
            </div>
          </div>

          <div className="flex items-end">
            <p className="text-sm text-muted-foreground text-right flex-3">
              Shipping fee:
            </p>
            <div className="flex-1 flex justify-end">
              <span className="flex text-zinc-700 items-baseline">
                <span className="text-muted-foreground">₱</span>
                <NumberFormatter value={200} />
              </span>
            </div>
          </div>

          <div className="flex items-end">
            <p className="text-sm text-muted-foreground text-right flex-3">
              Discount:
            </p>
            <div className="flex-1 flex justify-end">
              <span className="flex text-zinc-700 items-baseline">
                <span className="text-muted-foreground">- ₱</span>
                <NumberFormatter value={0} />
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex items-end border-t border-dashed pt-2",
          collapsed ? "border-transparent" : "border-zinc-300",
        )}
      >
        <ActionIcon
          onClick={() => setCollapsed(!collapsed)}
          className="absolute p-1 bottom-6 right-4"
          variant="ghost"
          size="sm"
        >
          <AltArrowUpIcon
            strokeWidth={2}
            className={cn(
              "transition-all",
              collapsed ? "rotate-90" : "rotate-0",
            )}
          />
        </ActionIcon>

        <p className="text-pink-600 text-right flex-3 font-medium">Total:</p>
        <div className="flex-1 flex justify-end">
          <span className="flex items-baseline text-pink-600">
            <span>₱</span>
            <span className="text-2xl font-medium">
              <NumberFormatter value={Number(totalPrice)} />
            </span>
          </span>
        </div>
      </div>

      <footer className="mt-2 flex items-center justify-end">
        <Button disabled={!selectedItems.length}>
          Check out
          <ArrowRightIcon strokeWidth={2} />
        </Button>
      </footer>
    </div>
  );
};
