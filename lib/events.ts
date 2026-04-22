import { FieldValue, type DocumentData } from 'firebase-admin/firestore'
import { getFirebaseAdminDb, hasFirebaseConfig } from './firebase-admin'

export type PublicEvent = {
  id: string
  eventDate: string
  title: string
  location: string
  note: string
  published: boolean
}

type EventInput = {
  eventDate: string
  title: string
  location: string
  note: string
  published: boolean
}

const COLLECTION_NAME = 'public_events'

const FALLBACK_EVENTS: PublicEvent[] = [
  {
    id: 'seed-wigwam-tavern',
    eventDate: '2026-04-30',
    title: 'Wigwam Tavern',
    location: 'Wigwam Tavern',
    note: 'Thursday at 6p',
    published: true,
  },
]

export function hasDatabase() {
  return hasFirebaseConfig()
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

function normalizeEvent(id: string, data: DocumentData): PublicEvent {
  return {
    id,
    eventDate: String(data.eventDate ?? ''),
    title: String(data.title ?? ''),
    location: String(data.location ?? ''),
    note: String(data.note ?? ''),
    published: Boolean(data.published),
  }
}

async function getEventCollection() {
  const db = getFirebaseAdminDb()
  if (!db) {
    return null
  }

  return db.collection(COLLECTION_NAME)
}

export async function getUpcomingEvents(limit = 3): Promise<PublicEvent[]> {
  const collection = await getEventCollection()
  if (!collection) {
    return FALLBACK_EVENTS
  }

  const snapshot = await collection.orderBy('eventDate', 'asc').get()
  const today = todayIsoDate()

  return snapshot.docs
    .map((doc) => normalizeEvent(doc.id, doc.data()))
    .filter((event) => event.published && event.eventDate >= today)
    .slice(0, limit)
}

export async function getAllEvents(): Promise<PublicEvent[]> {
  const collection = await getEventCollection()
  if (!collection) {
    return FALLBACK_EVENTS
  }

  const snapshot = await collection.orderBy('eventDate', 'asc').get()

  return snapshot.docs.map((doc) => normalizeEvent(doc.id, doc.data()))
}

export async function getEventById(id: string): Promise<PublicEvent | null> {
  const collection = await getEventCollection()
  if (!collection) {
    return FALLBACK_EVENTS.find((event) => event.id === id) ?? null
  }

  const doc = await collection.doc(id).get()
  if (!doc.exists) {
    return null
  }

  return normalizeEvent(doc.id, doc.data() ?? {})
}

export async function createEvent(input: EventInput) {
  const collection = await getEventCollection()
  if (!collection) {
    throw new Error('Firebase is required to save events.')
  }

  await collection.add({
    ...input,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
}

export async function updateEvent(id: string, input: EventInput) {
  const collection = await getEventCollection()
  if (!collection) {
    throw new Error('Firebase is required to save events.')
  }

  await collection.doc(id).update({
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  })
}

export async function deleteEvent(id: string) {
  const collection = await getEventCollection()
  if (!collection) {
    throw new Error('Firebase is required to delete events.')
  }

  await collection.doc(id).delete()
}
