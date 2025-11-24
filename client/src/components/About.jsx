import React from "react";
import useSound from "use-sound";
import highlight from "../../public/sounds/ui_pipboy_highlight.wav";
import enter from "../../public/sounds/ui_hacking_charenter_01.wav";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../styles.css";

export default function About() {
    const [play, { stop }] = useSound(highlight, { volume: 0.25 });
    const [playEnter] = useSound(enter, { volume: 0.25 });

    return (
        <div className="screen">
            <div className="main">
                <div className="header">
                    <h1>About Me</h1>
                </div>
                <p>This is the About Me page.</p>
                <div className="links">
                    <Link to="/" onClick={playEnter} onMouseEnter={() => play()}>[Home]</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}