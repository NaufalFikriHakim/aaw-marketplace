import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthenticatedResponse } from "../commons/patterns/exceptions";

interface JWTUser extends JwtPayload {
  id: string;
  tenant_id: string;
}

export const verifyJWTTenant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const AUTHENTICATION_API = process.env.AUTHENTICATION_API;

    const response = await fetch(`${AUTHENTICATION_API}/verify-admin-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const payload = await response.json();
    if (payload.status !== 200) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const verifiedPayload = payload as {
      status: 200;
      data: {
        user: {
          id: string | null;
          username: string;
          email: string;
          full_name: string | null;
          address: string | null;
          phone_number: string | null;
        };
      };
    }

    req.body.user = verifiedPayload.data.user;
    next();
  } catch (error) {
    return res.status(401).json(
      new UnauthenticatedResponse("Invalid token").generate()
    );
  }
};
