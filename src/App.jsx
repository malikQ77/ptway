import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


import Header from './components/Header';
import Title from './components/Title';
import PersonalInfo from './components/PersonalInfo';
import Experiences from './components/Experiences';
import Communicate from './components/Communicate';
import Thanks from './components/Thanks';
import JobPreferences from './components/JobPreferences';
import Usage from './components/Usage';

class App extends Component {

    render() {
        return (
            <div>

                <Router>
                    <Header></Header>
                    <Switch>
                        <Route exact path="/">
                            <div className="container form-container">

                                <Title></Title>
                                <div className="sections">
                                    <JobPreferences className="fadeIn first"></JobPreferences>
                                    <Usage className="fadeIn second"></Usage>
                                    <Experiences className="fadeIn third"></Experiences>
                                    <PersonalInfo className="fadeIn forth"></PersonalInfo>
                                    <Communicate className="fadeIn forth"></Communicate>
                                </div>


                            </div>
                        </Route>

                        <Route exact path="/thanks">
                            <Thanks></Thanks>
                        </Route>

                        <Route path="*">
                            <h1>404 | page not found</h1>
                        </Route>
                    </Switch>
                </Router>

            </div>

        );
    }
}

export default App;