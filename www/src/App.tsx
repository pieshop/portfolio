import React from 'react';
import { BrowserRouter } from 'react-router';
import Routes from './routes/mainRoutes';
import Loader from './containers/Loader';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Loader />
      <div className="container-fluid">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
};

export default App;
