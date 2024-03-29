// Parsing error: Cannot find module 'next/babel' is not fixable yet without breaking es-lint: https://github.com/dopeshot/beyond-life/issues/379
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{ts,tsx,mdx}',
        './src/components/**/*.{ts,tsx,mdx}',
        './src/app/**/*.{ts,tsx,mdx}',
        './src/services/**/*.{ts,tsx,mdx}'
    ],
    safelist: [
        {
            pattern: /bg-(.*)-(400|500|600|700)/,
            variants: ["hover", "focus"],
        },
        {
            pattern: /text-(red|gray)-(500|600|700|800)/,
            variants: ["hover", "focus"],
        },
        {
            pattern: /text-(.*)-(500|600)/,
            variants: ["hover", "focus"],
        },
        {
            pattern: /border-(.*)-(500)/,
            variants: ["hover", "focus"],
        },
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                md: '2rem',
                xl: '5rem',
                '2xl': '6rem',
            },
        },
        extend: {
            colors: {
                yellow: {
                    DEFAULT: '#FFBF00',
                    50: '#FFEDB8',
                    100: '#FFE8A3',
                    200: '#FFDE7A',
                    300: '#FFD352',
                    400: '#FFC929',
                    500: '#FFBF00',
                    600: '#FAB005',
                    700: '#F2A305',
                    800: '#574100',
                    900: '#1F1700',
                    950: '#030200'
                },
                red: {
                    DEFAULT: '#EA5329',
                    50: '#FAD9D0',
                    100: '#F9CABE',
                    200: '#F5AD98',
                    300: '#F18F73',
                    400: '#EE714E',
                    500: '#EA5329',
                    600: '#C73B14',
                    700: '#942C0F',
                    800: '#611D0A',
                    900: '#2E0E05',
                    950: '#150602'
                },
                dark: {
                    DEFAULT: '#1E1E1E',
                    50: '#7A7A7A',
                    100: '#707070',
                    200: '#5B5B5B',
                    300: '#474747',
                    400: '#323232',
                    500: '#1E1E1E',
                    600: '#020202',
                    700: '#000000',
                },
            },
            fontFamily: {
                'serif': ['Arbutus Slab', ...fontFamily.serif],
                'sans': ['Plus Jakarta Sans', ...fontFamily.sans],
            },
        },
        plugins: [],
    }
}
