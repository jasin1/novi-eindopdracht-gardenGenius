import './App.css'
import Home from './pages/home/home.jsx'
import {Routes, Route} from "react-router-dom";

function App() {


    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>


        </>
    )
}

export default App
