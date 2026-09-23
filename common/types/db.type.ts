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

export type GetStockHoldsReturnValue = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  userId: string;
  productId: string;
  customerId: string;
  liveStreamId: string | null;
  commentId: string;
  quantity: number;
  status: "reserved" | "confirmed" | "expired" | "cancelled";
  product: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    code: string;
    price: string;
    stock: number;
  };
  customer: {
    id: string;
    createdAt: Date;
    userId: string;
    facebookPsid: string;
    facebookName: string | null;
  };
  liveStream: {
    id: string;
    createdAt: Date;
    facebookPageId: string;
    facebookVideoId: string;
    title: string | null;
    isActive: boolean;
  };
};

export type GetCustomersReturnValue = {
  id: string;
  createdAt: Date;
  userId: string;
  facebookPsid: string;
  facebookName: string | null;
  orders: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    customerId: string;
    status: "cancelled" | "pending_payment" | "paid" | "shipped";
    totalAmount: string;
    shippingAddress: string | null;
    phoneNumber: string | null;
    paymentProofUrl: string | null;
  }[];
  holds: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    userId: string;
    productId: string;
    customerId: string;
    liveStreamId: string | null;
    commentId: string;
    quantity: number;
    status: "reserved" | "confirmed" | "expired" | "cancelled";
  }[];
};
