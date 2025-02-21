module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    plugins: [
        require('daisyui'),
        require('@tailwindcss/typography')
    ],
    themes: [
        {
            mainTheme: {
                "base-100": "#262626",
                "primary": "#AA00FF",
                "accent": "#7f0fb7",
                "secondary": "#FF00A6",
                "secondary-content": "#ffffff",
                "ghost-hover": "#FF00A6",
            },
        },
    ],
};