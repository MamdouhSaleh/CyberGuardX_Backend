import { add } from "../services/math.service.js";

export const addHandler = (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({ error: "Inputs must be numbers" });
  }

  const result = add(a, b);
  res.json({ result });
};
