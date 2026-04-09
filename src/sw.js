import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { openDB } from "idb";

// 🔥 Precache (auto injected by Vite)
precacheAndRoute(self.__WB_MANIFEST);

// =======================
// 🟢 LIFECYCLE
// =======================

// Install
self.addEventListener("install", () => {
  console.log("✅ SW Installed");
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", () => {
  console.log("🚀 SW Activated");
});

// =======================
// 🟢 CACHING STRATEGIES
// =======================

// 🖼️ Image caching
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images-cache",
  }),
);

// 📦 API caching (if you add backend later)
registerRoute(
  ({ url }) => url.pathname.startsWith("/api"),
  new StaleWhileRevalidate({
    cacheName: "api-cache",
  }),
);

// =======================
// 🟢 OFFLINE FALLBACK
// =======================

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response("📴 You are offline", {
        headers: { "Content-Type": "text/plain" },
      });
    }),
  );
});

// =======================
// 🟢 BACKGROUND SYNC
// =======================

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-orders") {
    event.waitUntil(syncOrders());
  }
});

// =======================
// 🟢 INDEXEDDB SYNC LOGIC
// =======================

async function syncOrders() {
  const db = await openDB("nike-store", 2);
  const orders = await db.getAll("orders");

  if (!orders.length) return;

  console.log("🔄 Syncing orders...", orders);

  try {
    // 🔥 Simulate API call
    await new Promise((res) => setTimeout(res, 1000));

    // Clear orders after success
    const tx = db.transaction("orders", "readwrite");
    await tx.store.clear();
    await tx.done;

    console.log("✅ Orders synced & cleared");
  } catch (err) {
    console.log("❌ Sync failed", err);
  }
}
