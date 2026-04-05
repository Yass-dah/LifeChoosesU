import './App.css'

function StepCard({action, description}: { action: string; description: string }){
    return (
        <div className="step-card">
            <h3>{ action }</h3>
            <p>{ description }</p>
        </div>
    )
}

export function Steps(){
    const steps = [];
    steps.push(<StepCard action={"Segnala un conflitto"}
        description={"Racconta la situazione in sicurezza e anonimato"}/>);
    steps.push(<StepCard action={"Ricevi supporto"}
        description={"I mediatori risponderanno e guideranno la mediazione"}/>);
    steps.push(<StepCard action={"Risolvi il conflitto"}
        description={"Collabora con i mediatori per una soluzione pacifica"}/>);
    return (
        <section className="steps">
            { steps }
        </section>
    )
}