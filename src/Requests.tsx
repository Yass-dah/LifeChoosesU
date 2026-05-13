import './App.css'
import {useContext, useEffect, useState} from "react";
import {UserAuth} from "./context/userAuth.tsx";
import type {HelpRequest} from "./data/data-model.ts";
import {CountriesContext, getFlag} from "./context/countries.tsx";
import {getStatusClean} from "./data/types.ts";

function RequestCard({request, onDelete}: { request: HelpRequest, onDelete: (id: number) => void }) {
    const { countries } = useContext(CountriesContext);

    const [currentRequest, setCurrentRequest] = useState<HelpRequest>(request);
    const [lastTimeModified, setLastTimeModified] = useState<string | null>(null);

    function loadAnswer() {
        let valid = true;
        fetch(`http://localhost:8080/hr/${currentRequest.id}/response`, {
            credentials: "include"
        }).then(res => {
            if (!res.ok) throw new Error("Errore");
            return res.json();
        }).then(data => {
            if(valid) {
                setCurrentRequest(prev => ({
                    ...prev,
                    aidAnswer: data.answer
                }));
                setLastTimeModified(data.modifiedAt);
            }
        });
        return () => { valid = false };
    }

    function setAnonymous(flag: boolean) {
        let valid = true;
        fetch(`http://localhost:8080/hr/${currentRequest.id}/anonymous/${flag}`, {
            credentials: "include"
        }).then(res => {
            if (!res.ok) throw new Error("Errore");
            else {
                if(valid){
                    setCurrentRequest(prev => ({
                        ...prev,
                        anonymous: flag
                    }))
                }
            }
        })
        return () => { valid = false };
    }

    useEffect(loadAnswer, [currentRequest.id]);

    return (
        <div className="box conflict-card urgent mb-4">
            <p>{ "ID: " + request.id }</p>
            <h3 className="title is-5">{ currentRequest.title }</h3>
            <span className="tag mb-2">{ currentRequest.urgency } URGENZA</span>
            <p><strong>Luogo: </strong>{ currentRequest.location + ", " + currentRequest.country + " "
                + getFlag(countries, currentRequest.country as never)}</p>
            <p className="mt-2"><strong>Descrizione: </strong> { currentRequest.description }</p>
            <p className="mt-2"><strong>Tipo: </strong> { currentRequest.type }</p>
            <p className="mt-2"><strong>Stato: </strong> { getStatusClean(currentRequest.status) }</p>
            { currentRequest.mediator ? <p className="mt-2"><strong>Mediatore: </strong>{ currentRequest?.mediator }</p> : null}
            { currentRequest.aidAnswer ?
                <div className="box mt-2">
                    <p><strong>Risposta: </strong> { currentRequest.aidAnswer }</p>
                    <p className="is-size-7 mt-1">Ultima modifica risposta: {
                        lastTimeModified ?
                        new Date(lastTimeModified).toLocaleDateString("it-IT", { hour: "2-digit", minute: "2-digit"})
                            : null}</p>
                </div> : null }
            <button className="button is-link is-light mt-2 mr-3"
            onClick={() => onDelete(currentRequest.id)}>
                ELIMINA RICHIESTA 🗑️
            </button>
            <label className="checkbox mt-4 is-small">
            <input
                className="is-black"
                type="checkbox"
                checked={ currentRequest.anonymous }
                onClick={() => setAnonymous(!currentRequest.anonymous)}
            />
            <span className="ml-2 is-italic is-size-7">ANONIMA</span>
            </label>
        </div>
    )
}

export function Requests() {
    const { user } = useContext(UserAuth);

    const [ requests, setRequests ] = useState<HelpRequest[]>([])

    function loadMyRequests() {
        if(user === null) return;
        let valid = true;
        fetch(`http://localhost:8080/requester/${user.username}`,{
            credentials: "include"
        }).then(res => res.json())
            .then((data) => {
                if(valid)
                    setRequests(data)
            })
        return () => { valid = false };
    }

    function deleteRequest(id: number) {
        fetch(`http://localhost:8080/hr/${id}/delete`, {
            method: "DELETE",
            credentials: "include"
        }).then(res => {
            if (res.ok)
                setRequests(prev => prev.filter(r => r.id !== id));
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => loadMyRequests(), []);

    return (
        <div className="container mt-5">
            <h1 className="title">Le mie richieste</h1>
            <div>
                { !requests.length ? <p className="is-size-6 ml-4 mb-5 mt-5">Nessuna richiesta disponibile</p> : null }
                { requests.map(req => (
                    <RequestCard key={req.id} request={req} onDelete={deleteRequest}/>
                ))}
            </div>
        </div>
    )
}