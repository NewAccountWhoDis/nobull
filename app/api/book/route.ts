import { NextRequest, NextResponse } from 'next/server'
import { sendBookingEmail } from '@/lib/sendBookingEmail'
import type { BookingFormData } from '@/components/ui/BookingForm'

const REQUIRED: (keyof BookingFormData)[] = [
  'name', 'phone', 'email', 'eventDate', 'eventType', 'eventLocation',
]

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<BookingFormData>

  const missing = REQUIRED.filter((f) => !body[f])
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 },
    )
  }

  try {
    await sendBookingEmail(body as BookingFormData)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Booking email error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
