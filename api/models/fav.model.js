import mongoose from "mongoose";

const shemaFavs = {
  title: String,
  description: String,
  link: String,
};

const Fav = mongoose.model("Fav", shemaFavs, "favs");

export default Fav;
