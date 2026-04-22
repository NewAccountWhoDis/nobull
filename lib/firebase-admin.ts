import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

function serviceAccountConfigured() {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY,
  )
}

export function hasFirebaseConfig() {
  return (
    serviceAccountConfigured() ||
    Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS) ||
    Boolean(process.env.FIREBASE_CONFIG)
  )
}

export function getFirebaseAdminDb() {
  if (!hasFirebaseConfig()) {
    return null
  }

  if (!getApps().length) {
    if (serviceAccountConfigured()) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      })
    } else {
      initializeApp({
        credential: applicationDefault(),
      })
    }
  }

  return getFirestore()
}
