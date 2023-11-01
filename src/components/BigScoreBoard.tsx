import { useEffect, useState } from "react";
// import { notifications } from '@mantine/notifications';

import { Container, Grid, Text, Badge, Radio, Group, Space, ActionIcon, Tooltip } from "@mantine/core"
import ScoreDrag from "./ScoreDrag"
import { EmblaCarouselType } from "embla-carousel-react";

import { IconBounceLeft, IconBounceRight, IconPingPong, IconPlayerTrackNextFilled, IconRecycle, IconSwords, IconZoomReset } from "@tabler/icons-react";
import { determineWhoServe, determineWhoWin } from "../utils/tableTennisUtils";
import { ScoreObject } from "../interface/tableTennisInterface";
import ColorToggleBtn from "./common/ColorToggleBtn";

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

    const [ whoServe, setWhoServe ] = useState<"left" | "right">("left");
    const [ isCurrentFirstPlayerServe, setIsCurrentFirstPlayerServe ] = useState<boolean>(true);

    function changeScore(score: number, player: keyof ScoreObject){
        setPlayersScore( v => {
            const newPlayer:ScoreObject = {...v}
            newPlayer[player] = score;

            return newPlayer
        });
    }

    function determineWhoServeWithScore(playersScore: ScoreObject, firstPlayerServe: boolean){
        let whoServe = determineWhoServe(playersScore, firstPlayerServe);
        setIsCurrentFirstPlayerServe(whoServe === "left");
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
        // const whoWon = determineWhoWin(playersScore["leftPlayerScore"], playersScore["rightPlayerScore"]);
        // if( whoWon === "" ){

        //     notifications.show({
        //         color: 'red',
        //         title: 'Error',
        //         message: 'The score match have not end yet.',
        //     })

        //     return;
        // }
    
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
        const newLeftScore  = playersScore["rightPlayerMatchScore"]
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

            <Group justify="center">
                <Tooltip label="Start Next Match">
                <ActionIcon variant="light" aria-label="Start Next Match" onClick={() => nextMatctStart()} disabled={determineWhoWin(playersScore["leftPlayerScore"], playersScore["rightPlayerScore"]) === ""} >
                    <IconPlayerTrackNextFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                </Tooltip>


                <Tooltip label="Swap Match Score">
                <ActionIcon variant="light" aria-label="Swap Match Score" onClick={() => swapMatchScore()} >
                    <IconRecycle style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                </Tooltip>


                <Tooltip label="Reset Score">
                <ActionIcon variant="light" aria-label="Reset Score" onClick={() => resetScore()} >
                    <IconZoomReset style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                </Tooltip>

                <ColorToggleBtn />
            </Group>



            <Radio.Group
                value={whoServe}
                onChange={ (v: string) => setWhoServe(v as "left"| "right") }
                withAsterisk
            >
                <Group justify="space-between">
                    <Radio value="left"  label={ <><IconPingPong size={18}/> First Serve </>} />
                    <Radio value="right" label={ <><IconPingPong size={18}/> First Serve </>} />
                </Group>
            </Radio.Group>

            <Grid mt={12}>
                <Grid.Col span={5}>
                    <ScoreDrag 
                        changeScore={changeScore} 
                        player={"leftPlayerScore"} 
                        setEmbla={setEmblaLeftScore} 
                    />
                    {isCurrentFirstPlayerServe 
                        && (
                        <Badge color="blue" size="lg" mt={6}>
                            <IconBounceLeft size={12}/> Serve
                        </Badge>
                        )
                    }
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
                    {!isCurrentFirstPlayerServe 
                        && (
                        <Group justify="flex-end">
                        <Badge color="blue" size="lg" mt={6}>
                            <IconBounceRight size={12}/> Serve
                        </Badge>
                        </Group>
                    )
                    }
                </Grid.Col>
            </Grid>
        </Container>
        
        <Space h="md" />
        </>
    )
}
    
export default BigScoreBoard
