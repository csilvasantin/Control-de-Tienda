const summaryNode = document.querySelector("#summary");
const productsNode = document.querySelector("#products");
const alertsNode = document.querySelector("#alerts");
const template = document.querySelector("#product-template");

function money(value, currency) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency
  }).format(value);
}

async function fetchStore() {
  const response = await fetch("/api/store");
  return response.json();
}

async function updateStock(id, stock) {
  await fetch(`/api/products/${id}/stock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stock })
  });
}

function renderSummary(data) {
  const items = [
    ["productos", data.summary.totalProducts],
    ["unidades", data.summary.totalUnits],
    ["valor inventario", money(data.summary.inventoryValue, data.store.currency)],
    ["alertas", data.summary.lowStockCount]
  ];

  summaryNode.innerHTML = "";
  for (const [label, value] of items) {
    const card = document.createElement("div");
    card.className = "summary-card";
    card.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
    summaryNode.append(card);
  }
}

function renderProducts(data) {
  productsNode.innerHTML = "";

  for (const product of data.products) {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".category").textContent = product.category;
    fragment.querySelector(".name").textContent = product.name;
    fragment.querySelector(".sku").textContent = product.sku;
    fragment.querySelector(".price").textContent = money(product.price, data.store.currency);
    fragment.querySelector(".stock").textContent = product.stock;
    fragment.querySelector(".min-stock").textContent = product.minStock;

    const input = fragment.querySelector(".stock-input");
    const button = fragment.querySelector(".save-button");
    input.value = product.stock;

    button.addEventListener("click", async () => {
      button.disabled = true;
      button.textContent = "Guardando...";
      await updateStock(product.id, Number(input.value));
      await load();
    });

    productsNode.append(fragment);
  }
}

function renderAlerts(data) {
  alertsNode.innerHTML = "";

  if (!data.alerts.length) {
    const empty = document.createElement("div");
    empty.className = "alert-card";
    empty.textContent = "Sin alertas de stock.";
    alertsNode.append(empty);
    return;
  }

  for (const product of data.alerts) {
    const card = document.createElement("article");
    card.className = "alert-card low";
    card.innerHTML = `
      <strong>${product.name}</strong>
      <p>Stock actual: ${product.stock}</p>
      <p>Mínimo recomendado: ${product.minStock}</p>
    `;
    alertsNode.append(card);
  }
}

async function load() {
  const data = await fetchStore();
  renderSummary(data);
  renderProducts(data);
  renderAlerts(data);
}

load();
