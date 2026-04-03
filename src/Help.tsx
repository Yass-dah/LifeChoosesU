import './App.css'

export function Help(){
    return (
        <div className="container mt-5">
            <div className="box">
                <h1 className="title is-size-4">Conflitto familiare</h1>
                <span className="tag is-danger mb-3">Alta urgenza</span>
                <p><strong>Luogo:</strong> Torino</p>
                <p><strong>Stato:</strong> In attesa</p>
                <hr/>
                <h3 className="subtitle">Descrizione</h3>
                <p>
                    Discussione frequente in famiglia con situazioni di tensione
                    che stanno peggiorando nel tempo...
                </p>
                <hr/>
                <h3 className="subtitle">Azioni mediatore</h3>
                <div className="buttons">
                    <button className="button is-primary">Prendi in carico</button>
                    <button className="button is-success">Risolto</button>
                </div>
                <div className="field mt-4">
                    <label className="label">Intervento / Suggerimento</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="Scrivi un consiglio o una strategia..."></textarea>
                    </div>
                </div>
                <button className="button is-link mt-3">
                    Invia risposta
                </button>
            </div>
        </div>
    )
}