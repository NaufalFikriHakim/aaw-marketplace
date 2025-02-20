import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthenticatedResponse } from "../commons/patterns/exceptions";

export const verifyJWTProduct = async (
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
    const TENANT_API = process.env.TENANT_API;

    // TODO: change the endpoint to get from env
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

    const SERVER_TENANT_ID = process.env.TENANT_ID;
    if (!SERVER_TENANT_ID) {
      return res.status(500).send({ message: "Server Tenant ID not found" });
    }

    //TODO: change the endpoint to get from env
    const tenantResponse = await fetch(`${TENANT_API}/${SERVER_TENANT_ID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const tenantPayload = await tenantResponse.json();


    if (
      tenantPayload.status !== 200 ||
      !tenantPayload.data
    ) {
      return res.status(500).send({ message: "Server Tenant not found" });
    }

    const verifiedTenantPayload = tenantPayload as {
      status: 200;
      data: {
        tenants: {
          id: string;
          owner_id: string;
        };
        tenantDetails: {
          id: string;
          tenant_id: string;
          name: string;
        };
      };
    };

    // Check for tenant ownership
    if (verifiedPayload.data.user.id !== verifiedTenantPayload.data.tenants.owner_id) {
      return res.status(401).send({ message: "Invalid token" });
    }

    req.body.user = verifiedPayload.data.user;
    next();
  } catch (error) {
    return res.status(401).json(
      new UnauthenticatedResponse("Invalid token").generate()
    );
  }
};
