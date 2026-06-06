import './App.css'
import {type ConflictStatus, type ConflictType, getUrgColor, type UrgencyLevel} from "./data/types.ts";
import type {Country, HelpRequest} from "./data/data-model.ts";
import {useContext, useEffect, useState} from "react";
import { UserAuth } from "./context/userAuth.tsx";
import { CountriesContext, getFlag } from "./context/countries.tsx";

type dashProps = {
    setSelectedRequest: (req: HelpRequest) => void,
    dashFilter: "*" | "MIE";
    setPage: (page: string) => void;
    countryFilter: Country | "";
    typeFilter: ConflictType | "";
    urgencyFilter: UrgencyLevel | "";
}

type modelFilter = {
    type: ConflictType | "",
    urgency: UrgencyLevel | "",
    status: ConflictStatus | "",
    country: Country | "";
}

function ConflictCard({request, dashProps}: { request: HelpRequest, dashProps: dashProps}) {
    const { user } = useContext(UserAuth);
    const { countries } = useContext(CountriesContext);
    const urgClass = ["tag","mb-2"];
    urgClass.push(getUrgColor(request.urgency));
    const reqDone = ((request.status === "IN_GESTIONE" && request.mediator !== user?.username) || request.status === "RISOLTO");
    const chosable = reqDone ? "disabled" : "";
    return (
        <div className={"box conflict-card urgent " + chosable}>
            <h3 className="title is-5">{ request.title }</h3>
            <span className={ urgClass.join(" ") }>{ request.urgency } URGENZA</span>
            <p><strong>Luogo:</strong> { request.location + " " + getFlag(countries, request.country as never) }</p>
            <p className="mt-2">{ request.description }</p>
            <button className="button is-link is-light mt-3" disabled={reqDone}
            onClick={ () => {
                dashProps.setSelectedRequest(request)
                dashProps.setPage("help") }}>
                { (request.status === "IN_ATTESA") ? "Intervieni" :
                    ((request.status === "IN_GESTIONE") ? "In gestione da " +
                        ((request.mediator === user?.username) ? "te" : request.mediator)
                        : "Risolto da " + ((request.mediator === user?.username) ? "te" : request.mediator))}
            </button>
        </div>
    )
}

function FilterBox({ dashFilter, setFilter, modelFilter, setModelFilter }: {
    dashFilter: "*" | "MIE",
    setFilter: (filter: "*" | "MIE") => void,
    modelFilter: modelFilter,
    setModelFilter: (value: modelFilter) => void}) {
    const { countries } = useContext(CountriesContext);
    return (
        <div className="box mb-4">
            <div className="columns is-multiline">
                <div className="column is-3">
                    <label className="label">Tipo</label>
                    <div className="select is-fullwidth">
                        <select value={modelFilter.type}
                            onChange={ (e) =>
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
                        <select value={modelFilter.urgency}
                            onChange={ (e) =>
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
                        <select value={modelFilter.status}
                            onChange={ (e) =>
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
                </div><div className="column is-3">
                <label className="label">Paese</label>
                <div className="select is-fullwidth">
                    <select value={modelFilter.country !== "" ? modelFilter.country.name : ""}
                        onChange={(e) =>
                            setModelFilter({
                                type: modelFilter.type,
                                urgency: modelFilter.urgency,
                                status: modelFilter.status,
                                country: countries.find(c => c.name === e.target.value) || ""
                            })
                        }
                    >
                        <option value="">Tutti</option>
                        {countries.map((c) => (
                            <option key={c.name} value={c.name}>
                                {c.name + " " + c.flag}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
                <div className="column is-4">
                    <label className="label">Visualizza</label>
                    <div className="control">
                        <label className="radio mr-3">
                            <input className="mr-2" type="radio" name="filter" onChange={ () => setFilter("*") }
                                   checked={dashFilter === "*"}/>
                            Tutte
                        </label>
                        <label className="radio" >
                            <input className="mr-2" type="radio" name="filter" onChange={ () => setFilter("MIE") }
                                   checked={dashFilter === "MIE"}/>
                            Solo le mie mediazioni
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Dashboard(dashProps: dashProps) {
    const [ modelFilter, setModelFilter ] = useState<modelFilter>({type: dashProps.typeFilter,
        urgency: dashProps.urgencyFilter,
        status: "",
        country: dashProps.countryFilter});
    const [ dashFilter, setDashFilter ] = useState<"*" | "MIE">(dashProps.dashFilter);
    const [ requests, setRequests ] = useState<HelpRequest[]>([]);
    const { user } = useContext(UserAuth);

    useEffect(() => {
        if (user === null) return;
        let valid = true;

        const loadRequests = () => {
            fetch("http://localhost:8080/help-requests", {
                credentials: "include"
            }).then(res => res.json())
                .then((data) => {
                    if (valid) setRequests(data);
                }).catch(err => console.log("Loading requests: " + err));
        };

        const loadMyRequests = () => {
            fetch(`http://localhost:8080/mediator/${user.username}`, {
                credentials: "include"
            }).then(res => res.json())
                .then((data) => {
                    if (valid) setRequests(data);
                }).catch(err => console.log("Loading my requests: " + err));
        };

        if (dashFilter === "MIE") {
            loadMyRequests();
        } else {
            loadRequests();
        }

        return () => { valid = false };
    }, [dashFilter, user]);

    if(user === null || user.role !== "MEDIATORE")
        return (<p className="mt-4 has-text-centered">UNAUTHORIZED</p>)

    const filteredRequests = requests.filter(req =>
        (modelFilter.type === "" || modelFilter.type === req.type) &&
        (modelFilter.urgency === "" || modelFilter.urgency === req.urgency) &&
        (modelFilter.status === "" || modelFilter.status === req.status) &&
        (modelFilter.country === "" || modelFilter.country.name === req.country as never)
    );
    return (
        <div className="container mt-5">
            <FilterBox dashFilter={dashFilter} setFilter={setDashFilter} modelFilter={modelFilter} setModelFilter={setModelFilter} />
            <h1 className="title">{ dashFilter === "*" ? "Esplora" : "La mia dashboard"}</h1>
            <div className="columns is-multiline">
                { !filteredRequests.length ? <p className="is-size-6 ml-4 mb-5 mt-5">Nessun conflitto disponibile</p> : null }
                { filteredRequests.map(req => (
                    <div className="column is-half" key={req.id}>
                        <ConflictCard request={req} dashProps={dashProps}/>
                    </div>
                ))}
            </div>
        </div>
    )
}