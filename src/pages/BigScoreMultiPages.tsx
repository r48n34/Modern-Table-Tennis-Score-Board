import { Grid } from "@mantine/core";
import BigScoreBoard from "../components/BigScoreBoard";
import { Helmet } from "react-helmet-async";

function BigScoreMultiPages() {
    return (
        <>
            <Helmet>
                <title>Multi Score Board | Modern Table Tennis Score Board</title>
            </Helmet>

            <Grid>

                <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                    <BigScoreBoard showTitle={false} showsColorTheme={false} uid="aa" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                    <BigScoreBoard showTitle={false} showsColorTheme={false} uid="bb" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                    <BigScoreBoard showTitle={false} showsColorTheme={false} uid="cc" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                    <BigScoreBoard showTitle={false} showsColorTheme={false} uid="dd" />
                </Grid.Col>

            </Grid>
        </>
    )
}

export default BigScoreMultiPages
