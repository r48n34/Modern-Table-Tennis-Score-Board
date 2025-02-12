import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { roadMapNodes, roadMapEdges } from './roadmapNodes';

function RoadMapComp() {
    return (
        <>
            <div style={{ width: '100vw', height: '100vh', backgroundColor: "white", color: "black" }}>
                <ReactFlow nodes={roadMapNodes} edges={roadMapEdges}>
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </>
    )
}

export default RoadMapComp
