import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Divider,
    Anchor,
    Stack,
    Image,
    Button,
} from '@mantine/core';
import { handleSignIn } from './auth/useLogin';
import { useState } from 'react';
import { handleSignUp } from './auth/useSignUp';
import { updateProfile } from 'firebase/auth';
import logo from './Assets/Reavtodo.png';
import { auth } from './Firebase-config';

export default function AuthenticationForm(props) {
    const [type, toggle] = useToggle(['login', 'register']);
    const [loading, setIsLoading] = useState(false);

    const handleAuth = async (email, password, username) => {
        switch (type) {
            case 'login':
                setIsLoading(true);
                handleSignIn(email, password)
                    .then(res => {
                        console.log(res);
                        // toast({
                        //     title: 'Logged in Successfully!',
                        //     status: 'success',
                        //     isClosable: true,
                        //     position: 'top',
                        // });
                        setIsLoading(false);
                    })
                    .catch(err => {
                        // toast({
                        //     title: err.code,
                        //     status: 'error',
                        //     isClosable: true,
                        //     position: 'top',
                        // });
                        setIsLoading(false);
                    });
                break;
            case 'register':
                setIsLoading(true);
                await handleSignUp(email, password)
                    .then(() => {
                        updateProfile(auth.currentUser, {
                            displayName: username,
                        }).then(() => {
                            // toast({
                            //     title: 'Account created Successfully!',
                            //     status: 'success',
                            //     isClosable: true,
                            //     position: 'top',
                            // });
                            setIsLoading(false);
                        })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        // toast({
                        //     title: error.code,
                        //     status: 'error',
                        //     isClosable: true,
                        //     position: 'top',
                        // });
                        setIsLoading(false);
                    });
                break;
            default:
                break;
        }
    };
    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
            terms: true,
        },

        validate: {
            email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: val =>
                val.length <= 6
                    ? 'Password should include at least 6 characters'
                    : null,
        },
    });

    return (
        <Paper radius="md" p="xl" {...props}>
            <div style={{ width: 40, marginLeft: 'auto', marginRight: 'auto' }}>
                <Image radius="md" src={logo} alt="Reav to do Logo" />
            </div>

            <Divider label={upperFirst(type)} labelPosition="center" my="lg" />

            <form
                onSubmit={form.onSubmit(() => {
                    handleAuth(
                        form.values.email,
                        form.values.password,
                        form.values.username
                    );
                })}
            >
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            required
                            label="Username"
                            placeholder="Your username"
                            value={form.values.username}
                            onChange={event =>
                                form.setFieldValue('username', event.currentTarget.value)
                            }
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@reavhub.com"
                        value={form.values.email}
                        onChange={event =>
                            form.setFieldValue('email', event.currentTarget.value)
                        }
                        error={form.errors.email && 'Invalid email'}
                    />

                    <div>
                        <Group position="apart" mb={5}>
                            <Text
                                component="label"
                                htmlFor="your-password"
                                size="sm"
                                weight={500}
                            >
                                Password *
                            </Text>

                            {type === 'login' && (
                                <Anchor
                                    component="button"
                                    type="button"
                                    onClick={() => props.toggle()}
                                    size="xs"
                                    sx={theme => ({
                                        paddingTop: 2,
                                        color: 'var(--chakra-colors-purple-400) !important',
                                        fontWeight: 500,
                                        fontSize: theme.fontSizes.xs,
                                    })}
                                >
                                    Forgot your password?
                                </Anchor>
                            )}
                        </Group>
                        <PasswordInput
                            required
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={event =>
                                form.setFieldValue('password', event.currentTarget.value)
                            }
                            error={
                                form.errors.password &&
                                'Password should include at least 6 characters'
                            }
                        />
                    </div>

                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        sx={{
                            color: 'var(--chakra-colors-purple-400) !important',
                        }}
                        onClick={() => toggle()}
                        size="xs"
                    >
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button
                        loading={loading}
                        type="submit"
                        color={'blue'}
                    >
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}
