import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserRepository } from "../repository/user";
import jwt from "jsonwebtoken";

// we should create a global singleton, but for I have let it be
const UserRepo = new UserRepository();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const partners = await UserRepo.find({});
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(`verify`);

    const token = req.headers.authorization?.split(" ")[1];
    console.log(`token`, token);
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "SECRET") as {
      id: string;
    };

    const user = await UserRepo.findOne({ _id: decoded.id });
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
    return;
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }
    console.log(`email`, email);
    const user = await UserRepo.findOne({ email });
    console.log(`user`, user);
    if (!user) {
      res.status(401).json("Invalid credentials.");
      return;
    }

    if (user.password !== password) {
      res.status(401).json({ error: "Invalid credentials." });
      return;
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET ?? "SECRET",
      { expiresIn: "1h" }
    );

    res.status(200).json({ ...user, token });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to login." });
    return;
  }
};
