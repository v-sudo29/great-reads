import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          950: '#3C86FF',
          1000: '#3376E2'
        },
        primary: '#53675D'
      },
      fontFamily: {
        'lora': ['Lora', 'serif'],
        'montserrat': ['Montserrat', 'serif'],
        'rubik': ['Rubik', 'serif']
      }
    },
  },
  plugins: [],
}
export default config
