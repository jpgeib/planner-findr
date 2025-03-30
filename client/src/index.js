import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </Router>
);

reportWebVitals();
