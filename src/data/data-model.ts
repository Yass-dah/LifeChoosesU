export interface HelpRequest {
    id: number;
    title: string;
    location?: string;
    description: string;
    type: ConflictType;
    urgency: UrgencyLevel;
    status: ConflictStatus;
    requesterId: number;
    mediatorId?: number;
    createdAt: string;
    anonymous: boolean;
}

export type ConflictType = "FAMILIARE" | "SCOLASTICO" | "LAVORATIVO" | "SOCIALE" | "ALTRO";

export type UrgencyLevel = "BASSA" | "MEDIA" | "ALTA";

export type ConflictStatus = "IN ATTESA" | "IN GESTIONE" | "RISOLTO";

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'RICHIEDENTE' | 'MEDIATORE';
}

export interface Mediator extends User {
    role: 'MEDIATORE';
    assignedConflicts: number[];
}

export interface Requester extends User {
    role: 'RICHIEDENTE';
}