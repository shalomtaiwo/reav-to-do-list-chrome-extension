import { Menu, useMantineTheme } from '@mantine/core';
import {
    IconPencil,
    IconTrash
} from '@tabler/icons-react';

export default function OptionMenu({ children }) {
    const theme = useMantineTheme();
    return (
        <Menu transition="pop-top-right" position="top-end" width={120} withinPortal>
            <Menu.Target>
                {children}
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    icon={<IconPencil size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                >
                    Edit
                </Menu.Item>
                <Menu.Item
                    icon={<IconTrash size={16} color={theme.colors.pink[6]} stroke={1.5} />}
                >
                    Delete
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}