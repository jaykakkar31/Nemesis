import React, { useState } from "react";
import Login from "./login";
import Details from "./details";
import ShowUser from "./showUser";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import {
  login,
  userDetails,
  showDetails,
  deleteUserDetail,
} from "./services/userService";
var count = 0;
function App() {
  const [responseData, setResponse] = useState();
  const [token, setToken] = useState();
  const [added, setAdded] = useState(false);
  const rememberMe = Cookies.get("token");
  // const added = Cookies.get("added");

  const fetchDetails = () => {
    console.log("called");
    showDetails().then((response) => {
      console.log("response");
      setResponse([...response.data]);
    });
  };

  function handleSubmit(loginDetails) {
    login(loginDetails).then((response) => {
      console.log(response);
      if (response.data !== "Login failed") {
        Cookies.set("token", response.data);
        window.location.reload();
      }
    });
  }
  function handleUserData(details) {
    userDetails(details).then((response) => {
      console.log(response);
      if (response.data === "User added successfully") {
        fetchDetails();
        alert(response.data);
        // Cookies.set("added",true);

        setAdded(true);
      } else if (response.data === "REmoveCOkkie") {
        console.log("ENTERED");
        Cookies.remove("token");
        window.location.reload();
      } else {
        // Cookies.set("added", false);

        setAdded(false);
      }
    });
  }
  function deleteDetail(id, value, name) {
    deleteUserDetail(id, value, name).then((response) => {
      if (response.data === "REmoveCOkkie") {
        console.log("ENTERED");
        Cookies.remove("token");
        window.location.reload();
      }
      if (response.data === "Success") {
        console.log(response);
        window.location.reload();
      }
    });
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login">
            {rememberMe ? <Redirect to="/" /> : <Login signIn={handleSubmit} />}
          </Route>

          <Route exact path="/">
            {rememberMe ? (
              added ? (
                <Redirect to="/showUser" />
              ) : (
                <Details userData={handleUserData} />
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route exact path="/showUser">
            {rememberMe ? (
              responseData ? (
                <ShowUser details={responseData} delete={deleteDetail} />
              ) : (
                fetchDetails()
              )
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
