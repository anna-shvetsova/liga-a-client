// const _decline = (number, textForms) => {
//     if (number === 0) return '';
//     const n10 = Math.abs(number) % 100;
//     const n = number % 10;
//     if (10 < n10 && n10 < 20) { return textForms[2]; }
//     if (1 < n && n < 5) { return textForms[1]; }
//     if (n == 1) { return textForms[0]; }
//     return textForms[2];
// }

// const _inWords = (number, textForms) => {
//     if (number <= 0 || 100 <= number ) return '';

//     const n90 = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
//     const n19 = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
//     const n9 = ['', 'одна', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];

//     const arr = [];
//     if (10 <= number && number < 20) arr.push(n19[number % 10]);
//     else {
//         if (number >= 20) arr.push(n90[Math.floor(number / 10)]);
//         const n = number % 10;
//         if (n !== 0) arr.push(n9[n]);
//     };
//     return arr.join(' ') + ' ' + _decline(number, textForms);
// }

// const _getTextTimeRu = (holdingTime) => {
//     const arr = holdingTime.split(':');
//     const minutes = Number(arr[0]);
//     const seconds = Number(arr[1]);
//     return (_inWords(minutes, ['минута', 'минуты', 'минут'])
//         + ' '
//         + _inWords(seconds, ['секунда', 'секунды', 'секунд'])).trim();
// };

// const _getTextTime = (holdingTime) => {
//     const arr = holdingTime.split(':');
//     const minutes = Number(arr[0]);
//     const seconds = Number(arr[1]);
//     let res = '';
//     switch (minutes) {
//         case 0:
//             break;
//         case 1:
//             res += '1 minute';
//             break;
//         default:
//             res += `${minutes} minutes`;
//             break;
//     };
//     switch (seconds) {
//         case 0:
//             break;
//         case 1:
//             res += ' 1 second';
//             break;
//         default:
//             res += ` ${seconds} seconds`;
//             break;
//     };
//     return res.trim();
// };

// const formatDate = (date) => {
//     return `${date.getFullYear()}-${twoDigits(date.getMonth())}-${twoDigits(date.getDate())}`;
// }

// const seconds = (holdingTime) => {
//     const arr = holdingTime.split(':');
//     return Number(arr[0]) * 60 + Number(arr[1]);
// };

// const totalTime = ({ sets, isTwoSided, holdingTime }, preparationTime) => {
//     return (seconds(holdingTime) + preparationTime) * sets * (isTwoSided ? 2 : 1);
// };

// const twoDigits = (val) => {
//     return ('0' + String(val)).slice(-2);
// }

// const formatTime = (seconds, withLeadingZero = false) => {
//     const min = Math.floor(seconds / 60);
//     const sec = Math.round(seconds % 60);
//     return (withLeadingZero ? twoDigits(min) : min) + ':' + twoDigits(sec);
// }

const setValuesToFields = (obj, fields) => {
    return fields.map(el => {
        return {
            ...el,
            value: obj[el.id]
        }
    })
}

const getValuesFromFields = (fields) => {
    const res = {};
    fields.forEach(el => {
        res[el.id] = el.value;
    });
    return res;
}

const areFieldsValid = (fields) => {
    for (const el of fields) {
        if (el.error) return false;
    }
    return true;
}

export {
    setValuesToFields,
    getValuesFromFields,
    areFieldsValid
};

