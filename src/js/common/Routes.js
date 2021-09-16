import React, { Component } from 'react';

import Login from '../user/Login';
import Dashboard from '../user/Dashboard';
import AdminDashboard from "../admin/AdminDashboard";
import WorkerDashboard from "../worker/WorkerDashboard";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class Routes extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <div className="container-fluid page-container">
                        <Switch>
                            <Route exact path='/' component={Login} />
                        </Switch>
                        <Switch>
                            <Route path='/Dashboard' component={Dashboard} />
                        </Switch>
                        <Switch>
                            <Route path='/AdminDashboard' component={AdminDashboard} />
                        </Switch>
                        <Switch>
                            <Route path='/WorkerDashboard' component={WorkerDashboard} />
                        </Switch>
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}
export default Routes;