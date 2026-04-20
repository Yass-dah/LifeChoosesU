import type { Country } from "../data/data-model.ts";
import {createContext} from "react";

interface CountriesContextType {
    countries: Country[];
    setCountries: (countries: Country[]) => void;
}

export const CountriesContext = createContext<CountriesContextType>({
    countries: [],
    setCountries: () => {}
});

export function getFlag(countries: Country[], country: string){
    return countries.find(c => c.name === country)?.flag;
}