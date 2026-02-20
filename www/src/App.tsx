import React from 'react';
import { BrowserRouter } from 'react-router';
import { Container, Flex } from '@radix-ui/themes';
import Routes from './routes/mainRoutes';
import Loader from './containers/Loader';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Loader />
      <Container size="4" align="center">
        <Flex direction="column" minHeight="100vh" px={{ initial: '3', md: '5' }}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Flex>
      </Container>
    </React.Fragment>
  );
};

export default App;
