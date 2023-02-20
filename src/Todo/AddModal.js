import { IconTextPlus } from '@tabler/icons-react'
import React from 'react'
import { useForm, isNotEmpty } from '@mantine/form';
import { v4 as uuidv4 } from 'uuid';
import { Button, ActionIcon, Modal, useMantineTheme, TextInput, Stack, Textarea } from '@mantine/core';
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { db } from '../Firebase-config';


const AddModal = ({ id }) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const todo = useForm({
        initialValues: {
            task: '',
            title: ''
        },

        validate: {
            task: isNotEmpty(''),
            title: isNotEmpty(''),
        },
    });

    const handleAdd = async (item, title) => {
        setLoading(true)
        try {
            await addDoc(collection(db, "Category", id , 'todos'), {
                task: item,
                _id: uuidv4(),
                title: title,
                created: serverTimestamp()
            }).then(() => {
                setTimeout(() => {
                    setLoading(false)
                    todo.values.task = '';
                    todo.values.title = '';
                    setOpened(false);
                }, 1500);
            }).catch((err) => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <ActionIcon size="lg" onClick={() => setOpened((o) => !o)}>
                <IconTextPlus size={16} />
            </ActionIcon>

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
                <form onSubmit={
                    todo.onSubmit((values) =>
                        handleAdd(values.task, values.title)
                    )}>
                    <Stack>
                        <TextInput style={{
                            width: '100%'
                        }}
                            placeholder="My new task title"
                            {...todo.getInputProps('title')}
                        />
                        <Textarea
                            style={{
                                width: '100%'
                            }}
                            placeholder="My task content"
                            {...todo.getInputProps('task')}
                        />
                        <Button
                            style={{
                                width: '20%'
                            }}
                            type="submit"
                            loading={loading}
                        >Add</Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}

export default AddModal;