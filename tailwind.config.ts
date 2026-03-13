
import type { Config } from "tailwindcss";

const config: Config = {

  theme: {
    extend: {
  
      animation: {
        'text-slide': 'text-slide 5s ease-in-out infinite alternate', 
      },
     
      keyframes: {
        'text-slide': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },

      backgroundImage: {
        'movie-gradient': 'linear-gradient(to right, #1d4ed8, #4338CA, #7c3aed, #4338CA, #1d4ed8)',
      },
    },
  },
  plugins: [],
};
export default config;