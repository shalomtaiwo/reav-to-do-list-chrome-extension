import { Group, Text, Accordion, ActionIcon, Box, ColorSwatch, Flex } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import AddModal from '../Todo/AddModal';
import OptionMenu from './Options';

function AccordionLabel({ label, color }) {
    return (
        <Group noWrap>
            <ColorSwatch color={color} />
            <div>
                <Text>{label}</Text>
            </div>
        </Group>
    );
}

function AccordionControl({ children, id }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {children}
            <Flex>
                <AddModal id={id} />
                <OptionMenu>
                    <ActionIcon size="lg">
                        <IconDots size={16} />
                    </ActionIcon>
                </OptionMenu>
            </Flex>
        </Box>
    );
}

export default function Category({ _id, id, category, children, color }) {
    return (
        <Accordion.Item value={id}>
            <AccordionControl id={_id}>
                <Accordion.Control>
                    <AccordionLabel label={category} color={color}></AccordionLabel>
                </Accordion.Control>
            </AccordionControl>
            <Accordion.Panel>
                {children}
            </Accordion.Panel>
        </Accordion.Item>
    )
}