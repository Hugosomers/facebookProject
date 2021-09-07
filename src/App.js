import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Feed from './pages/Feed';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/feed/:user" component={Feed}/>
      </Switch>
    </div>
  );
}

export default App;
