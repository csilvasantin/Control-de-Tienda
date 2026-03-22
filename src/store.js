import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const DATA_PATH = resolve(import.meta.dirname, "../data/store.json");

export async function readStore() {
  const raw = await readFile(DATA_PATH, "utf8");
  const data = JSON.parse(raw);
  const alerts = data.products.filter((product) => product.stock <= product.minStock);
  const inventoryValue = data.products.reduce((sum, product) => sum + product.stock * product.price, 0);
  return {
    ...data,
    summary: {
      totalProducts: data.products.length,
      totalUnits: data.products.reduce((sum, product) => sum + product.stock, 0),
      inventoryValue: Number(inventoryValue.toFixed(2)),
      lowStockCount: alerts.length
    },
    alerts
  };
}

async function writeStore(data) {
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
}

export async function updateProductStock(id, stock) {
  const raw = await readFile(DATA_PATH, "utf8");
  const data = JSON.parse(raw);
  const product = data.products.find((item) => item.id === id);
  if (!product) {
    return null;
  }

  product.stock = stock;
  data.store.updatedAt = new Date().toISOString();
  await writeStore(data);
  return product;
}
