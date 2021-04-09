import React, {Fragment} from 'react'
import Navbar from './components/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert  from './components/Alert'
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import About from './components/pages/About'
import User from './components/users/User'
import GithubState from './context/github/GithubState'

const App = ()=> {
    return (
     <GithubState>
        <Router>
        <div className="App">
        <Navbar />
        {<Alert/>}
        <div className="container">
        <Switch>
            <Route exact path="/" render={(props)=> (
              <Fragment >
                <Search/>
                <Users/>
              </Fragment>
              )} 
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" component={User}/>
        </Switch>
        </div></div>
        </Router>
     </GithubState>
    );  
}

export default App;
