import supertest from "supertest";
import { createServer } from "../src/server";

it("has a compute endpoint that returns the score with status code 200", async () => {
  const server = createServer();
  const response = await supertest(server)
    .post("/compute")
    .send({
      game: [
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 0],
        [10, 10, 10],
      ],
    });

  expect(response.status).toBe(200);
  expect(response.body.score).toBe(300);
});

it("returns a 400 response code when entering more than 10 pins in 1 FRAME ", async () => {
  const server = createServer();
  const response = await supertest(server)
    .post("/compute")
    .send({
      game: [
        [10, 10],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0, 0],
      ],
    });

  expect(response.status).toBe(400);
});

it("returns a 400 response code when entering more than 10 pins in 1 ROLL ", async () => {
  const server = createServer();
  const response = await supertest(server)
    .post("/compute")
    .send({
      game: [
        [11, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0, 0],
      ],
    });

  expect(response.status).toBe(400);
});

it("returns a 400 response code when rolling a third time whithout getting a strike or spare in last frame ", async () => {
  const server = createServer();
  const response = await supertest(server)
    .post("/compute")
    .send({
      game: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0, 6],
      ],
    });

  expect(response.status).toBe(400);
});

it("returns a 400 response code when entering more than 10 frames", async () => {
  const server = createServer();
  const response = await supertest(server)
    .post("/compute")
    .send({
      game: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0, 0],
      ],
    });

  expect(response.status).toBe(400);
});

it("returns a 400 response code when entering less than 10 frames", async () => {
  const server = createServer();
  const response = await supertest(server)
    .post("/compute")
    .send({
      game: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0, 0],
      ],
    });

  expect(response.status).toBe(400);
});

it("returns a 400 response code when entering more than 2 rolls in one frame in the first 9 frames", async () => {
  const server = createServer();
  const response = await supertest(server)
    .post("/compute")
    .send({
      game: [
        [0, 0],
        [0,0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0, 0],
      ],
    });

  expect(response.status).toBe(400);
});

it("returns a 400 response code when entering less than 2 rolls in one frame in the first 9 frames", async () => {
  const server = createServer();
  const response = await supertest(server)
    .post("/compute")
    .send({
      game: [
        [0, 0],
        [0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0, 0],
      ],
    });

  expect(response.status).toBe(400);
});

it("returns a 400 response code when entering less than 3 rolls in one frame in the 10th frame", async () => {
  const server = createServer();
  const response = await supertest(server)
    .post("/compute")
    .send({
      game: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    });

  expect(response.status).toBe(400);
});

it("returns a 400 response code when entering more than 3 rolls in one frame in the 10th frame", async () => {
  const server = createServer();
  const response = await supertest(server)
    .post("/compute")
    .send({
      game: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0, 0, 0],
      ],
    });

  expect(response.status).toBe(400);
});
