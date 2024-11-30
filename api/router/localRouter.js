import express from "express";
import localController from "../controller/localController.js";

const router = express.Router();

//GET
router.get("/",localController.getAlllocal);
//DELETE
router.delete("/:id",localController.deleteLocal);
//UPDATE
router.put("/:id",localController.updateLocal);
//CREATE
router.post("/", localController.addLocal);
//COUNT
router.get("/count", localController.countLocal);
//GET THEO ID
router.get('/:id',localController.getLocalById);

export default router;
