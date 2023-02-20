import React from 'react'
import { useForm, isNotEmpty } from '@mantine/form';
import { v4 as uuidv4 } from 'uuid';
import { Button, Flex, Modal, useMantineTheme, TextInput, ColorInput } from '@mantine/core';
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { db } from '../Firebase-config';


const Add = ({ user, children, compact }) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const category = useForm({
        initialValues: {
            category: '',
            color: ''
        },

        validate: {
            category: isNotEmpty(''),
            color: isNotEmpty(''),
        },
    });

    const handleAdd = async (item, color) => {
        setLoading(true)
        try {
            await addDoc(collection(db, "Category"), {
                category: item,
                id: uuidv4(),
                color: color,
                userId: user?.uid,
                created: serverTimestamp()
            }).then(() => {
                setTimeout(() => {
                    setLoading(false)
                    category.values.category = '';
                    category.values.color = '';
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
            <Button
                variant="subtle"
                compact={compact}
                onClick={() => setOpened((o) => !o)}>
                {children}
            </Button>

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
                    category.onSubmit((values) =>
                        handleAdd(values.category, values.color)
                    )}>
                    <TextInput style={{
                        width: '100%'
                    }}
                        placeholder="Add a new category"
                        {...category.getInputProps('category')}
                    />
                    <Flex
                        miw={'100%'}
                        mih={50}
                        gap="md"
                        align="center"
                        direction="row"
                    >
                        <ColorInput
                            style={{
                                width: '80%'
                            }}
                            placeholder="Category color"
                            swatchesPerRow={7}
                            format="hex"
                            swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                            {...category.getInputProps('color')}
                        />
                        <Button
                            style={{
                                width: '20%'
                            }}
                            type="submit"
                            loading={loading}
                        >Add</Button>
                    </Flex>
                </form>
            </Modal>
        </>
    )
}

export default Add