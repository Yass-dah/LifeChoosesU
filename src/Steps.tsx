import './App.css'

function StepCard(action: string, description: string){
    return (
        <div className="step-card">
            <h3>{ action }</h3>
            <p>{ description }</p>
        </div>
    )
}

export function Steps(){
    const steps = [];
    steps.push(StepCard("Segnala un conflitto",
        "Racconta la situazione in sicurezza e anonimato"));
    steps.push(StepCard("Ricevi supporto",
        "I mediatori risponderanno e guideranno la mediazione"));
    steps.push(StepCard("Risolvi il conflitto",
        "Collabora con i mediatori per una soluzione pacifica"));
    return (
        <section className="steps">
            { steps }
        </section>
    )
}