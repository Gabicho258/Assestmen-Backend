import mongoose from "mongoose";

const shemaLists = {
  title: String,
  description: String,
  link: String,
};

const List = mongoose.model("List", shemaLists, "lists");

export default List;
