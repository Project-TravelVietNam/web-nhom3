import Cultura from "../model/culturalModel.js";
import User from "../model/userModel.js";

const culturalController = {
  //get
  getAllCultural: async (req, res, next) => {
    try {
      const culutural = await Cultura.find().populate("region");
      res.status(200).json(culutural);
    } catch (err) {
      next(err);
    }
  },
  //add
  addCultura: async (req, res, next) => {
    const newCultura = new Cultura(req.body);
    try {
      const saveCultura = await newCultura.save();
      res.status(200).json(saveCultura);
    } catch (err) {
      next(err);
    }
  },
  //delete
  deleteCultura: async (req, res, next) => {
    try {
      await Cultura.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa thành công!");
    } catch (err) {
      next(err);
    }
  },
  //update
  updateCultura: async (req, res, next) => {
    try {
      const updatedCultura = await Cultura.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedCultura);
    } catch (err) {
      next(err);
    }
  },
  //count
  countCultural: async (req, res, next) => {
    try {
      const count = await Cultura.countDocuments();
      res.status(200).json({ totalRecords: count });
    } catch (err) {
      next(err);
    }
  },
  //get theo id
  getCulturalById: async (req, res, next) => {
    try {
      const cultural = await Cultura.findById(req.params.id).populate("region");
      if (!cultural) {
        return res.status(404).json({ message: "Không có dữ liệu!" });
      }
      res.status(200).json(cultural);
    } catch (err) {
      next(err);
    }
  },
  //review
  
};
export default culturalController;
