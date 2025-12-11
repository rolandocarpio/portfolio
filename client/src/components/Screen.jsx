import React, { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import highlight from "/sounds/ui_pipboy_highlight.wav";
import enter from "/sounds/ui_hacking_charenter_01.wav";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css"
import Footer from "./Footer";

export default function Screen() {
    const [play, { stop }] = useSound(highlight, { volume: 0.25 });
    const [playEnter] = useSound(enter, { volume: 0.25 });
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([]);
    const [easterEggTriggered, setEasterEggTriggered] = useState(false);
    const [showEasterEgg, setShowEasterEgg] = useState("");
    const screenRef = useRef(null);
    const navigate = useNavigate();

    // Easter eggs
    const easterEggs = {
        "help": "AVAILABLE COMMANDS:\n> ABOUT - Navigate to about section\n> PROJECTS - View projects\n> CONTACT - Get in touch\n> CLEAR - Clear terminal\n> WHOAMI - Identify user\n> STAT - Display system stats\n> HACK - Attempt vault hack...",
        "whoami": "USER: Rolando Carpio\nSTATUS: Full Stack Developer\nLOCATION: The Wasteland\nAFFILIATION: Vault 101",
        "stat": "SYSTEM STATS:\n- STRENGTH: 6/10\n- PERCEPTION: 7/10\n- ENDURANCE: 8/10\n- CHARISMA: 6/10\n- INTELLIGENCE: 8/10\n- AGILITY: 7/10\n- LUCK: 10/10",
        "hack": "INITIATING VAULT HACK SEQUENCE...\n[████████░░] 80%\n[ERROR] Admin authentication required\nHACK FAILED - Vault secure",
        "ascii": `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⠿⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣤⣤⣴⣿⠟⠁⠀⠈⠛⠿⣿⣿⣶⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢀⣴⣶⣇⠀⢀⣴⣿⠟⠉⠉⠙⠛⠁⠀⠀⠀⠀⠀⠀⠀⠈⠉⠻⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣿⡟⠙⢿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠸⣿⡇⠀⠀⠀⠀⠀⢀⡴⠶⢦⣄⣀⣤⠾⠛⠛⣧⡀⠀⠀⠀⠀⠀⠀⠈⠛⢿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⣿⣇⠀⠀⠀⠀⣴⠋⠀⠀⠀⠈⠉⠁⠀⠀⠀⠈⠻⣦⣤⡤⠶⠻⢿⣦⠀⠀⢻⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⠉⢳⣶⢶⡿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⣿⠁⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠘⣿⣄⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠄⠀⠀⠀⠀⢠⡼⠋⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢹⡿⠁⠀⢀⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⠀⠀⠠⣝⢦⡀⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣿⠇⠀⠀⠘⣿⠇⠀⠀⢀⠎⠀⠀⠀⠘⠛⠛⠿⠆⠀⠀⠀⠀⠠⣝⢧⡳⡄⣸⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⠀⠀⠀⠀⠀⠀⢠⡾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢢⣜⢷⣽⣷⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⡏⠀⠀⠀⠀⠀⠀⢿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠆⣹⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣇⠀⠀⠀⠀⠀⠀⠈⠛⠂⠀⠀⠀⠀⢠⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢸⣿⠀⠀⣾⣤⣀⣀⣀⢀⣀⣀⣀⡤⠔⠚⢿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣿⣇⠀⠻⠳⢤⣈⣉⠉⠉⠀⣀⣀⣤⠖⠋⠟⠀⠀⠀⠀⠀⠀⢀⣀⣠⣾⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠘⣿⣆⠀⠀⠀⠈⠙⣛⣛⠛⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⠿⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠘⢿⣧⡀⠀⠀⠈⠛⠛⠃⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⠻⣿⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠙⠿⣿⣶⣦⣤⣤⣤⣤⣶⣶⣿⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`,
        "vault": "╔════════════════════════════════════╗\n║  VAULT-TEC SECURITY PROTOCOL v3.2  ║\n║  Welcome Overseer!                  ║\n║  Access Level: ADMINISTRATOR        ║\n╚════════════════════════════════════╝",
        "leet": "1 4M 7H3 M0S7 3L337 H4X0R 1N 7H3 W4S73L4ND",
        "date": new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    };

    // Handle keyboard input
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Focus on input handling
            if (e.key === "Enter") {
                e.preventDefault();
                playEnter();
                processCommand(input);
            } else if (e.key === "Backspace") {
                setInput(prev => prev.slice(0, -1));
            } else if (e.key === " " || (e.key.length === 1)) {
                // Add any printable character
                setInput(prev => prev + e.key);
            } else if (e.key === "Escape") {
                // Clear on Escape
                setInput("");
                setShowEasterEgg("");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [input, playEnter]);

    // Find matching command with partial input
    const findMatchingCommand = (input) => {
        const trimmed = input.trim().toLowerCase();
        const allCommands = ["clear", "about", "projects", "contact", ...Object.keys(easterEggs)];
        
        // Exact match
        if (allCommands.includes(trimmed)) {
            return trimmed;
        }
        
        // Partial match
        const matches = allCommands.filter(cmd => cmd.startsWith(trimmed));
        return matches.length === 1 ? matches[0] : null;
    };

    const processCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        
        // Add command to history
        setHistory(prev => [...prev, `> ${cmd}`]);
        
        // Try to find matching command
        const matchedCmd = findMatchingCommand(cmd);
        
        if (trimmed === "") {
            // Do nothing for empty input
        } else if (matchedCmd === "clear") {
            setHistory([]);
            setInput("");
            setShowEasterEgg("");
        } else if (matchedCmd === "about") {
            playEnter();
            navigate("/about");
        } else if (matchedCmd === "projects") {
            playEnter();
            navigate("/projects");
        } else if (matchedCmd === "contact") {
            playEnter();
            navigate("/contact");
        } else if (matchedCmd && easterEggs[matchedCmd]) {
            setShowEasterEgg(easterEggs[matchedCmd]);
            setHistory(prev => [...prev, easterEggs[matchedCmd]]);
            setEasterEggTriggered(true);
        } else {
            // Unknown command - show suggestions
            const allCommands = ["clear", "about", "projects", "contact", ...Object.keys(easterEggs)];
            const suggestions = allCommands.filter(cmd => cmd.includes(trimmed)).slice(0, 3);
            
            if (suggestions.length > 0) {
                setHistory(prev => [...prev, `UNKNOWN COMMAND: ${cmd}\nDid you mean: ${suggestions.join(", ")}?`]);
            } else {
                setHistory(prev => [...prev, `UNKNOWN COMMAND: ${cmd}`]);
            }
        }
        
        setInput("");
    };

    // Auto-scroll to bottom of history
    useEffect(() => {
        if (screenRef.current) {
            screenRef.current.scrollTop = screenRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div className="screen" ref={screenRef}>
            <div className="main">
                <div className="header">
                    <h1>VAULT-TEC PERSONAL DATABASE INTERFACE v1.0</h1>
                </div>
                <hr />
                
                {/* History display */}
                <div style={{ 
                    flex: 1, 
                    overflowY: "auto", 
                    marginBottom: "1rem",
                    fontFamily: "Share Tech Mono, monospace",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                    fontSize: "clamp(0.7rem, 2vw, 0.95rem)",
                    lineHeight: "1.4",
                    overflowWrap: "break-word"
                }}>
                    {history.length === 0 && (
                        <div>
                            <div className="links">
                                <Link to="/about" onClick={playEnter} onMouseEnter={() => play()}>[ABOUT ME]</Link>
                                <Link to="/projects" onClick={playEnter} onMouseEnter={() => play()}>[PROJECTS]</Link>
                                <Link to="/contact" onClick={playEnter} onMouseEnter={() => play()}>[CONTACT]</Link>
                            </div>
                            <p style={{ marginTop: "1.5rem", fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)", color: "#18dc0c" }}>
                                Type HELP for available commands
                            </p>
                        </div>
                    )}
                    {history.map((line, idx) => (
                        <div key={idx}>{line}</div>
                    ))}
                </div>

                {/* Input area */}
                <div className="cursor-area">
                    <h3 style={{ 
                        margin: 0, 
                        display: "flex",
                        fontSize: "clamp(0.8rem, 2.5vw, 1.2rem)",
                        alignItems: "flex-start",
                        gap: "0.25rem"
                    }}>
                        &gt;
                        <span style={{ 
                            flex: 1, 
                            whiteSpace: "pre-wrap", 
                            wordBreak: "break-all",
                            overflowWrap: "break-word"
                        }}>
                            {input}
                        </span>
                        <span className="cursor-blinker">&#9646;</span>
                    </h3>
                </div>
            </div>
            <Footer />
        </div>
    );
}