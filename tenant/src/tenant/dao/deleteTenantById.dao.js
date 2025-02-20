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
exports.deleteTenantById = void 0;
const schemaTenant = __importStar(require("../../../db/schema/tenants"));
const schemaTenantDetails = __importStar(require("../../../db/schema/tenantDetails"));
const db_1 = require("../../db");
const drizzle_orm_1 = require("drizzle-orm");
const deleteTenantById = async (tenant_id) => {
    const result = await db_1.db.transaction(async (tx) => {
        const resultTenantDetails = await tx
            .delete(schemaTenantDetails.tenantDetails)
            .where((0, drizzle_orm_1.eq)(schemaTenantDetails.tenantDetails.tenant_id, tenant_id))
            .returning();
        const resultTenants = await tx
            .delete(schemaTenant.tenants)
            .where((0, drizzle_orm_1.eq)(schemaTenant.tenants.id, tenant_id))
            .returning();
        if (!resultTenants[0] || !resultTenantDetails[0]) {
            await tx.rollback();
            return null;
        }
        return {
            tenants: resultTenants[0],
            tenantDetails: resultTenantDetails[0]
        };
    });
    return result;
};
exports.deleteTenantById = deleteTenantById;
