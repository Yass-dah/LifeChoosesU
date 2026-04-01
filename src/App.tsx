import './App.css'
import {Footer} from "./Footer.tsx";
import {Navbar} from "./Navbar.tsx";
import {Home} from "./Home.tsx";
import {Steps} from "./Steps.tsx";

function App() {
  return (
    <>
      <div id="app">
        <Navbar />
        <Home />
        <Steps />
        <Footer />
      </div>
    </>
  )
}

export default App
