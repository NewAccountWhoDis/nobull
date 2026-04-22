import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { EventForm } from '@/components/admin/EventForm'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { getEventById, hasDatabase } from '@/lib/events'
import { updateEventAction } from '../../actions'

export const metadata: Metadata = {
  title: 'Edit Event | No Bull Line Dancers',
}

export const dynamic = 'force-dynamic'

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login')
  }

  const { id } = await params
  const event = await getEventById(id)

  if (!event) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-espresso py-14">
      <div className="section-shell max-w-3xl">
        <Link href="/admin" className="btn-secondary mb-8 min-h-0 px-4 py-2">
          Back to admin
        </Link>
        <section className="rounded-sm border border-saddle bg-oak p-6 card-glow sm:p-8">
          <p className="eyebrow mb-4">Admin</p>
          <h1 className="mb-8 font-serif text-5xl font-black text-gold">Edit event</h1>
          <EventForm action={updateEventAction} event={event} submitLabel="Save changes" disabled={!hasDatabase()} />
        </section>
      </div>
    </main>
  )
}
