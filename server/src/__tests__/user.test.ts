import request from "supertest";
import { app } from "..";
import { UserRepository } from "../repository/user";
const UserRepo = new UserRepository();

jest.mock("../repository/user");

describe("GET /api/users", () => {
  it("should return a list of users", async () => {
    const mockUsers = [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Doe" },
    ];

    (UserRepo.find as jest.Mock).mockResolvedValue(mockUsers);

    const response = await request(app).get("/api/users");

    console.log("Response:", response.status, response.body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it("should return a 500 error if fetching users fails", async () => {
    (UserRepo.find as jest.Mock).mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/users");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch users." });
  });
});
