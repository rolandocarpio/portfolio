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
                        <p className="about-bio">
                            Full-stack developer based in Los Angeles, currently studying Computer Science at Cal Poly Pomona.
                        </p>
                        <div className="about-stats">
                            <div className="about-stat">
                                <span className="stat-label">NAME........:</span>
                                <span className="stat-value">Rolando Carpio</span>
                            </div>
                            <div className="about-stat">
                                <span className="stat-label">LOCATION....:</span>
                                <span className="stat-value">Los Angeles, CA</span>
                            </div>
                            <div className="about-stat">
                                <span className="stat-label">EDUCATION...:</span>
                                <span className="stat-value">B.S. Computer Science (in progress) — Cal Poly Pomona</span>
                            </div>
                            <div className="about-stat">
                                <span className="stat-label">INTERESTS...:</span>
                                <span className="stat-value">Gaming / Hiking / Streetwear / Hot Dogs</span>
                            </div>
                        </div>
                        <div className="about-skills-section">
                            <span className="stat-label">&gt; SKILLS</span>
                            <div className="about-skills">
                                {["JavaScript", "React", "Node.js", "Express", "MongoDB", "HTML", "CSS", "PHP", "WordPress"].map((s) => (
                                    <span className="skill-tag" key={s}>{s}</span>
                                ))}
                            </div>
                        </div>
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