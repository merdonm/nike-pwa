import { dbPromise } from "./db";

export const saveOrder = async (order) => {
  const db = await dbPromise;
  await db.add("orders", order);
};

export const getOrders = async () => {
  const db = await dbPromise;
  return db.getAll("orders");
};

export const clearOrders = async () => {
  const db = await dbPromise;
  const tx = db.transaction("orders", "readwrite");
  await tx.store.clear();
  await tx.done;
};
