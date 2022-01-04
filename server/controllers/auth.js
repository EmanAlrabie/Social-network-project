import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import expressJet from "express-jwt"; //This module provides Express middleware for validating JWT , in another words we need it to verify the token comes from the client side
import cloudinary from "cloudinary";
import { nanoid } from "nanoid"; // to genrate uniqe username

export const register = async (req, res) => {
  const { name, email, password, secret } = req.body;

  //valdition
  if (!name) return res.status(400).send("Name is require");
  if (!password || password.length < 6) {
    return res
      .status(400)
      .send("Password is require and should be 8 charcters long");
  }
  if (!secret) return res.status(400).send("Answer is require");

  const exist = await User.findOne({ email: email });
  if (exist) return res.status(400).send("this email is registered try login ");

  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    secret,
    username: nanoid(7),
  });
  try {
    await user.save();
    console.log("user register succes");
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("somthing error, try again another time");
  }
};

export const login = async (req, res) => {
  try {
    //check the email is registerd
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .send("This email is not registered yet, try to register first.");

    // check the password
    const match = await comparePassword(password, user.password); //compare between password entered and the password hashed in DB
    if (!match) return res.status(400).send("Password isn't correct!");
    // generate token. then send it to the client side and use it to keep user login and access some pages which require to login
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); //   third param is the expired time of the session, which means after this time the user  logout automatically

    //to avoid send the user password or the secrt to client side
    user.password = undefined;
    user.secret = undefined;

    //send user login info to client side
    res.json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

// we verfy the token to get the id, and based on the id we get the user info from the db
//create endpoint to get the user access to only her/his data
export const currentUser = async (req, res) => {
  //console.log(req.user);
  try {
    const user = await User.findById(req.user._id);
    //res.json(user);
    res.json({ ok: true });
  } catch {
    console.log(err);
    res.sendStatus(400);
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export const uploadImage = async (req, res) => {
  // console.log("user id: ", req.user._id);
  // upload images to cloudinary
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path); //return URL and another info about the stored image when success upload
    console.log("upload URL", result);

    // await User.findByIdAndUpdate(
    //   req.user._id,
    //   { photo: result.secure_url },
    //   { upsert: true }
    // );

   // const updatedUser = await User.findById(req.user._id);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.log(err);
  }
};

//update profile
export const profileUpdate = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    }); // new: true means return updated user

    // for security reasons we will not send password and secret
    user.passwoed = undefined;
    user.secret = undefined;
console.log("user: ", user);
    res.json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ error: "Dublicated username" });
    }
    console.log(err);
  }
};
