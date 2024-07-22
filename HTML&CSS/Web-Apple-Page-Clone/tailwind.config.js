/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./main.html'],
    theme: {
        extend: {
            fontSize: {
                ss: '9px',
                sms: '12px',
            },
            spacing: {
                '1/7': '14.2857143%',
                '2/7': '28.5714286%',
                '3/7': '42.8571429%',
                '4/7': '57.1428571%',
                '5/7': '71.4285714%',
                '6/7': '85.7142857%',
            },
            colors: {
                'apple-gray': '#f5f5f7',
            },
            width: {
                'iphone-gallery': '1045px',
                'iphone-spec-blocks': '330px',
            },
        },
        fontFamily: {
            MiSans: ['MiSans-ExtraLight', 'sans-serif'],
            sans: ['MiSans-ExtraLight', 'Helvetica', 'Arial', 'sans-serif'],
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [],
    },
};
