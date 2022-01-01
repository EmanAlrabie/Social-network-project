import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import user from "../models/user";

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

  const user = new User({ name, email, password: hashedPassword, secret });
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
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn: "7d"}); //   third param is the expired time of the session, which means after this time the user  logout automatically

    //to avoid send the user password or the secrt to client side
    user.password = undefined
    user.secret = undefined

    //send user login info to client side
    res.json({token, user})

  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

// we verfy the token to get the id, and based on the id we get the user info from the db