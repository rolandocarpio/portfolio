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
                            Frontend developer based in Los Angeles, CA. I love playing Fallout, but Overwatch will always have a special place in my heart. I nerd out when playing competitive Overwatch and have a deep appreciation for the design and polish of the game. I try to bring that same level of care and attention to detail to my work as a developer, crafting clean and engaging user experiences. When I'm not coding, you can find me hiking in the mountains, exploring streetwear fashion, or indulging in my love for hot dogs.
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
                                <span className="stat-value">B.S. Computer Science — Cal Poly Pomona</span>
                            </div>
                            <div className="about-stat">
                                <span className="stat-label">INTERESTS...:</span>
                                <span className="stat-value">Gaming / Hiking / Streetwear / Hot Dogs</span>
                            </div>
                        </div>
                        <div className="about-skills-section">
                            <span className="stat-label">&gt; SKILLS</span>
                            <div className="about-skills">
                                {["JavaScript", "React", "Node.js", "Express", "MongoDB", "HTML", "CSS", "PHP", "WordPress", "Shopify", "Figma", "Git"].map((s) => (
                                    <span className="skill-tag" key={s}>{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <motion.div whileHover={{scale: 1.5}} style={{transformOrigin: "top right"}} className="about-image">
                        <img src="/images/pfp.jpg" alt="Rolando Carpio profile" />
                    </motion.div>
                </div>
                <div className="about-ow-section">
                    <span className="stat-label">&gt; OVERWATCH — COMBAT PROFILE</span>
                    <div className="ow-video-wrapper">
                        <iframe
                            title="Overwatch highlight"
                            src="https://player.vimeo.com/video/1198618548?h=9139db7fb0"
                            frameBorder="0"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                            allowFullScreen
                        />
                    </div>
                    <div className="about-stats">
                        <div className="about-stat">
                            <span className="stat-label">HOURS......:</span>
                            <span className="stat-value">2,211</span>
                        </div>
                        <div className="about-stat">
                            <span className="stat-label">RANK.......:</span>
                            <span className="stat-value">Grandmaster</span>
                        </div>
                        <div className="about-stat">
                            <span className="stat-label">TOP HEROES.:</span>
                            <span className="stat-value">Illari / Pharah / Venture</span>
                        </div>
                    </div>
                </div>
                <div className="links">
                    <Link to="/" onClick={playEnter} onMouseEnter={() => play()}>[HOME]</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}