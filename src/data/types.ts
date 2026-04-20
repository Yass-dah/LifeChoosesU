export type ConflictType = "FAMILIARE" | "SCOLASTICO" | "LAVORATIVO" | "SOCIALE" | "ALTRO";

export type UrgencyLevel = "BASSA" | "MEDIA" | "ALTA";

export function getUrgColor(urgency: UrgencyLevel) {
    switch(urgency){
        case "MEDIA":
            return "is-warning";
        case "ALTA":
            return "is-danger";
        default:
            return "is-white";
    }
}

export type ConflictStatus = "IN_ATTESA" | "IN_GESTIONE" | "RISOLTO";

export function getStatusClean(s: ConflictStatus) {
    switch(s) {
        case "RISOLTO":
            return s;
        case "IN_GESTIONE":
            return "IN GESTIONE";
        default:
            return "IN ATTESA";
    }
}