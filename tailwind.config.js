/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner_1: "url('./assets/banner_1.png')",
        home: "url('./assets/background_1.png')",
        upload: "url('./assets/uploadIcon.png')",
      },
      colors: {
        "selected-green": "#08BD9D",
        "homeGymPrice-green": "#08BD9D",
        "google-red": "#DF4F3D",
        "kakao-yellow": "#FEC600",
        "naver-green": "#62BA46",
        "detail-spaceType-font-green": "#51776E",
        "detail-spaceType-bg-green": "#D3EBE5",
        "content-box-gray": "#FBFBFB",
        "content-box-text-gray": "#8B8B8B",
        "star-yellow": "#FEC600",
        "register-subTitle-gray": "#8B8B8B",
      },
      fontSize: {
        xs: ["10px", "12px"],
        sm: ["12px", "16px"],
        base: ["16px", "20px"],
        lg: ["18px", "24px"],
        xl: ["24px", "32px"],
        content: ["13px", "18px"],
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
  plugins: [require("tailwind-scrollbar-hide")],
};
