import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/todos", todoRoutes);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the other process or run with a different port:`);
    console.error(`  PORT=3002 npm start`);
  } else {
    console.error("Server error:", err.message);
  }
  process.exit(1);
});
