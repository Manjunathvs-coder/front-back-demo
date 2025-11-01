// simple realtime backend using Server-Sent Events for demo
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const clients = [];

// SSE endpoint
app.get("/events", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  clients.push(newClient);

  req.on("close", () => {
    const idx = clients.findIndex((c) => c.id === clientId);
    if (idx !== -1) clients.splice(idx, 1);
  });
});

// helper to broadcast
function broadcast(data) {
  clients.forEach((c) => c.res.write(`data: ${JSON.stringify(data)}\n\n`));
}

// health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// sample API to create transaction and broadcast event
app.post("/api/transfer", (req, res) => {
  const { from, to, amount } = req.body || {};
  // in real: validate, write to DB, produce event
  const txn = {
    id: Date.now(),
    from,
    to,
    amount,
    createdAt: new Date().toISOString(),
  };
  // broadcast to subscribers
  broadcast({ type: "transaction", payload: txn });
  res.status(201).json({ success: true, txn });
});

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});
