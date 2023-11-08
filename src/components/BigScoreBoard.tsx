import { useEffect, useState } from "react";
import { Container, Grid, Text, Badge, Radio, Group, Space, ActionIcon, Tooltip, Menu, rem } from "@mantine/core"
import ScoreDrag from "./ScoreDrag"
import { EmblaCarouselType } from "embla-carousel-react";
import { useLocalStorage } from '@mantine/hooks';
import { useStopwatch } from 'react-timer-hook';

import { IconArrowsExchange, IconArrowsExchange2, IconBounceLeft, IconBounceRight, IconCategory, IconPingPong, IconPlayerPauseFilled, IconPlayerPlayFilled, IconPlayerTrackNextFilled, IconRepeat, IconServerCog, IconSwords, IconZoomReset } from "@tabler/icons-react";
import { determineWhoServe, determineWhoWin } from "../utils/tableTennisUtils";
import { ScoreObject } from "../interface/tableTennisInterface";
import ColorToggleBtn from "./common/ColorToggleBtn";
import superjson from 'superjson';
import toast from "react-hot-toast";
import OverallTimer from "./OverallTimer";
import { useNavigate } from "react-router-dom";

const playersScoreDefaultValue = {
    leftPlayerScore: 0,
    leftPlayerMatchScore: 0,

    rightPlayerScore: 0,
    rightPlayerMatchScore: 0,

    whoServeFirst: "left" as "left" | "right"
}

interface BigScoreBoardProps {
    showTitle?: boolean,
    uid?: string
    showsColorTheme?: boolean
}

function BigScoreBoard({ showTitle = true, uid = "", showsColorTheme = true }:BigScoreBoardProps) {

    const {
        seconds,
        minutes,
        start,
        isRunning,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });

    const navigate = useNavigate();

    // embla API useState
    const [emblaLeftScore, setEmblaLeftScore] = useState<EmblaCarouselType | null>(null);
    const [emblaRightScore, setEmblaRightScore] = useState<EmblaCarouselType | null>(null);

    const [emblaLeftMatchScore, setEmblaLeftMatchScore] = useState<EmblaCarouselType | null>(null);
    const [emblaRightMatchScore, setEmblaRightMatchScore] = useState<EmblaCarouselType | null>(null);

    // General score
    const [playersScore, setPlayersScore] = useLocalStorage<ScoreObject>({
        key: uid === "" ? 'players-score-scheme' : 'players-score-scheme-' + uid,
        defaultValue: playersScoreDefaultValue,
        serialize: superjson.stringify,
        getInitialValueInEffect: false,
        deserialize: (str) => (str === undefined ? playersScoreDefaultValue : superjson.parse(str)),
    });

    const [isCurrentFirstPlayerServe, setIsCurrentFirstPlayerServe] = useState<boolean>(true);

    function changeScore(score: number, player: keyof ScoreObject) {
        setPlayersScore(v => {
            const newPlayer: ScoreObject = {
                ...v,
            }

            if (player !== "whoServeFirst") {
                newPlayer[player] = score;
            }

            return newPlayer
        });
    }

    function determineWhoServeWithScore(playersScore: ScoreObject) {
        const whoServe = determineWhoServe(playersScore);
        setIsCurrentFirstPlayerServe(whoServe === "left");
    }

    function initScoreScreen(newLeftScore: number, newRightScore: number) {
        emblaLeftScore?.scrollTo(newLeftScore, false)
        emblaRightScore?.scrollTo(newRightScore, false)
    }

    function initMatchScoreScreen(newLeftMatchScore: number, newRightMatchScore: number) {
        emblaLeftMatchScore?.scrollTo(newLeftMatchScore, false);
        emblaRightMatchScore?.scrollTo(newRightMatchScore, false);
    }

    function resetMatchScore() {
        setPlayersScore(v => ({
            ...v,
            leftPlayerMatchScore: 0,
            rightPlayerMatchScore: 0,
        }));

        initMatchScoreScreen(0, 0)
        toast.success('Match score resetted');
    }

    function resetGameScore() {
        setPlayersScore(v => ({
            ...v,
            leftPlayerScore: 0,
            rightPlayerScore: 0,
        }));

        toast.success('Game score resetted');
        initScoreScreen(0, 0);
    }

    function resetAllScore() {
        setPlayersScore(v => ({
            ...v,
            leftPlayerScore: 0,
            rightPlayerScore: 0,
            leftPlayerMatchScore: 0,
            rightPlayerMatchScore: 0,
            whoServeFirst: "left"
        }));

        toast.success('All score has been resetted');
        initScoreScreen(0, 0)
        initMatchScoreScreen(0, 0);
    }

    function nextMatctStart() {
        const whoWin = determineWhoWin(playersScore!["leftPlayerScore"], playersScore!["rightPlayerScore"]);

        // swap match score
        const newLeftMatchScore = playersScore!["rightPlayerMatchScore"] + (whoWin === "Right Won >" ? 1 : 0);
        const newRightMatchScore = playersScore!["leftPlayerMatchScore"] + (whoWin === "< Left Won" ? 1 : 0);

        setPlayersScore(v => ({
            ...v,
            leftPlayerScore: 0,
            rightPlayerScore: 0,
            leftPlayerMatchScore: newLeftMatchScore,
            rightPlayerMatchScore: newRightMatchScore,
            whoServeFirst: v.whoServeFirst === "right" ? "left" : "right"
        }));

        toast.success('Next match!');
        reset(); // timer reset
        initMatchScoreScreen(newLeftMatchScore, newRightMatchScore);
        initScoreScreen(0, 0);
    }

    function swapMatchScore() {
        const newLeftMatchScore = playersScore!["rightPlayerMatchScore"]
        const newRightMatchScore = playersScore!["leftPlayerMatchScore"]

        setPlayersScore(v => ({
            ...v,
            leftPlayerMatchScore: newLeftMatchScore,
            rightPlayerMatchScore: newRightMatchScore,
            // whoServeFirst: v.whoServeFirst === "right" ? "left" : "right"
        }));

        toast.success('Match score swapped!');
        initMatchScoreScreen(newLeftMatchScore, newRightMatchScore)
    }

    function swapGameScore() {
        const newLeftScore = playersScore!["rightPlayerScore"]
        const newRightScore = playersScore!["leftPlayerScore"]

        setPlayersScore(v => ({
            ...v,
            leftPlayerScore: newLeftScore,
            rightPlayerScore: newRightScore,
            // whoServeFirst: v.whoServeFirst === "right" ? "left" : "right"
        }));

        toast.success('Game score swapped!');
        initScoreScreen(newLeftScore, newRightScore);
    }

    useEffect(() => {
        determineWhoServeWithScore(playersScore!);

        const whoWon = determineWhoWin(
            playersScore!["leftPlayerScore"],
            playersScore!["rightPlayerScore"]
        )

        if (whoWon !== "") {
            pause()
        }
        else if (whoWon === "" && !isRunning) {
            start()
        }

    }, [playersScore]);

    return (
        <>
            <Container fluid>

                <Group justify="space-between" mt={12}>

                    <OverallTimer />

                    <Group>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Tooltip label="Menu">
                            <ActionIcon variant="light" aria-label="Menu" >
                                <IconCategory style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                            </Tooltip>
                        </Menu.Target>

                        <Menu.Dropdown>

                            <Menu.Label>
                                Reset
                            </Menu.Label>

                            <Menu.Item 
                                leftSection={<IconZoomReset style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => resetGameScore()}
                            >
                                Reset Game Score
                            </Menu.Item>

                            <Menu.Item 
                                leftSection={<IconRepeat style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => resetMatchScore()}
                            >
                                Reset Match Score
                            </Menu.Item>

                            <Menu.Item 
                                leftSection={<IconServerCog style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => resetAllScore()}
                            >
                                Reset All Score
                            </Menu.Item>

                            <Menu.Label>
                                Swap
                            </Menu.Label>

                            <Menu.Item 
                                leftSection={<IconArrowsExchange style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => swapMatchScore()}
                            >
                                Swap Match Score
                            </Menu.Item>

                            <Menu.Item 
                                leftSection={<IconArrowsExchange2 style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => swapGameScore()}
                            >
                                Swap Game Score
                            </Menu.Item>

                            <Menu.Label>
                                Timer
                            </Menu.Label>

                            <Menu.Item 
                                leftSection={<IconPlayerPlayFilled style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => {
                                    toast.success("Timer Started")
                                    start()
                                }}
                            >
                                Start Timer
                            </Menu.Item>

                            <Menu.Item 
                                leftSection={<IconPlayerPauseFilled style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => {
                                    toast.success("Timer Stopped")
                                    pause()
                                }}
                            >
                                Pause Timer
                            </Menu.Item>

                            <Menu.Item 
                                leftSection={<IconRepeat style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => {
                                    toast.success("Timer Resetted")
                                    reset()
                                }}
                            >
                                Reset Timer
                            </Menu.Item>

                            <Menu.Label>
                                Mode
                            </Menu.Label>

                            <Menu.Item 
                                leftSection={<IconRepeat style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => {
                                    navigate("/multi")
                                }}
                            >
                                To Multi Mode
                            </Menu.Item>

                            <Menu.Item 
                                leftSection={<IconRepeat style={{ width: rem(14), height: rem(14) }} />}
                                onClick={() => {
                                    navigate("/")
                                }}
                            >
                                To Basic Mode
                            </Menu.Item>


    
                        </Menu.Dropdown>
                    </Menu>

                    { showsColorTheme &&  <ColorToggleBtn /> }
                   
                    </Group>

                </Group>

                { showTitle && (
                    <>
                    <Text ta="center" fz={48} fw={300} mt={6}>
                        TT Score Board
                    </Text>
                    <Text ta="center" fz={14} fw={300} c="dimmed" mt={-8}>
                        Modern table Tennis Score Board for you
                    </Text>  
                    </>
                )}


                <Group justify="center" mt={16}>
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
                </Group>

                <Radio.Group
                    mt={16}
                    value={playersScore!.whoServeFirst}
                    onChange={(v: string) => !!playersScore && setPlayersScore({
                        ...playersScore,
                        whoServeFirst: v as "left" | "right"
                    })}
                    withAsterisk
                >
                    <Group justify="space-between">
                        <Radio value="left" label={<><IconPingPong size={18} /> First Serve </>} />
                        <Radio value="right" label={<><IconPingPong size={18} /> First Serve </>} />
                    </Group>
                </Radio.Group>

                <Grid mt={16}>
                    <Grid.Col span={{ base: 6, md: 5, lg: 5 }} order={{ base: 2, md: 1, lg: 1 }}>
                        <ScoreDrag
                            initialSlide={playersScore!.leftPlayerScore}
                            changeScore={changeScore}
                            player={"leftPlayerScore"}
                            setEmbla={setEmblaLeftScore}
                        />
                        {isCurrentFirstPlayerServe
                            && (
                                <Badge color="blue" size="lg" mt={6}>
                                    <IconBounceLeft size={12} /> Serve
                                </Badge>
                            )
                        }
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 2, lg: 2 }} order={{ base: 1, md: 2, lg: 2 }}>
                        <Grid>

                            {/* <Grid.Col span={{ base: 3, md: 0, lg: 0 }}>
                        </Grid.Col> */}

                            <Grid.Col span={{ base: 3, md: 6, lg: 6 }} offset={{ base: 3, md: 0, lg: 0 }}>
                                <ScoreDrag
                                    initialSlide={playersScore!.leftPlayerMatchScore}
                                    player={"leftPlayerMatchScore"}
                                    changeScore={changeScore}
                                    height={230}
                                    fontSize={4}
                                    setEmbla={setEmblaLeftMatchScore}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 3, md: 6, lg: 6 }}>
                                <ScoreDrag
                                    initialSlide={playersScore!.rightPlayerMatchScore}
                                    player={"rightPlayerMatchScore"}
                                    changeScore={changeScore}
                                    height={230}
                                    fontSize={4}
                                    setEmbla={setEmblaRightMatchScore}
                                />
                            </Grid.Col>

                            {/* <Grid.Col span={{ base: 3, md: 0, lg: 0 }}>
                        </Grid.Col> */}

                        </Grid>

                        {
                            playersScore!["leftPlayerScore"] >= 10
                            && playersScore!["rightPlayerScore"] >= 10
                            && (<Text ta="center" fz={32} fw={300}> <IconSwords /> Deuce </Text>)
                        }

                        <Text ta="center" fz={22} c="dimmed" mt={2}>
                            {minutes >= 10 ? minutes : "0" + minutes}:{seconds >= 10 ? seconds : "0" + seconds}
                        </Text>

                        <Text ta="center" fz={32}>
                            {determineWhoWin(playersScore!["leftPlayerScore"], playersScore!["rightPlayerScore"])}
                        </Text>

                    </Grid.Col>

                    <Grid.Col span={{ base: 6, md: 5, lg: 5 }} order={{ base: 3, md: 3, lg: 3 }}>
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
                                        <IconBounceRight size={12} /> Serve
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
