import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Analytics from 'Analytics';
import About from '../containers/About';
import Item from '../containers/Item';
import Categories from '../containers/Categories';
import PageNotFound from '../containers/PageNotFound';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AnalyticsTracker = () => {
  return <Route component={Analytics} />;
  // return null;
};

const Routes = (
  <React.Fragment>
    <Header />
    <AnalyticsTracker />
    <Switch>
      <Route path="/about" component={About} />
      <Redirect exact from="/" to="/about" />
      <Route path="/:category_id/:client_id/:entry_id" component={Item} />
      <Route path="/:category_id/:year_id" component={Categories} />
      {/*<Route component={PageNotFound} />*/}
      {/*<Route component={() => (window.location = '404.php')} />*/}
      <Redirect to="/about" />
    </Switch>
    <Footer />
  </React.Fragment>
);

export default Routes;
