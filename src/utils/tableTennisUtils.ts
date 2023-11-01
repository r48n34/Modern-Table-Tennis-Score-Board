import { ScoreObject } from "../interface/tableTennisInterface";
import { isEven } from "./commonUtils";

export function determineWhoServe(playersScore: ScoreObject, firstPlayerServe: boolean): "left" | "right" {
    const totalScore = playersScore["leftPlayerScore"] + playersScore["rightPlayerScore"];
    const players: Array<"left" | "right"> = firstPlayerServe ? ["left", "right"] : ["right", "left"];
    
    let whoServe: "left" | "right" = "left";

    if( playersScore["leftPlayerScore"] >= 10 && playersScore["rightPlayerScore"] >= 10 ){ // Deuce
        whoServe = totalScore % 2 === 0 ? players[0] : players[1]
    }
    else{ // Normal
        const finalScoreDetermine = isEven(totalScore) ? totalScore : totalScore - 1;
        whoServe = finalScoreDetermine % 4 === 0 ? players[0] : players[1]
    }

    return whoServe
}

export function determineWhoWin(leftScore: number, rightScore: number): "< Left Won" | "Right Won >" | "" {

    if(leftScore >= 10 && rightScore >= 10){ // Deuce
        const scoreDiff = leftScore - rightScore;

        if(scoreDiff >= 2){
            return "< Left Won"
        }
        else if(scoreDiff <= -2){
            return "Right Won >"
        }

        return ""
    }
    else { // Normal
        if(leftScore >= 11 && rightScore <= 10){
            return "< Left Won"
        }
        else if(rightScore >= 11 && leftScore <= 10){
            return "Right Won >"
        }

        return ""
    }

}