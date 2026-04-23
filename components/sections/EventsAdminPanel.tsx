import type { PublicEvent } from '@/lib/events'
import {
  createInlineEventAction,
  deleteInlineEventAction,
  exitInlineAdminModeAction,
  updateInlineEventAction,
} from '@/app/admin/actions'

export function EventsAdminPanel({
  events,
  databaseReady,
}: {
  events: PublicEvent[]
  databaseReady: boolean
}) {
  return (
    <div className="flex flex-col gap-5">
      {!databaseReady && (
        <p className="rounded-sm border border-gold bg-espresso p-4 font-sans text-sm leading-6 text-parchment">
          Firebase is not connected, so editing is disabled.
        </p>
      )}

      {events.map((event) => (
        <article key={event.id} className="rounded-sm border border-saddle bg-espresso p-5 card-glow">
          <form action={updateInlineEventAction} className="grid gap-4">
            <input type="hidden" name="id" value={event.id} />
            <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
              <label className="grid gap-2">
                <span className="admin-label">Date</span>
                <input
                  name="eventDate"
                  type="date"
                  required
                  defaultValue={event.eventDate}
                  disabled={!databaseReady}
                  className="admin-input"
                />
              </label>
              <label className="grid gap-2">
                <span className="admin-label">Title</span>
                <input
                  name="title"
                  required
                  defaultValue={event.title}
                  disabled={!databaseReady}
                  className="admin-input"
                />
              </label>
            </div>
            <label className="grid gap-2">
              <span className="admin-label">Location</span>
              <input
                name="location"
                required
                defaultValue={event.location}
                disabled={!databaseReady}
                className="admin-input"
              />
            </label>
            <label className="grid gap-2">
              <span className="admin-label">Note</span>
              <input
                name="note"
                defaultValue={event.note}
                disabled={!databaseReady}
                className="admin-input"
              />
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-3 font-sans text-sm font-bold text-parchment">
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={event.published}
                  disabled={!databaseReady}
                  className="h-5 w-5 accent-gold"
                />
                Public
              </label>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary min-h-0 px-4 py-2" disabled={!databaseReady}>
                  Save
                </button>
                <button
                  type="submit"
                  formAction={deleteInlineEventAction}
                  className="btn-secondary min-h-0 px-4 py-2"
                  disabled={!databaseReady}
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </article>
      ))}

      <article className="rounded-sm border border-gold bg-espresso p-5 card-glow">
        <h3 className="mb-4 font-sans text-sm font-black uppercase tracking-[0.12em] text-gold">Add a date</h3>
        <form action={createInlineEventAction} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
            <label className="grid gap-2">
              <span className="admin-label">Date</span>
              <input name="eventDate" type="date" required disabled={!databaseReady} className="admin-input" />
            </label>
            <label className="grid gap-2">
              <span className="admin-label">Title</span>
              <input name="title" required disabled={!databaseReady} className="admin-input" />
            </label>
          </div>
          <label className="grid gap-2">
            <span className="admin-label">Location</span>
            <input name="location" required disabled={!databaseReady} className="admin-input" />
          </label>
          <label className="grid gap-2">
            <span className="admin-label">Note</span>
            <input name="note" placeholder="Time and info (ie 6p members only)" disabled={!databaseReady} className="admin-input" />
          </label>
          <label className="flex items-center gap-3 font-sans text-sm font-bold text-parchment">
            <input type="checkbox" name="published" defaultChecked disabled={!databaseReady} className="h-5 w-5 accent-gold" />
            Public
          </label>
          <button type="submit" className="btn-primary w-full sm:w-fit" disabled={!databaseReady}>
            Add
          </button>
        </form>
      </article>

      <form action={exitInlineAdminModeAction}>
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[#b3261e] px-6 py-3 text-center font-sans text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#8f1f19]"
        >
          Save and exit admin mode
        </button>
      </form>
    </div>
  )
}
