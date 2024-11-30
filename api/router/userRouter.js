import express from "express";
import userController from "../controller/userController.js";


const router = express.Router();

router.post("/register", userController.addUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.delete("/:id",userController.deleteUser);

router.put("/:id",userController.updateUser);

router.get("/count", userController.countUser);     
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getIdUser); 
router.get("/check-username", userController.checkUsernameExists);  
router.get("/check-email", userController.checkEmailExists);  
router.get("/forgotPassword", userController.forgotPassword);  

export default router;
