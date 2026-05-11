import './App.css'
import { useState } from "react";

type permissionProps = {
    role: "RICHIEDENTE" | "MEDIATORE",
    setPage: (page: string) => void;
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function Register(setter: permissionProps) {
    const [result, setResult] = useState<boolean>(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [role, setRole] = useState<string>(setter.role);
    const [error, setError] = useState<string | null>("");

    function handleRegister() {
        if (!username || !email || !password || !confirm) {
            setError("Compila tutti i campi");
            return;
        }
        if (!isValidEmail(email)) {
            setError("Email non valida | sugg: example@mail.com");
            return;
        }
        if(password.length < 8){
            setError("La password deve contenere almeno 8 caratteri");
            return;
        }
        if (password !== confirm){
            setError("Le password non coincidono");
            return;
        }
        fetch("http://localhost:8080/session/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                role: role,
            })
        }).then(res => {
            if(res.ok) setResult(true);
            return res.text();
        }).then((data) => setError(data));
    }

    return (
        <div className="register-container">
            <div className="register-box box">
                <h1 className="title is-size-4 has-text-centered">
                    Registrati come { role.toLowerCase() }
                </h1>
                <p className= {result ? "has-text-success has-text-centered mt-3 mb-3 is-size-6" :
                    "has-text-danger has-text-centered mt-3 mb-3 is-size-7"}>{ error }</p>
                <div className={result ? "field is-hidden" : "field"}>
                    <label className="label">Nome utente</label>
                    <input className="input"
                           type="text"
                           value={username}
                           placeholder="Username"
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className={result ? "field is-hidden" : "field"}>
                    <label className="label">Email</label>
                    <input className="input"
                           type="email"
                           placeholder="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={result ? "field is-hidden" : "field"}>
                    <label className="label">Password</label>
                    <input className="input"
                           type="password"
                           value={password}
                           placeholder="Password"
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={result ? "field is-hidden" : "field"}>
                    <label className="label">Conferma password</label>
                    <input className="input"
                           type="password"
                           value={confirm}
                           placeholder="Ripeti password"
                           onChange={(e) => setConfirm(e.target.value)}/>
                </div>
                <div className={result ? "field is-hidden" : "field"}>
                    <label className="label">Tipo account</label>
                    <div className="select is-fullwidth">
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}>
                            <option value="RICHIEDENTE">Richiedente</option>
                            <option value="MEDIATORE">Mediatore</option>
                        </select>
                    </div>
                </div>
                <button
                    className={result ? "button is-primary is-fullwidth is-hidden" : "button is-primary is-fullwidth"}
                    onClick={handleRegister}>
                    Registrati
                </button>
                <p className="has-text-centered mt-3">
                    { result ? null : "Hai già un account?" }
                    <a onClick={() => setter.setPage(role === "RICHIEDENTE" ? "loginR" : "loginM")}> Accedi</a>
                </p>
            </div>
        </div>
    );
}