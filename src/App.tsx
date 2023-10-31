import { Container, Grid, Text, Switch, Badge } from "@mantine/core"
import ScoreDrag from "./components/ScoreDrag"
import { useEffect, useState } from "react";

const isEven = (i: number) => i % 2 === 0;

function App() {

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

    function determineWhoServeWithScore(totalScore: number, firstPlayerServe: boolean){
        const players = firstPlayerServe ? ["first", "second"] : ["second", "first"];
        const finalScoreDetermine = isEven(totalScore) ? totalScore : totalScore - 1;

        const whoServe = finalScoreDetermine % 4 === 0 ? players[0] : players[1]
        console.log(`${whoServe} Player Serve`);

        setIsCurrentFirstPlayerServe(whoServe === "first")
    }

    useEffect(() => {
        const totalScore = playersScore[0] + playersScore[1]
        determineWhoServeWithScore(totalScore, isFirstPlayerServe)
    }, [playersScore]);

    return (
        <>
        <Container fluid>
            <Text ta="center" fz={48}>
                TT Score Board
            </Text>

            <Switch
                label="Left / First Player Serve"
                checked={isFirstPlayerServe}
                onChange={(event) => setIsFirstPlayerServe(event.currentTarget.checked)}
            />

            <Grid mt={12}>
                <Grid.Col span={6}>
                    <ScoreDrag changeScore={changeScore} player={0}/>
                    {isCurrentFirstPlayerServe && (<Badge color="blue" size="lg" mt={6}>Serve</Badge>)}
                </Grid.Col>
                <Grid.Col span={6}>
                    <ScoreDrag changeScore={changeScore} player={1}/>
                    {!isCurrentFirstPlayerServe && (<Badge color="blue" size="lg" mt={6}>Serve</Badge>)}
                </Grid.Col>
            </Grid>
            
        </Container>
        </>
    )
}

export default App
