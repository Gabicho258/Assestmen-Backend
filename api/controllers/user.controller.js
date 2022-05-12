import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json();
  }

  const userDB = await User.findOne({ email });
  if (!userDB) {
    return res.status(403).json();
  }

  const isValidPassword = await bcrypt.compare(password, userDB.password);
  if (email === userDB.email && isValidPassword) {
    jwt.sign(
      // send the id of the user in order to work with it in the front
      { email: userDB.email, id: userDB._id },
      process.env.SECRET_KEY,
      (err, token) => {
        if (!err) {
          res.status(200).json({
            token,
          });
        } else {
          res.status(401).json(err);
        }
      }
    );
  } else {
    res.status(401).send();
  }
};

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const hashStr = await bcrypt.hash(password, 10);
  const newUser = new User({ ...req.body, password: hashStr });
  const userRepited = await User.findOne({ email });
  if (userRepited) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
