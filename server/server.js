import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const GUESTBOOK_FILE = join(__dirname, 'guestbook.json');

function loadEntries() {
    try {
        if (existsSync(GUESTBOOK_FILE)) {
            return JSON.parse(readFileSync(GUESTBOOK_FILE, 'utf8'));
        }
    } catch {}
    return [];
}

function saveEntries(entries) {
    writeFileSync(GUESTBOOK_FILE, JSON.stringify(entries, null, 2));
}

function requireAdmin(req, res, next) {
    const auth = req.headers['authorization'] || '';
    const secret = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

const app = express();
app.use(cors());
app.use(express.json());

// Health route
app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

// Proxy route for weather data. Server-side keeps the API key secret and avoids CORS issues.
app.get('/api/weather', async (req, res) => {
    const q = req.query.q || 'auto:ip';
    const apiUrl = process.env.WEATHER_API_BASE;

    if (!process.env.WEATHER_API_KEY) {
        return res.status(500).json({ error: 'Missing WEATHER_API_KEY on server' });
    }

    try {
        const response = await axios.get(apiUrl, {
            params: {
                key: process.env.WEATHER_API_KEY,
                q,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather:', error?.message || error);
        res.status(500).json({ error: error?.message || 'Unknown error' });
    }
});

// Public: only approved entries
app.get('/api/guestbook', (req, res) => {
    res.json(loadEntries().filter(e => e.approved));
});

// Public: submit new entry (starts unapproved)
app.post('/api/guestbook', (req, res) => {
    const { name, message } = req.body || {};
    const trimmedName = String(name || '').trim().slice(0, 50);
    const trimmedMessage = String(message || '').trim().slice(0, 280);

    if (!trimmedName || !trimmedMessage) {
        return res.status(400).json({ error: 'Name and message are required' });
    }

    const entry = {
        id: Date.now(),
        name: trimmedName,
        message: trimmedMessage,
        timestamp: new Date().toISOString(),
        approved: false,
    };

    const entries = loadEntries();
    entries.unshift(entry);
    saveEntries(entries);

    res.status(201).json(entry);
});

// Admin: all entries
app.get('/api/admin/guestbook', requireAdmin, (req, res) => {
    res.json(loadEntries());
});

// Admin: approve an entry
app.post('/api/admin/guestbook/:id/approve', requireAdmin, (req, res) => {
    const id = Number(req.params.id);
    const entries = loadEntries();
    const entry = entries.find(e => e.id === id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    entry.approved = true;
    saveEntries(entries);
    res.json(entry);
});

// Admin: delete an entry
app.delete('/api/admin/guestbook/:id', requireAdmin, (req, res) => {
    const id = Number(req.params.id);
    const entries = loadEntries();
    const idx = entries.findIndex(e => e.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Entry not found' });
    entries.splice(idx, 1);
    saveEntries(entries);
    res.json({ ok: true });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
