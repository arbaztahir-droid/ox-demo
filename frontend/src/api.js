const API_URL = "http://localhost:4000";
const API_KEY = "asdfb_1243";
export async function fetchOrders() {
  const res = await fetch(`${API_URL}/orders`);
  return res.json();
}

export async function updateStatus(orderId, newStatus, user) {
  const res = await fetch(`http://localhost:4000/orders/${orderId}/status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus, user })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }
  return res.json();
}

