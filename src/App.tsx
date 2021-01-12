import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import TodosApp from './pages/TodosApp'
import About from './pages/About'
import Login from './pages/Login'
import {Navbar} from './cmps/Navbar'
import './styles/global.scss'
// import { About } from './pages/About';

function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route path="/TodosApp" component={TodosApp} />
          <Route path="/about" component={About} />
          <Route path="/" component={Login} />
        </Switch>
      </main>
    </Router>

  </div>

  );
}

export default App;
