import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import Alerts from './layout/Alerts';
import Header from './layout/Header';
import {Provider} from 'react-redux';
import store from '../store.js';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Dashboard from './common/Dashboard';
import Login from './accounts.js/Login';
import Register from './accounts.js/Register';
import PrivateRoute from './common/PrivateRoute';
import {loadUser} from '../actions/auth';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


// Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'top center',
};


class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Header />
                        <Alerts />
                        <div className="container">
                            <Switch>
                                <PrivateRoute exact path='/' component={Dashboard} />
                                <Route exact path='/login' component={Login} />
                                <Route exact path='/register' component={Register} />
                            </Switch>
                        </div>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));