import './App.css'

import { type Country, getFlag } from "./data/countries.ts";
import {type ConflictType, type UrgencyLevel, getUrgColor} from "./data/types.ts";

import {useContext, useState} from "react";
import * as React from "react";
import {UserAuth} from "./context/userAuth.tsx";

type categories = "country" | "type" | "urgency";

type pageProps = {
    setPage: (page: string) => void;
}

type groupProp = {
    setGroup: (group: categories) => void
}

function FilterBox(setter: groupProp){
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setter.setGroup(e.target.value as categories);
    };

    return (
        <div className="box mb-4">
            <div className="columns is-multiline">
                <div className="column is-4">
                    <label className="label">Raggruppa per</label>
                    <div className="select is-fullwidth">
                        <select onChange={ handleChange } defaultValue="country">
                            <option value="country">Paese</option>
                            <option value="type">Tipo</option>
                            <option value="urgency">Urgenza</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CountryCard({country, setter}: { country: Country, setter: pageProps }){
    const { user } = useContext(UserAuth);
    return (
        <div className="column is-half">
            <div className="country-card box">
                <div className="country-content">
                    <div className="country-info">
                        <h3 className="title is-5">{ country + " " + getFlag(country) }</h3>
                        <p>Conflitti sociali e episodi di bullismo</p>
                        <button className="button is-light mt-3"
                            onClick={() =>
                                { if(user === null || user.role !== "MEDIATORE")
                                    setter.setPage("loginM");
                                else
                                    setter.setPage("dashboard");
                                }}>Visualizza dettagli</button>
                    </div>
                    <div className="country-image">
                        <img src={`/countries/${country}.jpg`} alt={ country } />
                    </div>
                </div>
            </div>
        </div>
    )
}

function TypeCard({type, setter}: { type: ConflictType, setter: pageProps}){
    const { user } = useContext(UserAuth);
    return (
        <div className="column is-half">
            <div className="type-card box">
                <div className="type-content">
                    <div className="type-info">
                        <h3 className="title is-5">{ type }</h3>
                        <p>Conflitti sociali e episodi di bullismo</p>
                        <button className="button is-light mt-3"
                        onClick={() =>
                        { if(user === null || user.role !== "MEDIATORE")
                            setter.setPage("loginM");
                        else
                            setter.setPage("dashboard");
                        }}>Visualizza dettagli</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function UrgencyCard({urgency, setter}: { urgency: UrgencyLevel, setter: pageProps }){
    const { user } = useContext(UserAuth);
    return (
        <div className="column is-half">
            <div className="urgency-card box ">
                <div className="urgency-content">
                    <div className="urgency-info">
                        <h3 className="title is-5">{ urgency }</h3>
                        <p>Conflitti sociali e episodi di bullismo</p>
                        <button className={"button is-light mt-3 " + getUrgColor(urgency)}
                        onClick={ () =>
                        { if(user === null || user.role !== "MEDIATORE")
                                setter.setPage("loginM");
                            else
                                setter.setPage("dashboard");
                        }}>
                            Visualizza dettagli</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function getCards(category: categories, setter: pageProps){
    const mainContent = [];
    if(category === "country"){
        mainContent.push(<CountryCard country={"Italia"} setter={setter} />);
        mainContent.push(<CountryCard country={"Ucraina"} setter={setter} />);
        mainContent.push(<CountryCard country={"Palestina"} setter={setter} />);
        mainContent.push(<CountryCard country={"Libano"} setter={setter} />);
        mainContent.push(<CountryCard country={"Siria"} setter={setter}/>);
        mainContent.push(<CountryCard country={"Sudan"} setter={setter} />);
        mainContent.push(<CountryCard country={"Afghanistan"} setter={setter} />);
        mainContent.push(<CountryCard country={"Iran"} setter={setter} />);
        mainContent.push(<CountryCard country={"Yemen"} setter={setter}/>);
        mainContent.push(<CountryCard country={"Libia"} setter={setter}/>);
        mainContent.push(<CountryCard country={"Cuba"} setter={setter}/>);
    }
    else if(category === "type"){
        mainContent.push(<TypeCard type={"FAMILIARE"} setter={setter} />);
        mainContent.push(<TypeCard type={"SCOLASTICO"} setter={setter} />);
        mainContent.push(<TypeCard type={"LAVORATIVO"} setter={setter} />);
        mainContent.push(<TypeCard type={"SOCIALE"} setter={setter} />);
        mainContent.push(<TypeCard type={"ALTRO"} setter={setter} />);
    }
    else if(category === "urgency"){
        mainContent.push(<UrgencyCard urgency={"ALTA"} setter={setter} />)
        mainContent.push(<UrgencyCard urgency={"MEDIA"} setter={setter} />)
        mainContent.push(<UrgencyCard urgency={"BASSA"} setter={setter} />);
    }
    return mainContent;
}

export function Explore(setter: pageProps){
    const [group, setGroup] = useState<categories>("country");
    return (
        <div className="explore-container container mt-5">
            <FilterBox setGroup={ setGroup }/>
            <div className="columns is-multiline">
                { getCards(group, setter) }
            </div>
        </div>
    )
}