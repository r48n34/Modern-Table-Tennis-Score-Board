import { Text, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';

function ErrorComp(){
    const { t } = useTranslation();
    
    return (
        <>
        <Box style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center"}}>
            <Box>
            <Text fw={700} ta={"center"}>
                {t('error.title')}
            </Text>
            <Text ta={"center"} size="sm" c="dimmed">
                {t('error.refresh')}
            </Text>
            </Box>
        </Box>
        </>
    )
}
    
export default ErrorComp
