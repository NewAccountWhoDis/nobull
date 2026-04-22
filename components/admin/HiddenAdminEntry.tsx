'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { hiddenAdminLoginAction, type HiddenAdminLoginState } from '@/app/admin/actions'

const INITIAL_STATE: HiddenAdminLoginState = {}

export function HiddenAdminEntry() {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(hiddenAdminLoginAction, INITIAL_STATE)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-label="Open admin sign in"
        className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-saddle/70 text-[10px] font-black text-parchment/50 transition-colors hover:border-gold hover:text-gold"
        onClick={() => setOpen(true)}
      >
        J
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/80 px-5 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close admin sign in"
            className="absolute inset-0 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-login-title"
            className="relative w-full max-w-sm rounded-sm border border-saddle bg-oak p-6 card-glow"
          >
            <button
              type="button"
              aria-label="Close admin sign in"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-sm border border-saddle text-parchment/70 transition-colors hover:border-gold hover:text-gold"
              onClick={() => setOpen(false)}
            >
              x
            </button>

            <p className="eyebrow mb-3">Admin</p>
            <h2 id="admin-login-title" className="font-serif text-3xl font-black text-gold">
              Password
            </h2>
            <form action={action} className="mt-6 grid gap-4">
              <input
                ref={inputRef}
                name="password"
                type="password"
                required
                className="admin-input"
                autoComplete="current-password"
              />
              {state.message && (
                <p className="font-sans text-sm font-bold text-gold">{state.message}</p>
              )}
              <button type="submit" className="btn-primary" disabled={pending}>
                {pending ? 'Checking' : 'Enter'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
