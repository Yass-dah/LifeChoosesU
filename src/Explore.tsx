import './App.css'
import {type ConflictType, type UrgencyLevel, getUrgColor} from "./data/types.ts";

import {useContext, useState} from "react";
import * as React from "react";
import {UserAuth} from "./context/userAuth.tsx";
import type {Country} from "./data/data-model.ts";
import {CountriesContext} from "./context/countries.tsx";

type categories = "country" | "type" | "urgency";

type pageProps = {
    setPage: (page: string) => void;
    setCountryFilter: (filter: Country | "") => void;
    setTypeFilter: (filter: ConflictType | "") => void;
    setUrgencyFilter: (filter: UrgencyLevel | "") => void;
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
                        <h2 className="title is-5 mb-1">{ country.name + " " + country.flag }</h2>
                        <p className="is-size-6">
                            <span className="has-text-primary">{ (country.conflictQt ? "•" : "") } </span>
                            { country.conflictQt + " " +
                                (country.conflictQt === 1 ? "conflitto presente" : "conflitti presenti")}</p>
                        <hr/>
                        <p className="is-size-6"><strong>Continente :</strong> { country.continent }</p>
                        <p className="is-size-6"><strong>Lingua :</strong> { country.language }</p>
                        <p className="is-size-6"><strong>Numero d'emergenza :</strong> { country.emergencyNumber }</p>
                        <button className="button is-light mt-3"
                            onClick={() =>
                                { if(user === null || user.role !== "MEDIATORE")
                                    setter.setPage("loginM");
                                else{
                                    setter.setTypeFilter("");
                                    setter.setUrgencyFilter("");
                                    setter.setCountryFilter(country);
                                    setter.setPage("dashboard*");
                                }}}>Visualizza dettagli</button>
                    </div>
                    <div className="country-image">
                        <img src={`/countries/${country.name}.jpg`} alt={ country.name }/>
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
                        else{
                            setter.setUrgencyFilter("");
                            setter.setCountryFilter("");
                            setter.setTypeFilter(type);
                            setter.setPage("dashboard*");
                        }}}>Visualizza dettagli</button>
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
                            else{
                                setter.setTypeFilter("");
                                setter.setCountryFilter("");
                                setter.setUrgencyFilter(urgency);
                                setter.setPage("dashboard*");
                        }}}>Visualizza dettagli</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function getCards(countries: Country[], category: categories, setter: pageProps){
    const mainContent = [];
    if(category === "country"){
        countries.sort((a, b) => b.conflictQt - a.conflictQt).map((c) =>
            mainContent.push(<CountryCard key={c.name} country={c} setter={setter}/>));
    }
    else if(category === "type"){
        mainContent.push(<TypeCard key={11} type={"FAMILIARE"} setter={setter} />);
        mainContent.push(<TypeCard key={12} type={"SCOLASTICO"} setter={setter} />);
        mainContent.push(<TypeCard key={13} type={"LAVORATIVO"} setter={setter} />);
        mainContent.push(<TypeCard key={14} type={"SOCIALE"} setter={setter} />);
        mainContent.push(<TypeCard key={15} type={"ALTRO"} setter={setter} />);
    }
    else if(category === "urgency"){
        mainContent.push(<UrgencyCard key={16} urgency={"ALTA"} setter={setter} />)
        mainContent.push(<UrgencyCard key={17} urgency={"MEDIA"} setter={setter} />)
        mainContent.push(<UrgencyCard key={18} urgency={"BASSA"} setter={setter} />);
    }
    return mainContent.length == 0 ? <p className="is-size-6 ml-4 mb-5 mt-5">Nessuna categoria disponibile</p> :
        mainContent;
}

export function Explore(setter: pageProps){
    const { countries } = useContext(CountriesContext);
    const [group, setGroup] = useState<categories>("country");
    return (
        <div className="explore-container container mt-5">
            <FilterBox setGroup={ setGroup }/>
            <div className="columns is-multiline">
                { getCards(countries, group, setter) }
            </div>
        </div>
    )
}