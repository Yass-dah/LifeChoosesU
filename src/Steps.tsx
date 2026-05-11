import './App.css'
import {useContext} from "react";
import {UserAuth} from "./context/userAuth.tsx";

type Step = {
    action: string
    description: string
}

function StepCard({ action, description }: Step) {
    return (
        <div className="step-card">
            <h3>{action}</h3>
            <p>{description}</p>
        </div>
    )
}

export function Steps() {
    const { user } = useContext(UserAuth);

    const steps: Step[] = [
        {
            action: "Segnala un conflitto",
            description: "Racconta la situazione in sicurezza e anonimato",
        },
        {
            action: "Ricevi supporto",
            description: "I mediatori risponderanno e guideranno la mediazione",
        },
        {
            action: "Risolvi il conflitto",
            description: "Collabora con i mediatori per una soluzione pacifica",
        }]

    return (
        <section className="steps">
            { user ?
                <div className="step-card">
                    <h3 className="title is-size-4 m-1">Bentornato/a 😊 {user.username}</h3>
                </div> :
            steps.map((step, index) => (
                <StepCard
                    key={index}
                    action={step.action}
                    description={step.description}
                />
            ))}
        </section>
    )
}