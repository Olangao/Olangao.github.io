/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./main.html', './Gallery-try.html'],
    theme: {
        extend: {
            flex: {
                test: '1 0 100%',
            },
            margin: {
                18: '74px',
            },
            flexBasis: {
                'iphone-gallery': 'calc(100%-22.82353rem)',
            },
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
                '109-PX': '109px',
            },
            colors: {
                'apple-gray': '#f5f5f7',
            },
            height: {
                'iphone-add2Cart-block-h': '474px',
            },
            width: {
                'iphone-gallery': '1045px',
                'iphone-spec-blocks': '300px',
            },
            minHeight: {
                'iphone-gallery-min-height': '540px',
            },
        },
        fontFamily: {
            MiSans: ['MiSans', 'sans-serif'],
            sans: ['MiSans', 'Helvetica', 'Arial', 'sans-serif'],
        },
        fontWeight: {
            thin: 100,
            extralight: 200,
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            heavy: 800,
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [],
    },
};
