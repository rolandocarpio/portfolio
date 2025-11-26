import React from "react";
import useSound from "use-sound";
import { motion } from "framer-motion";
import highlight from "/sounds/ui_pipboy_highlight.wav";
import enter from "/sounds/ui_hacking_charenter_01.wav";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../styles.css";

export default function About() {
    const [play, { stop }] = useSound(highlight, { volume: 0.25 });
    const [playEnter] = useSound(enter, { volume: 0.25 });

    return (
        <div className="screen about-screen">
            <div className="main">
                <div className="header">
                    <h1>ABOUT ME</h1>
                </div>
                <hr />
                <div className="about-section">
                    <div className="about-text">
                        <pre className="about-pre">
                            {`NAME: Rolando Carpio
LOCATION: Los Angeles, CA
SKILLS: JavaScript, React, Node.js, Express, MongoDB, HTML, CSS
EDUCATION: B.S. in Computer Science (in progress) - Cal Poly Pomona
HOBBIES: Gaming, Hiking, Streetwear, Hot Dogs
`}
                        </pre>
                    </div>
                    <motion.div whileHover={{scale: 1.5}} className="about-image">
                        <img src="/images/pfp.jpg" alt="Rolando Carpio profile" />
                    </motion.div>
                </div>
                <div className="links">
                    <Link to="/" onClick={playEnter} onMouseEnter={() => play()}>[HOME]</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}