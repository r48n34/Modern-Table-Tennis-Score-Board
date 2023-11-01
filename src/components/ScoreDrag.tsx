import { Carousel } from '@mantine/carousel';
import { Box, Card, Text, Stack } from '@mantine/core';
import { EmblaCarouselType } from 'embla-carousel-react';

type ScoreDragProps = {
    changeScore?: Function;
    height?: number;
    player: string;
    setEmbla?: (embla: EmblaCarouselType) => void;
}

function ScoreDrag({ changeScore, player = "", height = 350, setEmbla }: ScoreDragProps){

    return (
        <Box w={"100%"} p={4}>
        <Carousel
            slideGap="md"
            getEmblaApi={!!setEmbla ? setEmbla : () => {}}
            orientation="vertical"
            height={height}
            withControls={false}
            onSlideChange={ (e) => !!changeScore && changeScore(e, player) }
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
