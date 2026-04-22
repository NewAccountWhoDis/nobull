'use client'

import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

type MerchItem = {
  style: string
  size: string
  amount: number
}

type MerchOrderFormData = {
  name: string
  email: string
  phone: string
  items: MerchItem[]
  notes: string
}

const STYLE_OPTIONS = [
  "V-neck women's",
  'Crewneck unisex',
  'Hoodie unisex',
  'Quarter zip unisex',
  'Racerback tank top',
]

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', '2X']

const inputClass =
  'w-full min-h-12 rounded-sm border border-saddle bg-espresso px-4 py-3 text-sm text-parchment outline-none transition-colors placeholder:text-saddle focus:border-gold'

export function MerchOrderForm() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MerchOrderFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      items: [{ style: '', size: '', amount: 1 }],
      notes: '',
    },
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  const onSubmit = async (data: MerchOrderFormData) => {
    setStatus('loading')

    const orderItems = data.items
      .map((item, index) => `${index + 1}. ${item.amount} x ${item.size} ${item.style}`)
      .join('\n')

    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'merch-order',
          name: data.name,
          email: data.email,
          phone: data.phone,
          items: orderItems,
          notes: data.notes,
        }).toString(),
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
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border-t border-saddle pt-6 text-center"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold font-serif text-3xl text-gold" aria-hidden="true">
          OK
        </div>
        <h3 className="font-serif text-3xl font-black text-gold">Thank you for your order!</h3>
        <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-7 text-parchment">
          We will follow up with you to let you know it has been received and when you can meet for pickup.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="border-t border-saddle pt-6">
      {!open ? (
        <button type="button" className="btn-primary w-full sm:w-auto" onClick={() => setOpen(true)}>
          Submit order request
        </button>
      ) : (
        <form name="merch-order" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          <input type="hidden" name="form-name" value="merch-order" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="merch-name" className="mb-2 block font-sans text-[10px] font-black uppercase tracking-[0.16em] text-leather">
                Name *
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                id="merch-name"
                className={inputClass}
                placeholder="First & Last Name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="merch-phone" className="mb-2 block font-sans text-[10px] font-black uppercase tracking-[0.16em] text-leather">
                Phone *
              </label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                id="merch-phone"
                type="tel"
                className={inputClass}
                placeholder="(000) 000-0000"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="merch-email" className="mb-2 block font-sans text-[10px] font-black uppercase tracking-[0.16em] text-leather">
                Email *
              </label>
              <input
                {...register('email', { required: 'Email is required' })}
                id="merch-email"
                type="email"
                className={inputClass}
                placeholder="you@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border-t border-saddle pt-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-sans text-[10px] font-black uppercase tracking-[0.16em] text-gold">Item {index + 1}</h3>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      className="font-sans text-[10px] font-black uppercase tracking-[0.14em] text-leather transition-colors hover:text-gold"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.25fr_0.85fr_0.7fr]">
                  <div>
                    <label htmlFor={`style-${field.id}`} className="mb-2 block font-sans text-[10px] font-black uppercase tracking-[0.16em] text-leather">
                      Style *
                    </label>
                    <select
                      {...register(`items.${index}.style`, { required: 'Style is required' })}
                      id={`style-${field.id}`}
                      className={inputClass}
                    >
                      <option value="">Select style...</option>
                      {STYLE_OPTIONS.map((style) => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                    {errors.items?.[index]?.style && <p className="mt-1 text-xs text-red-400">{errors.items[index]?.style?.message}</p>}
                  </div>

                  <div>
                    <label htmlFor={`size-${field.id}`} className="mb-2 block font-sans text-[10px] font-black uppercase tracking-[0.16em] text-leather">
                      Size *
                    </label>
                    <select
                      {...register(`items.${index}.size`, { required: 'Size is required' })}
                      id={`size-${field.id}`}
                      className={inputClass}
                    >
                      <option value="">Select size...</option>
                      {SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    {errors.items?.[index]?.size && <p className="mt-1 text-xs text-red-400">{errors.items[index]?.size?.message}</p>}
                  </div>

                  <div>
                    <label htmlFor={`amount-${field.id}`} className="mb-2 block font-sans text-[10px] font-black uppercase tracking-[0.16em] text-leather">
                      Amount *
                    </label>
                    <input
                      {...register(`items.${index}.amount`, {
                        required: 'Amount is required',
                        min: { value: 1, message: 'Use at least 1' },
                        valueAsNumber: true,
                      })}
                      id={`amount-${field.id}`}
                      type="number"
                      min={1}
                      className={inputClass}
                    />
                    {errors.items?.[index]?.amount && <p className="mt-1 text-xs text-red-400">{errors.items[index]?.amount?.message}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn-secondary w-full"
            onClick={() => append({ style: '', size: '', amount: 1 })}
          >
            Add another item
          </button>

          <div>
            <label htmlFor="merch-notes" className="mb-2 block font-sans text-[10px] font-black uppercase tracking-[0.16em] text-leather">
              Notes
            </label>
            <textarea
              {...register('notes')}
              id="merch-notes"
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Pickup questions, color preferences, or anything else we should know..."
            />
          </div>

          <div>
            <button type="submit" disabled={status === 'loading'} className="btn-primary w-full pulse-cta disabled:opacity-60">
              {status === 'loading' ? 'Submitting...' : 'Submit'}
            </button>
            {status === 'error' && (
              <p className="mt-3 text-xs text-red-400">
                Something went wrong. Please call 845-416-3403 directly.
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
