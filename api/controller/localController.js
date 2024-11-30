import Local from "../model/localModel.js";

const localController = {
    //get
    getAlllocal: async (req, res, next) => {
        try {
            const local = await Local.find().populate('region');
            res.status(200).json(local);
        } catch (err) {
            next(err);
        }
    },
    //add
    addLocal: async (req, res, next) => {
        const newLocal = new Local(req.body);
        try {
            const saveLocal = await newLocal.save();
            res.status(200).json(saveLocal);
        } catch (err) {
            next(err);
        }
    },
    //delete
    deleteLocal: async (req, res, next) => {
        try {
            await Local.findByIdAndDelete(req.params.id);
            res.status(200).json("Xóa thành công!");
        } catch (err) {
            next(err);
        }
    },
    //update
    updateLocal: async (req, res, next) => {
        try {
            const updatedLocal = await Local.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedLocal);
        } catch (err) {
            next(err);
        }
    },
    //count
    countLocal: async (req, res, next) => {
        try {
            const count = await Local.countDocuments();
            res.status(200).json({ totalRecords: count });
        } catch (err) {
            next(err);
        }
    },
    //get theo id
    getLocalById: async (req, res, next) => {
        try {
            const local = await Local.findById(req.params.id).populate('region');
            if (!local) {
                return res.status(404).json({ message: "Không có dữ liệu!" });
            }
            res.status(200).json(local);
        } catch (err) {
            next(err);
        }
    },
}
export default localController;