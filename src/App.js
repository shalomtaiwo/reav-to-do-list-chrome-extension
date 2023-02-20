import React from 'react';
import { ItemModal } from './Category/CategoryModal';
import { Accordion,  Button, Center, Flex, Header, Loader, LoadingOverlay, Stack, Text, useMantineTheme } from '@mantine/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IconLogout, IconPlus } from '@tabler/icons-react';
import { auth, db } from './Firebase-config';
import { signOut } from "firebase/auth";
import './App.css';
import Auth from './Auth';
import Add from './Category/Add';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"

export function App() {
  const theme = useMantineTheme();
  const [user, loading] = useAuthState(auth);
  const [category, setCategory] = React.useState([])



  React.useEffect(() => {
    try {
      onSnapshot(
        query(collection(db, 'Category'), orderBy('created', "desc"), where("userId", "==", user?.uid)),
        querySnapshot => {
          const categories = querySnapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data(),
          }));
          setCategory(categories)
        }
      );
    } catch (error) {

    }
  }, [user?.uid])

  const items = category?.map((item, index) => (
    <ItemModal key={index} item={item} _id={item._id} user={user} />
  ));


  const logout = () => {
    signOut(auth).then(() => {
      console.log('SignOut successful')
    }).catch((error) => {
      console.log(error.code)
    });
  }

  if (loading && !user) {
    return <div className='App'>
      <LoadingOverlay
        visible={true}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3} />
    </div>
  }
  if (user) {
    return (
      <div className='App'>
        <Header height={50} p="xs" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#e8f2ff'
        }}>
          <Text>
            Hi, {user?.displayName}
          </Text>
          <Flex>
            <Add user={user} compact={true}>
              <IconPlus />
            </Add>
            <Button variant="subtle" compact onClick={logout}>
              <IconLogout />
            </Button>
          </Flex>
        </Header>
        <div className='main'>
          {
            category && category.length < 1 ?
              <Stack>
                <Center>
                  <Add user={user} compact={false}>
                    <Text>
                      Add a Category
                    </Text>
                  </Add>
                </Center>
                <Center>
                  <Loader />
                </Center>
              </Stack>
              :
              <Accordion
                sx={{ width: '100%' }}
                transitionDuration={1000}
                chevronPosition="left"
              >
                {items}
              </Accordion>
          }
        </div>
      </div>
    );
  }
  if (!loading && !user) {
    return (
      <div className='App'>
        <Center>
          <Auth />
        </Center>
      </div>
    );
  }
}