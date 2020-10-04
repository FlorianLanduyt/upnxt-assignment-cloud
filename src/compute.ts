import { Frame, Game, LastFrame } from "./types";

export function compute(game: Game): number {
  var totalScore: number = 0

  for (var frameIndex = 0; frameIndex < game.length; frameIndex++) {
    if(frameIndex < game.length -2)
      totalScore = getScoreForNormalFrame(game, frameIndex, totalScore);
    else 
      totalScore = getScoreForLastFrame(game, totalScore)
  }
  return totalScore
}


function getScoreForNormalFrame(game: Game, frameIndex: number, totalScore: number) {
  var currentFrame = game[frameIndex]

  if (checkForStrike(currentFrame)) {
    totalScore += 10 + getStrikeBonus(game, frameIndex +1)
  } else if (checkForSpare(currentFrame)) {
    totalScore += 10 + getSpareBonus(game[frameIndex + 1]);
  } else {
    totalScore += currentFrame[0] + currentFrame[1];
  }
  
  return totalScore;
}

function getScoreForLastFrame(game: Game, totalScore: number){
  var lastFrame = game[game.length-1]

  for(var roll of lastFrame){
    totalScore += roll
  }

  return totalScore
}

function checkForStrike(frame: Frame|LastFrame): boolean{
  return frame[0] == 10? true: false 
}

function getStrikeBonus(game: Game, frame: number): number {
  var bonus = 0
  var roll1 = game[frame][0]
  var roll2 = game[frame][1]

  bonus = roll1 + roll2
  if(roll1 == 10) // streak of strike
    bonus += game[frame+1][0]

  return bonus
}

function checkForSpare(frame: Frame|LastFrame): boolean{
  return (frame[0] + frame[1] == 10) && frame[0] != 10 ? true: false
}

function getSpareBonus(frame: Frame|LastFrame): number {
  return frame[0]
}
