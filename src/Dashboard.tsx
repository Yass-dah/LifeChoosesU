import './App.css'
import {type Country, getFlag} from "./data/countries.ts";
import {type ConflictStatus, type ConflictType, getUrgColor, type UrgencyLevel} from "./data/types.ts";
import type { HelpRequest } from "./data/data-model.ts";
import {useContext, useEffect, useState} from "react";
import { UserAuth } from "./context/userAuth.tsx";

type Props = {
    setSelectedRequest: (req: HelpRequest) => void,
    setPage: (page: string) => void;
}

type modelFilter = {
    type: ConflictType | "",
    urgency: UrgencyLevel | "",
    status: ConflictStatus | "",
    country: Country | "";
}

function ConflictCard({request, setter}: { request: HelpRequest, setter: Props}) {
    const { user } = useContext(UserAuth);
    const urgClass = ["tag","mb-2"];
    urgClass.push(getUrgColor(request.urgency));
    const reqDone = ((request.status === "IN_GESTIONE" && request.mediator !== user?.username) || request.status === "RISOLTO");
    const chosable = reqDone ? "disabled" : "";
    return (
        <div className={"box conflict-card urgent " + chosable}>
            <h3 className="title is-5">{ request.title }</h3>
            <span className={ urgClass.join(" ") }>{ request.urgency } URGENZA</span>
            <p><strong>Luogo:</strong> { request.location + " " + getFlag(request.country) }</p>
            <p className="mt-2">{ request.description }</p>
            <button className="button is-link is-light mt-3" disabled={reqDone}
            onClick={ () => {
                setter.setSelectedRequest(request)
                setter.setPage("help") }}>
                { (request.status === "IN_ATTESA") ? "Intervieni" :
                    ((request.status === "IN_GESTIONE") ? "In gestione da " +
                        ((request.mediator === user?.username) ? "te" : request.mediator)
                        : "Risolto: " + request.aidAnswer)}
            </button>
        </div>
    )
}

function FilterBox({ setFilter, modelFilter, setModelFilter }: { setFilter: (filter: "*" | "MIE") => void, modelFilter: modelFilter,
    setModelFilter: (value: modelFilter) => void}) {
    return (
        <div className="box mb-4">
            <div className="columns is-multiline">
                <div className="column is-3">
                    <label className="label">Tipo</label>
                    <div className="select is-fullwidth">
                        <select onChange={ (e) =>
                            setModelFilter({type: e.target.value as ConflictType | "",
                                urgency: modelFilter.urgency,
                                status: modelFilter.status,
                                country: modelFilter.country})
                        }>
                            <option value="">Tutti</option>
                            <option value="FAMILIARE">Familiare</option>
                            <option value="SCOLASTICO">Scolastico</option>
                            <option value="LAVORATIVO">Lavorativo</option>
                            <option value="SOCIALE">Sociale</option>
                            <option value="ALTRO">Altro</option>
                        </select>
                    </div>
                </div>
                <div className="column is-3">
                    <label className="label">Urgenza</label>
                    <div className="select is-fullwidth">
                        <select onChange={ (e) =>
                            setModelFilter({type: modelFilter.type,
                                urgency: e.target.value as UrgencyLevel | "",
                                status: modelFilter.status,
                                country: modelFilter.country})
                        }>
                            <option value="">Tutte</option>
                            <option value="ALTA">Alta</option>
                            <option value="MEDIA">Media</option>
                            <option value="BASSA">Bassa</option>
                        </select>
                    </div>
                </div>
                <div className="column is-3">
                    <label className="label">Stato</label>
                    <div className="select is-fullwidth">
                        <select onChange={ (e) =>
                            setModelFilter({type: modelFilter.type,
                                urgency: modelFilter.urgency,
                                status: e.target.value as ConflictStatus | "",
                                country: modelFilter.country})
                        }>
                            <option value="">Tutti</option>
                            <option value="IN_ATTESA">In attesa</option>
                            <option value="IN_GESTIONE">In gestione</option>
                            <option value="RISOLTO">Risolto</option>
                        </select>
                    </div>
                </div>
                <div className="column is-3">
                    <label className="label">Paese</label>
                    <div className="select is-fullwidth">
                        <select onChange={ (e) =>
                            setModelFilter({type: modelFilter.type,
                                urgency: modelFilter.urgency,
                                status: modelFilter.status,
                                country: e.target.value as Country | ""})
                        }>
                            <option value="">Tutti</option>
                            <option value="Italia">Italia</option>
                            <option value="Ucraina">Ucraina</option>
                            <option value="Palestina">Palestina</option>
                            <option value="Libano">Libano</option>
                            <option value="Siria">Siria</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Iran">Iran</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Libia">Libia</option>
                            <option value="Cuba">Cuba</option>
                        </select>
                    </div>
                </div>

                <div className="column is-4">
                    <label className="label">Visualizza</label>
                    <div className="control">
                        <label className="radio mr-3">
                            <input className="mr-2" type="radio" name="filter" onClick={ () => setFilter("*") }/>
                            Tutte
                        </label>
                        <label className="radio">
                            <input className="mr-2" type="radio" name="filter" onClick={ () => setFilter("MIE") }
                            defaultChecked/>
                            Solo le mie mediazioni
                        </label>
                    </div>
                </div>
            </div>
        </div>

    )
}

export function Dashboard(setter: Props) {
    const [ modelFilter, setModelFilter ] = useState<modelFilter>({type: "", urgency: "",status: "",country: ""});
    const [ filter, setFilter ] = useState<"*" | "MIE">("MIE");
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

    useEffect(() => (filter === "MIE") ?  loadMyRequests()  : loadRequests(), [filter, user]);

    if(user === null || user.role !== "MEDIATORE")
        return (<p className="mt-4 has-text-centered">UNAUTHORIZED</p>)

    const filteredRequests = requests.filter(req =>
        (modelFilter.type === "" || modelFilter.type === req.type) &&
        (modelFilter.urgency === "" || modelFilter.urgency === req.urgency) &&
        (modelFilter.status === "" || modelFilter.status === req.status) &&
        (modelFilter.country === "" || modelFilter.country === req.country)
    );
    return (
        <div className="container mt-5">
            <FilterBox setFilter={setFilter} modelFilter={modelFilter} setModelFilter={setModelFilter} />
            <h1 className="title">{ filter === "*" ? "Esplora" : "La mia dashboard"}</h1>
            <div className="columns is-multiline">
                {filteredRequests.map(req => (
                    <div className="column is-half" key={req.id}>
                        <ConflictCard request={req} setter={setter}/>
                    </div>
                ))}
            </div>
        </div>
    )
}