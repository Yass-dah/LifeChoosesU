import './App.css'

export function Home(){
    return (
        <section className="hero">
            <h2 className="title has-text-primary-dark">AIUTA A RISOLVERE CONFLITTI O RICEVI SUPPORTO</h2>
            <div className="hero-buttons">
                <button className="button">Chiedi supporto</button>
                <button className="button">Accedi come mediatore</button>
            </div>
            <div className="explore-button">
                <button className="explore button is-success mx-4">Esplora🌏</button>
            </div>
        </section>
    )
}