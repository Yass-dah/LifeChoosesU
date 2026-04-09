import './App.css'

type pageProps = {
    setPage: (page: string) => void;
}

export function Home(setter: pageProps){
    return (
        <section className="hero">
            <h2 className="title has-text-primary-dark">AIUTA A RISOLVERE CONFLITTI O RICEVI SUPPORTO</h2>
            <div className="hero-buttons">
                <button className="button"
                    onClick={() => setter.setPage("support")}>Chiedi supporto</button>
                <button className="button"
                    onClick={() => setter.setPage("dashboard")}>Accedi come mediatore</button>
            </div>
            <div className="explore-button">
                <button className="explore button is-success mx-4"
                    onClick={() => setter.setPage("explore")}>ESPLORA 🌏</button>
            </div>
        </section>
    )
}