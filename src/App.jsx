import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Splash";
import Splash from "./Splash";
import MainExam from "./MainExam";
import ResultPage from "./ResultPage";
import Scroll2Top from "./Scroll2Top";
import FakeResultPage from "./FakeResultPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Scroll2Top />
        <Switch>
          <Route exact path="/">
            <Splash></Splash>
          </Route>
          <Route path="/ex">
            <MainExam></MainExam>
          </Route>
          <Route path="/result/:data">
            <ResultPage></ResultPage>
          </Route>
          <Route path="/damn/:data">
            <FakeResultPage></FakeResultPage>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
