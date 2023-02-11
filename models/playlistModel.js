import mongoose from "mongoose";
import Joi from "joi";

const objectId = mongoose.Schema.Types.ObjectId;

const playListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: objectId,
    ref: "User",
    required: true,
  },
  desc: {
    type: String,
  },
  song: {
    type: Array,
    defaul: [],
  },
  img: {
    type: String,
  },
});
const validate = (playlist) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    user: Joi.string().required(),
    desc: Joi.string().allow(""),
    song: Joi.array().items(Joi.string()),
    img: Joi.string().allow(""),
  });
  return schema.validate(playlist);
};
const playList = mongoose.model("playList", playListSchema);
export { playList, validate };
