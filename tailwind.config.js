/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { "selected-green": "#08BD9D", "homeGymPrice-green": "#08BD9D" },
      fontSize: {
        xs: ["10px", "12px"],
        sm: ["12px", "16px"],
        base: ["16px", "20px"],
        lg: ["18px", "24px"],
        xl: ["24px", "32px"],
      },
      screens: {
        sm: "475px",
        md: "768px",
        lg: "1024px",
        xl: "1640px",
      },
      aspectRatio: {
        "2/1": "2 / 1",
      },
      padding: {
        "57%": "57%",
      },
    },
  },
  plugins: [],
};
