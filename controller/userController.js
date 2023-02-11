import { User, validate } from "../models/userModel.js";

import bcryptjs from "bcryptjs";

class userController {
  static signup = async (req, res) => {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "User already registered" });
    const salt = await bcryptjs.genSalt(Number(process.env.SALT));
    const hashPassword = await bcryptjs.hash(req.body.password, salt);
    const newUser = await new User({
      ...req.body,
      password: hashPassword,
    }).save();

    newUser.password = undefined;
    newUser._V = undefined;
    res
      .status(200)
      .json({ details: newUser, message: "Account created successfully" });
  };
  static login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: "Invalid email and password" });
    const validPassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email and password" });
    const token = user.generateAuthToken();
    res.status(200).json({ token: token, message: "Log in successful" });
  };
  static get = async (req, res) => {
    const users = await User.find().select("-password-__V");
    res.status(200).json({ data: users });
  };
  static getId = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password-__V");
    res.status(200).json({ data: user });
  };
  static updateId = async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password-__V");
    res.status(200).json({ data: user });
  };
  static deleteId = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  };
}
export default userController;
