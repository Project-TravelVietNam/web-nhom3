import express from "express";
import culturalController from "../controller/culturaCotroller.js";

const router = express.Router();

//GET
router.get("/",culturalController.getAllCultural);
//DELETE
router.delete("/:id",culturalController.deleteCultura);
//UPDATE
router.put("/:id",culturalController.updateCultura);
//CREATE
router.post("/", culturalController.addCultura);
//COUNT
router.get("/count", culturalController.countCultural);
//GET THEO ID
router.get('/:id',culturalController.getCulturalById);

export default router;