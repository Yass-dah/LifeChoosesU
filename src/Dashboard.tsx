import './App.css'
import { getFlag } from "./data/countries.ts";
import { getUrgColor } from "./data/types.ts";
import type { HelpRequest } from "./data/data-model.ts";
import {useContext, useEffect, useState} from "react";
import { UserAuth } from "./context/userAuth.tsx";

function ConflictCard({request}: { request: HelpRequest }){
    const urgClass = ["tag","mb-2"];
    urgClass.push(getUrgColor(request.urgency));
    const reqDone = (request.status === "IN GESTIONE" || request.status === "RISOLTO");
    const chosable = reqDone ? "disabled" : "";
    return (
        <div className={"box conflict-card urgent " + chosable}>
            <h3 className="title is-5">{ request.title }</h3>
            <span className={ urgClass.join(" ") }>{ request.urgency } URGENZA</span>
            <p><strong>Luogo:</strong> { request.location + " " + getFlag(request.country) }</p>
            <p className="mt-2">{ request.description }</p>
            <button className="button is-link is-light mt-3" disabled={reqDone}>
                Intervieni
            </button>
        </div>
    )
}

function FilterBox({ setFilter }: { setFilter: (filter: "*" | "MIE") => void }) {
    return (
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
                            <input className="mr-2" type="radio" name="filter" onClick={ () => setFilter("*") }/>
                            Tutte
                        </label>
                        <label className="radio">
                            <input className="mr-2" type="radio" name="filter" onClick={ () => setFilter("MIE") }/>
                            Solo le mie mediazioni
                        </label>
                    </div>
                </div>
            </div>
        </div>

    )
}

export function Dashboard(){
    const cards = [];
    const [ filter, setFilter ] = useState<"*" | "MIE">("*");
    const [ requests, setRequests ] = useState<HelpRequest[]>([]);
    const { user } = useContext(UserAuth);

    function loadRequests() {
        fetch("http://localhost:8080/help-requests",{
            credentials: "include"
        }).then(res => res.json())
            .then((data) => setRequests(data))
            .catch((error) => console.log(error))
    }

    function loadMyRequests(){
        if(user === null) return;
        fetch(`http://localhost:8080/mediator/${user.username}`,{
            credentials: "include"
        }).then(res => res.json())
            .then((data) => setRequests(data))
            .catch((error) => console.log(error));
    }

    useEffect(() => (filter === "*") ?  loadRequests()  : loadMyRequests(),
        [user, requests, filter, loadMyRequests]);

    if(user === null)
        return (<></>)

    for(const req of requests) {
        cards.push(
            <div className="column is-half" key={req.id}>
                { <ConflictCard request={req}/> }
            </div>
        );
    }
    return (
        <div className="container mt-5">
            <FilterBox setFilter={setFilter}/>
            <h1 className="title">Dashboard Mediatore</h1>
            <div className="columns is-multiline">
                { cards }
            </div>
        </div>
    )
}