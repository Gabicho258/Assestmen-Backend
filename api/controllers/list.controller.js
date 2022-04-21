import { List } from "../models/index.js";

export const createList = async (req, res) => {
  const { name, user_id } = req.body;
  const newList = new List({ name, user_id });
  try {
    await newList.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getListsByUser = async (req, res) => {
  try {
    const { id: idUser } = req.params;
    const lists = await List.find({ user_id: idUser });
    res.json(lists);
  } catch (error) {
    res.status(403).json({ error });
  }
};

export const addFavToList = async (req, res) => {
  try {
    const { id: idList } = req.params;
    const favToAdd = req.body;
    const list = await List.findById(idList);
    console.log(list);
    console.log(list.favs.length + ".asdasd");
    const id =
      list.favs.length === 0 ? 0 : list.favs[list.favs.length - 1].id + 1;
    console.log("breakpoint");

    list.favs.push({ id, ...favToAdd });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getListById = async (req, res) => {
  try {
    const { id: idList } = req.params;
    const list = await List.findById(idList);
    if (!list) {
      return res.status(404).send();
    }
    res.json(list);
  } catch (error) {
    res.status(403).json({ error });
  }
};

export const deleteFavFromList = async (req, res) => {
  const { id: idList } = req.params;
  const { id: idFav } = req.body;
  try {
    const list = await List.findById(idList);
    const favToDeletePosition = list.favs.findIndex((f) => f.id === idFav);
    list.favs.splice(favToDeletePosition, 1);
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deleteList = async (req, res) => {
  const { id: idList } = req.params;
  try {
    const listToDelete = await List.findById(idList);
    if (!listToDelete) {
      res.status(404).send({ error: "No list to delete" });
    } else {
      const deletedList = await List.deleteOne(listToDelete);
      if (deletedList) res.status(200).json(deletedList);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
