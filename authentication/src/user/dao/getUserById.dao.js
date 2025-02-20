"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const schema = __importStar(require("../../../db/schema/users"));
const db_1 = require("../../db");
const drizzle_orm_1 = require("drizzle-orm");
const getUserById = async (user_id, tenant_id) => {
    const result = await db_1.db
        .select({
        id: schema.users.id,
        username: schema.users.username,
        email: schema.users.email,
        full_name: schema.users.full_name,
        address: schema.users.address,
        phone_number: schema.users.phone_number
    })
        .from(schema.users)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema.users.id, user_id), (0, drizzle_orm_1.eq)(schema.users.tenant_id, tenant_id)));
    return result[0];
};
exports.getUserById = getUserById;
