import History from '../model/historyModel.js';

const HistorylController = {
    //get
    getAllHistoryl: async (req, res, next) => {
        try {
            const history = await History.find().populate('region');
            res.status(200).json(history);
        } catch (err) {
            next(err);
        }
    },
    //add
    addHistory: async (req, res, next) => {
        const newHistory = new History(req.body);
        try {
            const saveHistory = await newHistory.save();
            res.status(200).json(saveHistory);
        } catch (err) {
            next(err);
        }
    },
    //delete
    deleteHistory: async (req, res, next) => {
        try {
            await History.findByIdAndDelete(req.params.id);
            res.status(200).json("Xóa thành công!");
        } catch (err) {
            next(err);
        }
    },
    //update
    updateHistory: async (req, res, next) => {
        try {
            const updatedHistory = await History.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedHistory);
        } catch (err) {
            next(err);
        }
    },
    //count
    countHistory: async (req, res, next) => {
        try {
            const count = await History.countDocuments();
            res.status(200).json({ totalRecords: count });
        } catch (err) {
            next(err);
        }
    },
    //get theo id
    getHistoryById: async (req, res, next) => {
        try {
            const history = await History.findById(req.params.id).populate('region');
            if (!history) {
                return res.status(404).json({ message: "Không có dữ liệu!" });
            }
            res.status(200).json(history);
        } catch (err) {
            next(err);
        }
    },
}
export default HistorylController;