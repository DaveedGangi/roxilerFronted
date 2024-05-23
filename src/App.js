import {Route,Switch} from "react-router-dom"

import './App.css';

import Roxiler from "./components/Home"

function App() {
  return (
    <div className="App">

    <Switch>
      <Route exact path="/" component={Roxiler}/>
    </Switch>
   
    </div>
  );
}

export default App;
