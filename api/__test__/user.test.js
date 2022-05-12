import axios from "axios";

describe("User tests", () => {
  test("should return a message of a user already exits", async () => {
    const userToCreateAgain = {
      name: "test",
      email: "test_email2@gmail.com",
      password: "123",
    };
    const url = "http://localhost:5000/auth/local/register";
    try {
      await axios.post(url, userToCreateAgain);
    } catch (error) {
      expect(error.response.data.message).toBe("User already exists");
    }
  });

  test("should create an user", async () => {
    // the email must be changed if you want to run the test more than once
    const userToCreate = {
      name: "test",
      email: "test_email15@gmail.com",
      password: "123",
    };
    const url = "http://localhost:5000/auth/local/register";
    const result = await axios.post(url, userToCreate);
    expect(result.status).toBe(201);
  });
  test("should return a token when we login", async () => {
    const userToLogin = {
      email: "test_email2@gmail.com",
      password: "123",
    };
    const url = "http://localhost:5000/auth/local/login";
    const result = await axios.post(url, userToLogin);
    expect(result.data).toHaveProperty("token");
  });
  test("should return a 401 Unauthorized if the login can not be done", async () => {
    const userToLoginWrong = {
      email: "test_email2@gmail.com",
      password: "1234", // correct password = 123
    };
    const url = "http://localhost:5000/auth/local/login";
    try {
      await axios.post(url, userToLoginWrong);
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });
  test("should return a 400 bad request if email or password are not send", async () => {
    const userToLoginWithoutPassword = {
      email: "test_email2@gmail.com",
    };
    const url = "http://localhost:5000/auth/local/login";
    try {
      await axios.post(url, userToLoginWithoutPassword);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});
