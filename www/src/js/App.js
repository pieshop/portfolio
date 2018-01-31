import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Loader from 'containers/Loader';
import Footer from 'components/Footer';
import Header from 'components/Header';
import About from 'containers/About';
import Categories from 'containers/Categories';
import Item from 'containers/Item';


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Loader />
                    <div class="container-fluid">
                        <Header/>
                        <Switch>
                            <Route path="/about" component={About}/>
                            <Redirect exact from="/" to="/about"/>
                            <Route path="/:category_id/:client_id/:entry_id" component={Item}/>
                            <Route path="/:category_id/:year_id" component={Categories}/>
                            <Redirect to="/about"/>
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}
export default App;
