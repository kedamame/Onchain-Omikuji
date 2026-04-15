import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5EDD8',
        'paper-dark': '#EDE0C4',
        crimson: '#C8102E',
        'crimson-dark': '#9B0C24',
        gold: '#D4A017',
        'gold-light': '#F0C84A',
        ink: '#1A1434',
        'ink-light': '#3D2B5E',
        scroll: '#FEFAF2',
      },
      fontFamily: {
        mincho: ['"Noto Serif JP"', 'serif'],
        gothic: ['"Noto Sans JP"', 'sans-serif'],
      },
      animation: {
        'unfurl': 'unfurl 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'stamp': 'stamp 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        unfurl: {
          '0%': { transform: 'scaleY(0)', opacity: '0', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', opacity: '1', transformOrigin: 'top' },
        },
        stamp: {
          '0%': { transform: 'scale(2.5) rotate(-8deg)', opacity: '0' },
          '70%': { transform: 'scale(0.95) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
