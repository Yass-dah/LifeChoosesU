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

import {type ReactElement, useState} from "react";

function App(){
    const [page, setPage] = useState("home");
    let mainContent: ReactElement;
    switch(page){
        case "home":
            mainContent = <Home setPage={setPage}/>;
            break;
        case "login":
            mainContent = <Login setPage={setPage}/>;
            break;
        case "register":
            mainContent = <Register setPage={setPage}/>;
            break;
        case "help":
            mainContent = <Help/>
            break;
        case "support":
            mainContent = <Support/>
            break;
        case "explore":
            mainContent = <Explore/>
            break;
        case "dashboard":
            mainContent = <Dashboard/>
            break;
        default:
            mainContent = <></>;
            break;
    }

    return (
        <>
            <div id="app">
                <Navbar setPage={setPage}/>
                { mainContent }
                {page === "home" ? <Steps /> : null}
                <Footer />
            </div>
        </>
    )
}

export default App
