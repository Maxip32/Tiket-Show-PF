/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#242565',
        secondaryColor: '#ed4690',
        ChryslerBlue: "#5522CC",
        DarkTextPurple: "#7778B0",
        LightText: "#E2E0FF",
        LightGrayText: "DFDEF1",
        BackgroundLight: "#F0F0FF",
        BackgroundDark: "#0D0A2C",
        Color700: "#B4B2CD",
        Color600: "#CCCAE3",
        Color400: "#EFEEFB",
        Color300: "#F9F9FF",
        Color200: "#F9F9FF",
        White: "#FFFFF"
      },
    },
  },
  plugins: [
    
  ],
}

