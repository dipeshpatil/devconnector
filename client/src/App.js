import { Fragment } from "react";
import { Route } from "react-router-dom";

import { Container } from "react-bootstrap";

import NavBar from "./components/NavBar/NavBar";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";

import HomePage from "./pages/Home/HomePage";

import "./App.css";

const App = () => (
  <Fragment>
    <NavBar />
    <Container>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Container>
  </Fragment>
);

export default App;
