import type { PublicEvent } from '@/lib/events'

type EventFormProps = {
  action: (formData: FormData) => Promise<void>
  event?: PublicEvent
  submitLabel: string
  disabled?: boolean
}

export function EventForm({ action, event, submitLabel, disabled = false }: EventFormProps) {
  return (
    <form action={action} className="grid gap-5">
      {event && <input type="hidden" name="id" value={event.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date" htmlFor="eventDate">
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            required
            defaultValue={event?.eventDate}
            disabled={disabled}
            className="admin-input"
          />
        </Field>

        <Field label="Title" htmlFor="title">
          <input
            id="title"
            name="title"
            required
            defaultValue={event?.title}
            disabled={disabled}
            className="admin-input"
          />
        </Field>
      </div>

      <Field label="Location" htmlFor="location">
        <input
          id="location"
          name="location"
          required
          defaultValue={event?.location}
          disabled={disabled}
          className="admin-input"
        />
      </Field>

      <Field label="Schedule note" htmlFor="note">
        <input
          id="note"
          name="note"
          placeholder="Time and info (ie 6p members only)"
          defaultValue={event?.note}
          disabled={disabled}
          className="admin-input"
        />
      </Field>

      <label className="flex items-center gap-3 font-sans text-sm font-bold text-parchment">
        <input
          type="checkbox"
          name="published"
          defaultChecked={event?.published ?? true}
          disabled={disabled}
          className="h-5 w-5 accent-gold"
        />
        Show this event publicly
      </label>

      <button type="submit" className="btn-primary w-full sm:w-fit" disabled={disabled}>
        {submitLabel}
      </button>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="grid gap-2">
      <span className="font-sans text-[11px] font-black uppercase tracking-[0.16em] text-leather">{label}</span>
      {children}
    </label>
  )
}
