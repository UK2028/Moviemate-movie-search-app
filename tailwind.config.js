const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ["./src/**/*.{html,js}"],
    darkMode: "class",
    theme: {
        screens: {
            'header_break_1': '900px',
            'header_break_2': '425px',
            'list_break_1': '600px',
            'detail_break_1': '1200px',
            "detail_break_2": '780px',
            "detail_break_3": '585px',
            "detail_break_4": '400px',
            ...defaultTheme.screens
        }
    }
}