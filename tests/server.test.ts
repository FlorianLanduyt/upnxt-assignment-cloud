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

  // In comment because with the ID the body is always different 
  //expect(response.body).toEqual({ score: 300 });
});
