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

const EVENT_TYPES = ['Wedding', 'Birthday Party', 'Corporate', 'Bar or Venue', 'Other']

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
  'w-full bg-oak border border-saddle focus:border-gold rounded-sm px-4 py-3 text-parchment text-sm placeholder-saddle outline-none transition-colors'

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
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
        className="text-center py-16"
      >
        <div className="text-6xl mb-6">✓</div>
        <h3 className="font-serif font-black text-gold text-3xl mb-3">Request Sent!</h3>
        <p className="font-sans text-leather text-sm">We'll get back to you within 24 hours.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {TEXT_FIELDS.map((field, i) => (
          <motion.div
            key={field.name}
            className={field.span === 2 ? 'md:col-span-2' : ''}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <label className="block font-sans text-leather text-[10px] tracking-widest mb-2">
              {field.label}{field.required && ' *'}
            </label>
            <input
              {...register(field.name, {
                required: field.required ? `${field.label} is required` : false,
              })}
              type={field.type ?? 'text'}
              placeholder={field.placeholder}
              className={inputClass}
            />
            {errors[field.name] && (
              <p className="text-red-400 text-xs mt-1">{errors[field.name]?.message}</p>
            )}
          </motion.div>
        ))}

        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: TEXT_FIELDS.length * 0.05 }}
        >
          <label className="block font-sans text-leather text-[10px] tracking-widest mb-2">
            EVENT TYPE *
          </label>
          <select
            {...register('eventType', { required: 'Event type is required' })}
            className={inputClass}
          >
            <option value="">Select event type...</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.eventType && (
            <p className="text-red-400 text-xs mt-1">{errors.eventType.message}</p>
          )}
        </motion.div>

        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (TEXT_FIELDS.length + 1) * 0.05 }}
        >
          <label className="block font-sans text-leather text-[10px] tracking-widest mb-2">
            ADDITIONAL NOTES
          </label>
          <textarea
            {...register('notes')}
            placeholder="Tell us anything else about your event..."
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </motion.div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-gradient-to-r from-gold to-leather text-espresso font-black text-sm tracking-widest px-12 py-4 rounded-sm disabled:opacity-60 hover:opacity-90 transition-opacity pulse-cta"
        >
          {status === 'loading' ? 'SENDING...' : 'SEND MY REQUEST →'}
        </button>

        {status === 'error' && (
          <p className="text-red-400 text-xs mt-3">
            Something went wrong. Please call 845-416-3403 directly.
          </p>
        )}

        <p className="font-sans text-saddle text-xs mt-4 tracking-wide">
          Or call us directly: 845-416-3403
        </p>
      </div>
    </form>
  )
}
