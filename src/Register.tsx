import './App.css'

type Props = {
    setPage: (page: string) => void;
}

export function Register(setter: Props){
    return (
        <div className="register-container">
            <div className="register-box box">
                <h1 className="title is-size-4 has-text-centered">Registrazione</h1>
                <div className="field">
                    <label className="label">Nome</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Inserisci nome"/>
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
                <div className="field">
                    <label className="label">Conferma Password</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="Conferma password"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Tipo di account</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select>
                                <option value="requester">Richiedente supporto</option>
                                <option value="mediator">Mediatore</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field mt-4">
                    <div className="control">
                        <button className="button is-primary is-fullwidth">
                            Registrati
                        </button>
                    </div>
                </div>
                <p className="has-text-centered mt-3">
                    Hai già un account?
                    <a href="" onClick={() => setter.setPage("login")}> Accedi</a>
                </p>
            </div>
        </div>
    )
}