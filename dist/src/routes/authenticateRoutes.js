"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRoutes = void 0;
const Auth_1 = require("../controllers/Authenticate/Auth");
const authController = new Auth_1.Authenticate();
async function authenticateRoutes(app) {
    app.post('/login', authController.login);
    app.get('/logout', authController.logout);
}
exports.authenticateRoutes = authenticateRoutes;
