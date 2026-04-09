import { dbPromise } from "./db";

// Save products
export const saveProducts = async (products) => {
  const db = await dbPromise;
  const tx = db.transaction("products", "readwrite");

  for (const product of products) {
    tx.store.put(product);
  }

  await tx.done;
};

// Get all products
export const getProducts = async () => {
  const db = await dbPromise;
  return db.getAll("products");
};
