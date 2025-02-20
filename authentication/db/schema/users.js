"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().unique(),
    tenant_id: (0, pg_core_1.uuid)('tenant_id').default('00000000-0000-0000-0000-000000000000'),
    username: (0, pg_core_1.varchar)('username', { length: 256 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 256 }).notNull(),
    password: (0, pg_core_1.varchar)('password', { length: 256 }).notNull(),
    full_name: (0, pg_core_1.varchar)('full_name', { length: 256 }),
    address: (0, pg_core_1.text)('address'),
    phone_number: (0, pg_core_1.varchar)('phone_number', { length: 256 }),
    created_at: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
    updated_at: (0, pg_core_1.timestamp)('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
    pk: (0, pg_core_1.primaryKey)({ columns: [table.tenant_id, table.username, table.email] })
}));
