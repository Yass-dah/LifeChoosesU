import './App.css'

function App() {
  return (
    <>
      <div id="app-wrapper">
        <div className="navbar">
          <h1 className="title m-2">LifeChoosesU</h1>
          <div className="nav-buttons">
            <button className="button is-warning mx-4">Home</button>
            <button className="button is-light is-outlined">Login</button>
          </div>
        </div>

        <section className="hero">
          <h2 className="title has-text-primary-dark">AIUTA A RISOLVERE CONFLITTI O RICEVI SUPPORTO</h2>
          <div className="hero-buttons">
            <button className="button">Chiedi supporto</button>
            <button className="button">Accedi come mediatore</button>
          </div>
          <div className="explore-button">
            <button className="button is-success mx-4">Esplora🌏</button>
          </div>
        </section>

        <section className="steps">
          <div className="step-card">
            <h3>Segnala un conflitto</h3>
            <p>Racconta la situazione in sicurezza e anonimato</p>
          </div>
          <div className="step-card">
            <h3>Ricevi supporto</h3>
            <p>I mediatori risponderanno e guideranno la mediazione</p>
          </div>
          <div className="step-card">
            <h3>Risolvi il conflitto</h3>
            <p>Collabora con i mediatori per una soluzione pacifica</p>
          </div>
        </section>

        <footer>
          <p className="has-text-primary-dark">© LifeChoosesU | piattaforma non-profit per aiutare chi non ha voce</p>
        </footer>
      </div>
    </>
  )
}

export default App
