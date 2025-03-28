import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthenticatedResponse } from "../commons/patterns/exceptions";
import { verifyAdminTokenService } from "@src/middleware/verifyAdminTokenServiceHelper";
import { getTenantService } from "@src/middleware/getTenantServiceHelper";

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

    const payload = await verifyAdminTokenService(token)

    const verifiedPayload = {
      status: 200,
      data: {
        user: payload.user
      }
    }
    console.log("PAYLOAD ADMIN: " + verifiedPayload)
    
    
    const SERVER_TENANT_ID = process.env.TENANT_ID;
    if (!SERVER_TENANT_ID) {
      return res.status(500).send({ message: "Server Tenant ID not found" });
    }
    console.log("SERVER_TENANT_ID:", SERVER_TENANT_ID);
    console.log("TENANT_SERVICE_URL:", process.env.TENANT_SERVICE_URL);
    console.log("Full Tenant API URL:", `${process.env.TENANT_SERVICE_URL}/api/tenant/${SERVER_TENANT_ID}`);
    const tenantPayload = await getTenantService(SERVER_TENANT_ID, token);

    console.log(tenantPayload)
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
    console.log("PAYLOAD TENANT: " + verifiedTenantPayload)
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
