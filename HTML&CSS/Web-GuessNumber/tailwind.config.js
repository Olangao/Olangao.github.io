/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./GuessNumber.html', './node_modules/flowbite/**/*.js'],
    theme: {
        extend: {},
        fontFamily: {
            NotoSerif: ['Noto Serif', 'serif'],
        },
    },
    plugins: [require('flowbite/plugin')],
    safelist: ['text-pink-500', 'text-teal-100', 'text-amber-200'],
};
