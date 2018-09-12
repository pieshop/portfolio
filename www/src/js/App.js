import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes/mainRoutes';
import Loader from './containers/Loader';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;
    return (
      <React.Fragment>
        <Loader />
        <div className="container-fluid">
          <ConnectedRouter history={history}>{Routes}</ConnectedRouter>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
