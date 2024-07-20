//-----------------------DOM Block-----------------------
//Template to-do list
const presetToDo = new Object({
    Y2024M6D23: [
        {
            color: 'bg-red-500',
            location: 'BuildSchool',
            name: '期中評量第一次Review',
            time: '10:30',
        },
    ],
    Y2024M6D25: [
        {
            color: 'bg-red-500',
            location: 'BuildSchool',
            name: '期中評量結束',
            time: '10:30',
        },
        {
            color: 'bg-slate-400',
            location: '全聯',
            name: '採買',
            time: '20:00',
        },
    ],
    Y2024M6D28: [
        {
            color: 'bg-green-400',
            location: '河濱公園',
            name: '跑步',
            time: '18:30',
        },
    ],
    Y2024M6D30: [
        {
            color: 'bg-orange-500',
            location: '新生南路',
            name: '晚餐',
            time: '19:30',
        },
    ],
});
//Container
const dateContainer = document.querySelector('#date-container');
const dayGrids = document.querySelectorAll('#day-grid');
const dayModal = document.querySelector('#day-modal');
const dayModalList = document.querySelector('#modal-todo-list');
//Title
const currentMonthTitle = document.querySelector('#current-month-title');
const currentYearTitle = document.querySelector('#current-year');
const dayTitleOfModal = document.querySelector('#modal-day-txt');
//rendered tile task
const taskOnGridTemplate = document.createElement('p');
taskOnGridTemplate.setAttribute('class', 'text-sm text-center');

//Interactive component
const logProfileBtn = document.querySelector('#log-profile-button');
const clearProfileBtn = document.querySelector('#clear-profile-button');
const todayBtn = document.querySelector('#today-btn');
const lastMonthBtn = document.querySelector('#last-month-btn');
const nextMonthBtn = document.querySelector('#next-month-btn');
const dayModleInput = document.querySelector('#modal-input-box');
//Task componet
const addTaskBtn = document.querySelector('#task-add-btn');
const markColorList = ['bg-red-500', 'bg-orange-500', 'bg-green-400', 'bg-slate-400'];
const markColorPicker = document.querySelector('#mark-color-picker');
const taskTimeInput = document.querySelector('#task-time');
const taskLocationInput = document.querySelector('#task-location');
const taskNameInput = document.querySelector('#task-name');
const inputAlert = document.querySelector('#input-alert');
const modalTaskTemplate = document.querySelector('#task-template');
const modalTaskList = document.querySelector('#modal-todo-list');
//-----------------------DOM Block-----------------------
//Attaching event
lastMonthBtn.addEventListener('click', () => {
    updateMonth(-1);
});
nextMonthBtn.addEventListener('click', () => {
    updateMonth(1);
});
todayBtn.addEventListener('click', () => {
    backToday();
});
dayModal.addEventListener('close', () => {
    resetModalComponet();
});
clearProfileBtn.addEventListener('click', () => {
    localStorage.removeItem(fileKey);
    renderGrids();
});

logProfileBtn.addEventListener('click', () => {
    const profile = getFromStorage();
    console.log(profile);
});
//Task object
const fileKey = 'record';

//Static data
const chineseMonths = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
];

//Calendar data
const date = new Date();
const defaultCurrentMonth = date.getMonth();
let currentMonth = defaultCurrentMonth;
let currentYear = date.getFullYear();
let todayHighlight = null;
let currentDate = null;
//Pre-process
updateMonth(0);

//Calendar processing
function resetDayGrids() {
    // todayHighlight.firstChild.setAttribute('class', 'cursor-pointer hover:text-secondary');cursor-pointer hover:text-secondary
    dayGrids.forEach((grid) => {
        grid.removeEventListener('click', popsModal);
        grid.firstChild.textContent = '';
        grid.setAttribute('class', 'text-xl w-1/7 h-1/7 my-3 hover:cursor-pointer hover:text-secondary');
    });
}

function clearDayGridRender() {
    for (let i = 0; i < dateContainer.children.length; i++) {
        while (dateContainer.children[i].children.length > 1) {
            dateContainer.children[i].removeChild(dateContainer.children[i].children[1]);
        }
    }
}

function calMonth(n, cy) {
    let tmp = currentMonth;
    tmp += n;
    if (tmp == 12) {
        if (cy) currentYear++;
        return 0;
    } else if (tmp < 0) {
        if (cy) currentYear--;
        return 11;
    } else return tmp;
}

function backToday() {
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    updateMonth(0);
}

function updateMonth(n) {
    currentMonth = calMonth(n, true);
    currentYearTitle.textContent = currentYear;
    lastMonthBtn.textContent = `< ${chineseMonths[calMonth(-1, false)]}`;
    currentMonthTitle.textContent = chineseMonths[currentMonth];
    nextMonthBtn.textContent = `${chineseMonths[calMonth(1, false)]} >`;
    processDateGrids();
}

function processDateGrids() {
    resetDayGrids();
    //data for poping date

    //current month arg is off-by-1
    const mDays = daysInMonth(currentMonth + 1, currentYear);
    const dayOne = new Date(currentYear, currentMonth, 1);
    const dayOneWeekDay = dayOne.getDay();
    //pops date in grid
    for (let i = dayOneWeekDay, d = 1; d <= mDays; d++, i++) {
        dayGrids[i].firstChild.textContent = d;
        dayGrids[i].children[0].addEventListener('click', popsModal);
    }

    if (currentMonth == date.getMonth()) {
        //the offset is 'dayOneWeekDay - 1' when setting specific day grid
        dayGrids[dayOneWeekDay + date.getDate() - 1].classList.add('text-2xl', 'text-primary');
    }
    renderGrids();
}

function renderGrids() {
    clearDayGridRender();
    //
    const m = currentMonth;
    const mDays = daysInMonth(currentMonth + 1, currentYear);
    const dayOne = new Date(currentYear, currentMonth, 1);
    const dayOneWeekDay = dayOne.getDay();
    //
    const listObj = getFromStorage();
    const keys = Object.keys(listObj);
    const currentMonthKey = `Y${currentYear}M${currentMonth}`;
    //generate current month's date key collection
    const curMDKeys = [];
    for (let d = 1; d <= mDays; d++) {
        curMDKeys.push(`Y${currentYear}M${currentMonth}D${d}`);
    }

    //Parse from file directly, comparison of temporary key causing enormous loops
    for (let k = 0; k < keys.length; k++) {
        if (keys[k].includes(currentMonthKey)) {
            for (let m = 0; m <= mDays; m++) {
                if (keys[k] == curMDKeys[m]) {
                    listObj[keys[k]].forEach((e) => {
                        let tmp = taskOnGridTemplate.cloneNode(true);
                        tmp.classList.add(`${e.color.replace('bg', 'text')}`);
                        tmp.textContent = `${e.time}在${e.location} ${e.name}`;
                        dayGrids[dayOneWeekDay + m].appendChild(tmp);
                    });
                }
            }
        } else continue;
    }
}

function daysInMonth(month, year) {
    const daysInMonths = [
        31,
        year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    return daysInMonths[month - 1];
}

function resetModalComponet() {
    taskTimeInput.value = '';
    taskLocationInput.value = '';
    taskNameInput.value = '';
    modalTaskList.textContent = '';
    addTaskBtn.setAttribute('class', 'animate__animated btn w-full"');
    addTaskBtn.classList.remove('animate__animated', 'animate__shakeX', 'text-red-500');
    addTaskBtn.textContent = '儲存';
}

function popsModal(evt) {
    dayModal.showModal();
    currentDate = evt.target.innerText;
    dayTitleOfModal.textContent = `${currentMonth}月${evt.currentTarget.innerText}日${currentYear}`;
    renderModal();
}

function renderModal() {
    const listObj = getFromStorage();
    const keys = Object.keys(listObj);
    const key = genKey(currentDate);
    if (keys.includes(key)) {
        listObj[key].forEach((task) => {
            let tmp = modalTaskTemplate.cloneNode(true);
            let pOftmp = tmp.children[1];
            pOftmp.classList.add(`${task.color}`);
            pOftmp.textContent = `${task.time}在${task.location}${task.name}`;
            tmp.classList.remove('hidden');
            modalTaskList.appendChild(tmp);
            //check button
            let checkBtn = tmp.children[0];
            checkBtn.addEventListener('click', () => taskChecked(tmp, key, task));
            //edit button
            let editBtn = tmp.children[2];
            editBtn.addEventListener('click', () => taskEdit(tmp, key, task));
        });
    }
}

function taskEdit(listOfTask, key, task) {
    listOfTask.classList.remove('hover:animate-pulse', 'hover:cursor-pointer', 'animate__infinite');
    listOfTask.classList.add('animate__bounceOutUp');
    taskTimeInput.value = `${task.time}`;
    taskLocationInput.value = `${task.location}`;
    taskNameInput.value = `${task.name}`;
    listOfTask.addEventListener('animationend', () => {
        modalTaskList.removeChild(listOfTask);
        remove(key, task);
    });
}

function taskChecked(listOfTask, key, task) {
    listOfTask.classList.remove('hover:animate-pulse', 'hover:cursor-pointer', 'animate__infinite');
    listOfTask.classList.add('animate__bounceOutLeft');
    listOfTask.addEventListener('animationend', () => {
        modalTaskList.removeChild(listOfTask);
        remove(key, task);
    });
}

//Profile I/O

function getTaskColor() {
    for (let i = 0; i < markColorPicker.children.length; i++) {
        if (markColorPicker.children[i].checked == true) return markColorList[i];
    }
}
function genTask(time, location, name, color) {
    return {
        time,
        location,
        name,
        color,
    };
}

function genKey(day) {
    return `Y${currentYear}M${currentMonth}D${day}`;
}

addTaskBtn.addEventListener('click', (evt) => {
    const _time = taskTimeInput.value.trim();
    const _location = taskLocationInput.value.trim();
    const _name = taskNameInput.value.trim();
    const _color = getTaskColor();

    if (_time == '' || _location == '' || _name == '' || _color == '') popsAlert();
    else {
        //this order matters !
        resetModalComponet();
        //reset first then re-render agian
        save(genKey(currentDate), genTask(_time, _location, _name, _color));
    }
});

function remove(key, taskObj) {
    const listObj = getFromStorage();
    const idx = listObj[key].indexOf(taskObj);
    listObj[key] = listObj[key].reduce((acc, curr) => {
        if (!(JSON.stringify(taskObj) === JSON.stringify(curr))) acc.push(curr);
        return acc;
    }, []);
    save2Storage(listObj);
}

function save(key, taskObj) {
    //get all record list
    //push newone
    //save into storage
    const listObj = getFromStorage();
    const keys = Object.keys(listObj);
    if (keys.includes(key)) {
        listObj[key].push(taskObj);
    } else {
        listObj[key] = [taskObj];
    }
    save2Storage(listObj);
    renderModal();
}

function save2Storage(obj) {
    const json = JSON.stringify(obj);
    localStorage.setItem(fileKey, json);
    renderGrids();
}
function getFromStorage() {
    const fetechedData = localStorage.getItem(fileKey);
    return fetechedData ? JSON.parse(fetechedData) : presetToDo;
}

function popsAlert() {
    addTaskBtn.classList.add('animate__animated', 'animate__shakeX', 'text-red-500');
    addTaskBtn.textContent = '含有無效的欄位! 點擊重試';
}
