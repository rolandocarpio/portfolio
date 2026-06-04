import React from "react";
import useSound from "use-sound";
import highlight from "/sounds/ui_pipboy_highlight.wav";
import enter from "/sounds/ui_hacking_charenter_01.wav";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../styles.css";

const projects = [
    {
        id: "weedmaps",
        file: "FILE_001",
        title: "WEEDMAPS.COM/SPORTS",
        type: "WEBSITE DEVELOPMENT",
        status: "COMPLETE",
        tech: "PHP / WORDPRESS / CSS / HTML / JS",
        description:
            "Rebuilt the sports section of Weedmaps.com, a leading cannabis industry platform, to create a more engaging and user-friendly experience for sports fans interested in cannabis-related content. New Figma designs provided by an internal design team were implemented to enhance the layout, styling, and overall user experience of the sports section.",
        url: "https://weedmaps.com/sports",
        preview: "/images/weedmaps-thumb.png",
    },
    {
        id: "uliv",
        file: "FILE_002",
        title: "ULIV.COM",
        type: "WEBSITE REDESIGN",
        status: "COMPLETE",
        tech: "PHP / WORDPRESS / CSS / HTML / JS",
        description:
            "Interior designer booking platform for homes, Airbnbs, and more. Full site redesign with improved layout, styling, and user experience.",
        url: "https://uliv.com",
        preview: "/images/uliv-preview.png",
    },
    {
        id: "teton",
        file: "FILE_003",
        title: "TETONEXPEDITIONS.COM",
        type: "WEBSITE DEVELOPMENT",
        status: "COMPLETE",
        tech: "PHP / WORDPRESS / CSS / HTML / JS",
        description:
            "Developed from designer-provided mockups, bringing the design team's vision to life for a guided wildlife van tour company operating through Grand Teton and Yellowstone National Parks.",
        url: "https://tetonexpeditions.com",
        preview: "/images/teton-preview.png",
    },
];

export default function Projects() {
    const [play] = useSound(highlight, { volume: 0.25 });
    const [playEnter] = useSound(enter, { volume: 0.25 });

    return (
        <div className="screen projects-screen">
            <div className="main">
                <div className="header">
                    <h1>PROJECTS</h1>
                </div>
                <hr />
                <div className="projects-list">
                    {projects.map((p) => (
                        <div className="project-card" key={p.id}>
                            <div className="project-card-header">
                                &gt; {p.file}: {p.title}
                            </div>
                            <div className="project-meta">
                                <span>TYPE......: {p.type}</span>
                                <br />
                                <span>STATUS....: {p.status}</span>
                                <br />
                                <span>TECH......: {p.tech}</span>
                            </div>
                            <hr />
                            {p.preview && (
                                <img
                                    src={p.preview}
                                    alt={`${p.title} preview`}
                                    className="project-preview"
                                />
                            )}
                            <p className="project-desc">{p.description}</p>
                            <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => play()}
                                onClick={playEnter}
                            >
                                [VISIT SITE]
                            </a>
                        </div>
                    ))}
                </div>
                <div className="links">
                    <Link
                        to="/"
                        onClick={playEnter}
                        onMouseEnter={() => play()}
                        className="home-link"
                    >
                        [HOME]
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}