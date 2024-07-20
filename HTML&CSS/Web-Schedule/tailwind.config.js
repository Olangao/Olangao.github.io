/** @type {import('tailwindcss').Config} */
module.exports = {
    daisyui: {
        themes: ['aqua'],
    },
    content: ['./main.html'],
    safelist: [
        'text-primary',
        'w-1/7',
        'h-1/7',
        'h-2/7',
        'animate__animated',
        'animate__shakeX',
        'animate__infinite',
        'text-red-500',
        'bg-red-500',
        'text-red-500',
        'bg-orange-500',
        'text-orange-500',
        'bg-green-400',
        'text-green-400',
        'bg-slate-400',
        'text-slate-400',
        'animate__pulse',
        'animate__bounceOutLeft',
        'animate__bounceOutUp',
    ],
    theme: {
        animatedSettings: {
            bounceOutSpeed: 5000,
            classes: ['bounce', 'heartBeat', 'shakeX', 'pulse', 'infinite', 'bounceOutLeft', 'bounceOutUp'],
        },
        extend: {
            spacing: {
                '1/7': '14.2857143%',
                '2/7': '28.5714286%',
                '3/7': '42.8571429%',
                '4/7': '57.1428571%',
                '5/7': '71.4285714%',
                '6/7': '85.7142857%',
            },
        },
        fontFamily: {
            OPPOSans: ['OPPOSans-Regular', 'sans-serif'],
            sans: ['OPPOSans', 'Helvetica', 'Arial', 'sans-serif'],
        },
    },
    plugins: [require('daisyui'), require('tailwindcss-animatecss')],
};
