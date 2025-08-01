import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("This is a second test!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});