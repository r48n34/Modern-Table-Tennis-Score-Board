import { Container, Grid, Text, Switch, Badge, Button } from "@mantine/core"
import ScoreDrag from "./components/ScoreDrag"
import { useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel-react";
import { isEven } from "./utils/commonUtils";

function App() {

    const [ emblaLeft, setEmblaLeft ] = useState<EmblaCarouselType | null>(null);
    const [ emblaRight, setEmblaRight ] = useState<EmblaCarouselType| null>(null);

    const [ playersScore, setPlayersScore ] = useState<[number, number]>([0,0]);
    const [ isFirstPlayerServe, setIsFirstPlayerServe ] = useState<boolean>(true);

    const [ isCurrentFirstPlayerServe, setIsCurrentFirstPlayerServe ] = useState<boolean>(true);

    function changeScore(score: number, player: number){
        setPlayersScore( v => {
            const newPlayer:[number, number] = [...v]
            newPlayer[player] = score;

            return newPlayer
        });
    }

    function determineWhoServeWithScore(playersScore: [number, number], firstPlayerServe: boolean){
        const totalScore = playersScore[0] + playersScore[1];
        const players = firstPlayerServe ? ["first", "second"] : ["second", "first"];
        
        let whoServe: string = "";

        if(playersScore[0] >= 10 && playersScore[1] >= 10){ // Deuce
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
                    setPlayersScore([0, 0]);

                    emblaLeft?.scrollTo(0, true)
                    emblaRight?.scrollTo(0, true)
                }} 
                mb={18}
            >
                Reset Score
            </Button>

            {/* <ColorToggleBtn/> */}
            <Switch
                label="Left / First Player Serve"
                checked={isFirstPlayerServe}
                onChange={(event) => setIsFirstPlayerServe(event.currentTarget.checked)}
            />

            <Grid mt={12}>
                <Grid.Col span={5}>
                    <ScoreDrag changeScore={changeScore} player={0} setEmbla={setEmblaLeft} />
                    {isCurrentFirstPlayerServe && (<Badge color="blue" size="lg" mt={6}>Serve</Badge>)}
                </Grid.Col>

                <Grid.Col span={1}>
                    <ScoreDrag player={-1} height={230} />
                </Grid.Col>
                <Grid.Col span={1}>
                    <ScoreDrag player={-2} height={230}/>
                </Grid.Col>

                <Grid.Col span={5}>
                    <ScoreDrag changeScore={changeScore} player={1} setEmbla={setEmblaRight}/>
                    {!isCurrentFirstPlayerServe && (<Badge color="blue" size="lg" mt={6}>Serve</Badge>)}
                </Grid.Col>
            </Grid>
            
        </Container>
        </>
    )
}

export default App
