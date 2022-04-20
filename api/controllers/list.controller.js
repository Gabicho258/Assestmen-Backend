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

export const deleteList = async (req, res) => {
  const { id: idList } = req.params;
  try {
    const listToDelete = await Pet.findById(idList);
    if (!listToDelete) {
      res.status(204).send({ error: "No list to delete" });
    } else {
      const deletedList = await Pet.deleteOne(listToDelete);
      if (deletedList) res.status(200).json(deletedList);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
