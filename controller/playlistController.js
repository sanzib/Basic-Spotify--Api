import { playList, validate } from "../models/playlistModel.js";
import { Song } from "../models/songModel.js";
import { User } from "../models/userModel.js";
import Joi from "joi";

class playlistController {
  static create = async (req, res) => {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await User.findById(req.user._id);
    const playlist = await playList({ ...req.body, user: user._id }).save();
    user.playList.push(playList._id);
    await user.save();

    res.status(201).json({ data: playlist });
  };
  static edit = async (req, res) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      desc: Joi.string().allow(""),
      img: Joi.string().allow(""),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const playlist = await playList.findById(req.params.id);
    console.log(playlist);
    if (!playlist)
      return res.status(400).json({ message: "playlist not found" });
    const user = await User.findById(req.user._id);
    if (!user._id.equals(playlist.user))
      return res.status(403).json({ message: "User dont have access to edit" });
    playlist.name = req.body.name;
    playlist.desc = req.body.desc;
    playlist.img = req.body.img;
    await playlist.save();
    res.status(201).json({ message: "Playlist updated successfully" });
  };
  static add = async (req, res) => {
    const schema = Joi.object({
      playlistId: Joi.string().required(),
      songId: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const user = await User.findById(req.params._id);
    const playlist = await playList.findById(req.body.playlistId);
    if (!user._id.equals(playlist.user))
      return res.status(403).json({ message: "User dont have access to add" });
    if (playlist.song.indexOf(req.body.songId) === -1) {
      playlist.song.push(req.body.songId);
    }
    await playlist.save();
    res.status(200).json({ message: "song added to playlist" });
  };
  static remove = async (req, res) => {
    const schema = Joi.object({
      playlistId: Joi.string().required(),
      songId: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const user = await User.findById(req.params._id);
    const playlist = await playList.findById(req.body.playlistId);
    if (!user._id.equals(playlist.user))
      return res
        .status(403)
        .json({ message: "User dont have access to remove" });
    const index = playlist.song.indexOf(req.body.songId);
    playlist.song.splice(index, 1);
    await playlist.save();
    res
      .status(200)
      .json({ data: playlist, message: "Song remove successfully" });
  };
  static favourite = async (req, res) => {
    const user = await User.findById(req.user._id);
    const playlists = await playList.find({ _id: user.playList });
    res.status(200).json({ data: playlists });
  };
  static random = async (req, res) => {
    const playlist = await playList.aggregate([{ $sample: { size: 10 } }]);
    res.status(200).json({ data: playlist });
  };
  static idSong = async (req, res) => {
    const playlist = await playList.find(req.params._id);
    if (!playlist) return res.status(400).json("not found");
    const songs = await Song.find({ _id: playlist.song });
    res.status(200).json({ data: { playlist, songs } });
  };
  static getAll = async (req, res) => {
    const playlists = await playList.find();
    res.status(200).json({ data: playlists });
  };
  static delete = async (req, res) => {
    const user = await User.findById(req.user._id);
    const playlist = await playList.findById(req.params.id);
    if (!user._id.equals(playlist.user))
      return res
        .status(400)
        .json({ message: "user dont have access to playlist" });
    const index = user.playList.indexOf(req.params.id);
    user.playList.splice(index, 1);
    await user.save();
    await playlist.remove();
    res.status(200).json({ message: "Removed from library" });
  };
}
export default playlistController;
