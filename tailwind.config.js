/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#080810',
        'signal-purple': '#7B2FFF',
        'electric-violet': '#A855F7',
        'neon-cyan': '#00E5FF',
        'ghost-white': '#F4F4FF',
        'surface-dark': '#0F0F1A',
        'muted-gray': '#3A3A4A',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

