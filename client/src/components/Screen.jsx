import React from "react";
import { Link } from "react-router-dom";
import "../styles.css"
import Footer from "./Footer";

export default function Screen() {
    return (
        <div className="screen">
            <div className="main">
                <div className="nav">
                    <h1>Welcome to ROBCO Industries (TM) Termlink</h1>
                </div>
                <div className="links">
                    <span><Link to="/about">[About Me]</Link></span>
                    <span><Link to="/projects">[Projects]</Link></span>
                    <span><Link to="/contact">[Contact]</Link></span>
                </div>
            </div>
            <div className="cursor-area">
                <h3>&gt;<span className="cursor-blinker">&#9646;</span></h3>
            </div>
            <Footer />
        </div>
    );
}