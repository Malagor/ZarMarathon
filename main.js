// const firstRow = 'мама мыла раму';
// const secondRow = 'собака друг человека';
// const findChar = 'а';


/*
    Подсчет букв и сравнение фраз по количеству этой буквы в фразе
*/
const firstRow = prompt("Ввердите фразу 1");
const secondRow = prompt("Ввердите фразу 2");
let findChar = '';

while (findChar.length != 1) {
    findChar = prompt("Введите 1 символ для поиска?");
}

function getRow(firstRow, secondRow) {

    function countChar(string, char) {
        let result = 0;

        for (let i = 0; i < string.length; i++) {
            string.charAt(i) == char ? ++result : false;
        }

        // console.log("Количество символов в строке " + string + " = " + result);
        return result;
    }

    if (!firstRow || !secondRow) {
        alert("Не введена одна из фраз");
    } else {
        const comparePhrase = countChar(firstRow, findChar) - countChar(secondRow, findChar);

        if (comparePhrase > 0) {
            return firstRow;
        } else if (comparePhrase < 0) {
            return secondRow;
        } else {
            return "Количество символов '" + findChar + "' в строках '" + firstRow + "' и '" + secondRow + "' одинаково";
        }
    }
}

console.log(getRow(firstRow, secondRow)); // мама мыла раму



/*
    Фоматирование номера телефона
*/
function formattedPhone(phone) {

    let formatedPhoneNumber = '';

    if (phone.length != 12) {
        // не проверяю на цифры, только на длину номера
        console.log('Введены неверные данные. Короткий номер. Длина введенного номера = ' + phone.lenght);

        return phone;
    }

    for (let i = 0; i < phone.length; i++) {

        i == 2 ? formatedPhoneNumber += ' (': '';
        i == 5 ? formatedPhoneNumber += ') ': '';
        i == 8 || i == 10 ? formatedPhoneNumber += '-': '';

        formatedPhoneNumber += phone.charAt(i);
    }

    return formatedPhoneNumber;

}

let inputNumber ='';

while (inputNumber.length != 12) {
    inputNumber = prompt('Ввежитте номер в формате +71234567890. Плюс и 11 цифр');
}

// console.log(formattedPhone('+71234567890')); // +7 (123) 456-78-90
console.log(formattedPhone(inputNumber)); 