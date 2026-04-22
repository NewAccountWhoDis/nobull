import { createHash, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'nobull_admin'
const ATTEMPTS_COOKIE_NAME = 'nobull_admin_attempts'
const ADMIN_PASSWORD_HASH = '07c633e359ae6e2f493b8b2e6a62b19298657de9ac4367c90ebdc3cc26d2d611'

function hash(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

function expectedToken() {
  const secret = process.env.ADMIN_AUTH_SECRET ?? ADMIN_PASSWORD_HASH

  return hash(`${ADMIN_PASSWORD_HASH}:${secret}`)
}

function matches(value: string, expected: string) {
  const left = Buffer.from(value)
  const right = Buffer.from(expected)

  return left.length === right.length && timingSafeEqual(left, right)
}

export function isAdminConfigured() {
  return Boolean(expectedToken())
}

export async function isAdminAuthenticated() {
  const token = expectedToken()
  if (!token) {
    return false
  }

  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_NAME)

  return Boolean(cookie?.value && matches(cookie.value, token))
}

export async function setAdminSession() {
  const token = expectedToken()

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  cookieStore.delete(ATTEMPTS_COOKIE_NAME)
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export function verifyAdminPassword(password: string) {
  return matches(hash(password), ADMIN_PASSWORD_HASH)
}

export async function recordFailedAdminAttempt() {
  const cookieStore = await cookies()
  const previous = Number(cookieStore.get(ATTEMPTS_COOKIE_NAME)?.value ?? 0)
  const attempts = Number.isFinite(previous) ? previous + 1 : 1

  cookieStore.set(ATTEMPTS_COOKIE_NAME, String(attempts), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 10,
  })

  return attempts
}
