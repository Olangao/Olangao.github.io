const mainContainer = document.querySelector('#main-container');
const numberInputBox = document.querySelector('#number-input-box');
const guessButton = document.querySelector('#guess-button');
const restartButton = document.querySelector('#restart-button');
const message = document.createElement('p');

mainContainer.appendChild(message);
const bgHintMsg = 'Try bigger !';
const smHintMsg = 'Try smaller !';
const wrongRangeMsg = 'Number out of range !';
const wrongInputMsg = 'This is not a number !';
const resetMsg = '( Game reset )';
const successMsg = 'You pass the game !';

let input = 0;
let answer = GenAnswer();
console.log(answer);
guessButton.addEventListener('click', () => {
    message.textContent = '';
    input = parseInt(numberInputBox.value);
    if (isNaN(input)) {
        message.setAttribute('class', 'text-pink-500 mt-2 font-NotoSerif font-semibold');
        message.textContent = wrongInputMsg;
    } else if (input > 100 || input < 0) {
        message.setAttribute('class', 'text-pink-500 mt-2 font-NotoSerif font-semibold');
        message.textContent = wrongRangeMsg;
    } else CompareAnswer(input);
});

restartButton.addEventListener('click', () => {
    message.setAttribute('class', 'text-white mt-2 font-NotoSerif font-semibold');
    message.textContent = resetMsg;
    numberInputBox.value = '';
    answer = GenAnswer();
});

function GenAnswer() {
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(100);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
function CompareAnswer(n) {
    if (n == answer) {
        message.setAttribute('class', 'text-amber-200 tracking-wide mt-2 font-NotoSerif font-semibold');
        message.textContent = successMsg;
    } else {
        message.setAttribute('class', 'text-teal-100 tracking-wide mt-2 font-NotoSerif font-semibold');
        message.textContent = n > answer ? smHintMsg : bgHintMsg;
    }
}
