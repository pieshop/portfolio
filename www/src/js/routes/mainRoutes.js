import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import About from '../containers/About';
import Item from '../containers/Item';
import Categories from '../containers/Categories';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Routes = (
  <React.Fragment>
    <Header />
    {/*<AnalyticsTracker />*/}
    <Switch>
      <Route path="/about" component={About} />
      <Redirect exact from="/" to="/about" />
      <Route path="/:category_id/:client_id/:entry_id" component={Item} />
      <Route path="/:category_id/:year_id" component={Categories} />
      <Redirect to="/about" />
    </Switch>
    <Footer />
  </React.Fragment>
);

export default Routes;
