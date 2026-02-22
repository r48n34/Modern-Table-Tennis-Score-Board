import { useEffect, useState } from "react";
import { Container, Grid, Text, Badge, Radio, Group, Space, ActionIcon, Tooltip, Menu, rem, Box, TextInput } from "@mantine/core"
import ScoreDrag from "./ScoreDrag"
import { EmblaCarouselType } from "embla-carousel";
import { useLocalStorage } from '@mantine/hooks';
import { useStopwatch } from 'react-timer-hook';
import { useTranslation } from 'react-i18next';

import { IconArrowsExchange, IconArrowsExchange2, IconBounceLeft, IconBounceRight, IconCategory, IconPingPong, IconPlayerPauseFilled, IconPlayerPlayFilled, IconPlayerTrackNextFilled, IconRepeat, IconServerCog, IconShare, IconSwords, IconZoomReset } from "@tabler/icons-react";
import { determineWhoServe, determineWhoWin } from "../utils/tableTennisUtils";
import { ScoreObject } from "../interface/tableTennisInterface";
import ColorToggleBtn from "./common/ColorToggleBtn";
import superjson from 'superjson';
import toast from "react-hot-toast";
// import OverallTimer from "./OverallTimer";
import { useNavigate } from "react-router-dom";
import GotoRoadMap from "./common/GotoRoadMap";

const playersScoreDefaultValue = {
    leftPlayerScore: 0,
    leftPlayerMatchScore: 0,

    rightPlayerScore: 0,
    rightPlayerMatchScore: 0,

    whoServeFirst: "left" as "left" | "right",

    freeText: "",
}

interface BigScoreBoardProps {
    showTitle?: boolean,
    showRoadmap?: boolean,
    uid?: string
    showsColorTheme?: boolean
}

function BigScoreBoard({ showTitle = true, showRoadmap = true, uid = "", showsColorTheme = true }: BigScoreBoardProps) {
    const { t } = useTranslation();

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
        key: uid === "" ? 'players-score2-scheme' : 'players-score2-scheme-' + uid,
        defaultValue: playersScoreDefaultValue,
        serialize: superjson.stringify,
        getInitialValueInEffect: false,
        deserialize: (str) => (str === undefined ? playersScoreDefaultValue : superjson.parse(str)),
    });

    const [isCurrentFirstPlayerServe, setIsCurrentFirstPlayerServe] = useState<boolean>(true);

    function changeText(freeText: string) {
        setPlayersScore(v => {
            const newPlayer: ScoreObject = {
                ...v,
            }

            newPlayer["freeText"] = freeText;

            return newPlayer
        });
    }

    function changeScore(score: number, player: keyof ScoreObject) {
        setPlayersScore(v => {
            const newPlayer: ScoreObject = {
                ...v,
            }

            if (
                player === "leftPlayerScore" ||
                player === "leftPlayerMatchScore" ||
                player === "rightPlayerScore" ||
                player === "rightPlayerMatchScore" 
            ) {
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
        toast.success(t('toast.matchScoreResetted'));
    }

    function resetGameScore() {
        setPlayersScore(v => ({
            ...v,
            leftPlayerScore: 0,
            rightPlayerScore: 0,
        }));

        toast.success(t('toast.gameScoreResetted'));
        initScoreScreen(0, 0);
    }

    function resetAllScore() {
        setPlayersScore({
            leftPlayerScore: 0,
            rightPlayerScore: 0,
            leftPlayerMatchScore: 0,
            rightPlayerMatchScore: 0,
            whoServeFirst: "left",
            freeText: ""
        });

        toast.success(t('toast.allScoreResetted'));
        initScoreScreen(0, 0)
        initMatchScoreScreen(0, 0);
    }

    function nextMatctStart() {
        const whoWin = determineWhoWin(playersScore!["leftPlayerScore"], playersScore!["rightPlayerScore"]);

        // swap match score
        const newLeftMatchScore = playersScore!["rightPlayerMatchScore"] + (whoWin === "Right Win >" ? 1 : 0);
        const newRightMatchScore = playersScore!["leftPlayerMatchScore"] + (whoWin === "< Left Win" ? 1 : 0);

        setPlayersScore(v => ({
            ...v,
            leftPlayerScore: 0,
            rightPlayerScore: 0,
            leftPlayerMatchScore: newLeftMatchScore,
            rightPlayerMatchScore: newRightMatchScore,
            whoServeFirst: v.whoServeFirst === "right" ? "left" : "right"
        }));

        toast.success(t('toast.nextMatch'));
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

        toast.success(t('toast.matchScoreSwapped'));
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

        toast.success(t('toast.gameScoreSwapped'));
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

                    <Box>
                        {showRoadmap && <GotoRoadMap />}
                    </Box>

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
                                    {t('menu.reset')}
                                </Menu.Label>

                                <Menu.Item
                                    leftSection={<IconZoomReset style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => resetGameScore()}
                                >
                                    {t('menu.resetGameScore')}
                                </Menu.Item>

                                <Menu.Item
                                    leftSection={<IconRepeat style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => resetMatchScore()}
                                >
                                    {t('menu.resetMatchScore')}
                                </Menu.Item>

                                <Menu.Item
                                    leftSection={<IconServerCog style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => resetAllScore()}
                                >
                                    {t('menu.resetAllScore')}
                                </Menu.Item>

                                <Menu.Label>
                                    {t('menu.swap')}
                                </Menu.Label>

                                <Menu.Item
                                    leftSection={<IconArrowsExchange style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => swapMatchScore()}
                                >
                                    {t('menu.swapMatchScore')}
                                </Menu.Item>

                                <Menu.Item
                                    leftSection={<IconArrowsExchange2 style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => swapGameScore()}
                                >
                                    {t('menu.swapGameScore')}
                                </Menu.Item>

                                <Menu.Label>
                                    {t('menu.timer')}
                                </Menu.Label>

                                <Menu.Item
                                    leftSection={<IconPlayerPlayFilled style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => {
                                        toast.success(t('toast.timerStarted'))
                                        start()
                                    }}
                                >
                                    {t('menu.startTimer')}
                                </Menu.Item>

                                <Menu.Item
                                    leftSection={<IconPlayerPauseFilled style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => {
                                        toast.success(t('toast.timerStopped'))
                                        pause()
                                    }}
                                >
                                    {t('menu.pauseTimer')}
                                </Menu.Item>

                                <Menu.Item
                                    leftSection={<IconRepeat style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => {
                                        toast.success(t('toast.timerResetted'))
                                        reset()
                                    }}
                                >
                                    {t('menu.resetTimer')}
                                </Menu.Item>

                                <Menu.Label>
                                    {t('menu.mode')}
                                </Menu.Label>

                                <Menu.Item
                                    leftSection={<IconRepeat style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => {
                                        navigate("/multi")
                                    }}
                                >
                                    {t('menu.toMultiMode')}
                                </Menu.Item>

                                <Menu.Item
                                    leftSection={<IconRepeat style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={() => {
                                        navigate("/")
                                    }}
                                >
                                    {t('menu.toBasicMode')}
                                </Menu.Item>


                                <Menu.Label>
                                    {t('menu.others')}
                                </Menu.Label>

                                <Menu.Item
                                    leftSection={<IconShare style={{ width: rem(14), height: rem(14) }} />}
                                    onClick={async () => {
                                        await navigator.share({
                                            title: `TT Match Result ${playersScore.freeText ? "[" + playersScore.freeText + "]" : ""}` +
                                                `(Match: ${playersScore.leftPlayerMatchScore} - ${playersScore.rightPlayerMatchScore}) ` +
                                                `(Score: ${playersScore.leftPlayerScore} - ${playersScore.rightPlayerScore}) `,
                                            text: "*Match Result*\n" +
                                                `${playersScore.leftPlayerMatchScore} - ${playersScore.rightPlayerMatchScore}\n` +
                                                `Curretn Score \n` +
                                                `${playersScore.leftPlayerScore} - ${playersScore.rightPlayerScore}\n`,
                                            url: window.location.href,
                                        });
                                    }}
                                >
                                    {t('menu.shareResult')}
                                </Menu.Item>

                            </Menu.Dropdown>
                        </Menu>
                        {showsColorTheme && <ColorToggleBtn />}
                    </Group>
                </Group>

                {showTitle && (
                    <>
                        <Text ta="center" fz={48} fw={300} mt={6}>
                            {t('app.title')}
                        </Text>
                        <Text ta="center" fz={14} fw={300} c="dimmed" mt={-8}>
                            {t('app.subtitle')}
                        </Text>
                    </>
                )}


                <Group justify="center" mt={16}>
                    <Tooltip label={t('game.startNextMatch')}>
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

                <Group justify="center" mt={12}>
                    <TextInput
                        placeholder={t('game.freeText')}
                        value={playersScore.freeText || ""}
                        onChange={(event) => changeText(event.currentTarget.value)}
                    />
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
                        <Radio value="left" label={<><IconPingPong size={18} /> {t('game.firstServe')} </>} />
                        <Radio value="right" label={<><IconPingPong size={18} /> {t('game.firstServe')} </>} />
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
                                <Badge color="blue" size="lg" mt={2} tt="none">
                                    <IconBounceLeft size={12} /> {t('game.serve')}
                                </Badge>
                            )
                        }
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 2, lg: 2 }} order={{ base: 1, md: 2, lg: 2 }}>
                        <Grid>
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

                        </Grid>

                        {
                            playersScore!["leftPlayerScore"] >= 10
                            && playersScore!["rightPlayerScore"] >= 10
                            && (<Text ta="center" fz={32} fw={300}> <IconSwords /> {t('game.deuce')} </Text>)
                        }

                        <Text ta="center" fz={22} c="dimmed" mt={2}>
                            {minutes >= 10 ? minutes : "0" + minutes}:{seconds >= 10 ? seconds : "0" + seconds}
                        </Text>

                        <Text ta="center" fz={32} fw={400}>
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
                                    <Badge color="blue" size="lg" mt={2} tt="none">
                                        <IconBounceRight size={12} /> {t('game.serve')}
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
