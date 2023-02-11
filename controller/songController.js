import { Song, validate } from "../models/songModel.js";
import { User } from "../models/userModel.js";

class songController {
  static create = async (req, res) => {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const song = await Song(req.body).save();
    res.status(200).json({ data: song, message: "Song Created Successfully" });
  };
  static getSong = async (req, res) => {
    const song = await Song.find();
    res.status(200).json({ data: song });
  };
  static updateSong = async (req, res) => {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ data: song, message: "Song updated successfully" });
  };
  static deleteSong = async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "song deleted successfully" });
  };
  static likedSong = async (req, res) => {
    let resMessage = "";
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(400).json({ message: "Song does not exist" });
    const user = await User.findById(req.user._id);
    const index = user.likedSong.indexOf(song._id);
    if (index === -1) {
      user.likedSong.push(song._id);
      resMessage = "Added to your liked song";
    } else {
      user.likedSong.splice(index, 1);
      resMessage = "removed from your liked song";
    }
    await user.save();
    res.status(200).json({ message: resMessage });
  };
  static getLiked = async (req, res) => {
    const user = await User.findById(req.user._id);
    const songs = await Song.find({ _id: user.likedSong });
    res.status(200).json({ data: songs });
  };
}
export default songController;
