/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./AABB.html'],
    safelist: ['badge', 'badge-error', 'badge-success', 'badge-warning', 'badge-lg'],
    theme: {
        extend: {},
        fontFamily: {
            MiSans: ['MiSans-Regular', 'sans-serif'],
            MiSansLight: ['MiSans-Light', 'sans-serif'],
        },
    },
    plugins: [require('daisyui')],
};
