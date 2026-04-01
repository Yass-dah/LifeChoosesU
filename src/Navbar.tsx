import './App.css'

export function Navbar() {
    return (
        <div className="navbar">
            <h1 className="title m-2">LifeChoosesU</h1>
            <div className="nav-buttons">
                <button className="button is-warning mx-4">Home</button>
                <button className="button is-light is-outlined">Login</button>
            </div>
        </div>
    )
}