"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.pool = void 0;
require("dotenv/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const DB_HOST = (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : "localhost";
const DB_PORT = (_b = process.env.DB_PORT) !== null && _b !== void 0 ? _b : 5432;
const DB_USER = (_c = process.env.DB_USER) !== null && _c !== void 0 ? _c : "postgres";
const DB_PASSWORD = (_d = process.env.DB_PASSWORD) !== null && _d !== void 0 ? _d : "postgres";
const DB_NAME = (_e = process.env.DB_NAME) !== null && _e !== void 0 ? _e : "postgres";
exports.pool = new pg_1.Pool({
    connectionString: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
});
exports.db = (0, node_postgres_1.drizzle)(exports.pool);
