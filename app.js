/*
a)  Заполнить массив заданной длины различными простыми числами.
    Натуральное число, большее единицы, называется простым,
    если оно делится только на себя и на единицу.
    function primeArray(arrayLeng){...};
*/

function primeArray(arrayLeng) {
    let arr = [];

    for (let i = 2; arr.length < arrayLeng; i++) {
        let flag = 1;
        for (let j = 2; j * j <= i; j++) {
            if (i % j === 0) {
                flag = 0;
                break
            }
        }
        if (flag === 1) {
            arr.push(i)
        }
    }
    return arr;
}

console.log(primeArray(5)); // [2,3,5,7,11];
console.log(primeArray(7)); // [2,3,5,7,11,13,17];

/*
b)  Найти в строке все числа. Учитывать дробные числа.
    Например текст: У Пети было 10 яблок, 2.5 он отдал Маше, 3.5 Васе и 4 оставил себе.
    Результат [10,2.5,3.5,4]
*/

function findNumbers(str) {
    let arr = str.split(' ');
    let numbers = [];

    arr.forEach(item => {
        const num = Number(item);
        if (!isNaN(num)) {
            numbers.push(num)
        }
    });
    return numbers
}
console.log(findNumbers('У Пети было 10 яблок, 2.5 он отдал Маше, 3.5 Васе и 4 оставил себе.'));
// [10,2.5,3.5,4]

/*
c)  Замена подряд идущих букв на их количество.
    assdssddffffrrreeeweggggg // => 'as2ds2d2f4r3e3weg5'
*/

function inNumbers(str){
    let count = 0;
    let result = '';

    for (let i = 0; i <= str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++;
        } else {
            result += str[i] + (count + 1);
            count = 0;
        }
    }
    return result.replace(/1/g, '');
}

console.log(inNumbers('assdssddffffrrreeeweggggg')); // 'as2ds2d2f4r3e3weg5'

/*
d)  Реализовать функцию get. Которая по пути ищет значение в объекте или в массиве.
    const exampleArr = [{a:{b:[{c:4}, {c:5}]},{a:{b:[{c:6},{c:7}]}];
    const exampleObj = { a:b:{c:5}}
    get(exampleArr, '0.a.b.1.c') // 5
    get(exampleObj, 'a.b') // {c:5}
*/

const exampleArr = [
    {
        a: { b: [{ c:4 }, { c:5 }] }
    },
    {
        a: { b: [{ c:6 }, { c:7 }] }
    }
];
const exampleObj = { a: { b: { c: 5 } } };

function get(obj, path) {
    let arr = path.split('.');
    arr.forEach(el => (obj = obj[el]));
    return obj
}

console.log(get(exampleArr, '0.a.b.1.c')); // 5
console.log(get(exampleObj, 'a.b')); // {c:5}

/*
e)  Создать функцию которая при каждом вызове вернет случайное число от 0 до 100 без повторений.
    Если закончились варианты вернет ошибку. Реализовать через замыкание.
*/

function numberRandom(maxNum) {
    let arrNum = [];
    return function generateUniqueRandom() {
        let random = Math.round(Math.random() * maxNum);
        if (!arrNum.includes(random)) {
            arrNum.push(random);
            return random;
        } else {
            if (arrNum.length <= maxNum) {
                return generateUniqueRandom(maxNum);
            } else {
                console.log('Варианты закончились');
                return arrNum
            }
        }
    }
}
let number = (numberRandom(100));
console.log(number());

/*
f)  Реализовать класс очереди запросов.
    Методы queue, deQueue, queuing обязательно реализовать.
    Задано количество одновременно выполняемых запросов.
    В качестве запросов использовать Promise которые резолвятся через случайное время.
    Пример ниже можно доработать как Вы решите.
*/

class ConcurrencyQueue {
    constructor() {
        this.concurrency = [];
    }

    queue(value) {
        this.concurrency.push(value);
    }

    deQueue() {
        return this.concurrency.shift();
    }

    queuing() {
        return new Promise((resolve, reject) => {
            let ms = Math.round(Math.random() * 3000) + 1;
            setTimeout(() => {
                resolve(this);
                reject('error');
            }, ms);
        });
    }
}

const concQueue = new ConcurrencyQueue([]);
concQueue.queuing()
    .then(value => {
        value.queue(1);
        console.log('add 1 item', concQueue.concurrency);
        return value;
    })
    .then(value => {
        value.queue(2);
        console.log('add 2 item', concQueue.concurrency);
        return value;
    })
    .then(value => {
        value.queue(3);
        console.log('add 3 item', concQueue.concurrency);
        return value;
    });

concQueue.queuing()
    .then(value => {
        value.deQueue(1);
        console.log('remove 1 item', concQueue.concurrency);
        return value;
    })
    .then(value => {
        value.deQueue(2);
        console.log('remove 2 item', concQueue.concurrency);
        return value;
    })
    .then(value => {
        value.deQueue(3);
        console.log('remove 3 item', concQueue.concurrency);
        return value;
    });
