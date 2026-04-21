import { ImageResponse } from 'next/og'

export const size = {
  width: 512,
  height: 512,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#1a0f07',
          color: '#d4a574',
          display: 'flex',
          fontFamily: 'Georgia, serif',
          fontSize: 138,
          fontWeight: 900,
          height: '100%',
          justifyContent: 'center',
          letterSpacing: 8,
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
