import { signup as signupService, login as loginService } from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await signupService(name, email, password);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginService(email, password);
    res.status(200).json({token});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};