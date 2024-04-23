"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const User_1 = require("../controllers/User/User");
const authorization_1 = require("../middlewares/authorization");
const userController = new User_1.User();
async function userRoutes(app) {
    app.post('/', userController.register);
    app.get('/', {
        preHandler: authorization_1.authorize,
    }, userController.getUser);
    app.patch('/:id', {
        preHandler: authorization_1.authorize
    }, userController.updateUser);
}
exports.userRoutes = userRoutes;
