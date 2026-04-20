import './App.css'
import {type ConflictType, type UrgencyLevel, getUrgColor} from "./data/types.ts";

import {useContext, useState} from "react";
import * as React from "react";
import {UserAuth} from "./context/userAuth.tsx";
import type {Country} from "./data/data-model.ts";

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
                        <h3 className="title is-5">{ country.name + " " + country.flag }</h3>
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
                        <img src={`/countries/${country.name}.jpg`} alt={ country.name } />
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
                        }}>Visualizza dettagli</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function getCards(category: categories, setter: pageProps){
    const mainContent = [];
    if(category === "country"){
        /* fatta a mano solo per migliore visualizzazione con immagini scaricate, possibile iterarlo(map) */
        mainContent.push(<CountryCard key={0} country={{name: "Italia", flag: "🇮🇹"}} setter={setter} />);
        mainContent.push(<CountryCard key={1} country={{name: "Ucraina", flag: "🇺🇦"}} setter={setter} />);
        mainContent.push(<CountryCard key={2} country={{name: "Palestina", flag: "🇵🇸"}} setter={setter} />);
        mainContent.push(<CountryCard key={3} country={{name: "Libano", flag: "🇱🇧"}} setter={setter} />);
        mainContent.push(<CountryCard key={4} country={{name: "Siria", flag: "🇸🇾"}} setter={setter}/>);
        mainContent.push(<CountryCard key={5} country={{name: "Sudan", flag: "🇸🇩"}} setter={setter} />);
        mainContent.push(<CountryCard key={6} country={{name: "Afghanistan", flag: "🇦🇫"}} setter={setter} />);
        mainContent.push(<CountryCard key={7} country={{name: "Iran", flag: "🇮🇷"}} setter={setter} />);
        mainContent.push(<CountryCard key={8} country={{name: "Yemen", flag: "🇾🇪"}} setter={setter}/>);
        mainContent.push(<CountryCard key={9} country={{name: "Libia", flag: "🇱🇾"}} setter={setter}/>);
        mainContent.push(<CountryCard key={10} country={{name: "Cuba", flag: "🇨🇺"}} setter={setter}/>);
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