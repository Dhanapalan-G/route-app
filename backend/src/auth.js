import admin from 'firebase-admin';

let appInitialized = false;

export function initFirebaseAdmin() {
  if (appInitialized) return;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (!projectId || !clientEmail || !privateKey) {
    console.warn('[Auth] Firebase admin env not fully set. Secure endpoints will reject.');
    return;
  }
  // Handle escaped newlines
  privateKey = privateKey.replace(/\\n/g, '\n');
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey
    })
  });
  appInitialized = true;
}

export async function verifyFirebaseToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }
    const idToken = parts[1];
    if (!admin.apps.length) {
      return res.status(500).json({ error: 'Auth not initialized on server' });
    }
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('verifyFirebaseToken error:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
