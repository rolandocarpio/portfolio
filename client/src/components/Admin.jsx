import React, { useState, useEffect, useCallback } from "react";
import useSound from "use-sound";
import highlight from "/sounds/ui_pipboy_highlight.wav";
import enter from "/sounds/ui_hacking_charenter_01.wav";
import axios from "axios";
import Footer from "./Footer";
import "../styles.css";

const SESSION_KEY = "admin_secret";

const serverBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

function authHeaders(secret) {
    return { Authorization: `Bearer ${secret}` };
}

export default function Admin() {
    const [play] = useSound(highlight, { volume: 0.25 });
    const [playEnter] = useSound(enter, { volume: 0.25 });

    const [secret, setSecret] = useState(() => sessionStorage.getItem(SESSION_KEY) || "");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionError, setActionError] = useState(null);

    const fetchEntries = useCallback(async (s) => {
        setLoading(true);
        setActionError(null);
        try {
            const res = await axios.get(`${serverBase}/api/admin/guestbook`, {
                headers: authHeaders(s),
            });
            setEntries(res.data);
            setLoggedIn(true);
            sessionStorage.setItem(SESSION_KEY, s);
        } catch (err) {
            if (err?.response?.status === 401) {
                setLoginError("ACCESS DENIED — invalid secret");
                sessionStorage.removeItem(SESSION_KEY);
            } else {
                setLoginError("FAILED TO CONNECT TO SERVER");
            }
            setLoggedIn(false);
        } finally {
            setLoading(false);
        }
    }, []);

    // Auto-login if session has a cached secret
    useEffect(() => {
        const cached = sessionStorage.getItem(SESSION_KEY);
        if (cached) fetchEntries(cached);
    }, [fetchEntries]);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError(null);
        playEnter();
        fetchEntries(secret);
    };

    const handleApprove = async (id) => {
        playEnter();
        try {
            const res = await axios.post(
                `${serverBase}/api/admin/guestbook/${id}/approve`,
                {},
                { headers: authHeaders(secret) }
            );
            setEntries(prev => prev.map(e => e.id === id ? res.data : e));
        } catch {
            setActionError("APPROVE FAILED");
        }
    };

    const handleDelete = async (id) => {
        playEnter();
        try {
            await axios.delete(`${serverBase}/api/admin/guestbook/${id}`, {
                headers: authHeaders(secret),
            });
            setEntries(prev => prev.filter(e => e.id !== id));
        } catch {
            setActionError("DELETE FAILED");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem(SESSION_KEY);
        setSecret("");
        setLoggedIn(false);
        setEntries([]);
    };

    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };

    const pending = entries.filter(e => !e.approved);
    const approved = entries.filter(e => e.approved);

    return (
        <div className="screen admin-screen">
            <div className="main">
                <div className="header">
                    <h1>ADMIN // GUESTBOOK REVIEW</h1>
                </div>
                <hr />

                {!loggedIn ? (
                    <form className="admin-login" onSubmit={handleLogin}>
                        <p className="about-bio">&gt; RESTRICTED AREA — authenticate to continue.</p>
                        <div className="admin-login-field">
                            <label className="stat-label">SECRET.....:</label>
                            <input
                                className="guestbook-input"
                                type="password"
                                value={secret}
                                onChange={e => setSecret(e.target.value)}
                                placeholder="enter admin secret"
                                autoComplete="current-password"
                                autoFocus
                            />
                        </div>
                        <div className="admin-login-actions">
                            <button
                                type="submit"
                                className="guestbook-submit"
                                disabled={!secret || loading}
                                onMouseEnter={() => play()}
                            >
                                {loading ? "[AUTHENTICATING...]" : "[AUTHENTICATE]"}
                            </button>
                        </div>
                        {loginError && <p className="guestbook-status guestbook-status--err">{loginError}</p>}
                    </form>
                ) : (
                    <>
                        <div className="admin-toolbar">
                            <span className="about-bio">&gt; ACCESS GRANTED — {pending.length} pending</span>
                            <button
                                className="guestbook-submit admin-logout"
                                onClick={handleLogout}
                                onMouseEnter={() => play()}
                            >
                                [LOGOUT]
                            </button>
                        </div>
                        {actionError && <p className="guestbook-status guestbook-status--err">{actionError}</p>}

                        <div className="admin-entries">
                            {pending.length > 0 && (
                                <section>
                                    <p className="stat-label">&gt; PENDING ({pending.length})</p>
                                    {pending.map(entry => (
                                        <div key={entry.id} className="guestbook-entry admin-entry--pending">
                                            <div className="guestbook-entry-header">
                                                <span className="guestbook-entry-name">[{entry.name}]</span>
                                                <span className="guestbook-entry-date">{formatDate(entry.timestamp)}</span>
                                            </div>
                                            <p className="guestbook-entry-message">{entry.message}</p>
                                            <div className="admin-entry-actions">
                                                <button
                                                    className="guestbook-submit admin-btn-approve"
                                                    onClick={() => handleApprove(entry.id)}
                                                    onMouseEnter={() => play()}
                                                >
                                                    [APPROVE]
                                                </button>
                                                <button
                                                    className="guestbook-submit admin-btn-reject"
                                                    onClick={() => handleDelete(entry.id)}
                                                    onMouseEnter={() => play()}
                                                >
                                                    [REJECT]
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            )}

                            {approved.length > 0 && (
                                <section>
                                    <p className="stat-label">&gt; APPROVED ({approved.length})</p>
                                    {approved.map(entry => (
                                        <div key={entry.id} className="guestbook-entry admin-entry--approved">
                                            <div className="guestbook-entry-header">
                                                <span className="guestbook-entry-name">[{entry.name}]</span>
                                                <span className="guestbook-entry-date">{formatDate(entry.timestamp)}</span>
                                            </div>
                                            <p className="guestbook-entry-message">{entry.message}</p>
                                            <div className="admin-entry-actions">
                                                <button
                                                    className="guestbook-submit admin-btn-reject"
                                                    onClick={() => handleDelete(entry.id)}
                                                    onMouseEnter={() => play()}
                                                >
                                                    [REMOVE]
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            )}

                            {entries.length === 0 && (
                                <p className="about-bio">NO ENTRIES IN THE SYSTEM.</p>
                            )}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}
