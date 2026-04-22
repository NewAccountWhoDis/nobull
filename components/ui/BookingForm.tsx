'use client'

import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useState } from 'react'

export type BookingFormData = {
  name: string
  phone: string
  email: string
  eventDate: string
  eventType: string
  eventLocation: string
  guestCount: string
  notes: string
}

const EVENT_TYPES = ['Bar or Venue', 'Birthday Party', 'Corporate', 'Wedding', 'Other']

const TEXT_FIELDS: {
  name: keyof BookingFormData
  label: string
  placeholder: string
  required: boolean
  span?: number
  type?: string
}[] = [
  { name: 'name',          label: 'YOUR NAME',        placeholder: 'First & Last Name', required: true },
  { name: 'phone',         label: 'PHONE NUMBER',     placeholder: '(000) 000-0000',   required: true },
  { name: 'email',         label: 'EMAIL ADDRESS',    placeholder: 'you@email.com',    required: true, span: 2 },
  { name: 'eventDate',     label: 'EVENT DATE',       placeholder: '',                 required: true, type: 'date' },
  { name: 'eventLocation', label: 'EVENT LOCATION',   placeholder: 'City, State',      required: true },
  { name: 'guestCount',    label: 'ESTIMATED GUESTS', placeholder: 'Approx. number',   required: false },
]

const inputClass =
  'w-full min-h-12 rounded-sm border border-saddle bg-oak px-4 py-3 text-sm text-parchment outline-none transition-colors placeholder:text-saddle focus:border-gold'

export function BookingForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>()

  const onSubmit = async (data: BookingFormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'booking', ...data }).toString(),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-sm border border-gold bg-oak px-6 py-14 text-center card-glow"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold font-serif text-3xl text-gold" aria-hidden="true">
          OK
        </div>
        <h3 className="mb-3 font-serif text-3xl font-black text-gold">Request sent.</h3>
        <p className="font-sans text-sm text-leather">We'll get back to you within 24 hours.</p>
      </motion.div>
    )
  }

  return (
    <form
      name="booking"
      method="POST"
      action="/book"
      data-netlify="true"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-sm border border-saddle bg-espresso p-4 card-glow sm:p-6"
    >
      <input type="hidden" name="form-name" value="booking" />
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {TEXT_FIELDS.map((field, i) => (
          <motion.div
            key={field.name}
            className={field.span === 2 ? 'md:col-span-2' : ''}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <label htmlFor={field.name} className="mb-2 block font-sans text-[10px] font-black uppercase tracking-[0.16em] text-leather">
              {field.label}{field.required && ' *'}
            </label>
            <input
              {...register(field.name, {
                required: field.required ? `${field.label} is required` : false,
              })}
              id={field.name}
              type={field.type ?? 'text'}
              placeholder={field.placeholder}
              className={inputClass}
            />
            {errors[field.name] && (
              <p className="mt-1 text-xs text-red-400">{errors[field.name]?.message}</p>
            )}
          </motion.div>
        ))}

        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: TEXT_FIELDS.length * 0.05 }}
        >
          <label htmlFor="eventType" className="mb-2 block font-sans text-[10px] font-black uppercase tracking-[0.16em] text-leather">
            EVENT TYPE *
          </label>
          <select
            {...register('eventType', { required: 'Event type is required' })}
            id="eventType"
            className={inputClass}
          >
            <option value="">Select event type...</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.eventType && (
            <p className="mt-1 text-xs text-red-400">{errors.eventType.message}</p>
          )}
        </motion.div>

        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (TEXT_FIELDS.length + 1) * 0.05 }}
        >
          <label htmlFor="notes" className="mb-2 block font-sans text-[10px] font-black uppercase tracking-[0.16em] text-leather">
            ADDITIONAL NOTES
          </label>
          <textarea
            {...register('notes')}
            id="notes"
            placeholder="Tell us anything else about your event..."
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </motion.div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full pulse-cta disabled:opacity-60 sm:w-auto"
        >
          {status === 'loading' ? 'SENDING...' : 'SEND MY REQUEST'}
        </button>

        {status === 'error' && (
          <p className="mt-3 text-xs text-red-400">
            Something went wrong. Please call 845-416-3403 directly.
          </p>
        )}

        <p className="mt-4 font-sans text-xs tracking-wide text-saddle">
          Or call us directly: 845-416-3403
        </p>
      </div>
    </form>
  )
}
