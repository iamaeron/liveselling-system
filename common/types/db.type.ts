export type GetProductsReturnValue = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  code: string;
  price: string;
  stock: number;
  holds: {
    id: string;
    createdAt: Date;
    expiresAt: Date;
    productId: string;
    customerId: string;
    liveStreamId: string | null;
    commentId: string;
    quantity: number;
    status: "reserved" | "confirmed" | "expired" | "cancelled";
  }[];
};
