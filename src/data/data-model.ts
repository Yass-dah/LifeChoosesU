import {type ConflictType, type UrgencyLevel, type ConflictStatus} from "./types.ts";
import {type Country} from "./countries.ts";

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'RICHIEDENTE' | 'MEDIATORE';
}

export interface HelpRequest {
    id: number;
    title: string;
    location?: string;
    description: string;
    type: ConflictType;
    urgency: UrgencyLevel;
    status: ConflictStatus;
    country: Country;
    requesterId: number;
    mediatorId?: number;
    anonymous: boolean;
    aidAnswer?: string;
}

export interface Mediator extends User {
    role: 'MEDIATORE';
    assignedConflicts: number[];
}

export interface Requester extends User {
    role: 'RICHIEDENTE';
}

export class ConflictModel {
    private requests: { [id: number]: HelpRequest } = {};

    constructor(requests: HelpRequest[]) {
        requests.forEach(r => this.requests[r.id] = r);
    }

    // Getters
    getAllRequests(): HelpRequest[] {
        return Object.values(this.requests);
    }

    getRequest(id: number): HelpRequest | undefined{
        return this.requests[id];
    }

    getByType(type: ConflictType): HelpRequest[]{
        return Object.values(this.requests).filter(r => r.type === type);
    }

    getByUrgency(urgency: UrgencyLevel): HelpRequest[]{
        return Object.values(this.requests).filter(r => r.urgency === urgency);
    }

    getByStatus(status: ConflictStatus): HelpRequest[]{
        return Object.values(this.requests).filter(r => r.status === status);
    }

    getByCountry(country: Country): HelpRequest[]{
        return Object.values(this.requests).filter(r => r.country === country);
    }

    // Setters
    setRequest(request: HelpRequest, id: number) {
        this.requests[id] = request;
    }

    setAnonymous(requestId: number) {
        if(this.requests[requestId] !== undefined)
            this.requests[requestId].anonymous = true;
    }

    // operation methods
    addRequest(request: HelpRequest): boolean{
        if(this.requests[request.id] === undefined){
            this.requests[request.id] = request;
            return true;
        }
        return false;
    }

    removeRequest(requestId: number): boolean{
        if(this.requests[requestId] !== undefined){
            delete this.requests[requestId];
            return true;
        }
        return false;
    }

    assignRequest(requestId: number, mediator: number): boolean{
        const request = this.requests[requestId];
        if(request !== undefined){
            if(request.status === "IN ATTESA") {
                this.requests[requestId].mediatorId = mediator;
                this.requests[requestId].status = "IN GESTIONE";
                return true;
            }
        }
        return false;
    }

    resolveRequest(requestId: number): boolean{
        if(this.requests[requestId] !== undefined){
            if(this.requests[requestId].status === "IN GESTIONE") {
                this.requests[requestId].status = "RISOLTO";
                return true;
            }
        }
        return false;
    }

    recoverRequest(requestId: number, mediator: number) {
        const request = this.requests[requestId];
        if(request !== undefined){
            if(request.mediatorId === mediator) {
                this.requests[requestId].status = "IN ATTESA";
                return true;
            }
        }
        return false;
    }

    addAnswer(requestId: number, answer: string, mediator: number){
        const request = this.requests[requestId];
        if(request !== undefined){
            if(request.mediatorId === mediator && request.status === "IN GESTIONE") {
                this.requests[requestId].aidAnswer = answer;
            }
        }
    }
}