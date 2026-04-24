import React from "react";
import useSound from "use-sound";
import highlight from "/sounds/ui_pipboy_highlight.wav";
import enter from "/sounds/ui_hacking_charenter_01.wav";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../styles.css";

const channels = [
    {
        label: "RESUME",
        href: "https://drive.google.com/file/d/1hFsbHIYC-XOQYEqTQAUfQYkYUU1y4vXA/view?usp=sharing",
        desc: "Full work history and credentials",
    },
    {
        label: "LINKEDIN",
        href: "https://www.linkedin.com/in/rolando-c/",
        desc: "Professional network profile",
    },
    {
        label: "GITHUB",
        href: "https://www.github.com/rolandocarpio",
        desc: "Code repositories and contributions",
    },
    {
        label: "EMAIL",
        href: "mailto:rcarpiodev@gmail.com",
        desc: "Direct communication channel",
    },
];

export default function Contact() {
    const [play] = useSound(highlight, { volume: 0.25 });
    const [playEnter] = useSound(enter, { volume: 0.25 });

    return (
        <div className="screen contact-screen">
            <div className="main">
                <div className="header">
                    <h1>CONTACT ME</h1>
                </div>
                <hr />
                <p className="about-bio">&gt; OPEN CHANNELS — select a link to establish connection.</p>
                <div className="contact-channels">
                    {channels.map((c) => (
                        <div className="contact-channel" key={c.label}>
                            <a
                                href={c.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => play()}
                                onClick={playEnter}
                            >
                                [{c.label}]
                            </a>
                            <span className="channel-desc">— {c.desc}</span>
                        </div>
                    ))}
                </div>
                <div className="links">
                    <Link to="/" className="home-link" onClick={playEnter} onMouseEnter={() => play()}>
                        [HOME]
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}