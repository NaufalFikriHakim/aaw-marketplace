"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantDetails = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const tenants_1 = require("./tenants");
exports.tenantDetails = (0, pg_core_1.pgTable)('tenantDetails', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    tenant_id: (0, pg_core_1.uuid)('tenant_id').references(() => tenants_1.tenants.id, { onUpdate: 'cascade', onDelete: 'cascade' }).notNull(),
    name: (0, pg_core_1.varchar)('name').notNull(),
});
