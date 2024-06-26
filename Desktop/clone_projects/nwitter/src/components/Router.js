//import { useState } from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn}) => {
    //const [isLoggedIn, setIsLoggedIn] = useState(true);
    return(
        <Router>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ? (
                    <>
                    <Route exact path="/"
                    element = {<Home />}></Route>
                    <Route exact path="/profile" element={ <Profile/>} />
                    </>
                ) : (
                    <Route exact path="/" element = {<Auth/>}>
                    </Route>
                )}
                <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>

            </Routes>
        </Router>
    );
};

export default AppRouter;