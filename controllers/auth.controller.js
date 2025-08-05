import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body.email, req.body.password);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await authService.loginUser(req.body.email, req.body.password);
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
