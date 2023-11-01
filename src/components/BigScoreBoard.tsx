import { useEffect, useState } from "react";
import { Container, Grid, Text, Badge, Button, Radio, Group } from "@mantine/core"
import ScoreDrag from "./ScoreDrag"
import { EmblaCarouselType } from "embla-carousel-react";
import { isEven } from "../utils/commonUtils";
import { IconPingPong, IconSwords } from "@tabler/icons-react";
import { determineWhoWin } from "../utils/tableTennisUtils";

type ScoreObject = {
    leftPlayerScore: number,
    leftPlayerMatchScore: number,
    rightPlayerScore: number,
    rightPlayerMatchScore: number
}

function BigScoreBoard(){
    
    // embla API useState
    const [ emblaLeftScore, setEmblaLeftScore ] = useState<EmblaCarouselType | null>(null);
    const [ emblaRightScore, setEmblaRightScore ] = useState<EmblaCarouselType| null>(null);

    const [ emblaLeftMatchScore, setEmblaLeftMatchScore   ] = useState<EmblaCarouselType | null>(null);
    const [ emblaRightMatchScore, setEmblaRightMatchScore ] = useState<EmblaCarouselType | null>(null);

    // General score
    const [ playersScore, setPlayersScore ] = useState<ScoreObject>({
        leftPlayerScore: 0,
        leftPlayerMatchScore: 0,

        rightPlayerScore: 0,
        rightPlayerMatchScore: 0
    });

    const [ whoServe, setWhoServe ] = useState<"left" | "right" >("left");
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

        setIsCurrentFirstPlayerServe(whoServe === "first")
    }

    function resetScore(){
        setPlayersScore(v => ({
            ...v, 
            leftPlayerScore: 0,
            rightPlayerScore: 0,
        }));

        emblaLeftScore?.scrollTo(0, false)
        emblaRightScore?.scrollTo(0, false)
    }

    function nextMatctStart(){
    
        const newLeftScore = playersScore["rightPlayerMatchScore"]
        const newRightScore = playersScore["leftPlayerMatchScore"]

        setPlayersScore({
            leftPlayerScore: 0,
            rightPlayerScore: 0,
            leftPlayerMatchScore: newLeftScore,
            rightPlayerMatchScore: newRightScore,
        });

        emblaLeftMatchScore?.scrollTo(newLeftScore, false);
        emblaRightMatchScore?.scrollTo(newRightScore, false);

        emblaLeftScore?.scrollTo(0, false)
        emblaRightScore?.scrollTo(0, false)
    

        setWhoServe( whoServe === "right" ? "left" : "right" );
    }

    function swapMatchScore(){
        const newLeftScore = playersScore["rightPlayerMatchScore"]
        const newRightScore = playersScore["leftPlayerMatchScore"]

        setPlayersScore(v => ({
            ...v, 
            leftPlayerMatchScore: newLeftScore,
            rightPlayerMatchScore: newRightScore,
        }));

        emblaLeftMatchScore?.scrollTo(newLeftScore, false);
        emblaRightMatchScore?.scrollTo(newRightScore, false);

        setWhoServe( whoServe === "right" ? "left" : "right" );
    }

    useEffect(() => {
        determineWhoServeWithScore(playersScore, whoServe === "left")
    }, [playersScore, whoServe]);

    return (
        <>
        <Container fluid>
            <Text ta="center" fz={48}>
                TT Score Board
            </Text>

            <Button 
                variant="filled" 
                onClick={() => nextMatctStart()} 
                mb={18}
            >
                Start Next Match
            </Button>

            <Button 
                variant="filled" 
                onClick={() => swapMatchScore()} 
                mb={18}
            >
                Swap Match Score
            </Button>

            <Button 
                variant="filled" 
                onClick={() => resetScore()} 
                mb={18}
            >
                Reset Score
            </Button>

            <Radio.Group
                value={whoServe}
                onChange={ (v: string) => setWhoServe(v as "left"| "right") }
                withAsterisk
            >
                <Group justify="space-between">
                    <Radio value="left"  label={ <><IconPingPong size={18}/> First Serve</>} />
                    <Radio value="right" label={ <><IconPingPong size={18}/> First Serve</>} />
                </Group>
            </Radio.Group>

            <Grid mt={12}>
                <Grid.Col span={5}>
                    <ScoreDrag 
                        changeScore={changeScore} 
                        player={"leftPlayerScore"} 
                        setEmbla={setEmblaLeftScore} 
                    />
                    {isCurrentFirstPlayerServe && (<Badge color="blue" size="lg" mt={6}>Serve</Badge>)}
                </Grid.Col>

                <Grid.Col span={2}>
                    <Grid>
                        <Grid.Col span={6}>
                        <ScoreDrag 
                            player={"leftPlayerMatchScore"}
                            changeScore={changeScore}
                            height={230}
                            setEmbla={setEmblaLeftMatchScore}
                        />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <ScoreDrag 
                                player={"rightPlayerMatchScore"}
                                changeScore={changeScore}
                                height={230}
                                setEmbla={setEmblaRightMatchScore}
                            />
                        </Grid.Col>
                    </Grid>

                    {
                        playersScore["leftPlayerScore"] >= 10 
                        && playersScore["rightPlayerScore"] >= 10
                        && (<Text ta="center" fz={32} fw={300}> <IconSwords /> Deuce </Text>)
                    }
                    
                    <Text ta="center" fz={32}> 
                        { determineWhoWin(playersScore["leftPlayerScore"], playersScore["rightPlayerScore"]) }
                    </Text> 
     
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
