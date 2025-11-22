import React, { useEffect, useState } from "react";
import { fetchOrders, updateStatus } from "../api";
import { toast } from "react-toastify";

export default function OrdersTable({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  async function handleStatusChange(orderId, newStatus) {
    try {
      const { order } = await updateStatus(orderId, newStatus, user);
      setOrders((prev) => prev.map((o) => (o.id === order.id ? order : o)));
      toast.success("Order status updated!");
    } catch (err) {
      toast.error(err.message);
    }
  }

  const statuses = ["pending", "processing", "shipped", "delivered"];

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Item</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.item}</td>
            <td>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
