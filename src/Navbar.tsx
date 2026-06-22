import './App.css'
import {type ReactElement, useContext} from "react";
import {UserAuth} from "./context/userAuth.tsx";

type pageProps = {
    page: string,
    setPage: (page: string) => void;
};

export function Navbar(setter: pageProps) {
    const { user , setUser } = useContext(UserAuth);

    function handleLogout() {
        fetch(`https://lifechoseesu-backend-5.onrender.com/session/logout`, {
            credentials: "include"
        }).then(res => res.json())
            .then((sd) => {
                if (!sd.username) {
                    setUser(null);
                    setter.setPage("home");
                }})
            .catch(err => console.log("Logout: " + err));
    }

    let mainContent: ReactElement;
    if(user === null)
        mainContent = <button className="button is-black is-outlined"
                              onClick={() => setter.setPage("loginR")}>Login</button>;
    else
        mainContent = <button className="button py-1 is-black is-outlined"
                              onClick={ handleLogout }>Logout</button>;

    return (
        <div className="navbar">
            <div className="is-flex is-align-items-center m-3" style={{ gap: "10px" }}>
                <h1 className="title m-0 has-text-white" onClick={() => setter.setPage("home")}>
                    LifeChoosesU
                </h1>
                {user && (
                    <span className="tag is-rounded is-italic is-white">
                        {user.role === "MEDIATORE" ? "MEDIATOR AREA" : "HELP AREA"}
                    </span>
                )}
            </div>

            <div className="nav-buttons">
                { setter.page !== "home" ?
                    <button className="button is-warning mr-3"
                            onClick={() => setter.setPage("home")}>Home</button> : null }

                {(user !== null && user.role === "RICHIEDENTE") && setter.page !== "support" ?
                    <button className="button is-success is-light mr-3"
                            onClick={() => setter.setPage("support")}>+ Nuova richiesta</button> : null}

                {(user !== null && user.role === "RICHIEDENTE") && setter.page !== "requests" ?
                    <button className="button is-primary is-dark mr-3"
                            onClick={() => setter.setPage("requests")}>Le mie richieste</button> : null}

                {(user !== null && user.role === "MEDIATORE") && setter.page !== "dashboard" && setter.page !== "dashboard*" ?
                    <button className="button is-black mr-3"
                            onClick={() => setter.setPage("dashboard")}>La mia dashboard</button> : null}

                { (setter.page !== "loginM" && setter.page !=="loginR"
                    && setter.page !== "registerM" && setter.page !== "registerR") && (
                    <div className="is-flex is-flex-direction-column is-align-items-center">
                        {user && (
                            <div className="box has-background-light px-2 py-0 mb-1 is-rounded is-size-7 is-flex is-align-items-center">
                                <img className="image is-16x16 mr-2" src="/user.png" alt=""/>
                                <strong className="has-text-black">{user.username}</strong><br/>
                                {mainContent}
                            </div>
                        )}
                        {!user && mainContent}
                    </div>
                )}
            </div>
        </div>
    )
}