import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export default function ColorToggleBtn() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        // <Tooltip label="Toggle Theme">
        <ActionIcon variant="light" aria-label="Settings" onClick={() => toggleColorScheme()}>
            { colorScheme === 'dark'
                ? <IconMoonStars size="1.25rem" stroke={1.5} />
                : <IconSun size="1.25rem" stroke={1.5} />
            }
        </ActionIcon>
        // </Tooltip>
    );
}