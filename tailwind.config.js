/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#5271FF",
        menuText: "#5271FF",
        menu: "#f09",
        cover: "#5271FF",
        border: "rgba(66, 6, 129, 1)",
        click:"#7C66A9"
      },
      backgroundImage: {
        gradient:"linear-gradient(90deg, hsla(260, 28%, 53%, 1) 0%, hsla(170, 42%, 71%, 1) 100%)",
      },
      animation: {
        cover: "cover 0.5s forwards ease-out"
      },
      keyframes: {
        cover: {
          "100%": { width: "100%" },
        }
      }
    },
  },
  plugins: [],
}

