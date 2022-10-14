/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter']
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/assets/img/bg.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 0.58%, #43E7AD 44.94%, #E1D55D 100%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      },
      colors: {

      },
    },
    keyframes: {
      bannerWebAnimation: {
        '0%': { right: '-900px' },
        '100%': { right: '1200px' },
      },
      bannerMobileAnimation: {
        '0%': { right: '-1700px' },
        '100%': { right: '1200px' },
      }

    },
    animation: {
      'bannerWeb': 'bannerWebAnimation 30s infinite linear',
      'bannerMobile': 'bannerMobileAnimation 30s infinite linear',
    },
  },
  plugins: [],
}
