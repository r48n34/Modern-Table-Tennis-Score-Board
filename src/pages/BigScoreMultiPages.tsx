import { Grid } from "@mantine/core";
import BigScoreBoard from "../components/BigScoreBoard";

function BigScoreMultiPages() {
    return (
        <>
            <Grid>

                <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                    <BigScoreBoard showTitle={false} showsColorTheme={false} uid="aa" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                    <BigScoreBoard showTitle={false} showsColorTheme={false} uid="bb"/>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                    <BigScoreBoard showTitle={false} showsColorTheme={false} uid="cc"/>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
                    <BigScoreBoard showTitle={false} showsColorTheme={false} uid="dd"/>
                </Grid.Col>

            </Grid>
        </>
    )
}

export default BigScoreMultiPages
