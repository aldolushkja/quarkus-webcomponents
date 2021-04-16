import { serverUrl } from "./Constants.js";
import { toast, buildConfetti } from "./Commons.js";

//Send password Form inputs to Backend
async function sendData(pwd) {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
        },
        body: pwd
    };
    const response = await fetch(serverUrl + '/password', settings);
    if (response.status === 201) {
        toast('Password saved', 'success');
        buildConfetti();
    } else {
        toast('Ops! Something went wrong :-(', 'error');
    }
}

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. Init pw var
    // 2. Filter out unchecked types
    // 3. Loop over length call a generator function for each type
    // 4. Add final password to the pw var and return
    let generatePassword = '';
    const typesCount = lower + upper + number + symbol;
    // console.log('typesCount: ', typesCount);

    const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    // console.log('typesArray: ', typesArray)

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ', funcName)
            generatePassword += randomFunc[funcName]();
        });
    }

    return generatePassword.slice(0, length);
}




// Generator functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

export { sendData, generatePassword };