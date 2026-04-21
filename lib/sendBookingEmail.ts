import { Resend } from 'resend'
import type { BookingFormData } from '@/components/ui/BookingForm'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingEmail(data: BookingFormData): Promise<void> {
  await resend.emails.send({
    from: 'No Bull Line Dancers <onboarding@resend.dev>',
    to: 'truthis@joeisblack.com',
    subject: `New Booking Request — ${data.eventType} on ${data.eventDate}`,
    text: [
      `New booking inquiry from ${data.name}`,
      '',
      `Phone:      ${data.phone}`,
      `Email:      ${data.email}`,
      `Event Date: ${data.eventDate}`,
      `Event Type: ${data.eventType}`,
      `Location:   ${data.eventLocation}`,
      `Guests:     ${data.guestCount || 'Not specified'}`,
      '',
      'Notes:',
      data.notes || 'None',
    ].join('\n'),
  })
}
