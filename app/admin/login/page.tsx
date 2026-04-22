import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { isAdminAuthenticated, isAdminConfigured } from '@/lib/admin-auth'
import { loginAction } from '../actions'

export const metadata: Metadata = {
  title: 'Admin Login | No Bull Line Dancers',
}

export const dynamic = 'force-dynamic'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  if (await isAdminAuthenticated()) {
    redirect('/admin')
  }

  const { error } = await searchParams
  const configured = isAdminConfigured()

  return (
    <main className="min-h-screen bg-espresso py-16">
      <div className="section-shell max-w-md">
        <p className="eyebrow mb-4">Admin</p>
        <h1 className="font-serif text-5xl font-black text-gold">Sign in</h1>
        <form action={loginAction} className="mt-8 grid gap-5 rounded-sm border border-saddle bg-oak p-6 card-glow">
          {!configured && (
            <p className="border border-gold bg-espresso p-4 font-sans text-sm leading-6 text-parchment">
              Set ADMIN_PASSWORD in your environment before using the admin portal.
            </p>
          )}
          {error && (
            <p className="border border-gold bg-espresso p-4 font-sans text-sm leading-6 text-parchment">
              That password did not match.
            </p>
          )}
          <label className="grid gap-2">
            <span className="font-sans text-[11px] font-black uppercase tracking-[0.16em] text-leather">Password</span>
            <input
              name="password"
              type="password"
              required
              className="admin-input"
              disabled={!configured}
            />
          </label>
          <button type="submit" className="btn-primary" disabled={!configured}>
            Sign in
          </button>
        </form>
      </div>
    </main>
  )
}
