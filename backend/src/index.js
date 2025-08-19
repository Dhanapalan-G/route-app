import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fetch from 'node-fetch';
import { initFirebaseAdmin, verifyFirebaseToken } from './auth.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

initFirebaseAdmin();

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Optimized Route Backend' });
});

// Example public echo endpoint
app.post('/api/echo', (req, res) => {
  res.json({ youSent: req.body || null, at: new Date().toISOString() });
});

// Example secure endpoint
app.get('/api/secure/profile', verifyFirebaseToken, (req, res) => {
  res.json({ uid: req.user?.uid, email: req.user?.email, claims: req.user });
});

// Proxy OSRM route to avoid CORS issues (optional)
app.get('/api/route', verifyFirebaseToken, async (req, res) => {
  try {
    const { a, b } = req.query;
    if (!a || !b) return res.status(400).json({ error: 'Missing a or b query param' });
    const host = process.env.OSRM_HOST || 'https://router.project-osrm.org';
    const url = `${host}/route/v1/driving/${a};${b}?overview=full&geometries=geojson&alternatives=true&steps=true`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    console.error('OSRM proxy error', e);
    res.status(500).json({ error: 'OSRM proxy failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
