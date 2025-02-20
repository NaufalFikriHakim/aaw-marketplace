"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const insertNewUser_dao_1 = require("../dao/insertNewUser.dao");
const patterns_1 = require("@src/commons/patterns");
const registerService = async (username, email, password, full_name, address, phone_number) => {
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        if (!process.env.TENANT_ID) {
            return new patterns_1.InternalServerErrorResponse("Server tenant ID is missing").generate();
        }
        const userData = {
            tenant_id: process.env.TENANT_ID,
            username,
            email,
            password: hashedPassword,
            full_name,
            address,
            phone_number
        };
        console.log("userData===>", userData);
        const newUser = await (0, insertNewUser_dao_1.insertNewUser)(userData);
        return {
            data: newUser,
            status: 201
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.registerService = registerService;
