//DOM
const productH1 = document.querySelector('#product-h1');
const productH1Price = document.querySelector('#product-h1-price');
const modelBox1 = document.querySelector('#Model-Box1');
const modelBox1Content = document.querySelector('#Model-Box1-Content');
const modelBox2Content = document.querySelector('#Model-Box2-Content');
const modelBox2 = document.querySelector('#Model-Box2');
const modelColor = document.querySelector('#Model-Color');
const colorPicklsit = document.querySelector('#Color-Picklist');
const carousel = document.querySelector('#Product-Carousel');
const storageBox1 = document.querySelector('#Storage-Box1');
const storageBox1Content = document.querySelector('#Storage-Box1-Content');
const storageBox2Content = document.querySelector('#Storage-Box2-Content');
const storageBox3Content = document.querySelector('#Storage-Box3-Content');
const storageBox2 = document.querySelector('#Storage-Box2');
const storageBox3 = document.querySelector('#Storage-Box3');

const slide1 = document.querySelector('#slide1');
const slide2 = document.querySelector('#slide2');
const slide3 = document.querySelector('#slide3');
//Variables
const dataPath = './asset/iP15.json';

//JSON read

fetchData(dataPath).then((res) => {
    let iP15 = null;
    let iP15max = null;
    res['iPhone15Models'].forEach((element) => {
        const Mtmp = element['Model'];
        if (Mtmp == 'iPhone 15') iP15 = element;
        else if (Mtmp == 'iPhone 15 Plus') iP15max = element;
    });
    //Selection Processing
    const defaultSelection = iP15;
    let currentSelection = defaultSelection;
    updateTitle();
    updateStorageBox();

    modelBox1.addEventListener('click', () => {
        currentSelection = iP15;
        updateTitle();
        updateStorageBox();
    });
    modelBox2.addEventListener('click', () => {
        currentSelection = iP15max;
        updateTitle();
        updateStorageBox();
    });

    const m1 = modelBox1Content.getElementsByTagName('span');
    m1[0].textContent = iP15.Model;
    m1[1].textContent = `${iP15.ScreenSize} 吋顯示器`;
    m1[2].textContent = `NT$ ${iP15.PriceRange[0]} 起`;
    const m2 = modelBox2Content.getElementsByTagName('span');
    m2[0].textContent = iP15max.Model;
    m2[1].textContent = `${iP15max.ScreenSize} 吋顯示器`;
    m2[2].textContent = `NT$ ${iP15max.PriceRange[0]} 起`;

    function updateTitle() {
        productH1.textContent = `購買${currentSelection.Model}`;
        productH1Price.textContent = `NT$ ${currentSelection.PriceRange[0]} 起`;
    }
    function updateStorageBox() {
        const sb1 = storageBox1Content.getElementsByTagName('span');
        sb1[0].textContent = `${currentSelection.Storage[0]}`;
        sb1[2].textContent = `NT$${currentSelection.PriceRange[0]}起`;
        const sb2 = storageBox2Content.getElementsByTagName('span');
        sb2[0].textContent = `${currentSelection.Storage[1]}`;
        sb2[2].textContent = `NT$${currentSelection.PriceRange[1]}起`;
        const sb3 = storageBox3Content.getElementsByTagName('span');
        sb3[0].textContent = `${currentSelection.Storage[2]}`;
        sb3[2].textContent = `NT$${currentSelection.PriceRange[2]}起`;
    }
    //ugly as hell but its works
    //must refactor that whole damn page if I got times
    const colorPies = colorPicklsit.getElementsByTagName('label');
    function clearColorPie() {
        for (let i = 0; i < colorPies.length; i++) {
            colorPies[i].getElementsByTagName('img')[0].setAttribute('class', 'h-7 w-7 rounded-full');
        }
    }

    for (let i = 0; i < colorPies.length; i++) {
        colorPies[i].getElementsByTagName('img')[0].addEventListener('click', (evt) => {
            clearColorPie();
            colorPies[i]
                .getElementsByTagName('img')[0]
                .classList.add('outline', 'outline-2', 'outline-offset-2', 'outline-blue-500');
            modelColor.textContent = `顏色 - ${currentSelection['Colors'][i]}`;
            slide1
                .getElementsByTagName('img')[0]
                .setAttribute('src', currentSelection['Images'][currentSelection['Colors'][i]][0]);
            slide2
                .getElementsByTagName('img')[0]
                .setAttribute('src', currentSelection['Images'][currentSelection['Colors'][i]][1]);
            slide3
                .getElementsByTagName('img')[0]
                .setAttribute('src', currentSelection['Images'][currentSelection['Colors'][i]][2]);
        });
    }
});

function fetchData(url) {
    return fetch(url).then((res) => res.json());
}
