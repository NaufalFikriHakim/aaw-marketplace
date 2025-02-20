"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTenantService = void 0;
const patterns_1 = require("@src/commons/patterns");
const createNewTenant_dao_1 = require("../dao/createNewTenant.dao");
const createTenantService = async (owner_id, name) => {
    try {
        const tenant = await (0, createNewTenant_dao_1.createNewTenant)(owner_id, name);
        if (!tenant) {
            return new patterns_1.InternalServerErrorResponse('Error creating tenant').generate();
        }
        return {
            data: tenant,
            status: 201,
        };
    }
    catch (err) {
        return new patterns_1.InternalServerErrorResponse(err).generate();
    }
};
exports.createTenantService = createTenantService;
