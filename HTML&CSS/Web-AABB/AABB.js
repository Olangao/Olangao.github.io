const slotN1 = document.querySelector('#input-n1');
const slotN2 = document.querySelector('#input-n2');
const slotN3 = document.querySelector('#input-n3');
const slotN4 = document.querySelector('#input-n4');
const submitBtn = document.querySelector('#submit-btn');
const resetBtn = document.querySelector('#reset-btn');
const revealBtn = document.querySelector('#reveal-btn');
const historyCotainer = document.querySelector('#guess-badge-history-container');

const slots = [slotN1, slotN2, slotN3, slotN4];
let guess = [0, 0, 0, 0];
let answer = genAnswer();

function genAnswer() {
    const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    numArr.sort((a, b) => getRandomArbitrary(-1, 1));

    return numArr.slice(0, 4).join('');
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function clearGuess() {
    guess = [];
}

function clearSlots() {
    slotN1.value = '';
    slotN2.value = '';
    slotN3.value = '';
    slotN4.value = '';
}

function reset() {
    clearSlots();
    clearGuess();
    historyCotainer.innerHTML = '';
    answer = genAnswer();
}

function wrongInput() {
    clearGuess();
    const badge = document.createElement('div');
    badge.setAttribute('class', 'badge badge-error badge-lg font-MiSans tracking-widest');
    badge.textContent = `無效的輸入值 !`;
    historyCotainer.prepend(badge);
}

function checkAnswer() {
    let a = 0;
    let b = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] == answer[i]) a++;
        else if (answer.includes(guess[i])) b++;
    }
    return response(a, b);
}

function response(a, b) {
    if (a === 4) {
        const badge = document.createElement('div');
        badge.setAttribute('class', 'badge badge-success badge-lg font-MiSans tracking-widest');
        badge.textContent = `你猜到${a}A了，牛B阿你`;
        historyCotainer.prepend(badge);
        clearGuess();
    } else {
        const badge = document.createElement('div');
        badge.setAttribute('class', 'badge badge-warning badge-lg font-MiSans tracking-widest');
        badge.textContent = `${a}A${b}B`;
        historyCotainer.prepend(badge);
        clearGuess();
    }
}

function parseSlot() {
    for (let i = 0; i < 4; i++) {
        let tmp = parseInt(slots[i].value);
        if (Number.isNaN(tmp) || guess.includes(tmp)) {
            wrongInput();
            return false;
        } else guess[i] = tmp;
    }
    return true;
}

submitBtn.addEventListener('click', () => {
    if (parseSlot()) checkAnswer();
});

revealBtn.addEventListener('click', () => {
    const badge = document.createElement('div');
    badge.setAttribute('class', 'badge badge-lg font-MiSans tracking-widest');
    badge.textContent = `${answer[0]}-${answer[1]}-${answer[2]}-${answer[3]}`;
    historyCotainer.prepend(badge);
});
resetBtn.addEventListener('click', reset);
