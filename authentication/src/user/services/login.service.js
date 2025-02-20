"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserByUsername_dao_1 = require("../dao/getUserByUsername.dao");
const patterns_1 = require("../../commons/patterns");
const loginService = async (username, password) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse("Server tenant ID is missing").generate();
        }
        const user = await (0, getUserByUsername_dao_1.getUserByUsername)(username, SERVER_TENANT_ID);
        if (!user) {
            return new patterns_1.NotFoundResponse("User not found").generate();
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return new patterns_1.NotFoundResponse("Invalid password").generate();
        }
        const payload = {
            id: user.id,
            tenant_id: user.tenant_id,
        };
        const secret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: "1d",
        });
        return {
            data: {
                token,
            },
            status: 200
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.loginService = loginService;
