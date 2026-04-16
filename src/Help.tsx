import './App.css'
import {useContext, useState} from "react";
import type { HelpRequest } from "./data/data-model.ts";
import {UserAuth} from "./context/userAuth.tsx";

type Props = {
    request: HelpRequest;
    setPage: (page: string) => void;
}

export function Help({ request, setPage }: Props){
    const { user } = useContext(UserAuth);

    const [currentRequest, setCurrentRequest] = useState<HelpRequest>(request);
    const [answer, setAnswer] = useState(request.aidAnswer || "");

    function handleSubmit() {
        fetch(`http://localhost:8080/hr/${currentRequest.id}/answer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                answer: answer
            })
        }).then(res => {
            if(!res.ok) throw new Error("Errore invio risposta");
            setCurrentRequest((prev => ({
                ...prev,
                aidAnswer: answer
            })))
            setPage("dashboard");
        }).catch(err => console.log(err));
    }

    function takeInCharge() {
        fetch(`http://localhost:8080/hr/${currentRequest.id}/assign`, {
            method: "POST",
            credentials: "include"
        }).then(res => {
            if(!res.ok) throw new Error("Errore presa in carico");
            setCurrentRequest((prev => ({
                ...prev,
                status: "IN_GESTIONE"
            })))
            setPage("dashboard");
        }).catch(err => console.log(err));
    }

    function markResolved() {
        fetch(`http://localhost:8080/hr/${currentRequest.id}/resolve`, {
            method: "POST",
            credentials: "include",
        }).then(res => {
            if(!res.ok) throw new Error("Errore risoluzione");
            setCurrentRequest((prev => ({
                ...prev,
                status: "RISOLTO"
            })))
            setPage("dashboard");
        }).catch(err => console.log(err));
    }

    if (user === null || user.role !== "MEDIATORE")
        return (<p className="mt-4 has-text-centered">UNAUTHORIZED</p>)

    return (
        <div className="container mt-5">
            <div className="box">
                <p>{"ID: " + request.id }</p>
                <h1 className="title is-size-4">{currentRequest.title + " from: " + currentRequest.requester}</h1>
                <span className="tag is-danger mb-3">{currentRequest.urgency} urgenza</span>
                <p><strong>Luogo:</strong> {currentRequest.location}</p>
                <p><strong>Stato:</strong> {currentRequest.status}</p>
                <hr/>
                <h3 className="subtitle">Descrizione</h3>
                <p>{currentRequest.description}</p>
                <hr/>
                <h3 className="subtitle">Azioni mediatore</h3>
                <div className="buttons">
                    <button className="button is-primary" onClick={takeInCharge} disabled={currentRequest.status==="IN_GESTIONE"}>
                        Prendi in carico
                    </button>
                    <button className="button is-success" onClick={markResolved} disabled={currentRequest.status!=="IN_GESTIONE"}>
                        Contrassegna risolto
                    </button>
                </div>
                <div className="field mt-4">
                    <label className="label">Intervento / Suggerimento</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="Scrivi un consiglio o una strategia..."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>
                </div>
                <button className="button is-link mt-3" onClick={handleSubmit} disabled={currentRequest.status!=="IN_GESTIONE"}>
                    Invia risposta
                </button>
            </div>
        </div>
    )
}