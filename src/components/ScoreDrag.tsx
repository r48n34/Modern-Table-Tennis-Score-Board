import { Carousel } from '@mantine/carousel';
import { Box, Card, Text, Stack } from '@mantine/core';
import { EmblaCarouselType } from 'embla-carousel-react';
import { useEffect, useMemo } from 'react';
// import { useEffect, useState } from 'react';

type ScoreDragProps = {
    changeScore?: Function;
    height?: number;
    initialSlide: number;
    player: string;
    setEmbla?: (embla: EmblaCarouselType) => void;
}

function ScoreDrag({ changeScore, player = "", height = 350, initialSlide = 0, setEmbla }: ScoreDragProps){

    const initialSlideScore = useMemo(() => initialSlide, []);

    function changeSlice(e: number){
        !!changeScore && changeScore(e, player)
    }

    return (
        <Box w={"100%"} p={4}>
        <Carousel
            initialSlide={initialSlideScore}
            slideGap="md"
            getEmblaApi={!!setEmbla ? setEmbla : () => {}}
            orientation="vertical"
            height={height}
            withControls={false}
            onSlideChange={ (e:number) => changeSlice(e) }
        >
            {[...Array(30)].map((_,i) => i).map( v => (
                <Carousel.Slide key={v}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%", width: "100%" }}>
                    <Stack align="center" justify='center' h={"100%"}>
                    <Text fz={"12vh"}>
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
