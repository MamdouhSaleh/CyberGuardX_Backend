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
    const user = await loginService(email, password);

    req.session.user = user; 
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};


export const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });

    res.clearCookie("connect.sid"); 
    res.json({ message: "Logged out" });
  });
};
