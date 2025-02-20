"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTenantService = void 0;
const patterns_1 = require("../../commons/patterns");
const deleteTenantById_dao_1 = require("../dao/deleteTenantById.dao");
const getTenantById_dao_1 = require("../dao/getTenantById.dao");
const deleteTenantService = async (user, tenant_id) => {
    try {
        const tenant_information = await (0, getTenantById_dao_1.getTenantById)(tenant_id);
        if (!tenant_information) {
            return new patterns_1.NotFoundResponse('Tenant not found').generate();
        }
        if (tenant_information.tenants.owner_id !== user.id) {
            return new patterns_1.UnauthorizedResponse('You are not allowed to delete this tenant').generate();
        }
        const tenant = await (0, deleteTenantById_dao_1.deleteTenantById)(tenant_id);
        if (!tenant) {
            return new patterns_1.NotFoundResponse('Tenant not found').generate();
        }
        return {
            data: Object.assign({}, tenant),
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.deleteTenantService = deleteTenantService;
