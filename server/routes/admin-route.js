const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin-controllers");
const authMiddleware = require("../middleware/auth-middleware")
const adminMidleware = require("../middleware/admin-middleware")

router.route('/users').get(authMiddleware,adminMidleware ,adminControllers.getAllUser);
router.route('/contact').get(authMiddleware ,adminControllers.getAllContact);
router.route('/contact/delete/:id').delete(authMiddleware ,adminControllers.deleteContactById);
router.route('/users/delete/:id').delete(authMiddleware ,adminControllers.deleteUserById);
router.route('/users/:id').get(authMiddleware ,adminControllers.getUserById);
router.route('/users/update/:id').put(authMiddleware ,adminControllers.UpdateUserById);

module.exports=router;