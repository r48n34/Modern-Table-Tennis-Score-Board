import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { roadMapEdgesEn, roadMapNodesEn } from './roadmapNodesEn';
import { roadMapEdgesCh, roadMapNodesCh } from './roadmapNodesCh';
import BackBtn from '../common/BackBtn';
import { Card, Container, Box, Group, Text } from '@mantine/core';

interface RoadMapCompProps {
    lang: "en" | "ch"
}

function RoadMapComp({ lang = "en" }: RoadMapCompProps) {
    return (
        <Container fluid>

            <Group mt={20} mb={6}>
                <BackBtn />
            </Group>

            <Text ta="center" fz="xl" fw={300}>
                Table Tennis Training Roadmap
            </Text>
            <Text ta="center" mb={12} fz="sm" fw={300} c="dimmed">
                Updated at: 12/02/2025
            </Text>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Box style={{ width: '100%', height: '78vh', backgroundColor: "white", color: "black" }}>
                    <ReactFlow
                        nodes={lang == "en" ? roadMapNodesEn : roadMapNodesCh}
                        edges={lang == "en" ? roadMapEdgesEn : roadMapEdgesCh}
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </Box>
            </Card>
        </Container>
    )
}

export default RoadMapComp
