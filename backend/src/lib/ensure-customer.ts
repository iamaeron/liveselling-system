import { db } from "@/db";
import { customer } from "@/db/schema";

export async function ensureCustomerExists(
  sellerId: string,
  senderId: string,
  senderName: string,
) {
  await db
    .insert(customer)
    .values({
      facebookPsid: senderId,
      facebookName: senderName,
      userId: sellerId,
    })
    .onConflictDoUpdate({
      target: [customer.userId, customer.facebookPsid],
      set: {
        facebookName: senderName,
      },
    })
    .returning();

  const foundCustomer = await db.query.customer.findFirst({
    where: {
      facebookPsid: senderId,
    },
  });

  return foundCustomer;
}
