import React from 'react';
import AuthenticationForm from './Authentication';
import { useToggle } from '@mantine/hooks';
import ForgotPassword from './ForgotPassword';

const Auth = () => {
  const [type, toggle] = useToggle(['auth', 'reset']);

  return (
    <>

      {type === 'auth' && <AuthenticationForm toggle={toggle} />}
      {type === 'reset' && <ForgotPassword toggle={toggle} />}
    </>
  );
};

export default Auth;
