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

import {type ReactElement, useEffect, useState} from "react";
import type {User} from "./data/data-model.ts";

import {UserAuth} from "./context/userAuth.tsx";

interface SessionData{
    username: string;
    role: string;
    message: string;
}

function App(){
    const [user, setUser] = useState<User | null>(null);
    const [page, setPage] = useState("home");

    function checkConnection(){
        let valid = true;
        fetch('http://localhost:8080/session/get', {
            credentials: 'include'
        }).then(res => res.json())
            .then((sd: SessionData) => {
                if (valid) {
                    setUser(sd.username ?
                        { username: sd.username, email: "", role: sd.role as 'MEDIATORE' | 'RICHIEDENTE'}
                        : null);
                }
            });
        return () => {
            valid = false;
        };
    }

    useEffect(() => { checkConnection() }, []);
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
            <UserAuth.Provider value={{ user, setUser }}>
            <div id="app">
                <Navbar setPage={setPage}/>
                { mainContent }
                {page === "home" ? <Steps /> : null}
                <Footer />
            </div>
            </UserAuth.Provider>
        </>
    )
}

export default App
