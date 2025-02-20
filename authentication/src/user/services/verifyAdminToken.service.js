"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminTokenService = void 0;
const patterns_1 = require("@src/commons/patterns");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserById_dao_1 = require("../dao/getUserById.dao");
const verifyAdminTokenService = async (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.ADMIN_JWT_SECRET);
        const { id, tenant_id } = payload;
        const SERVER_TENANT_ID = process.env.ADMIN_TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse("Server tenant ID is missing").generate();
        }
        if (tenant_id !== SERVER_TENANT_ID) {
            return new patterns_1.UnauthorizedResponse("Invalid token").generate();
        }
        const user = await (0, getUserById_dao_1.getUserById)(id, SERVER_TENANT_ID);
        if (!user) {
            return new patterns_1.UnauthorizedResponse("Invalid token").generate();
        }
        return {
            data: {
                user,
            },
            status: 200
        };
    }
    catch (err) {
        return new patterns_1.UnauthorizedResponse("Invalid token").generate();
    }
};
exports.verifyAdminTokenService = verifyAdminTokenService;
