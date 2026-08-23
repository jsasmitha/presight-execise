import express from "express";

import { NotFoundError } from "@utils/errors";
import userRoutes from "@routes/user.routes";
import { errorHandler } from "@middleware/error-handler.middleware";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/users", userRoutes);

app.use((_req, _res, next) => {
  next(new NotFoundError("Not Found"));
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
