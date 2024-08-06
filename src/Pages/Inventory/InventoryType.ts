export type InventoryItem = {
  _id: string;
  type: string;
  status: string;
  userId?: { _id: string; firstName: string; lastName: string };
  serialNumber: string;
};

export type ItemHistory = {
  receive: null | Date | string;
  return: null | Date | string;
  userId: { _id: string; firstName: string; lastName: string };
};

export type UserWithInventoryItem = {
  _id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  assets: InventoryItem[];
};
