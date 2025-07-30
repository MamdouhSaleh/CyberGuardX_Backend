import express from "express";
import dotenv from "dotenv";
import uploadRoute from "./routes/upload.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api", uploadRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
