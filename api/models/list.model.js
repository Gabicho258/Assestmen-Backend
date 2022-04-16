import mongoose from "mongoose";

const shemaLists = {
  name: String,
  favs: Array,
  user_id: String,
};

const List = mongoose.model("List", shemaLists, "lists");

export default List;
