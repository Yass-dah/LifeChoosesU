import './App.tsx'
import {useContext, useState} from "react";
import {UserAuth} from "./context/userAuth.tsx";

type permissionProps = {
    role: "RICHIEDENTE" | "MEDIATORE";
    setPage: (page: string) => void;
}

export function Login(setter: permissionProps){
    const { setUser } = useContext(UserAuth);

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ role, setRole ] = useState<"RICHIEDENTE" | "MEDIATORE">(setter.role);
    const [ error, setError ] = useState<string | null>(null);

    function handleLogin() {
        if (!username || !password) {
            setError("Compila tutti i campi");
            return;
        }
        fetch(`http://localhost:8080/session/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                role: role
            })
        }).then(res => res.json())
            .then(sd => {
                if (sd.username) {
                    setUser({
                        username: sd.username,
                        email: "",
                        country: sd.country,
                        role: sd.role
                    });
                    setter.setPage("home");
                } else setError(sd.message);
            });
    }

    return (
        <div className="login-container">
            <div className="login-box box">
                <h1 className="title is-size-4 has-text-centered">Accedi come { role.toLowerCase() }</h1>
                <p className="has-text-danger has-text-centered mt-3 mb-3 is-size-7">{ error }</p>
                <div className="field">
                    <label className="label">Seleziona ruolo</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select onChange={ (e) =>
                                setRole(e.target.value as ("RICHIEDENTE" | "MEDIATORE")) }
                            defaultValue={role}>
                                <option value="RICHIEDENTE">Richiedente supporto</option>
                                <option value="MEDIATORE">Mediatore</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Inserisci username"
                               onChange={ (e) => setUsername(e.target.value) }/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="Inserisci password"
                            onChange={ (e) => setPassword(e.target.value) }/>
                    </div>
                </div>
                <div className="field mt-4">
                    <div className="control">
                        <button className="button is-success is-fullwidth"
                            onClick={ handleLogin }>Accedi</button>
                    </div>
                </div>
                <p className="has-text-centered mt-3">
                    Non hai un account?
                    <a onClick={() => setter.setPage(role === "RICHIEDENTE" ? "registerR" : "registerM")}> Registrati</a>
                </p>
            </div>
        </div>
    )
}