import request from "supertest";
import express, { Express } from "express";
import router from "./todo2";

describe("Test todo", () => {
  let app: Express;
  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use("/todo", router);
  });

  test("Test Add Todo Item", async () => {
    const response = await request(app)
      .post("/todo")
      .send({ title: "test todo list" });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      title: "test todo list",
      isCompleted: false,
    });
  });
  test("Test Failed Add Todo Item", async () => {});

  test("Test Get List", async () => {
    const response = await request(app).get("/todo");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        title: "test todo list",
        isCompleted: false,
      },
    ]);
  });

  test("Test Update Todo Item", async () => {
    const response = await request(app)
      .patch("/todo")
      .send({ id: 1, title: "test todo list", isCompleted: true });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      title: "test todo list",
      isCompleted: true,
    });
  });
  test("Test Delete Todo Item", async () => {
    const response = await request(app).delete("/todo/1");
    // .send({ id: 1, title: "test todo list", isCompleted: true });
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
  test("Test Add Todo Items", async () => {
    await request(app).post("/todo").send({ title: "test todo list" });
    await request(app).post("/todo").send({ title: "test todo list" });
    const response = await request(app).get("/todo");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 2,
        title: "test todo list",
        isCompleted: false,
      },
      {
        id: 3,
        title: "test todo list",
        isCompleted: false,
      },
    ]);
  });
  test("Test Failed Add Todo Item", async () => {
    const response = await request(app).post("/todo").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errorMessage: "plz input title",
    });
  });
  // test("Test get Todo List", async () => {
  //   // await request(app).post("/todo").send({ title: "test todo list1" });
  //   await request(app).post("/todo").send({ title: "test todo list2" });
  //   const response = await request(app).get("/todo");
  //   expect(response.status).toBe(201);
  //   expect(response.body).toEqual([
  //     { id: 1, title: "test todo list1", isCompleted: false },
  //     { id: 2, title: "test todo list2", isCompleted: false },
  //   ]);
  // });
  // test("Test delete Todo List", async () => {
  //   // await request(app).post("/todo").send({ title: "test todo list1" });
  //   // await request(app).post("/todo").send({ title: "test todo list2" });
  //   const deleteTodo = await request(app)
  //     .delete("/todo/delete")
  //     .send({ id: 2 });
  //   console.log(deleteTodo.body);
  //   expect(deleteTodo.status).toBe(201);
  //   expect(deleteTodo.body).toEqual({
  //     id: 2,
  //     title: "test todo list2",
  //     isCompleted: false,
  //   });
  //   const response = await request(app).get("/todo");
  //   expect(response.status).toBe(201);
  //   expect(response.body).toEqual([
  //     { id: 1, title: "test todo list1", isCompleted: false },
  //   ]);
  // });
  // test("Test complete Todo List", async () => {
  //   await request(app).post("/todo").send({ title: "test todo list3" });
  //   //   await request(app).post("/todo").send({ title: "test todo list2" });
  //   const completeTodo = await request(app)
  //     .put("/todo/complete")
  //     .send({ id: 1 });
  //   expect(completeTodo.status).toBe(201);
  //   expect(completeTodo.body).toEqual({
  //     id: 1,
  //     title: "test todo list1",
  //     isCompleted: true,
  //   });
  //   const response = await request(app).get("/todo");
  //   expect(response.status).toBe(201);
  //   expect(response.body).toEqual([
  //     { id: 1, title: "test todo list1", isCompleted: true },
  //     { id: 3, title: "test todo list3", isCompleted: false },
  //   ]);
  // });
});
