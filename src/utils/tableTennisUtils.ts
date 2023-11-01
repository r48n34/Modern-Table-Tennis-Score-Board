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