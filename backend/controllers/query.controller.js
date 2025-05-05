import Query from "../models/query.model.js";

export const raiseQuery = (req, res, next) => {
    try {
        const {message} = req.body;
        const user = req.user;

        if (!message) {
            return res.status(400).json({ message: "Please enter your query" });
        }
        const query = new Query({ message, user: user });
        query.save();
        res.status(200).json({ message: "Query raised successfully" });

    } catch (error) {
        console.log("Error in raiseQuery controller:", error);
        next(error);
    }
};

export const getQueries = (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 15;
        const skip = (page - 1) * limit;
        const queries = Query.find().sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", "fullname mobile isVerified _id");
        res.status(200).json({ message: "Queries fetched successfully", queries });
    } catch (error) {
        console.log("Error in getQueries controller:", error);
        next(error);
    }
}