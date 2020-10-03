import http from "http";
import express from "express";
import { compute } from "./compute";

const app = express();

app.use(express.json());

app.post("/compute", (request, response) => {
  const game = request.body.game;
  // TODO: Validate input

  try {
    validateInput(game);

    const score = compute(game);

    // TODO: Return response

    response.json({
      "statuscode": response.statusCode,
      "score": score
    })


  } catch (err) {
    response.statusCode = 400
    response.json({
      "StatusCode": response.statusCode,
      "Message": err.message
    })
  }
});

export const createServer = () => http.createServer(app);


function validateInput(game: any) {
  //Checking if there are exactly 10 tuples
  if (game.length != 10)
    throw new Error('You amount of throws has to be exactly 10');


  for (var key in game) {
    const turn = game[key]

    const totalPinsThrownOverInOneFrame = turn.reduce((throw1: number, throw2: number) => {

      //checking if input is a number 
      if (isNaN(throw1) || isNaN(throw2))
        throw new Error('Input has to be a number')

      //Checking if score one throw is between 0 and 10
      if (throw1 > 10 || throw1 < 0 || throw2 > 10 || throw2 < 0)
        throw new Error('Score of one throw has to be between 0 and 10')

      return throw1 + throw2
    }, 0
    )

    //Checking if score in one frame is between 0 and 10
      if (totalPinsThrownOverInOneFrame > 10 || totalPinsThrownOverInOneFrame < 0)
        throw new Error('Score of one frame has to be between 0 and 10')
  }

  return true
}

