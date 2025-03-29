/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brazil-green": "#009c3b",
        "brazil-yellow": "#ffdf00",
        "brazil-blue": "#002776",
        "tropical-orange": "#FF7F00",
        "tropical-pink": "#FF69B4",
        coconut: "#FFF8DC",
      },
      backgroundImage: {
        "tropical-pattern":
          "url('https://bvmtvngcdnruvctkrclx.supabase.co/storage/v1/object/public/images//b9o9n5d8p4_1743245033110.png')",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
