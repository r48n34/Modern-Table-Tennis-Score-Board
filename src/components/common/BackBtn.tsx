import { ActionIcon, Tooltip } from '@mantine/core'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconArrowLeft } from '@tabler/icons-react'

function BackBtn() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Tooltip label={t('back')}>
        <ActionIcon variant="subtle" aria-label="Back" onClick={() => navigate(-1)}>
            <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
        </Tooltip>
    )
}

export default BackBtn
