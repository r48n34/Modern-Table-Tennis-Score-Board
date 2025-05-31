import { Carousel } from '@mantine/carousel';
import { Box, Card, Text, Stack } from '@mantine/core';
import { EmblaCarouselType } from 'embla-carousel';
import { useMemo } from 'react';

type ScoreDragProps = {
    changeScore?: Function;
    maxScore?: number
    height?: number;
    initialSlide: number;
    fontSize?: number;
    player: string;
    setEmbla?: (embla: EmblaCarouselType) => void;
}

function ScoreDrag({ changeScore, player = "", maxScore = 50, height = 350, initialSlide = 0, fontSize = 9, setEmbla }: ScoreDragProps) {

    const initialSlideScore = useMemo(() => initialSlide, []);

    function changeSlice(e: number) {
        !!changeScore && changeScore(e, player)
    }

    return (
        <Box w={"100%"} p={4}>
            <Carousel
                emblaOptions={{ align: 'end' }}
                initialSlide={initialSlideScore}
                slideGap="md"
                getEmblaApi={!!setEmbla ? setEmbla : () => { }}
                orientation="vertical"
                height={height}
                withControls={false}
                onSlideChange={(e: number) => changeSlice(e)}
            >
                {[...Array(maxScore)].map((_, i) => i).map(v => (
                    <Carousel.Slide key={v}>
                        <Card shadow="sm" padding="md" radius="md" withBorder style={{ height: "100%", width: "100%" }}>
                            <Stack align="center" justify='center' h={"100%"}>
                                <Text fz={fontSize + "vw"}>
                                    {v}
                                </Text>
                            </Stack>
                        </Card>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Box>
    )
}

export default ScoreDrag
