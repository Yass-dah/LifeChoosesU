import './App.css'
import { type ConflictType, type UrgencyLevel } from "./data/types.ts";
import {useContext, useState} from "react";
import {CountriesContext} from "./context/countries.tsx";
import {UserAuth} from "./context/userAuth.tsx";

type pageProps = {
    setPage: (page: string) => void;
}

export function Support({setPage}: pageProps) {
    const { user } = useContext(UserAuth);
    const { countries } = useContext(CountriesContext);

    const [title, setTitle] = useState("");
    const [type, setType] = useState<ConflictType>("FAMILIARE");
    const [urgency, setUrgency] = useState<UrgencyLevel>("BASSA");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState<string>("Italia");
    const [anonymous, setAnonymous] = useState(false);
    const [error, setError] = useState<string | null>("");

    function submitRequest() {
        if (!title || !location || !description) {
            setError("Compila tutti i campi");
            return;
        }
        fetch("http://localhost:8080/hr/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                title: title,
                location: location,
                description: description,
                type: type,
                urgency: urgency,
                country: country,
                anonymous: anonymous
            })
        }).then(res => {
                if (!res.ok) throw new Error("Errore invio richiesta");
                return res.json();
            }).then(() => { setPage("requests");})
            .catch(err => console.log("Submit request: " + err));
    }

    if(user === null || user.role !== "RICHIEDENTE")
        return (<p className="mt-4 has-text-centered">UNAUTHORIZED</p>)

    return (
        <div className="support-container container mt-5">
            <div className="box">
                <h1 className="title is-size-4 has-text-centered">
                    Richiedi supporto
                </h1>
                <div className="field">
                    <label className="label">Titolo</label>
                    <input className="input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Es. Problema familiare"/>
                </div>
                <div className="field">
                    <label className="label">Tipo di conflitto</label>
                    <div className="select is-fullwidth">
                        <select value={type} onChange={(e) => setType(e.target.value as ConflictType)}>
                            <option value="FAMILIARE">Familiare</option>
                            <option value="SCOLASTICO">Scolastico</option>
                            <option value="LAVORATIVO">Lavorativo</option>
                            <option value="SOCIALE">Sociale</option>
                            <option value="ALTRO">Altro</option>
                        </select>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Livello di urgenza</label>
                    <div className="select is-fullwidth">
                        <select value={urgency} onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}>
                            <option value="BASSA">Basso</option>
                            <option value="MEDIA">Medio</option>
                            <option value="ALTA">Alto</option>
                        </select>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Paese</label>
                    <div className="select is-fullwidth">
                        <select value={country} onChange={(e) => setCountry(e.target.value)}>
                            {countries.map((c) => (
                                <option key={c.name} value={c.name}>
                                    {c.name + " " + c.flag}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Luogo</label>
                    <input
                        className="input"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Es. Torino"/>
                </div>
                <div className="field">
                    <label className="label">Descrizione</label>
                    <textarea
                        className="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrivi il conflitto..."/>
                </div>
                <div className="field">
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={anonymous}
                            onChange={(e) => setAnonymous(e.target.checked)}
                        /> Invia in forma anonima
                    </label>
                </div>
                <p className= {error ? "has-text-danger has-text-centered mt-3 mb-3 is-size-7" :
                    "has-text-success has-text-centered mt-3 mb-3 is-size-6"}>{ error }</p>
                <button
                    className="button is-dark is-fullwidth"
                    onClick={submitRequest}>
                    Invia Richiesta
                </button>
            </div>
        </div>
    );
}