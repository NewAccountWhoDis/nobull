import { POST } from '@/app/api/book/route'
import { NextRequest } from 'next/server'

jest.mock('@/lib/sendBookingEmail', () => ({
  sendBookingEmail: jest.fn().mockResolvedValue(undefined),
}))

const { sendBookingEmail } = require('@/lib/sendBookingEmail')

const VALID_BODY = {
  name: 'Jane Doe',
  phone: '845-000-0000',
  email: 'jane@test.com',
  eventDate: '2026-06-15',
  eventType: 'Wedding',
  eventLocation: 'Albany, NY',
  guestCount: '100',
  notes: '',
}

function makeReq(body: object) {
  return new NextRequest('http://localhost/api/book', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/book', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns 200 with valid body and calls sendBookingEmail', async () => {
    const res = await POST(makeReq(VALID_BODY))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.ok).toBe(true)
    expect(sendBookingEmail).toHaveBeenCalledWith(VALID_BODY)
  })

  it('returns 400 when name is missing', async () => {
    const { name, ...noName } = VALID_BODY
    const res = await POST(makeReq(noName))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/name/)
  })

  it('returns 400 when multiple required fields are missing', async () => {
    const res = await POST(makeReq({ notes: 'hello' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/name/)
    expect(json.error).toMatch(/email/)
  })

  it('returns 500 when sendBookingEmail throws', async () => {
    sendBookingEmail.mockRejectedValueOnce(new Error('Resend down'))
    const res = await POST(makeReq(VALID_BODY))
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toBe('Failed to send email')
  })
})
