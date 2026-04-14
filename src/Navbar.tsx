import './App.css'
import {type ReactElement, useContext} from "react";
import {UserAuth} from "./context/userAuth.tsx";

type Props = {
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
                              onClick={() => setter.setPage("login")}>Login</button>;
    else
        mainContent = <button className="button is-light is-outlined"
                    onClick={ handleLogout }>{ user.username }</button>;

    console.log("current user: " + (user ? user.username : null));
    return (
        <div className="navbar">
            <h1 className="title m-2"
                onClick={() => setter.setPage("home")}>LifeChoosesU</h1>
            <div className="nav-buttons">
                <button className="button is-warning mx-4"
                        onClick={() => setter.setPage("home")}>Home</button>
                { mainContent }
            </div>
        </div>
    )
}