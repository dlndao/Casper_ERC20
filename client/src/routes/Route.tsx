import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { useUserState } from 'contexts/UserAuthContext';

export default function RouteWrapper({
  component: Component,
  isAdmin,
  ...rest
}: any) {
  const { user, isLoading }: any = useUserState();
  console.log(user);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoading ? (
          <h1>Loading</h1>
        ) : user ? (
          <>
            <main className='dash-page-content py-5'>
              <Container fluid className='px-5'>
                <Component {...props} />
              </Container>
            </main>
          </>
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
}
