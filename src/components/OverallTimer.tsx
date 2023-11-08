import { ActionIcon, Box , Group, Popover, Text, Tooltip } from "@mantine/core";
import { IconClock, IconPlayerPauseFilled, IconPlayerPlayFilled, IconRepeat } from "@tabler/icons-react";
import { useStopwatch } from "react-timer-hook";

function OverallTimer() {

    const {
        seconds,
        minutes,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    return (
        <>
            <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <Tooltip label="General Timer">
                    <ActionIcon variant="light" aria-label="Menu" >
                        <IconClock style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    </Tooltip>
                </Popover.Target>

                <Popover.Dropdown>
                    <Box>
                    <Text ta="center" fz={24}>
                        {minutes >= 10 ? minutes : "0" + minutes}:{seconds >= 10 ? seconds : "0" + seconds}
                    </Text>

                    <Group justify="center" mt={8}>

                        <Tooltip label="Start timer">
                        <ActionIcon variant="light" aria-label="Start timer" onClick={() => start()}>
                            <IconPlayerPlayFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Pause timer">
                        <ActionIcon variant="light" aria-label="Pause timer" onClick={() => pause()}>
                            <IconPlayerPauseFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Reset timer">
                        <ActionIcon 
                            variant="light" aria-label="Reset timer" 
                            onClick={() => {
                                reset();
                                pause();
                            }}
                        >
                            <IconRepeat style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        </Tooltip>
                        
                    </Group>


                    </Box>
                </Popover.Dropdown>
            </Popover>
        </>
    )
}

export default OverallTimer
