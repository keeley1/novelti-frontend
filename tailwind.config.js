module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    plugins: [
        require('daisyui'),
        require('@tailwindcss/typography')
    ],
    daisyui: {
        themes: [{
            mainTheme: {
                "base-100": "#192237",
                "base-200": "#131B2D",
                "base-300": "#0F1522",
                "primary": "#8339E4",
                "primary-content": "#FFFFFF",
                "secondary": "#D7287C",
                "secondary-content": "#FFFFFF",
                "accent": "#1F2937",
                "accent-content": "#FFFFFF",
                "base-content": "#FFFFFF",
                "info": "#1E2843",
                "info-content": "#FFFFFF"
            },
        }],
    },
};