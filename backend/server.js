require("dotenv").config();
const express = require("express");
const cors = require("cors");
const oso = require("./oso-setup");

const app = express();
app.use(cors());
app.use(express.json());

// Dummy orders
const orders = [
  { id: 101, item: "Widget A", status: "pending", owner_id: 1 },
  { id: 102, item: "Gadget B", status: "shipped", owner_id: 1 },
  { id: 103, item: "Doohickey C", status: "processing", owner_id: 1 }
];

// GET all orders (everyone can view)
app.get("/orders", (req, res) => res.json(orders));

// POST /orders/:id/status — Only owners can update
app.post("/orders/:id/status", async (req, res) => {
  const { user, status } = req.body;
  const order = orders.find((o) => o.id == req.params.id);

  if (!order) return res.status(404).json({ error: "Order not found" });

  try {
    const actor = { type: "User", id: String(user.id) };
    const resource = { type: "Order", id: String(order.id) };

    // This will throw if unauthorized — no need to check a return value
    const response = await oso.authorize(actor, "update_status", resource);
    console.log("Authorization response:", response);
    if (response === false) {
        throw new Error("Authorization failed: User is not authorized.");
    }
    // If no error → authorized
    order.status = status;
    res.json({ success: true, order });
  } catch (err) {
    // Oso throws when not authorized
    console.warn("Authorization failed:", err.message);
    res.status(403).json({ error: "You are not authorized to update this order." });
  }
});



app.listen(process.env.PORT, () =>
  console.log(`✅ Backend running on port ${process.env.PORT}`)
);
