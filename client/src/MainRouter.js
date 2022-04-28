import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from './components/Header'
import HowItWorks from "./components/HowItWorks";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import AccountDetails from "./components/AccountDetails";
import ChangePassword from "./components/ChangePassword";
import UserStats from "./components/UserStats";
import Logout from "./components/Logout";
import MainPage from "./components/MainPage";
import Player from "./components/AudioPlayer";
import ErrorPage from "./components/ErrorPage";
const MainRouter = () => {
    return(
        <Router>
        <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/tutorial" element={<HowItWorks />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/userProfile" element={<UserProfile />}></Route>
                <Route path="/accountDetails" element={<AccountDetails />}></Route>
                <Route path="/changePassword" element={<ChangePassword />}></Route>
                <Route path="/userStats" element={<UserStats />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="/musicLibrary" element={<MainPage />}></Route>
                <Route path="/playFile" element={<Player />}></Route>
                <Route path="/error" element={<ErrorPage />}></Route>
            </Routes>
        </Router>
    )
}

export default MainRouter