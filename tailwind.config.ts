import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#1a0f07',
        oak:      '#2c1a0e',
        saddle:   '#4a2c15',
        gold:     '#d4a574',
        leather:  '#8b5e3c',
        parchment:'#f5e6cc',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
