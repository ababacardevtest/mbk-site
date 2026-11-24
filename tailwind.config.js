module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#1E4D2B',
        leaf: '#5E9E3F',
        mist: '#EEF4E2',
        bark: '#4B2E1E',
        sun: '#E8B53A',
        paper: '#FBFAF4',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
