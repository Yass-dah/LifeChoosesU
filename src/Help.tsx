import './App.css'
import {useContext, useEffect, useState} from "react";
import type { HelpRequest } from "./data/data-model.ts";
import {UserAuth} from "./context/userAuth.tsx";
import {getStatusClean} from "./data/types.ts";

type pageProps = {
    request: HelpRequest;
    setPage: (page: string) => void;
}

export function Help({ request, setPage }: pageProps){
    const { user } = useContext(UserAuth);

    const [currentRequest, setCurrentRequest] = useState<HelpRequest>(request);
    const [answer, setAnswer] = useState(currentRequest.aidAnswer || "");

    function loadAnswer() {
        let valid = true;
        fetch(`http://localhost:8080/hr/${currentRequest.id}/response`, {
            credentials: "include"
        }).then(res => {
                if(res.ok)
                    return res.json();
            }).then(data => {
                if(valid && data) {
                    setCurrentRequest(prev => ({
                        ...prev,
                        aidAnswer: data.answer
                    }));
                    setAnswer(data.answer);
                }
            });
        return () => { valid = false };
    }

    useEffect(loadAnswer, [currentRequest.id]);

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
        });
    }

    function takeInCharge() {
        fetch(`http://localhost:8080/hr/${currentRequest.id}/assign`, {
            credentials: "include"
        }).then(res => {
            if(!res.ok) throw new Error("Errore presa in carico");
            setCurrentRequest((prev => ({
                ...prev,
                status: "IN_GESTIONE"
            })))
        });
    }

    function markResolved() {
        fetch(`http://localhost:8080/hr/${currentRequest.id}/resolve`, {
            credentials: "include",
        }).then(res => {
            if(!res.ok) throw new Error("Errore risoluzione");
            setCurrentRequest((prev => ({
                ...prev,
                status: "RISOLTO"
            })))
            setPage("dashboard");
        });
    }

    if (user === null || user.role !== "MEDIATORE")
        return (<p className="mt-4 has-text-centered">UNAUTHORIZED</p>)

    return (
        <div className="container mt-5">
            <div className="box">
                <p>{"ID: " + request.id }</p>
                <h1 className="title is-size-4">{currentRequest.title + " from: " +
                    ((currentRequest.anonymous) ? "anonymous" : currentRequest.requester)}</h1>
                <span className="tag is-danger mb-3">{currentRequest.urgency} URGENZA</span>
                <p><strong>Luogo:</strong> {currentRequest.location + ", " + currentRequest.country}
                    <a className="ml-2 is-size-7" href={"https://www.google.com/maps/search/?api=1&query=" +
                        encodeURIComponent(`${currentRequest.location} ${currentRequest.country}`)}
                    target="_blank"> cerca su Maps</a></p>
                <p><strong>Stato:</strong> {getStatusClean(currentRequest.status)}</p>
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
                            placeholder="Scrivi un consiglio, una strategia o un intervento da effettuare/effettuatosi..."
                            value={answer || ""}
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