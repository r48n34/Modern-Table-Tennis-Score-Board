import { Card, Container, Grid, Space } from "@mantine/core";
import BigScoreBoard from "../components/BigScoreBoard";
import { Helmet } from "react-helmet-async";

function BigScoreMultiPages() {
    return (
        <>
            <Helmet>
                <title>Multi Score Board | Modern Table Tennis Score Board</title>
            </Helmet>

            <Space h="lg" />

            <Container fluid>
                <Grid>
                    {["aa", "bb", "cc", "dd"].map(v => (
                        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <BigScoreBoard
                                    showTitle={false}
                                    showsColorTheme={false}
                                    showRoadmap={false}
                                    uid={v}
                                />
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default BigScoreMultiPages
