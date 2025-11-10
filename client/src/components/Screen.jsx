import React from "react";
import "../styles.css"
import Footer from "./Footer";
import Weather from "./Weather";

export default function Screen() {
    return (
        <div className="screen">
            <div className="nav">
                <h2>Welcome to ROBCO Industries (TM) Termlink</h2>
            </div>
            <div className="bottom">
                <h3>&gt;<span className="cursor-blinker">&#9646;</span></h3>
            </div>
            <Footer />
        </div>
    );
}