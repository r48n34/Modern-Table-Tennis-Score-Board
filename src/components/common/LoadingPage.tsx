import { Box, Group, Loader, Text } from "@mantine/core"
import { useTranslation } from "react-i18next";

function LoadingPage() {
    const { t } = useTranslation();
    
    return (
        <>
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Box>
                <Group justify="center">
                    <Loader color="indigo" type="dots" />
                </Group>
                
                <Text ta="center" mt={18} c="dimmed" fz={14} fw={400}>
                    {t('loading')}
                </Text>
                </Box>
            </Box>
        </>
    )
}

export default LoadingPage
