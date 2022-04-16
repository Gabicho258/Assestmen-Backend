import mongoose from "mongoose";

const schemaUsers = {
  name: String,
  password: String,
  email: String,
};

const User = mongoose.model("User", schemaUsers, "users");

export default User;
