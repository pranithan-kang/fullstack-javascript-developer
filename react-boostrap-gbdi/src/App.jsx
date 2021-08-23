// NOTE: since version 17 up, this is optional (implicit import)
// import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Index from "./pages/category/Index";
import Create from "./pages/category/Create";
import Edit from "./pages/category/Edit";
import Hospital from "./pages/hospital/Hospital";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/product">
            <Product />
          </Route>
          <Route
            path="/category"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} exact>
                  <Index />
                </Route>
                <Route path={`${url}/create`}>
                  <Create />
                </Route>
                <Route path={`${url}/edit/:id`} exact>
                  <Edit />
                </Route>
              </>
            )}
          />
          <Route path="/about">
            <About />
          </Route>
          <Route path="/hospital">
            <Hospital />
          </Route>
          <Route path="/" component={Home} />
          {/* NOTE: Another form
          <Route path="*">
            <HomePage />
          </Route>
          */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
