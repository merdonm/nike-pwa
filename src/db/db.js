import { openDB } from "idb";

export const dbPromise = openDB("nike-store", 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("products")) {
      db.createObjectStore("products", { keyPath: "id" });
    }

    if (!db.objectStoreNames.contains("orders")) {
      db.createObjectStore("orders", {
        keyPath: "id",
        autoIncrement: true,
      });
    }
  },
});
