import './App.css'

export function Support(){
    return (
        <div className="support-container container mt-5">
            <div className="box">
                <h1 className="title is-size-4 has-text-centered">Richiedi supporto</h1>
                <p className="has-text-centered mb-4">
                    Descrivi il tuo problema e un mediatore ti aiuterà
                </p>
                <div className="field">
                    <label className="label">Tipo di conflitto</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select>
                                <option>Familiare</option>
                                <option>Scolastico</option>
                                <option>Lavorativo</option>
                                <option>Sociale</option>
                                <option>Altro</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Livello di urgenza</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select>
                                <option>Basso</option>
                                <option>Medio</option>
                                <option>Alto</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Luogo (opzionale)</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Es. Torino, Italia"/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Descrizione del problema</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="Descrivi il conflitto..."></textarea>
                    </div>
                </div>
                <div className="field">
                    <label className="checkbox">
                        <input type="checkbox"/>
                        Invia in forma anonima
                    </label>
                </div>
                <div className="field mt-4">
                    <div className="control">
                        <button className="button is-dark is-fullwidth">
                            Invia richiesta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}