import './App.css'

type Props = {
    setPage: (page: string) => void;
};

export function Navbar(setter: Props) {
    return (
        <div className="navbar">
            <h1 className="title m-2"
                onClick={() => setter.setPage("home")}>LifeChoosesU</h1>
            <div className="nav-buttons">
                <button className="button is-warning mx-4"
                        onClick={() => setter.setPage("home")}>Home</button>
                <button className="button is-light is-outlined"
                        onClick={() => setter.setPage("login")}>Login</button>
            </div>
        </div>
    )
}