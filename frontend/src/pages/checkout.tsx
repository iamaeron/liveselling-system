import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox, CheckboxIndicator } from "@/components/ui/checkbox";
import { NumberFormatter } from "@/components/ui/number-formatter";
import { useFetchCart } from "@/lib/fetcher/cart.fetcher";
import { BagHeartIcon } from "@solar-icons/react/bold";
import { ArrowRightIcon } from "@solar-icons/react/linear";
import { useSearchParams } from "react-router";

const BuyerCart = () => {
  const [searchParams] = useSearchParams();
  const { data, isPending } = useFetchCart({
    token: searchParams.get("token"),
  });
  console.log(data);
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
              <div>
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
                            <Checkbox defaultChecked>
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
                              <Checkbox defaultChecked>
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

                <div className="fixed bottom-0 max-w-2xl w-full border-t border-zinc-100 pb-6 pt-4 mt-10 px-8">
                  <div className="flex items-end">
                    <p className="text-sm text-muted-foreground text-right flex-2">
                      Selected Items:
                    </p>
                    <div className="flex-1 flex text-zinc-700 justify-end">
                      {data.stockHolds.reduce(
                        (sum: any, s: any) => sum + s.quantity,
                        0,
                      )}
                    </div>
                  </div>
                  <div className="flex items-end">
                    <p className="text-sm text-muted-foreground text-right flex-2">
                      Subtotal:
                    </p>
                    <div className="flex-1 flex justify-end">
                      <span className="flex text-zinc-700 items-baseline">
                        <span className="text-muted-foreground">₱</span>
                        <NumberFormatter
                          value={Number(
                            data.stockHolds.reduce(
                              (sum: any, q: any) =>
                                sum + q.product.price * q.quantity,
                              0,
                            ),
                          )}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <p className="text-sm text-muted-foreground text-right flex-2">
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
                    <p className="text-sm text-muted-foreground text-right flex-2">
                      Discout:
                    </p>
                    <div className="flex-1 flex justify-end">
                      <span className="flex text-zinc-700 items-baseline">
                        <span className="text-muted-foreground">- ₱</span>
                        <NumberFormatter value={0} />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end border-t border-zinc-200 border-dashed mt-4 pt-4">
                    <p className="text-pink-600 text-right flex-2 font-medium">
                      Total:
                    </p>
                    <div className="flex-1 flex justify-end">
                      <span className="flex items-baseline text-pink-600">
                        <span>₱</span>
                        <span className="text-2xl font-medium">
                          {/* <NumberFormatter
                            value={Number(
                              stockHold.product.price * stockHold.total,
                            )}
                          /> */}
                        </span>
                      </span>
                    </div>
                  </div>

                  <footer className="mt-6 flex items-center justify-end">
                    <Button>
                      Payment Details
                      <ArrowRightIcon strokeWidth={2} />
                    </Button>
                  </footer>
                </div>
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
