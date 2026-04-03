import {ConflictModel, type HelpRequest, type Mediator, type Requester} from "./data-model.ts";

// Utenti
export const mediators: Mediator[] = [
    { id: 1, name: "Alice Rossi", email: "alice@lcu.org", role: "MEDIATORE", assignedConflicts: [] },
    { id: 2, name: "Marco Bianchi", email: "marco@lcu.org", role: "MEDIATORE", assignedConflicts: [] },
    { id: 3, name: "Sara Verdi", email: "sara@lcu.org", role: "MEDIATORE", assignedConflicts: [] }
];

export const requesters: Requester[] = [
    { id: 10, name: "Luca Neri", email: "luca@example.com", role: "RICHIEDENTE" },
    { id: 11, name: "Elena Gialli", email: "elena@example.com", role: "RICHIEDENTE" },
    { id: 12, name: "Francesco Blu", email: "francesco@example.com", role: "RICHIEDENTE" }
];

// Richieste di aiuto
const helpRequests: HelpRequest[] = [
    {
        id: 101,
        title: "Disaccordi familiari",
        location: "Roma",
        description: "Discussioni continue in famiglia con escalation di tensione",
        type: "FAMILIARE",
        urgency: "ALTA",
        status: "IN ATTESA",
        country: "Italia",
        requesterId: 10,
        anonymous: false
    },
    {
        id: 102,
        title: "Bullismo scolastico",
        location: "Milano",
        description: "Problemi tra studenti con episodi di esclusione sociale",
        type: "SCOLASTICO",
        urgency: "MEDIA",
        status: "IN ATTESA",
        country: "Italia",
        requesterId: 11,
        anonymous: true
    },
    {
        id: 103,
        title: "Conflitto lavorativo",
        location: "Napoli",
        description: "Difficoltà nella gestione dei turni di lavoro",
        type: "LAVORATIVO",
        urgency: "BASSA",
        status: "IN ATTESA",
        country: "Italia",
        requesterId: 12,
        anonymous: false
    },
    {
        id: 104,
        title: "Tensioni civili",
        location: "Kiev",
        description: "Situazione instabile a causa di conflitto armato",
        type: "SOCIALE",
        urgency: "ALTA",
        status: "IN ATTESA",
        country: "Ucraina",
        requesterId: 10,
        anonymous: true
    },
    {
        id: 105,
        title: "Conflitto territoriale",
        description: "Problemi tra comunità locali",
        type: "SOCIALE",
        urgency: "MEDIA",
        status: "IN ATTESA",
        country: "Palestina",
        requesterId: 11,
        anonymous: false
    },
    {
        id: 106,
        title: "Crisi politica",
        description: "Tensioni civili e manifestazioni",
        type: "SOCIALE",
        urgency: "ALTA",
        status: "IN ATTESA",
        country: "Libano",
        requesterId: 12,
        anonymous: true
    },
    {
        id: 107,
        title: "Guerra civile",
        description: "Conflitto interno con emergenza umanitaria",
        type: "SOCIALE",
        urgency: "ALTA",
        status: "IN ATTESA",
        country: "Siria",
        requesterId: 10,
        anonymous: false
    },
    {
        id: 108,
        title: "Disordini interni",
        description: "Proteste e instabilità politica",
        type: "SOCIALE",
        urgency: "MEDIA",
        status: "IN ATTESA",
        country: "Sudan",
        requesterId: 11,
        anonymous: true
    },
    {
        id: 109,
        title: "Conflitti tribali",
        description: "Tensioni tra comunità locali",
        type: "SOCIALE",
        urgency: "BASSA",
        status: "IN ATTESA",
        country: "Afghanistan",
        requesterId: 12,
        anonymous: false
    },
    {
        id: 110,
        title: "Conflitti sociali",
        description: "Problemi interni con escalation locale",
        type: "SOCIALE",
        urgency: "MEDIA",
        status: "IN ATTESA",
        country: "Iran",
        requesterId: 10,
        anonymous: true
    }
];

// Creazione modello
export const conflictModel = new ConflictModel(helpRequests);

// Esempio assegnazione a mediatori
conflictModel.assignRequest(101, 1); // Alice prende in carico richiesta 101
conflictModel.assignRequest(104, 2); // Marco prende in carico richiesta 104
conflictModel.assignRequest(107, 3); // Sara prende in carico richiesta 107