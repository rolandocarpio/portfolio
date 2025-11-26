import React from "react";
import useSound from "use-sound";
import highlight from "/sounds/ui_pipboy_highlight.wav";
import enter from "/sounds/ui_hacking_charenter_01.wav";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../styles.css";

export default function Contact() {
    const [play, { stop }] = useSound(highlight, { volume: 0.25 });
    const [playEnter] = useSound(enter, { volume: 0.25 });

    return (
        <div className="screen contact-screen">
            <div className="main">
                <div className="header">
                    <h1>CONTACT ME</h1>
                </div>
                <hr />
                <div className="links">
                    <a href="https://drive.google.com/file/d/1sgXtUVwlDL2-W6CrKjvkq3owXDDZQiSa/view?usp=sharing" target="_blank" rel="noopener noreferrer" onClick={playEnter} onMouseEnter={() => play()}>[RESUME]</a>
                    <a href="https://www.linkedin.com/in/rolando-c/" target="_blank" rel="noopener noreferrer" onClick={playEnter} onMouseEnter={() => play()}>[LINKEDIN]</a>
                    <a href="https://www.github.com/rolandocarpio" target="_blank" rel="noopener noreferrer" onClick={playEnter} onMouseEnter={() => play()}>[GITHUB]</a>
                    <a href="mailto:rcarpiodev@gmail.com" onClick={playEnter} onMouseEnter={() => play()}>[EMAIL ME]</a>
                    <Link to="/" className="home-link" onClick={playEnter} onMouseEnter={() => play()}>[HOME]</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}