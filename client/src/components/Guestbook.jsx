import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import highlight from "/sounds/ui_pipboy_highlight.wav";
import enter from "/sounds/ui_hacking_charenter_01.wav";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import "../styles.css";

export default function Guestbook() {
    const [play] = useSound(highlight, { volume: 0.25 });
    const [playEnter] = useSound(enter, { volume: 0.25 });
    const [entries, setEntries] = useState([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const serverBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    const apiBase = serverBase || '';

    useEffect(() => {
        axios.get(`${apiBase}/api/guestbook`)
            .then(res => {
                setEntries(res.data);
                setLoading(false);
            })
            .catch(() => {
                setFetchError("FAILED TO RETRIEVE ENTRIES");
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        setStatus("sending");
        playEnter();

        try {
            const res = await axios.post(`${apiBase}/api/guestbook`, {
                name: name.trim(),
                message: message.trim(),
            });
            setEntries(prev => [res.data, ...prev]);
            setName("");
            setMessage("");
            setStatus("success");
            setTimeout(() => setStatus(null), 3000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus(null), 3000);
        }
    };

    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };

    return (
        <div className="screen guestbook-screen">
            <div className="main">
                <div className="header">
                    <h1>GUESTBOOK</h1>
                </div>
                <hr />
                <p className="about-bio">&gt; VAULT VISITOR LOG — Leave a message for the record.</p>

                <form className="guestbook-form" onSubmit={handleSubmit}>
                    <div className="guestbook-inputs">
                        <div className="guestbook-field">
                            <label className="stat-label">DESIGNATION.:</label>
                            <input
                                className="guestbook-input"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="your name"
                                maxLength={50}
                                disabled={status === "sending"}
                                autoComplete="off"
                            />
                        </div>
                        <div className="guestbook-field">
                            <label className="stat-label">MESSAGE.....:</label>
                            <textarea
                                className="guestbook-input guestbook-textarea"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="leave a message..."
                                maxLength={280}
                                rows={2}
                                disabled={status === "sending"}
                            />
                        </div>
                    </div>
                    <div className="guestbook-form-footer">
                        <button
                            type="submit"
                            className="guestbook-submit"
                            disabled={!name.trim() || !message.trim() || status === "sending"}
                            onMouseEnter={() => play()}
                        >
                            {status === "sending" ? "[TRANSMITTING...]" : "[SUBMIT ENTRY]"}
                        </button>
                        {status === "success" && <span className="guestbook-status guestbook-status--ok">ENTRY RECORDED.</span>}
                        {status === "error" && <span className="guestbook-status guestbook-status--err">TRANSMISSION FAILED.</span>}
                    </div>
                </form>

                <hr />

                <div className="guestbook-entries">
                    {loading && <p className="about-bio">RETRIEVING ENTRIES...</p>}
                    {fetchError && <p className="about-bio">{fetchError}</p>}
                    {!loading && !fetchError && entries.length === 0 && (
                        <p className="about-bio">NO ENTRIES FOUND. BE THE FIRST TO SIGN IN.</p>
                    )}
                    {entries.map(entry => (
                        <div key={entry.id} className="guestbook-entry">
                            <div className="guestbook-entry-header">
                                <span className="guestbook-entry-name">[{entry.name}]</span>
                                <span className="guestbook-entry-date">{formatDate(entry.timestamp)}</span>
                            </div>
                            <p className="guestbook-entry-message">{entry.message}</p>
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
