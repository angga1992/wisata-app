/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: ["class"],
  content: [
    './**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter Var', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    input : {
      ring: "hsl(var(--ring))",
    },
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      primary : {
        25 : '#F5FAF5',
        50 : '#EDF6EC',
        100 : '#DAEDD9',
        200 : '#A4D29F',
        300 : '#91C88C',
        400 : '#6DB665',
        DEFAULT : '#1a73e8',
        600 : '#419439',
        700 : '#3A8332',
        800 : '#32732C',
        900 : '#2B6226'
      },
      gray : {
        25 : '#FCFCFD',
        50 : '#F9FAFB',
        100 : '#F2F4F7',
        200 : '#EAECF0',
        300 : '#D0D5DD',
        400 : '#98A2B3',
        DEFAULT : '#667085',
        600 : '#475467',
        700 : '#344054',
        800 : '#1D2939',
        900 : '#101828'
      },
      yellow : {
        25 : '#FFF9F0',
        50 : '#FFF6E8',
        100 : '#FFEDD1',
        200 : '#FFDBA3',
        300 : '#FFC974',
        400 : '#FFB746',
        DEFAULT : '#FFA518',
        600 : '#E69516',
        700 : '#CC8413',
        800 : '#B37311',
        900 : '#99630E'
      },
      blue : {
        25 : '#FFF9F0',
        50 : '#FFF6E8',
        100 : '#FFEDD1',
        200 : '#E1E9FF',
        300 : '#FFC974',
        400 : '#FFB746',
        DEFAULT : '#3699FF',
        600 : '#1F8CC2',
        700 : '#CC8413',
        800 : '#B37311',
        900 : '#99630E'
      },
      lavender : {
        25 : '#FAF6FD',
        50 : '#F5EEFC',
        100 : '#EBDCF9',
        200 : '#D7B9F3',
        300 : '#C397EC',
        400 : '#AF74E6',
        DEFAULT : '#9B51E0',
        600 : '#8C49CA',
        700 : '#7C41B3',
        800 : '#6D399D',
        900 : '#5D3186'
      },
      magenta : {
        25 : '#FBF4F8',
        50 : '#F7E9F1',
        100 : '#F0D2E3',
        200 : '#E1A5C7',
        300 : '#D178AA',
        400 : '#C24B8E',
        DEFAULT : '#B31E72',
        600 : '#A11B67',
        700 : '#8F185B',
        800 : '#7D1550',
        900 : '#6B1244'
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}