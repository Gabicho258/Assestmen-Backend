import axios from "axios";

describe("list tests", () => {
  let token;
  beforeAll(async () => {
    const url = "http://localhost:5000/auth/local/login";
    const { data } = await axios.post(url, {
      email: "test_email2@gmail.com",
      password: "123",
    });
    token = data.token;
  });
  const userTestId = "626fee630c806ce8d89301d7";

  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  test("should create a list", async () => {
    const url = "http://localhost:5000/api/list/create";
    const listToCreate = {
      name: "testList",
      user_id: userTestId,
    };
    const { status } = await axios.post(url, listToCreate, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(status).toBe(201);
  });
  let listId;
  test("should return all lists by userId", async () => {
    const url = `http://localhost:5000/api/list/user/${userTestId}`;
    const result = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    listId = result.data[0]._id;
    expect(result.status).toBe(200);
  });
  test("should return a list by its id", async () => {
    const url = `http://localhost:5000/api/list/${listId}`;
    const { status } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(status).toBe(200);
  });
  test("should add a fav to a list", async () => {
    const url = `http://localhost:5000/api/fav/add/${listId}`;
    const favToAdd = {
      title: "Test list's fav 1",
      description: "This is a description",
      link: "www.google.com",
    };
    // it creates a fav with id = 0
    const { status, data } = await axios.post(url, favToAdd, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(status).toBe(201);
  });
  test("should delete a fav from a list", async () => {
    const url = `http://localhost:5000/api/fav/delete/${listId}`;
    const id = { id: 0 };
    // it deletes the fav created before
    const { status } = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    expect(status).toBe(200);
  });
  test("should delete a list from a user", async () => {
    const url = `http://localhost:5000/api/list/delete/${listId}`;
    const { status } = await axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(status).toBe(200);
  });
});
