import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from './components/Header'
import HowItWorks from "./components/HowItWorks";
import Signin from "./components/Signin";

const MainRouter = () => {
    return(
        <Router>
        <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/tutorial" element={<HowItWorks />}></Route>
                <Route path="/signin" element={<Signin />}></Route>
            </Routes>
        </Router>
    )
}

export default MainRouter