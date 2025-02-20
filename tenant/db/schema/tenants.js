"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenants = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.tenants = (0, pg_core_1.pgTable)('tenants', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    owner_id: (0, pg_core_1.uuid)('owner_id').notNull(),
});
