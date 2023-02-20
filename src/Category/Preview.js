import React from 'react'
import { createStyles, Modal, Text, ActionIcon, useMantineTheme, Flex } from '@mantine/core';
import { IconEye, IconCopy, IconCheck } from '@tabler/icons-react';
import { useClipboard } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
    item: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: theme.radius.md,
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
        padding: `5px ${theme.spacing.xl}px`,
        paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
        marginBottom: theme.spacing.sm,
    },
}));

const Preview = ({ task, mytask }) => {
    const clipboard = useClipboard({ timeout: 1000 });
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const [opened, setOpened] = React.useState(false);

    return (
        <div
            className={classes.item}
        >
            <div>
                <p>
                    {task}
                </p>
            </div>
            <Flex>
                <ActionIcon onClick={() => setOpened((o) => !o)}>
                    <IconEye size={18} />
                </ActionIcon>
                <ActionIcon onClick={() => clipboard.copy(mytask?.task)}>
                    {clipboard.copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                </ActionIcon>
            </Flex>
            <Modal
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}
                withCloseButton={false}
                opened={opened}
                onClose={() => setOpened(false)}
                shadow="xl"
                p={30}
                radius="sm">
                <Text>
                    {mytask?.title}
                </Text>
                <Text>
                    {mytask?.task}
                </Text>
            </Modal>
        </div>
    )
}

export default Preview