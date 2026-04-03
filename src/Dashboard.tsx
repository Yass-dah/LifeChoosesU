import './App.css'

export function Dashboard(){
    return (
        <div className="container mt-5">
            <h1 className="title">Dashboard Mediatore</h1>
            <div className="box mb-4">
                <div className="columns is-multiline">
                    <div className="column is-4">
                        <label className="label">Tipo</label>
                        <div className="select is-fullwidth">
                            <select>
                                <option>Tutti</option>
                                <option>Familiare</option>
                                <option>Scolastico</option>
                                <option>Lavorativo</option>
                                <option>Sociale</option>
                                <option>Altro</option>
                            </select>
                        </div>
                    </div>
                    <div className="column is-4">
                        <label className="label">Urgenza</label>
                        <div className="select is-fullwidth">
                            <select>
                                <option>Tutte</option>
                                <option>Alta</option>
                                <option>Media</option>
                                <option>Bassa</option>
                            </select>
                        </div>
                    </div>
                    <div className="column is-4 is-flex is-align-items-end">
                        <button className="button is-primary is-fullwidth">
                            Applica filtri
                        </button>
                    </div>
                    <div className="column is-4">
                        <label className="label">Visualizza</label>
                        <div className="control">
                            <label className="radio mr-3">
                                <input className="mr-2" type="radio" name="filter" checked/>
                                Tutte
                            </label>
                            <label className="radio">
                                <input className="mr-2" type="radio" name="filter"/>
                                Solo le mie mediazioni
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns is-multiline">
                <div className="column is-half">
                    <div className="box conflict-card urgent">
                        <h3 className="title is-5">Conflitto familiare</h3>

                        <span className="tag is-danger mb-2">Alta urgenza</span>

                        <p><strong>Luogo:</strong> Torino</p>
                        <p className="mt-2">
                            Discussioni continue in famiglia con escalation di tensione...
                        </p>

                        <button className="button is-link is-light mt-3">
                            Intervieni
                        </button>
                    </div>
                </div>

                <div className="column is-half">
                    <div className="box conflict-card">
                        <h3 className="title is-5">Bullismo scolastico</h3>

                        <span className="tag is-warning mb-2">Media urgenza</span>

                        <p><strong>Luogo:</strong> Milano</p>
                        <p className="mt-2">
                            Problemi tra studenti con episodi di esclusione sociale...
                        </p>

                        <button className="button is-link is-light mt-3">
                            Intervieni
                        </button>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="box conflict-card">
                        <h3 className="title is-5">Bullismo scolastico</h3>

                        <span className="tag is-warning mb-2">Media urgenza</span>

                        <p><strong>Luogo:</strong> Milano</p>
                        <p className="mt-2">
                            Problemi tra studenti con episodi di esclusione sociale...
                        </p>

                        <button className="button is-link is-light mt-3">
                            Intervieni
                        </button>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="box conflict-card">
                        <h3 className="title is-5">Bullismo scolastico</h3>

                        <span className="tag is-warning mb-2">Media urgenza</span>

                        <p><strong>Luogo:</strong> Milano</p>
                        <p className="mt-2">
                            Problemi tra studenti con episodi di esclusione sociale...
                        </p>

                        <button className="button is-link is-light mt-3">
                            Intervieni
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}