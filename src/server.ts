import http from "http";
import express from "express";
import { compute } from "./compute";
import { Game } from "./types";
import { Frame } from "./types";
import { LastFrame } from "./types";
const { v4: uuidV4 } = require('uuid');
const db = require("./database.ts")


const app = express();

app.use(express.json());

app.post("/compute", (request, response) => {
  const game = request.body.game;

  try {
    validateInput(game);
    let uuid = uuidV4()

    const score = compute(game);

    var insertScore ='INSERT INTO user (id, score) VALUES (?,?)'
    var params =[uuid, score]
    db.run(insertScore, params, function (err, result) {
        if (err){
            response.status(400).json({"error": err.message})
            return;
        }
        response.status(200).json({"id": uuid, "score": score})
    });
  } catch (err) {
    response.statusCode = 400
    response.status(400).json({"error": err.message})
  }
});

app.get("/history", (request, response) => {

  var sql = "SELECT * FROM user WHERE id = ?"
  var params = [request.query.game]

  console.log(request.params.game)
  db.get(sql, params, (err, row) => {
      if (err) {
        response.status(400).json({"error":err.message});
        return;
      }
      response.json({
          "id": row.id,
          "score": row.score
      })
    });
})

export const createServer = () => http.createServer(app);


function validateInput(game: Game) {
  //Validation on amount of frames in a game
  if (game.length != 10)
    throw new Error('You amount of frames has to be exactly 10. Currently: ' + game.length);


  for (var frameIndex = 0; frameIndex < game.length; frameIndex++) {
    var currentFrame = game[frameIndex]

    if (frameIndex < game.length - 1) { // For first 9 FRAMES in the bowling game
      let amountOfRollsInFrame = 2
      let amountOfPinsInOneFrame = 10

      validateAmountOfRollsInFrame(currentFrame, frameIndex, amountOfRollsInFrame);
      validateRollsInFrame(currentFrame, frameIndex, amountOfPinsInOneFrame);

    } else { // For the last FRAME in the bowling game 
      let amountOfRollsInFrame = 3
      let amountOfPinsInOneFrame = 30

      validateAmountOfRollsInFrame(currentFrame, frameIndex, amountOfRollsInFrame);
      validateRollsInFrame(currentFrame, frameIndex, amountOfPinsInOneFrame);
      validateAllowThirdRoll(currentFrame)
    }
  }

  return true
}


function validateAmountOfRollsInFrame(currentFrame: Frame | LastFrame, frameIndex: number, amountOfRolls: number) {
  if (currentFrame.length != amountOfRolls)
    throw new Error('Frame ' + (frameIndex + 1) + ' has to have exactly ' + amountOfRolls + ' rolls. Currently: ' + currentFrame.length);
}

function validateRollsInFrame(currentFrame: Frame | LastFrame, frameIndex: number, amountOfPinsInOneFrame: number) {
  var totalPinsKnockedOverInOneFrame = 0

  for (var roll in currentFrame) {
    var currentRoll = currentFrame[roll];

    //Validation on amount of pins knocked over in one ROLL 
    if (currentRoll > 10 || currentRoll < 0)
      throw new Error('Roll ' + (parseInt(roll) + 1) + ' in frame ' + (frameIndex + 1) + ' has more than 10 pins knocked over. Please fill in the right data.');

    //Validation on input data is a number
    if (isNaN(currentRoll))
      throw new Error('Roll ' + (parseInt(roll) + 1) + ' in frame ' + (frameIndex + 1) + ' is not a number. Please fill in the right data.');

    totalPinsKnockedOverInOneFrame += currentFrame[roll];
  }
  
  //Validation on amount of pins knocked over in one FRAME
  if (totalPinsKnockedOverInOneFrame > amountOfPinsInOneFrame)
    throw new Error('Frame ' + (frameIndex + 1) + ' has more than 10 pins knocked over. Please fill in the right data.')
}

function validateAllowThirdRoll(frame: LastFrame|Frame){
  var roll1 = frame[0]
  var roll2 = frame[1]
  var roll3 = frame[2]

  if((roll1 + roll2 < 10) && roll3 != 0){
    throw new Error('You can not have a third roll in the last frame if you did not throw a spare of strike in this frame.')
  }
}
