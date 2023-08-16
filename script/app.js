// const user = {
//     name: 'Вася',
//     surname: 'Васильев',
//     get fullName(){
//         return `${this.name} ${this.surname}`
//     },
//     set fullName(val){
//         let b = val.split(' ');
//         this.name = b[0];
//         this.surname = b[1];
//         console.log(b);
//     }
// }
// console.log(user);
// user.fullName = 'Петя Петров';
// console.log(user.fullName);

const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum(){
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum(){
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum(){
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum(){
            return this.price * this.amount
        }
    }
}
// product.crazy.amount = 5
console.log(product);

// кнопка корзины
const btnBasket = document.querySelector('.wrapper__navbar-btn');
const basketModal = document.querySelector('.wrapper__navbar-basket');
btnBasket.addEventListener('click', function () {  
    basketModal.classList.toggle('active')
})

// кнопки товаров
const btnsProduct = document.querySelectorAll('.wrapper__list-btn');
btnsProduct.forEach(element => {
    element.addEventListener('click', function () {  
        plus(this)
    })
});

function plus(btn) {
    let parent = btn.closest('.wrapper__list-card')
    // hasAttribute('name') - true - если атрибут есть
    // setAttribute('name') - создает атрибут 
    // getAttribute('name') - возвращает значение
    // removeAttribute('name') - удаляет атрибут
    let parentId = parent.getAttribute('id');
    product[parentId].amount++
    basket();
}

const btnBasketCount = document.querySelector('.warapper__navbar-count');
const checkList = document.querySelector('.wrapper__navbar-checklist');
const totalPrice = document.querySelector('.wrapper__navbar-totalprice');

function basket() {
    let totalSum = 0;
    let totalCount = 0;
    const productArr = [];
    for (const key in product) {
        const po = product[key]
        const productCard = document.querySelector(`#${key}`);
        const cardCount = productCard.querySelector('.wrapper__list-count')
        cardCount.innerHTML = po.amount
        if (po.amount) {
            cardCount.classList.add('active');
            productArr.push(po);
            totalSum += po.totalSum;
            totalCount += po.amount;
        } else {
            cardCount.classList.remove('active')
        }
    }
    btnBasketCount.innerHTML = totalCount;
    totalPrice.innerHTML = totalSum;
    if (totalCount) {
        btnBasketCount.classList.add('active')
    } else {
        btnBasketCount.classList.remove('active')
    }
    checkList.innerHTML = '';
    productArr.forEach( (val)=>{
        checkList.innerHTML += cardItem(val);
    } )
   
}

function cardItem(val) {
    let {amount, img, name, totalSum } = val;
    return `
    <div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
            <img class="wrapper__navbar-productImage" src="${img}" alt="">
            <div class="wrapper__navbar-infoSub">
                <p class="wrapper__navbar-infoName">${name}</p>
                <p class="wrapper__navbar-infoPrice"><span>${totalSum.toLocaleString()}</span> сум</p>
            </div>
        </div>
        <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
            <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
            <output class="wrapper__navbar-count">${amount}</output>
            <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
        </div>
    </div>
    `
    
}

document.addEventListener('click', (e)=>{
    let btn = e.target;
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        let attr = btn.getAttribute('data-symbol');
        const parent = btn.closest('.wrapper__navbar-option');
        let parentId = parent.getAttribute('id').split('_')[0];
        if (attr == '+') {
            product[parentId].amount++
        } else {
            product[parentId].amount--
        }
        basket()
        console.log(parentId);
    }
})

// btnBasket.addEventListener('click', (e)=>{
//     e.stopPropagation()
//     console.log('basket');
// })

const navbarClose = document.querySelector('.wrapper__navbar-close');
navbarClose.addEventListener('click', function () {
    basketModal.classList.remove('active')
})


const btnPrint = document.querySelector('.wrapper__navbar-bottom');
const printBody = document.querySelector('.print__body');
const printFooter = document.querySelector('.print__footer');

btnPrint.addEventListener('click', function () {
    printBody.innerHTML = '';
    let totalSum = 0;
    for (const key in product) {
        const po = product[key];
        if (po.amount) {
            totalSum += po.totalSum;
            printBody.innerHTML += `
            <div class="print__body-item">
                <p class="print__body-item_name">
                    <span class="name">${po.name}</span>
                    <span class="count">${po.amount}</span>
                </p>
                <p class="print__body-item_summ">${po.totalSum}</p>
            </div>
            `
        }      
    }

    printFooter.innerHTML = totalSum;
    window.print();
})

