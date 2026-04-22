import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { EventForm } from '@/components/admin/EventForm'
import { hasDatabase, getAllEvents } from '@/lib/events'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { createEventAction, deleteEventAction, logoutAction } from './actions'

export const metadata: Metadata = {
  title: 'Admin | No Bull Line Dancers',
}

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login')
  }

  const events = await getAllEvents()
  const databaseReady = hasDatabase()

  return (
    <main className="min-h-screen bg-espresso py-14">
      <div className="section-shell max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-4">Admin</p>
            <h1 className="font-serif text-5xl font-black text-gold">Shows & classes</h1>
          </div>
          <form action={logoutAction}>
            <button type="submit" className="btn-secondary">
              Sign out
            </button>
          </form>
        </div>

        {!databaseReady && (
          <p className="mb-8 rounded-sm border border-gold bg-oak p-5 font-sans text-sm leading-7 text-parchment">
            Firebase environment variables are not set, so the site is showing seed data and editing is disabled.
            Add your Firebase service account settings in your hosting environment to save changes.
          </p>
        )}

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-sm border border-saddle bg-oak p-6 card-glow">
            <h2 className="mb-6 font-serif text-3xl font-black text-gold">Add an event</h2>
            <EventForm action={createEventAction} submitLabel="Add event" disabled={!databaseReady} />
          </section>

          <section className="rounded-sm border border-saddle bg-oak p-6 card-glow">
            <h2 className="mb-6 font-serif text-3xl font-black text-gold">Current events</h2>
            <div className="grid gap-4">
              {events.map((event) => (
                <article key={event.id} className="grid gap-4 border border-saddle bg-espresso p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="font-sans text-[11px] font-black uppercase tracking-[0.16em] text-leather">
                      {event.eventDate} / {event.published ? 'Published' : 'Hidden'}
                    </p>
                    <h3 className="mt-2 font-sans text-sm font-black uppercase tracking-[0.12em] text-gold">{event.title}</h3>
                    <p className="mt-2 font-sans text-sm leading-6 text-parchment">
                      {event.location}{event.note ? ` / ${event.note}` : ''}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/admin/events/${event.id}`} className="btn-secondary min-h-0 px-4 py-2">
                      Edit
                    </Link>
                    <form action={deleteEventAction}>
                      <input type="hidden" name="id" value={event.id} />
                      <button type="submit" className="btn-secondary min-h-0 px-4 py-2" disabled={!databaseReady}>
                        Delete
                      </button>
                    </form>
                  </div>
                </article>
              ))}
              {events.length === 0 && (
                <p className="font-sans text-sm leading-7 text-leather">No events have been added yet.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
