"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = __importDefault(require("fastify"));
const authenticateRoutes_1 = require("./routes/authenticateRoutes");
const mealsRoutes_1 = require("./routes/mealsRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const app = (0, fastify_1.default)({ logger: true });
const port = Number(process.env.PORT);
app.register(cors_1.default);
app.register(authenticateRoutes_1.authenticateRoutes);
app.register(userRoutes_1.userRoutes, {
    prefix: "user",
});
app.register(mealsRoutes_1.mealsRoutes, {
    prefix: "meals",
});
const start = async () => {
    try {
        await app.listen({ port });
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
