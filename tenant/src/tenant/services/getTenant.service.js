"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenantService = void 0;
const patterns_1 = require("../../commons/patterns");
const getTenantById_dao_1 = require("../dao/getTenantById.dao");
const getTenantService = async (tenant_id) => {
    try {
        const tenant = await (0, getTenantById_dao_1.getTenantById)(tenant_id);
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
exports.getTenantService = getTenantService;
