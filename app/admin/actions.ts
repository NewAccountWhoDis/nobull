'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  clearAdminSession,
  isAdminAuthenticated,
  recordFailedAdminAttempt,
  setAdminSession,
  verifyAdminPassword,
} from '@/lib/admin-auth'
import { createEvent, deleteEvent, updateEvent } from '@/lib/events'

const LOCKOUT_URL = 'https://www.youtube.com/watch?v=3UC96g1A4Nc'

export type HiddenAdminLoginState = {
  message?: string
}

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim()
}

function getEventInput(formData: FormData) {
  const eventDate = getString(formData, 'eventDate')
  const title = getString(formData, 'title')
  const location = getString(formData, 'location')
  const note = getString(formData, 'note')
  const published = formData.get('published') === 'on'

  if (!eventDate || !title || !location) {
    throw new Error('Date, title, and location are required.')
  }

  return { eventDate, title, location, note, published }
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login')
  }
}

function refreshEventPages() {
  revalidatePath('/')
  revalidatePath('/classes')
  revalidatePath('/admin')
}

export async function loginAction(formData: FormData) {
  const password = getString(formData, 'password')

  if (!verifyAdminPassword(password)) {
    redirect('/admin/login?error=1')
  }

  await setAdminSession()
  redirect('/admin')
}

export async function hiddenAdminLoginAction(
  _state: HiddenAdminLoginState,
  formData: FormData,
): Promise<HiddenAdminLoginState> {
  const password = getString(formData, 'password')

  if (!verifyAdminPassword(password)) {
    const attempts = await recordFailedAdminAttempt()

    if (attempts >= 2) {
      redirect(LOCKOUT_URL)
    }

    return { message: 'That password did not match.' }
  }

  await setAdminSession()
  revalidatePath('/')
  redirect('/#events')
}

export async function logoutAction() {
  await clearAdminSession()
  redirect('/admin/login')
}

export async function exitInlineAdminModeAction() {
  await clearAdminSession()
  revalidatePath('/')
  redirect('/#events')
}

export async function createEventAction(formData: FormData) {
  await requireAdmin()
  await createEvent(getEventInput(formData))
  refreshEventPages()
  redirect('/admin')
}

export async function createInlineEventAction(formData: FormData) {
  await requireAdmin()
  await createEvent(getEventInput(formData))
  refreshEventPages()
  redirect('/#events')
}

export async function updateEventAction(formData: FormData) {
  await requireAdmin()
  const id = getString(formData, 'id')

  if (!id) {
    throw new Error('A valid event id is required.')
  }

  await updateEvent(id, getEventInput(formData))
  refreshEventPages()
  redirect('/admin')
}

export async function updateInlineEventAction(formData: FormData) {
  await requireAdmin()
  const id = getString(formData, 'id')

  if (!id) {
    throw new Error('A valid event id is required.')
  }

  await updateEvent(id, getEventInput(formData))
  refreshEventPages()
  redirect('/#events')
}

export async function deleteEventAction(formData: FormData) {
  await requireAdmin()
  const id = getString(formData, 'id')

  if (!id) {
    throw new Error('A valid event id is required.')
  }

  await deleteEvent(id)
  refreshEventPages()
  redirect('/admin')
}

export async function deleteInlineEventAction(formData: FormData) {
  await requireAdmin()
  const id = getString(formData, 'id')

  if (!id) {
    throw new Error('A valid event id is required.')
  }

  await deleteEvent(id)
  refreshEventPages()
  redirect('/#events')
}
