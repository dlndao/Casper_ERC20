import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { Header } from 'components/Header';
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
          // isAdmin && !user?.isAdmin ? (
          //   <Redirect to='/CasperAssets' />
          // ) : (
          <>
            {/* <Container fluid>
              <Row>
                <Col className='px-0'>
                  <Header />
                </Col>
              </Row>
            </Container> */}
            <main className='dash-page-content py-5'>
              <Container fluid className='px-5'>
                <Component {...props} />
              </Container>
            </main>
          </>
        ) : (
          // )
          <Redirect to='/login' />
        )
      }
    />
  );
}
