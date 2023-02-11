import mongoose from "mongoose";

const validID = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid ID" });
  next();
};
export default validID;
