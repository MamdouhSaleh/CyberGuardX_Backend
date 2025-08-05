import express from "express";
import mathRoutes from "./routes/math.route.js";

const app = express();
app.use(express.json());
app.use("/api/math", mathRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
