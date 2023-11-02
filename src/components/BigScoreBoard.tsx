import { useEffect, useState } from "react";
import { Container, Grid, Text, Badge, Radio, Group, Space, ActionIcon, Tooltip } from "@mantine/core"
import ScoreDrag from "./ScoreDrag"
import { EmblaCarouselType } from "embla-carousel-react";
import { useLocalStorage } from '@mantine/hooks';

import { IconBounceLeft, IconBounceRight, IconPingPong, IconPlayerTrackNextFilled, IconRecycle, IconServerCog, IconSwords, IconZoomReset } from "@tabler/icons-react";
import { determineWhoServe, determineWhoWin } from "../utils/tableTennisUtils";
import { ScoreObject } from "../interface/tableTennisInterface";
import ColorToggleBtn from "./common/ColorToggleBtn";
import superjson from 'superjson';

const playersScoreDefaultValue = {
    leftPlayerScore: 0,
    leftPlayerMatchScore: 0,

    rightPlayerScore: 0,
    rightPlayerMatchScore: 0,

    whoServeFirst: "left" as "left" | "right"
}

function BigScoreBoard(){
    
    // embla API useState
    const [ emblaLeftScore, setEmblaLeftScore ] = useState<EmblaCarouselType | null>(null);
    const [ emblaRightScore, setEmblaRightScore ] = useState<EmblaCarouselType| null>(null);

    const [ emblaLeftMatchScore, setEmblaLeftMatchScore   ] = useState<EmblaCarouselType | null>(null);
    const [ emblaRightMatchScore, setEmblaRightMatchScore ] = useState<EmblaCarouselType | null>(null);

    // General score
    const [ playersScore, setPlayersScore ] = useLocalStorage<ScoreObject>({
        key: 'players-score-scheme',
        defaultValue: playersScoreDefaultValue,
        serialize: superjson.stringify,
        getInitialValueInEffect: false,
        deserialize: (str) => (str === undefined ? playersScoreDefaultValue : superjson.parse(str)),
    });

    // const [ whoServe, setWhoServe ] = useState<"left" | "right">("left");
    const [ isCurrentFirstPlayerServe, setIsCurrentFirstPlayerServe ] = useState<boolean>(true);

    function changeScore(score: number, player: keyof ScoreObject){
        setPlayersScore( v => {
            const newPlayer: ScoreObject = {
                ...v,
            }

            if(player !== "whoServeFirst"){
                newPlayer[player] = score;
            }

            return newPlayer
        });
    }

    function determineWhoServeWithScore(playersScore: ScoreObject){
        const whoServe = determineWhoServe(playersScore);
        setIsCurrentFirstPlayerServe(whoServe === "left");
    }

    function initScoreScreen(newLeftScore: number, newRightScore: number){
        emblaLeftScore?.scrollTo(newLeftScore, false)
        emblaRightScore?.scrollTo(newRightScore, false)
    }

    function initMatchScoreScreen(newLeftMatchScore: number, newRightMatchScore: number){
        emblaLeftMatchScore?.scrollTo(newLeftMatchScore, false);
        emblaRightMatchScore?.scrollTo(newRightMatchScore, false);
    }

    function resetGameScore(){
        setPlayersScore(v => ({
            ...v, 
            leftPlayerScore: 0,
            rightPlayerScore: 0,
        }));

        initScoreScreen(0, 0)
    }

    function resetAllScore(){
        setPlayersScore(v => ({
            ...v, 
            leftPlayerScore: 0,
            rightPlayerScore: 0,
            leftPlayerMatchScore: 0,
            rightPlayerMatchScore: 0,
            whoServeFirst: "left"
        }));

        initScoreScreen(0, 0)
        initMatchScoreScreen(0, 0);
    }

    function nextMatctStart(){
        const whoWin = determineWhoWin(playersScore!["leftPlayerScore"], playersScore!["rightPlayerScore"]);

        const newLeftMatchScore  = playersScore!["rightPlayerMatchScore"] + ( whoWin === "Right Won >" ? 1 : 0);
        const newRightMatchScore = playersScore!["leftPlayerMatchScore"] +  ( whoWin === "< Left Won"  ? 1 : 0);

        setPlayersScore(v => ({
            ...v,
            leftPlayerScore: 0,
            rightPlayerScore: 0,
            leftPlayerMatchScore: newLeftMatchScore,
            rightPlayerMatchScore: newRightMatchScore,
            whoServeFirst: v.whoServeFirst === "right" ? "left" : "right"
        }));

        initMatchScoreScreen(newLeftMatchScore, newRightMatchScore);
        initScoreScreen(0, 0);

        // setWhoServe( whoServe === "right" ? "left" : "right" );
    }

    function swapMatchScore(){
        const newLeftMatchScore  = playersScore!["rightPlayerMatchScore"]
        const newRightMatchScore = playersScore!["leftPlayerMatchScore"]

        setPlayersScore(v => ({
            ...v, 
            leftPlayerMatchScore: newLeftMatchScore,
            rightPlayerMatchScore: newRightMatchScore,
            whoServeFirst: v.whoServeFirst === "right" ? "left" : "right"
        }));

        initMatchScoreScreen(newLeftMatchScore, newRightMatchScore)
        // setWhoServe( whoServe === "right" ? "left" : "right" );
    }

    useEffect(() => {
        determineWhoServeWithScore(playersScore!)
    }, [playersScore]);

    return (
        <>
        <Container fluid>
            <Text ta="center" fz={48} fw={300}>
                TT Score Board
            </Text>

            <Group justify="center">
                <Tooltip label="Start Next Match">
                <ActionIcon 
                    variant="light"
                    aria-label="Start Next Match"
                    onClick={() => nextMatctStart()}
                    disabled={determineWhoWin(playersScore!["leftPlayerScore"], playersScore!["rightPlayerScore"]) === ""}
                >
                    <IconPlayerTrackNextFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                </Tooltip>


                <Tooltip label="Reset Game Score">
                <ActionIcon variant="light" aria-label="Reset Game Score" onClick={() => resetGameScore()} >
                    <IconZoomReset style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                </Tooltip>

                <Tooltip label="Swap Match Score">
                <ActionIcon variant="light" aria-label="Swap Match Score" onClick={() => swapMatchScore()} >
                    <IconRecycle style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                </Tooltip>

                <Tooltip label="Reset All Score">
                <ActionIcon variant="light" aria-label="Reset All Score" onClick={() => resetAllScore()} >
                    <IconServerCog style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                </Tooltip>

                <ColorToggleBtn />
            </Group>

            <Radio.Group
                value={playersScore!.whoServeFirst}
                onChange={ (v: string) => !!playersScore && setPlayersScore({
                    ...playersScore,
                    whoServeFirst: v as "left" | "right"
                })}
                withAsterisk
            >
                <Group justify="space-between">
                    <Radio value="left"  label={ <><IconPingPong size={18}/> First Serve </>} />
                    <Radio value="right" label={ <><IconPingPong size={18}/> First Serve </>} />
                </Group>
            </Radio.Group>

            <Grid mt={12}>
                <Grid.Col span={{ base: 5 }}>
                    <ScoreDrag
                        initialSlide={playersScore!.leftPlayerScore}
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

                <Grid.Col span={{ base: 2 }}>
                    <Grid>
                        <Grid.Col span={{ base: 6 }}>
                        <ScoreDrag 
                            initialSlide={playersScore!.leftPlayerMatchScore}
                            player={"leftPlayerMatchScore"}
                            changeScore={changeScore}
                            height={230}
                            fontSize={8}
                            setEmbla={setEmblaLeftMatchScore}
                        />
                        </Grid.Col>
                        <Grid.Col span={{ base: 6 }}>
                            <ScoreDrag 
                                initialSlide={playersScore!.rightPlayerMatchScore}
                                player={"rightPlayerMatchScore"}
                                changeScore={changeScore}
                                height={230}
                                fontSize={8}
                                setEmbla={setEmblaRightMatchScore}
                            />
                        </Grid.Col>
                    </Grid>

                    {
                        playersScore!["leftPlayerScore"] >= 10 
                        && playersScore!["rightPlayerScore"] >= 10
                        && (<Text ta="center" fz={32} fw={300}> <IconSwords /> Deuce </Text>)
                    }
                    
                    <Text ta="center" fz={32}> 
                        { determineWhoWin(playersScore!["leftPlayerScore"], playersScore!["rightPlayerScore"]) }
                    </Text> 
     
                </Grid.Col>

                <Grid.Col span={{ base: 5 }}>
                    <ScoreDrag
                        initialSlide={playersScore!.rightPlayerScore} 
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
