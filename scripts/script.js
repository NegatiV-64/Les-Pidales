// Создадим обьект с 2 бургерами

const burgers = {
    // Singer
    singer: {
        name: 'Singer',
        price: 12000,
        kcal: 264,
        amount: 0,
        // Сейчас получаем полную цену
        get fullPrice() {
            return this.price * this.amount;
        },
        // Сейчас получаем полную калорийность
        get fullKcal() {
            return this.kcal * this.amount
        },

        orderKcal: ''
    },

    // Bigger 
    bigger: {
        name: 'Bigger',
        price: 17000,
        kcal: 300,
        amount: 0,
        // Сейчас получаем полную цену
        get fullPrice() {
            return this.price * this.amount;
        },
        // Сейчас получаем полную калорийность
        get fullKcal() {
            return this.kcal * this.amount
        },

        orderKcal: ''
    }
};

// Заполяем начинку 

const basicFillings = {
    salads: {
        name: 'Начинка из салата',
        price: 650,
        kcal: 15
    },

    lettuce: {
        name: 'Салатный лист',
        price: 450,
        kcal: 25
    },

    cheese: {
        name: 'Сыр',
        price: 800,
        kcal: 54
    }
}

const extraFillings = {
    sauce: {
        name: 'соус',
        price: 600,
        kcal: 78
    },

    mayo: {
        name: 'майонез',
        price: 500,
        kcal: 84
    }
}

// Делаем плюс/минус для количества продукта
const plusMinusButton = document.querySelectorAll('.product__burger_price-symbol');

for (let i = 0; i < plusMinusButton.length; i++) {
    plusMinusButton[i].addEventListener('click', function () {
        //    Так как это ивент, мы сюда суем функцию которая будет делать всё что требуется (плюс/минус, цена и ккал). Функцию создаем ниже
        symbolDefiner(this)
    })
}

function symbolDefiner(symbol) {
    // Чтобы функция понимала к чему же мы подключаемся, мы должны дать ей понять какой же родитель (и ид его) у элемента
    const parent = symbol.closest('.product__burger'), //Нашли родителя
        parentId = parent.getAttribute('id'), // Нашли ИД
        outAmount = parent.querySelector('.product__burger_price-num'), //Подключились к количеству бургеров
        price = parent.querySelector('.product__burger-price'),
        /* kcalOrder = kcalStorage, */ // Калории
        symbolType = symbol.getAttribute('data-symbol'); // символ +/-

    if (symbolType === '+' && burgers[parentId].amount < 15) {
        burgers[parentId].amount++;
    }

    else if (symbolType === '-' && burgers[parentId].amount > 0) {
        burgers[parentId].amount--;
    };

    outAmount.innerHTML = burgers[parentId].amount; // Количество
    if (outAmount.innerHTML == 15) {
        outAmount.style.color = 'red'

        setTimeout(() => {
            alert('Больше нельзя - растолстеешь, а ты нужен нам живым!')
        }, 1000);
    }

    else if (outAmount.innerHTML < 15) {
        outAmount.style.color = 'black'
    }

    price.innerHTML = burgers[parentId].fullPrice; // показывает цену на странице
    burgers[parentId].orderKcal = burgers[parentId].fullKcal // под вопросом нужно ли или нет

    console.log(burgers[parentId].fullPrice);
}



// Вызываем начинки


const clickFillings = document.querySelectorAll('.product__burger_filling');

// Добавляем клик
for (let i = 0; i < clickFillings.length; i++) {
    clickFillings[i].addEventListener('click', function () {
        addFillingBasics(this)
    })
}



function addFillingBasics(fillingBtn) {
    // Задаем к чем будем обращаться
    const parent = fillingBtn.closest('.product__burger'), //Нашли родителя
        parentId = parent.getAttribute('id'), // Нашли ИД
        outAmount = parent.querySelector('.product__burger_price-num'), //Подключились к количеству бургеров
        price = parent.querySelector('.product__burger-price'); // Цена
    // Спрашиваем насчёт начинок
    let basicFillingsPrompt = prompt('Выберите основные начинки:\nПожайлуста, перечислите их через запятую (,)\n1. Начинка из салата\n2. Салатный лист\n3. Сыр');
    // Дополнительно спрашиваем
    for (let i = 0; i < 4; i++) {
        if (basicFillingsPrompt == undefined || basicFillings == '') {
            basicFillingsPrompt = prompt('Выберите основные начинки:\nПожайлуста, перечислите их через запятую (,)\n1. Начинка из салата\n2. Салатный лист\n3. Сыр');
        }
    }
    // Делаем массив из ответа пользователя
    let basicFillingsStorage = basicFillingsPrompt.split(',')
    console.log(basicFillingsStorage);
    // Проверяем массив на значения
    if (basicFillingsStorage.includes('Начинка из салата') == true) {
        burgers[parentId].price += basicFillings['salads'].price;
        burgers[parentId].kcal += basicFillings['salads'].kcal;
    }
    if (basicFillingsStorage.includes('Салатный лист') == true) {
        burgers[parentId].price += basicFillings['lettuce'].price;
        burgers[parentId].kcal += basicFillings['lettuce'].kcal;
    }
    if (basicFillingsStorage.includes('Сыр') == true) {
        burgers[parentId].price += basicFillings['cheese'].price;
        burgers[parentId].kcal += basicFillings['cheese'].kcal;
    }
    console.log(burgers[parentId].price);
    console.log(burgers[parentId].kcal);
    // Спрашиваем насчёт доп начинок
    let extraFillingsPrompt = prompt('Что вам добавить? (Можете пропустить):\nПеречислите их через запятую (,)\nПожайлуста, перечислите их через запятую (,)\n1.Соус\n2.Майонез')
    addFillingsPromptStorage = extraFillingsPrompt.split(',')
    console.log(addFillingsPromptStorage);
    // Проверяем массив на значения
    if (addFillingsPromptStorage.includes('Майонез') == true) {
        burgers[parentId].price += extraFillings['mayo'].price;
        burgers[parentId].kcal += extraFillings['mayo'].kcal;
        console.log('Майонез / 500');
    }
    if (addFillingsPromptStorage.includes('Соус') == true) {
        burgers[parentId].price += extraFillings['sauce'].price;
        burgers[parentId].kcal += extraFillings['sauce'].kcal;
        console.log('Соус / 600');
    }
    console.log(burgers[parentId].price);
    // Добавляем значения в базу
    price.innerHTML = burgers[parentId].fullPrice;
    burgers[parentId].orderKcal = burgers[parentId].fullKcal
}

// ===Вывод в чек===

const hiddenSection = document.querySelector('.hidden'),
    hiddenBtn = document.querySelector('hidden__button'),
    orderBtn = document.querySelector('.order__link'),
    hiddenText = document.querySelector('.hidden__text');

// Добавляем переменные в которые будем всё складывать

let arrayBurgers = [],
    totalName = '',
    totalPrice = '',
    totalKcal = '';

// Добавляем ивент при нажатии на заказать
orderBtn.addEventListener('click', function () {
    // 

    // Запускаем поиск в обьекте бургер 

    for (const key in burgers) {
        const burgerObject = burgers[key]

        if (burgerObject.amount > 0) { // если мы что-то заказали 
            arrayBurgers.push(burgerObject) // то мы суем в arrayBurgers инфу о бургерах

            for (const key2 in burgerObject) {
                if (burgerObject[key2] === true) {
                    burgerObject.name += '\n' + basicFillings[key2].name
                }

                else if (burgerObject[key2] === true && extraFillings[key2] === true) {
                    burgerObject.name += '\n' + basicFillings[key2].name + extraFillings[key2].name
                }
            }
        }
        burgerObject.price += burgerObject.fullPrice - burgerObject.price
        burgerObject.kcal += burgerObject.fullKcal - burgerObject.kcal

    }

    for (let i = 0; i < arrayBurgers.length; i++) {
        totalPrice += '\n' + arrayBurgers[i].price + '\n'
        totalKcal += '\n' + arrayBurgers[i].kcal + '\n'
        totalName += '\n' + arrayBurgers[i].name + '\n'
    }

    // Появление
    hiddenSection.classList.add('active')
    setTimeout(() => {
        hiddenSection.style.opacity = 1;
        hiddenSection.style.top = '99px'
    }, 250);

    const hiddenBurgers = document.querySelector('.hidden__text_burgers'),
        hiddenKcal = document.querySelector('.hidden__text_kcal'),
        hiddenPrice = document.querySelector('.hidden__text_price');

    hiddenBurgers.innerHTML = `Вы купили: ${totalName}`;
    hiddenKcal.innerHTML = `Калорийность: ${totalKcal}`;
    hiddenPrice.innerHTML = `Стоимость покупки: ${totalPrice}`
})

// Оплата

document.querySelector('.hidden__button').addEventListener('click', function () {
    location.reload()
})


// Меню выплывающее

const burgerBtnMenu = document.querySelector('.nav-burger-link'),
    menuLeft = document.querySelector('.header__left'),
    burgerBtnMenuIcon = document.querySelector('.nav-burger-i');

burgerBtnMenu.addEventListener('click', function () {
    setTimeout(() => {
        menuLeft.style = 'left: 0%; opacity: 1;'
    }, 200);

    setTimeout(() => {
        burgerBtnMenuIcon.classList.remove('fa-bars')
        burgerBtnMenuIcon.classList.add('fa-times')
    }, 100);

})

clicker()

function clicker() {
    function outsideClick(event) {
        if (!menuLeft.contains(event.target)) {
                menuLeft.style = 'left: -25%; opacity: 0;'
                burgerBtnMenuIcon.classList.remove('fa-times')
                burgerBtnMenuIcon.classList.add('fa-bars')
        }
    }

    document.addEventListener('click', outsideClick)
}


