import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import AnimatedRoutes from "./AnimatedRoutes";
import Border from "./Border";
import "../styles.css"

export default function App() {
    return (
        <Router>
            <div className="border">
                <Border />
                <AnimatedRoutes />
            </div>
        </Router>
    );
}
