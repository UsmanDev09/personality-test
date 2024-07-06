import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-500': '#4c868c',
        'green-800': '#1f5256'
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
    },
    
  },
  plugins: [],
};
export default config;


