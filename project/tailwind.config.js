/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-main': '#0d0f14',
        'bg-navbar': '#1c222d',
        'bg-card': '#12151a',
        'accent-primary': '#42f8f5',
        'accent-alt': '#3ff7f3',
        'risk-low': '#00cc66',
        'risk-medium': '#ffcc00',
        'risk-high': '#ff3333',
        'text-primary': '#ffffff',
        'text-secondary': '#c5d1de',
        'text-muted': '#8a97a9',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(66, 248, 245, 0.6)',
        'glow-lg': '0 0 25px rgba(66, 248, 245, 0.8)',
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};