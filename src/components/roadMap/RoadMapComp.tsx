import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { roadMapEdgesEn, roadMapNodesEn } from './roadmapNodesEn';
import { roadMapEdgesCh, roadMapNodesCh } from './roadmapNodesCh';

interface RoadMapCompProps {
    lang: "en" | "ch"
}

function RoadMapComp({ lang = "en" }: RoadMapCompProps) {
    return (
        <>
            <div style={{ width: '100vw', height: '100vh', backgroundColor: "white", color: "black" }}>
                <ReactFlow
                    nodes={lang == "en" ? roadMapNodesEn : roadMapNodesCh}
                    edges={lang == "en" ? roadMapEdgesEn : roadMapEdgesCh}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </>
    )
}

export default RoadMapComp
