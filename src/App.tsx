import './App.css'
import {Footer} from "./Footer.tsx";
import {Navbar} from "./Navbar.tsx";
import {Home} from "./Home.tsx";
import {Steps} from "./Steps.tsx";
import {Login} from "./Login.tsx";
import {Register} from "./Register.tsx";
import {Help} from "./Help.tsx";
import {Support} from "./Support.tsx";
import {Explore} from "./Explore.tsx";
import {Dashboard} from "./Dashboard.tsx";

import {useState} from "react";

function App(){
  const [page, setPage] = useState("home");
  return (
    <>
      <div id="app">
        <Navbar setPage={setPage}/>
        {page === "home" ? <Home setPage={setPage}/> : null}
        {page === "home" ? <Steps /> : null}
        {page === "login" ? <Login setPage={setPage}/> : null}
        {page === "register" ? <Register setPage={setPage}/> : null}
        {page === "help" ? <Help /> : null}
        {page === "support" ? <Support /> : null}
        {page === "explore" ? <Explore /> : null}
        {page === "dashboard" ? <Dashboard /> : null}
        <Footer />
      </div>
    </>
  )
}

export default App
