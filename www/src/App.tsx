import React from 'react';
import { BrowserRouter } from 'react-router';
import { Flex } from '@radix-ui/themes';
import Routes from './routes/mainRoutes';
import Loader from './containers/Loader';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Loader />
      <Flex direction="column" minHeight="100vh" px={{ initial: '3', md: '5' }}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Flex>
    </React.Fragment>
  );
};

export default App;
