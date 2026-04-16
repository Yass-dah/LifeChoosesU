import './App.css'
import {type ReactElement, useContext} from "react";
import {UserAuth} from "./context/userAuth.tsx";

type Props = {
    page: string,
    setPage: (page: string) => void;
};

export function Navbar(setter: Props) {
    const { user , setUser } = useContext(UserAuth);

    function handleLogout() {
        fetch(`http://localhost:8080/session/logout`, {
            credentials: "include"
        }).then(res => res.json())
            .then((sd) => {
                if (!sd.username) {
                    setUser(null);
                    setter.setPage("home");
                }
            }).catch(err => console.error("Logout failed: ", err));
    }

    let mainContent: ReactElement;
    if(user === null)
        mainContent = <button className="button is-light is-outlined"
                              onClick={() => setter.setPage("loginR")}>Login</button>;
    else
        mainContent = <button className="button is-light is-outlined"
                    onClick={ handleLogout }>{ user.username }<br /> (Logout) </button>;

    return (
        <div className="navbar">
            <h1 className="title m-2"
                onClick={() => setter.setPage("home")}>LifeChoosesU</h1>
            <div className="nav-buttons">
                { setter.page !== "home" ?
                <button className="button is-warning mx-4"
                        onClick={() => setter.setPage("home")}>Home</button> : null }
                {(user !== null && user.role === "MEDIATORE") && setter.page !== "dashboard" ?
                    <button className="button is-dark mx-4"
                            onClick={() => setter.setPage("dashboard")}>La mia dashboard</button> : null}
                { (setter.page !== "login" && setter.page !== "register") ? mainContent : null }
            </div>
        </div>
    )
}