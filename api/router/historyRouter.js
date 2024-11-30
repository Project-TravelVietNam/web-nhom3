import express from "express";
import HistorylController from "../controller/historyCotroller.js";

const router = express.Router();

//GET
router.get("/",HistorylController.getAllHistoryl);
//DELETE
router.delete("/:id",HistorylController.deleteHistory);
//UPDATE
router.put("/:id",HistorylController.updateHistory);
//CREATE
router.post("/", HistorylController.addHistory);
//COUNT
router.get("/count", HistorylController.countHistory);
//GET THEO ID
router.get('/:id',HistorylController.getHistoryById);

export default router;