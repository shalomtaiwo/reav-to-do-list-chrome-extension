import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { handleReset } from './auth/useForgotPassword';

const useStyles = createStyles(theme => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export default function ForgotPassword(props) {
  const { classes } = useStyles();
  const [loading, setIsLoading] = useState(false);
  // const toast = useToast();

  const resetPassword = reset => {
    setIsLoading(true);
    handleReset(reset)
      .then(() => {
        // toast({
        //   title: 'Password reset sent!',
        //   status: 'success',
        //   isClosable: true,
        //   position: 'top',
        // });
        setIsLoading(false);
      })
      .catch(err => {
        // toast({
        //   title: err.code,
        //   status: 'error',
        //   isClosable: true,
        //   position: 'top',
        // });
        setIsLoading(false);
      });
  };
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });
  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Forgot your password?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>

      <form
        onSubmit={form.onSubmit(() => {
          resetPassword(form.values.email);
        })}
      >
        <Paper p={30} radius="md" mt="xl">
          <TextInput
            label="Your email"
            placeholder="me@mantine.dev"
            required
            value={form.values.email}
            onChange={event =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5} onClick={() => props.toggle()}>
                  Back to login page
                </Box>
              </Center>
            </Anchor>
            <Button loading={loading} type="submit" color={'blue'}>
              Reset password
            </Button>
          </Group>
        </Paper>
      </form>
    </Container>
  );
}
