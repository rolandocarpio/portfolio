import React from "react";
import useSound from "use-sound";
import highlight from "/sounds/ui_pipboy_highlight.wav";
import enter from "/sounds/ui_hacking_charenter_01.wav";
import { Link } from "react-router-dom";
import "../styles.css"
import Footer from "./Footer";

export default function Screen() {
    const [play, { stop }] = useSound(highlight, { volume: 0.25 });
    const [playEnter] = useSound(enter, { volume: 0.25 });

    return (
        <div className="screen">
            <div className="main">
                <div className="header">
                    <h1>VAULT-TEC PERSONAL DATABASE INTERFACE v1.0</h1>
                </div>
                <hr />
                <div className="links">
                    <Link to="/about" onClick={playEnter} onMouseEnter={() => play()}>[ABOUT ME]</Link>
                    <Link to="/projects" onClick={playEnter} onMouseEnter={() => play()}>[PROJECTS]</Link>
                    <Link to="/contact" onClick={playEnter} onMouseEnter={() => play()}>[CONTACT]</Link>
                </div>
            </div>
            <div className="cursor-area">
                <h3>&gt;<span className="cursor-blinker">&#9646;</span></h3>
            </div>
            <Footer />
        </div>
    );
}