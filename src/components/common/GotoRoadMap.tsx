import { Tooltip, ActionIcon } from "@mantine/core";
import { IconMap } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function GotoRoadMap() {

    const navigate = useNavigate();

    return (
        <>
            <Tooltip label="TT Road Map">
                <ActionIcon variant="light" aria-label="TT Road Map" onClick={() => navigate("/roadmap")}>
                    <IconMap style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Tooltip>
        </>
    )
}

export default GotoRoadMap
