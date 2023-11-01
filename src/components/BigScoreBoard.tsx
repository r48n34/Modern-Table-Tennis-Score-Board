import { useEffect, useState } from "react";
import { Container, Grid, Text, Switch, Badge, Button } from "@mantine/core"
import ScoreDrag from "./ScoreDrag"
import { EmblaCarouselType } from "embla-carousel-react";
import { isEven } from "../utils/commonUtils";

type ScoreObject = {
    leftPlayerScore: number,
    leftPlayerMatchScore: number,
    rightPlayerScore: number,
    rightPlayerMatchScore: number
}

function BigScoreBoard(){
    

    const [ emblaLeftScore, setEmblaLeftScore ] = useState<EmblaCarouselType | null>(null);
    const [ emblaRightScore, setEmblaRightScore ] = useState<EmblaCarouselType| null>(null);

    const [ emblaLeftMatchScore, setEmblaLeftMatchScore   ] = useState<EmblaCarouselType | null>(null);
    const [ emblaRightMatchScore, setEmblaRightMatchScore ] = useState<EmblaCarouselType | null>(null);

    // const [ playersMatchScore, setPlayersMatchScore ] = useState<[number, number]>([0, 0]);
    const [ playersScore, setPlayersScore ] = useState<ScoreObject>({
        leftPlayerScore: 0,
        leftPlayerMatchScore: 0,

        rightPlayerScore: 0,
        rightPlayerMatchScore: 0
    });

    const [ isFirstPlayerServe, setIsFirstPlayerServe ] = useState<boolean>(true);

    const [ isCurrentFirstPlayerServe, setIsCurrentFirstPlayerServe ] = useState<boolean>(true);

    function changeScore(score: number, player: keyof ScoreObject){
        setPlayersScore( v => {
            const newPlayer:ScoreObject = {...v}
            newPlayer[player] = score;

            return newPlayer
        });
    }

    function determineWhoServeWithScore(playersScore: ScoreObject, firstPlayerServe: boolean){
        const totalScore = playersScore["leftPlayerScore"] + playersScore["rightPlayerScore"];
        const players = firstPlayerServe ? ["first", "second"] : ["second", "first"];
        
        let whoServe: string = "";

        if(playersScore["leftPlayerScore"] >= 10 && playersScore["rightPlayerScore"] >= 10){ // Deuce
            whoServe = totalScore % 2 === 0 ? players[0] : players[1]
        }
        else{ // Normal
            const finalScoreDetermine = isEven(totalScore) ? totalScore : totalScore - 1;
            whoServe = finalScoreDetermine % 4 === 0 ? players[0] : players[1]
        }

        // console.log(`${whoServe} Player Serve`);
        setIsCurrentFirstPlayerServe(whoServe === "first")

    }

    useEffect(() => {
        determineWhoServeWithScore(playersScore, isFirstPlayerServe)
    }, [playersScore, isFirstPlayerServe]);

    return (
        <>
        <Container fluid>
            <Text ta="center" fz={48}>
                TT Score Board
            </Text>

            <Button 
                variant="filled" 
                onClick={() => {

                    console.log(playersScore);
                    const newLeftScore = playersScore["rightPlayerMatchScore"]
                    const newRightScore = playersScore["leftPlayerMatchScore"]

                    console.log(newLeftScore, newRightScore);

                    setPlayersScore(v => ({
                        ...v, 
                        leftPlayerMatchScore: newLeftScore,
                        rightPlayerMatchScore: newRightScore,
                    }));

                    emblaLeftMatchScore?.scrollTo(newLeftScore, false)
                    emblaRightMatchScore?.scrollTo(newRightScore, false)
                }} 
                mb={18}
            >
                Swap Match Score
            </Button>

            <Button 
                variant="filled" 
                onClick={() => {
                    setPlayersScore(v => ({
                        ...v, 
                        leftPlayerScore: 0,
                        rightPlayerScore: 0,
                    }));

                    emblaLeftScore?.scrollTo(0, false)
                    emblaRightScore?.scrollTo(0, false)

                    // emblaLeftMatchScore?.scrollTo(0, false)
                    // emblaRightMatchScore?.scrollTo(0, false)
                }} 
                mb={18}
            >
                Reset Score
            </Button>

            <Switch
                label="Left / First Player Serve"
                checked={isFirstPlayerServe}
                onChange={(event) => setIsFirstPlayerServe(event.currentTarget.checked)}
            />

            <Grid mt={12}>
                <Grid.Col span={5}>
                    <ScoreDrag 
                        changeScore={changeScore} 
                        player={"leftPlayerScore"} 
                        setEmbla={setEmblaLeftScore} 
                    />
                    {isCurrentFirstPlayerServe && (<Badge color="blue" size="lg" mt={6}>Serve</Badge>)}
                </Grid.Col>

                <Grid.Col span={1}>
                    <ScoreDrag 
                        player={"leftPlayerMatchScore"}
                        changeScore={changeScore}
                        height={230}
                        setEmbla={setEmblaLeftMatchScore}
                    />
                </Grid.Col>

                <Grid.Col span={1}>
                    <ScoreDrag 
                        player={"rightPlayerMatchScore"}
                        changeScore={changeScore}
                        height={230}
                        setEmbla={setEmblaRightMatchScore}
                    />
                </Grid.Col>

                <Grid.Col span={5}>
                    <ScoreDrag 
                        changeScore={changeScore}
                        player={"rightPlayerScore"}
                        setEmbla={setEmblaRightScore}
                    />
                    {!isCurrentFirstPlayerServe && (<Badge color="blue" size="lg" mt={6}>Serve</Badge>)}
                </Grid.Col>
            </Grid>
            
        </Container>
        </>
    )
}
    
export default BigScoreBoard
