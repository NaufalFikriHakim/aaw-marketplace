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
exports.editTenantById = void 0;
const db_1 = require("../../db");
const schemaTenant = __importStar(require("../../../db/schema/tenants"));
const schemaTenantDetails = __importStar(require("../../../db/schema/tenantDetails"));
const drizzle_orm_1 = require("drizzle-orm");
const editTenantById = async (tenant_id, data) => {
    const result = await db_1.db.transaction(async (tx) => {
        var _a, _b, _c, _d;
        if (!data.tenant_id) {
            let resultTenant;
            if (!!data.owner_id) {
                resultTenant = await tx
                    .update(schemaTenant.tenants)
                    .set({
                    id: data.tenant_id,
                    owner_id: data.owner_id
                })
                    .where((0, drizzle_orm_1.eq)(schemaTenant.tenants.id, tenant_id))
                    .returning();
            }
            let resultTenantDetails;
            if (!!data.name) {
                resultTenantDetails = await tx
                    .update(schemaTenantDetails.tenantDetails)
                    .set({
                    tenant_id: data.tenant_id,
                    name: data.name
                })
                    .where((0, drizzle_orm_1.eq)(schemaTenantDetails.tenantDetails.tenant_id, tenant_id))
                    .returning();
            }
            if ((!!data.owner_id && !resultTenant) || (!!data.name && !resultTenantDetails)) {
                await tx.rollback();
                return null;
            }
            return {
                tenant: resultTenant === null || resultTenant === void 0 ? void 0 : resultTenant[0],
                tenantDetails: resultTenantDetails === null || resultTenantDetails === void 0 ? void 0 : resultTenantDetails[0]
            };
        }
        else {
            // delete old data and replace with new but change id
            const newTenantId = data.tenant_id;
            const oldTenantId = tenant_id;
            const tenantDetail = await tx
                .delete(schemaTenantDetails.tenantDetails)
                .where((0, drizzle_orm_1.eq)(schemaTenantDetails.tenantDetails.tenant_id, oldTenantId))
                .returning();
            if (!tenantDetail || !tenantDetail[0].id) {
                await tx.rollback();
                return null;
            }
            const tenant = await tx
                .delete(schemaTenant.tenants)
                .where((0, drizzle_orm_1.eq)(schemaTenant.tenants.id, oldTenantId))
                .returning();
            if (!tenant || !tenant[0].id) {
                await tx.rollback();
                return null;
            }
            const newTenant = await tx
                .insert(schemaTenant.tenants)
                .values({
                id: newTenantId,
                owner_id: (_b = (_a = data.owner_id) !== null && _a !== void 0 ? _a : tenant[0].owner_id) !== null && _b !== void 0 ? _b : "",
            })
                .returning();
            if (!newTenant || !newTenant[0].id) {
                await tx.rollback();
                return null;
            }
            const newTenantDetail = await tx
                .insert(schemaTenantDetails.tenantDetails)
                .values({
                id: tenantDetail[0].id,
                tenant_id: newTenantId,
                name: (_d = (_c = data.name) !== null && _c !== void 0 ? _c : tenantDetail[0].name) !== null && _d !== void 0 ? _d : ""
            })
                .returning();
            if (!newTenantDetail || !newTenantDetail[0].id) {
                await tx.rollback();
                return null;
            }
            return {
                tenant: newTenant[0],
                tenantDetails: newTenantDetail[0]
            };
        }
    });
    return result;
};
exports.editTenantById = editTenantById;
