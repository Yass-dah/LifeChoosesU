import type {User} from "../data/data-model.ts";
import {createContext} from "react";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserAuth = createContext<AuthContextType>({
    user: null,
    setUser: () => {}
});