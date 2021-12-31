import user from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";

export const register = async (req, res) => {
  const { name, email, password, secret } = req.body;
  //valdition
  if (!name) return res.status(400).send("Name is require");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is require and should be 8 charcters long");
  if (!secret) return res.status(400).send("Answer is require");

  const exist = await user.findOne({ email: email });
  if (exist) return res.status(400).send("this email is registered try login ");

  const hashedPassword = await hashPassword(password);

  const newUSer = new user({ name, email, password: hashedPassword, secret });
  try {
    await newUSer.save();
    console.log("user register succes");
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("somthing error, try again another time");
  }
};
