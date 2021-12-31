import mongoose from "mongoose"

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true, //trim the white space in the begning and the end
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 64,
    },
    secret: {
      type: String,
      required: true,
    },
    about: {}, 
    photo: String,
    following: [{ type: Schema.ObjectId, ref: "User" }],
    followers: [{ type: Schema.ObjectId, ref: "User" }],
  },
  { timestamps: true }  //assign createdAt and updatedAt fields to the schema. its type is Date.
);

export default mongoose.model("User", userSchema); 