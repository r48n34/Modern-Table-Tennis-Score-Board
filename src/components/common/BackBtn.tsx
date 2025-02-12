import { ActionIcon, Tooltip } from '@mantine/core'
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from '@tabler/icons-react'

function BackBtn() {

    const navigate = useNavigate();
    // const goBack = () => navigate(-1);

    return (
        <Tooltip label="Back">
        <ActionIcon variant="subtle" aria-label="Back" onClick={() => navigate(-1)}>
            <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
        </Tooltip>
    )
}

export default BackBtn
