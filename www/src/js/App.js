import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Analytics from './Analytics';
import Routes from './routes/mainRoutes';
import Loader from './containers/Loader';

const AnalyticsTracker = () => {
  // return <Route component={Analytics} />;
  return null;
};

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
          {/*<Header />*/}
          {/*<AnalyticsTracker />*/}
          <ConnectedRouter history={history}>{Routes}</ConnectedRouter>
          {/*<Footer />*/}
        </div>
      </React.Fragment>
    );
  }

  // render() {
  //   return (
  //     <Router>
  //       <Fragment>
  //         <Loader />
  //         <div class="container-fluid">
  //           <Header />
  //           <AnalyticsTracker />
  //           <Switch>
  //             <Route path="/about" component={About} />
  //             <Redirect exact from="/" to="/about" />
  //             <Route path="/:category_id/:client_id/:entry_id" component={Item} />
  //             <Route path="/:category_id/:year_id" component={Categories} />
  //             <Redirect to="/about" />
  //           </Switch>
  //         </div>
  //         <Footer />
  //       </Fragment>
  //     </Router>
  //   );
  // }
}

export default App;
