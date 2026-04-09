import './App.css'

import { type Country, getFlag } from "./data/countries.ts";
import { type ConflictType, type UrgencyLevel, getUrgColor } from "./data/types.ts";

import { useState } from "react";
import * as React from "react";

type categories = "country" | "type" | "urgency";

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

function CountryCard({country}: { country: Country }){
    return (
        <div className="column is-half">
            <div className="country-card box">
                <div className="country-content">
                    <div className="country-info">
                        <h3 className="title is-5">{ country + " " + getFlag(country) }</h3>
                        <p>Conflitti sociali e episodi di bullismo</p>
                        <button className="button is-light mt-3">Visualizza dettagli</button>
                    </div>
                    <div className="country-image">
                        <img src={`/countries/${country}.jpg`} alt={ country } />
                    </div>
                </div>
            </div>
        </div>
    )
}

function TypeCard({type}: { type: ConflictType }){
    return (
        <div className="column is-half">
            <div className="type-card box">
                <div className="type-content">
                    <div className="type-info">
                        <h3 className="title is-5">{ type }</h3>
                        <p>Conflitti sociali e episodi di bullismo</p>
                        <button className="button is-light mt-3">Visualizza dettagli</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function UrgencyCard({urgency}: { urgency: UrgencyLevel }){
    return (
        <div className="column is-half">
            <div className="urgency-card box ">
                <div className="urgency-content">
                    <div className="urgency-info ">
                        <h3 className="title is-5">{ urgency }</h3>
                        <p>Conflitti sociali e episodi di bullismo</p>
                        <button className={"button is-light mt-3 " + getUrgColor(urgency)}>
                            Visualizza dettagli</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function getCards(category: categories){
    const mainContent = [];
    if(category === "country"){
        mainContent.push(<CountryCard country={"Italia"}/>);
        mainContent.push(<CountryCard country={"Ucraina"}/>);
        mainContent.push(<CountryCard country={"Palestina"}/>);
        mainContent.push(<CountryCard country={"Libano"}/>);
        mainContent.push(<CountryCard country={"Siria"}/>);
        mainContent.push(<CountryCard country={"Sudan"}/>);
        mainContent.push(<CountryCard country={"Afghanistan"}/>);
        mainContent.push(<CountryCard country={"Iran"}/>);
        mainContent.push(<CountryCard country={"Yemen"}/>);
        mainContent.push(<CountryCard country={"Libia"}/>);
        mainContent.push(<CountryCard country={"Cuba"}/>);
    }
    else if(category === "type"){
        mainContent.push(<TypeCard type={"FAMILIARE"}/>);
        mainContent.push(<TypeCard type={"SCOLASTICO"}/>);
        mainContent.push(<TypeCard type={"LAVORATIVO"}/>);
        mainContent.push(<TypeCard type={"SOCIALE"}/>);
        mainContent.push(<TypeCard type={"ALTRO"}/>);
    }
    else if(category === "urgency"){
        mainContent.push(<UrgencyCard urgency={"ALTA"}/>)
        mainContent.push(<UrgencyCard urgency={"MEDIA"}/>)
        mainContent.push(<UrgencyCard urgency={"BASSA"}/>);
    }
    return mainContent;
}

export function Explore(){
    const [group, setGroup] = useState<categories>("country");
    return (
        <div className="explore-container container mt-5">
            <FilterBox setGroup={ setGroup }/>
            <div className="columns is-multiline">
                { getCards(group) }
            </div>
        </div>
    )
}