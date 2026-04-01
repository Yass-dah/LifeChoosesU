import './App.tsx'

export function Login(){
    return (
        <div className="login-container">
            <div className="login-box box">
                <h1 className="title is-size-4 has-text-centered">Login</h1>
                <div className="field">
                    <label className="label">Seleziona ruolo</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select>
                                <option>Richiedente supporto</option>
                                <option>Mediatore</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="email" placeholder="Inserisci email"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="Inserisci password"/>
                    </div>
                </div>
                <div className="field mt-4">
                    <div className="control">
                        <button className="button is-success is-fullwidth">Accedi</button>
                    </div>
                </div>
                <p className="has-text-centered mt-3">
                    Non hai un account? <a href="#">Registrati</a>
                </p>
            </div>
        </div>
    )
}