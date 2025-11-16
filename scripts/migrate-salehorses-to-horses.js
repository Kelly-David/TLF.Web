/*
  Migration script: copy salehorses collection flags into horse documents
  Usage:
    - Place a Firebase service account JSON in the repository (serviceAccountKey.json)
    - npm install firebase-admin
    - node scripts/migrate-salehorses-to-horses.js
*/

const admin = require('firebase-admin');
const fs = require('fs');

if (!fs.existsSync('./serviceAccountKey.json')) {
  console.error('serviceAccountKey.json not found in project root. Provide your service account json.');
  process.exit(1);
}

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrate() {
  console.log('Starting migration: salehorses => horse flags');

  const saleSnap = await db.collection('salehorses').get();
  console.log('Found', saleSnap.size, 'salehorses documents');

  let updated = 0;

  for (const doc of saleSnap.docs) {
    const data = doc.data();

    // Determine horse id. Common fields: horseId, id, horse
    const horseId = data.horseId || data.id || data.horse;
    if (!horseId) {
      console.warn('Skipping sale doc', doc.id, 'no horse id found');
      continue;
    }

    const updates = {};
    if (data.sold === true) updates.sold = true;
    if (data.available === true) updates.available = true;

    if (Object.keys(updates).length === 0) {
      // If sale doc uses 'sold' flag implicitly (like status === 'sold') attempt to detect
      if (data.status && typeof data.status === 'string') {
        if (data.status.toLowerCase().includes('sold')) updates.sold = true;
        if (data.status.toLowerCase().includes('available')) updates.available = true;
      }
    }

    if (Object.keys(updates).length) {
      await db.collection('horse').doc(horseId).set(updates, { merge: true });
      updated++;
      console.log('Updated horse', horseId, updates);
    } else {
      console.log('No flags to update for', horseId);
    }
  }

  console.log('Migration complete. Updated', updated, 'horse documents.');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
});
