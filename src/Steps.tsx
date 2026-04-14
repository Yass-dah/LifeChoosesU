import './App.css'

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
        },
    ]

    return (
        <section className="steps">
            {steps.map((step, index) => (
                <StepCard
                    key={index}
                    action={step.action}
                    description={step.description}
                />
            ))}
        </section>
    )
}