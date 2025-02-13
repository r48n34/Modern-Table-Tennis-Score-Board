import { Tooltip, ActionIcon, Group } from "@mantine/core";
import { IconMap } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

function GotoRoadMap() {

    const navigate = useNavigate();

    return (
        <Group>
            <Tooltip label="TT Road Map (Eng)">
                <ActionIcon variant="light" aria-label="TT Road Map" onClick={() => navigate("/roadmap/en")}>
                    <IconMap style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Tooltip>

            <Tooltip label="TT Road Map (中文)">
                <ActionIcon variant="light" aria-label="TT Road Map" onClick={() => navigate("/roadmap/ch")}>
                    <IconMap style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Tooltip>
        </Group>
    )
}

export default GotoRoadMap
