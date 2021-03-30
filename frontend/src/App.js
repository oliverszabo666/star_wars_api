import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HeaderNavbar from "./components/HeaderNavbar/HeaderNavbar";
import Index from "./components/Index/Index";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Logout from "./components/Logout/Logout";
import Message from "./components/Message/Message";
import { UsernameContext, MessageContext } from "./context";

function App() {
  const [username, setUsername] = useState("loading");

  const [message, setMessage] = useState();

  useEffect(() => {
    getAuthentication(setUsername);
  }, []);

  return (
    <div className="App">
      {username !== "loading" && (
        <UsernameContext.Provider value={[username, setUsername]}>
          <MessageContext.Provider value={[message, setMessage]}>
            <Router>
              <HeaderNavbar />

              <Message />

              <Route exact path="/">
                <Index />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/register">
                <Register />
              </Route>

              <Route path="/logout">
                <Logout />
              </Route>
            </Router>
          </MessageContext.Provider>
        </UsernameContext.Provider>
      )}
    </div>
  );
}

const getAuthentication = async (setUsername) => {
  let text;

  try {
    const res = await fetch("/session");
    text = await res.text();
    console.log("auth answer:", text);
  } catch (error) {
    console.error("auth error:", error);
  } finally {
    setUsername(text);
  }
};

export default App;
