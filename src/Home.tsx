import './App.css'
import {useContext} from "react";
import {UserAuth} from "./context/userAuth.tsx";

type pageProps = {
    setPage: (page: string) => void;
}

export function Home(setter: pageProps){
    const { user } = useContext(UserAuth);

    return (
        <section className="hero">
            <h2 className="title has-text-primary-dark">AIUTA A RISOLVERE CONFLITTI O RICEVI SUPPORTO</h2>
            <div className="hero-buttons">
                { (user !== null && user.role === "MEDIATORE") ? null :
                <button className="button"
                    onClick={() => {
                        if(user !== null && user.role === "RICHIEDENTE")
                            setter.setPage("support")
                        else
                            setter.setPage("loginR");
                    }}>Chiedi supporto</button>
                }
                { (user !== null && user.role === "RICHIEDENTE") ? null :
                <button className="button"
                    onClick={() => {
                        if(user !== null && user.role === "MEDIATORE")
                            setter.setPage("dashboard")
                        else
                            setter.setPage("loginM");
                    }}>{user === null ? "Accedi come mediatore" : "La mia Dashboard"}</button>
                }
            </div>
            <div className="explore-button">
                <button className="explore button is-success mx-4"
                    onClick={() => setter.setPage("explore")}>ESPLORA 🌏</button>
            </div>
        </section>
    )
}