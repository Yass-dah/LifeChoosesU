export type ConflictType = "FAMILIARE" | "SCOLASTICO" | "LAVORATIVO" | "SOCIALE" | "ALTRO";

export type UrgencyLevel = "BASSA" | "MEDIA" | "ALTA";

export function getUrgColor(urgency: UrgencyLevel) {
    switch(urgency){
        case "MEDIA":
            return "is-warning";
            break;
        case "ALTA":
            return "is-danger";
            break;
        default:
            return "is-white";
            break;
    }
}

export type ConflictStatus = "IN_ATTESA" | "IN_GESTIONE" | "RISOLTO";