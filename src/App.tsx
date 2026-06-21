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
import type {HelpRequest, User, Country} from "./data/data-model.ts";

import {UserAuth} from "./context/userAuth.tsx";
import {CountriesContext} from "./context/countries.tsx";
import {Requests} from "./Requests.tsx";
import type {ConflictType, UrgencyLevel} from "./data/types.ts";

interface SessionData{
    username: string;
    role: string;
    country: Country;
    message: string;
}

function App(){
    const [user, setUser] = useState<User | null>(null);
    const [page, setPage] = useState("home");
    const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);

    // dashboard filters
    const [countryFilter, setCountryFilter] = useState<Country | "">("");
    const [typeFilter, setTypeFilter] = useState<ConflictType | "">("");
    const [urgencyFilter, setUrgencyFilter] = useState<UrgencyLevel | "">("");

    function checkConnection(){
        let valid = true;
        fetch('https://lifechoseesu-backend-5.onrender.com/session/get', {
            credentials: 'include'
        }).then(res => res.json())
            .then((sd: SessionData) => {
                if (valid) {
                    setUser(sd.username ?
                        { username: sd.username,
                            email: "",
                            country: sd.country,
                            role: sd.role as 'MEDIATORE' | 'RICHIEDENTE'}
                        : null);
                }
            }).catch(err => {
                setPage("error");
                console.log("Checking conn: " + err)
            });
        return () => { valid = false;};
    }

    useEffect(() => checkConnection(), []);

    useEffect(() => {
        fetch("https://lifechoseesu-backend-5.onrender.com/help-requests/countries", {
            credentials: "include"
        }).then(res => res.json())
            .then((data) => setCountries(data))
            .catch(err => console.log("Loading countries: " + err));
    }, []);

    let mainContent: ReactElement;
    switch(page){
        case "home":
            mainContent = <Home setPage={setPage}/>;
            break;
        case "loginR":
            mainContent = <Login setPage={setPage} role={"RICHIEDENTE"}/>;
            break;
        case "loginM":
            mainContent = <Login setPage={setPage} role={"MEDIATORE"}/>;
            break;
        case "registerR":
            mainContent = <Register setPage={setPage} role={"RICHIEDENTE"}/>;
            break;
        case "registerM":
            mainContent = <Register setPage={setPage} role={"MEDIATORE"}/>;
            break;
        case "help":
            mainContent = <Help request={selectedRequest as HelpRequest} setPage={setPage}/>
            break;
        case "support":
            mainContent = <Support setPage={setPage}/>
            break;
        case "explore":
            mainContent = <Explore pageProps={{
                setPage,
                setCountryFilter,
                setTypeFilter,
                setUrgencyFilter}}/>
            break;
        case "dashboard":
            mainContent = <Dashboard
                setPage={setPage}
                setSelectedRequest={setSelectedRequest}
                dashFilter={"MIE"}
                countryFilter={""}
                typeFilter={""}
                urgencyFilter={""}/>
            break;
        case "dashboard*":
            mainContent = <Dashboard
                setPage={setPage}
                setSelectedRequest={setSelectedRequest}
                dashFilter={"*"}
                countryFilter={countryFilter}
                typeFilter={typeFilter}
                urgencyFilter={urgencyFilter}/>
            break;
        case "requests":
            mainContent = <Requests></Requests>
            break;
        case "error":
            mainContent = <p className="box title m-6 has-text-centered">
                SERVER TEMPORARILY UNAVAILABLE :(<br/>
                <span className="is-size-5">Please try again later</span>
            </p>
            break;
        default:
            mainContent = <></>;
            break;
    }

    return (
        <>
            <UserAuth.Provider value={{ user, setUser }}>
                <CountriesContext.Provider value={{ countries, setCountries }}>
                    <div id="app">
                        { page !== "error" && <Navbar page={page} setPage={setPage}/> }
                        { mainContent }
                        { page === "home" ? <Steps /> : null }
                        { page !== "error" && <Footer /> }
                    </div>
                </CountriesContext.Provider>
            </UserAuth.Provider>
        </>
    )
}

export default App
