// DOM elements
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')
const saveEl = document.getElementById('save')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};


// Generate event listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
    if (!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});

// Save event listen
saveEl.addEventListener('click', () => {
    const password = resultEl.innerText;
    if (!password) {
        console.log('Could not save empty password');
        return;
    }
    saveToQuarkus(password);
    resultEl.innerText = '';
});

//Save password to DB with Quarkus BE solution
async function saveToQuarkus(pwd) {
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'text/plain',
        },
        body: pwd
    }
    const response = await fetch('http://localhost:8080/password',settings);
    if(response.status === 201){
        console.log("Save to quarkus was successful! Awesome");
    } else {
        console.log("Error saving to quarkus")
    }
}

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. Init pw var
    // 2. Filter out unchecked types
    // 3. Loop over length call a generator function for each type
    // 4. Add final password to the pw var and return
    let generatePassword = '';
    const typesCount = lower + upper + number + symbol;
    // console.log('typesCount: ', typesCount);

    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
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

    const finalPassword = generatePassword.slice(0, length);
    return finalPassword;
}

//Save password into DB


// Generator functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
