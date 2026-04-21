import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#1a0f07',
          color: '#d4a574',
          display: 'flex',
          fontFamily: 'Georgia, serif',
          fontSize: 48,
          fontWeight: 900,
          height: '100%',
          justifyContent: 'center',
          letterSpacing: 4,
          lineHeight: 1,
          width: '100%',
        }}
      >
        NB
      </div>
    ),
    size
  )
}
