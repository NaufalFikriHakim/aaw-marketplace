"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTenantService = void 0;
const patterns_1 = require("../../commons/patterns");
const editTenantById_dao_1 = require("../dao/editTenantById.dao");
const getTenantById_dao_1 = require("../dao/getTenantById.dao");
const editTenantService = async (old_tenant_id, user, tenant_id, owner_id, name) => {
    try {
        const tenant_information = await (0, getTenantById_dao_1.getTenantById)(old_tenant_id);
        if (!tenant_information) {
            return new patterns_1.NotFoundResponse('Tenant not found').generate();
        }
        if (tenant_information.tenants.owner_id !== user.id) {
            return new patterns_1.UnauthorizedResponse('You are not allowed to edit this tenant').generate();
        }
        const tenant = await (0, editTenantById_dao_1.editTenantById)(old_tenant_id, { tenant_id, owner_id, name });
        if (!tenant) {
            return new patterns_1.InternalServerErrorResponse('Error editing tenant').generate();
        }
        return {
            data: tenant,
            status: 200,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.editTenantService = editTenantService;
